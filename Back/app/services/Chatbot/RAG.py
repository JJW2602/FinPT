# 데이터베이스 인덱싱(SPLADE 활용)
from transformers import AutoTokenizer, AutoModelForMaskedLM
import torch
import faiss 
import openai
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker
from app.models.database import SessionLocal
from app.models.models import News
from sqlalchemy.orm import Session
import numpy as np

tokenizer = AutoTokenizer.from_pretrained("naver/splade-cocondenser-ensembledistil")
model = AutoModelForMaskedLM.from_pretrained("naver/splade-cocondenser-ensembledistil")

database = []
encoded_docs = []
vectors = []

# 데이터 로드 (경제기사 데이터베이스)
def fetch_news_as_list(db: Session):
    # 뉴스 데이터를 데이터베이스에서 가져오기
    news_data = db.query(News).all()
    database = [{"id": news.id, "content": news.content} for news in news_data]
    return database


def fetch_news_in_range(db: Session, start: int, end: int):
    # News.id가 start 이상, end 이하인 데이터만 조회
    news_data = (
        db.query(News).filter(News.id >= start, News.id <= end).order_by(News.id.desc()).all()
    )
    database = [{"id": news.id, "content": news.content} for news in news_data]
    return database


# 문서 인코딩 및 벡터화
def encode_documents(database, tokenizer, model):
    encoded_docs = []
    for doc in database:
        print(doc["id"])
        inputs = tokenizer(doc["content"], return_tensors="pt", max_length=512, truncation=True)
        with torch.no_grad():
            outputs = model(**inputs)
        sparse_vector = outputs.logits[0].mean(dim=0).cpu().numpy()  # Sparse 표현
        encoded_docs.append({"id": doc["id"], "vector": sparse_vector})
    return encoded_docs

# 질문 처리 및 검색
def search_query(query, index, database, tokenizer, model, top_k=5):        
    # 질문 인코딩
    inputs = tokenizer(query, return_tensors="pt", max_length=512, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    query_vector = outputs.logits[0].mean(dim=0).cpu().numpy()

    # FAISS 검색
    _, top_indices = index.search(torch.tensor(query_vector).unsqueeze(0).numpy(), top_k)
    results = [database[i]["content"] for i in top_indices[0]]
    return results
# OpenAI API 설정
openai.api_key = "YOUR_API_KEY"

def generate_answer_with_gpt4(query, documents):
    """
    ChatGPT-4를 사용하여 문서와 질문을 기반으로 답변을 생성합니다.
    """
    context = "\n".join([f"- {doc}" for doc in documents])  # 문서를 목록 형태로 정리
    prompt = f"""
  다음은 경제기사 데이터베이스의 내용입니다:
  {context}

  질문: {query}

  위 내용을 바탕으로 질문에 대한 명확하고 자세한 답변을 작성해주세요.
  """
    # ChatGPT-4o API 호출
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": 
             """
                You are a chatbot designed to answer questions related to economics in korean. 
                Please adhere to the following guidelines when responding:

                1. If there are relevant economic articles in the database related to the user's question, use them as references in your response.
                2. If there are no relevant economic articles in the database, base your response on your training data.
                3. Ensure that your response does not exceed 1000 characters.
                4. 이모티콘도 포함해서, 최대한 친근한 말투로 대답해줘. 어말어미는 ~야!, ~지, ~일까? 등 다양하게 사용해줘
                5. 가독성을 위해서 볼드체, 넘버링을 사용해줘.
                """
             },
            {"role": "user", "content": prompt}
        ],
        max_tokens=3000,  # 답변 길이 조정
        temperature=0.7,  # 응답 다양성 조정
    )
    return response.choices[0].message.content


def RAGpipeline(question): #state 0일때 벡터 초기화, state 1일때 검색 및 답변 생성
    # SPLADE 모델 로드
    tokenizer = AutoTokenizer.from_pretrained("naver/splade-cocondenser-ensembledistil")
    model = AutoModelForMaskedLM.from_pretrained("naver/splade-cocondenser-ensembledistil")
    
    db = SessionLocal()
    database = fetch_news_as_list(db)
    encoded_docs = encode_documents(database, tokenizer, model)
    vectors = [doc["vector"] for doc in encoded_docs]
    dimension = len(encoded_docs[0]["vector"])
    index = faiss.IndexFlatL2(dimension)
    faiss_index = faiss.IndexFlatIP(dimension)
    faiss_index.add(torch.tensor(vectors).numpy())
    related_docs = search_query(question, faiss_index, database, tokenizer, model)
    answer = generate_answer_with_gpt4(question, related_docs)
    return answer

