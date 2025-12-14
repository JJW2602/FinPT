import { atom } from "recoil";

export type NewsType = {
  // "url": item.url,
  // "content": item.content_summarize,
  // "word_dictionary": item.word_dictionary,
  url: string
  content: string
  word_dictionary: string
  test_question:string
  test_option1:string
  test_option2:string
  test_option3:string
  test_option4:string
  test_answer:string
  // news_date = Column(TIMESTAMP(timezone=True), server_default=func.now())
  // news_ranking = Column(Integer)
  // category = Column(Text)
  // url = Column(Text)
  // title = Column(Text)
  // content_summarize = Column(Text)
  // content = Column(Text)
  // word_dictionary = Column(Text)
  // test_question = Column(Text)
  // test_option1 = Column(Text)
  // test_option2 = Column(Text)
  // test_option3 = Column(Text)
  // test_option4 = Column(Text)
  // test_answer = Column(Text)
}

export interface NewsStateType {
  selectedIndex?: number
  data: NewsType[]
}

const newsStates = atom<NewsStateType>({
  key: 'newsStates',
  default: {
    selectedIndex: undefined, 
    data: [
      // { url: "localhost:3000", content: "content1", word_dictionary: "word_dictionary" },
      // { url: "localhost:3000", content: "content2", word_dictionary: "word_dictionary" },
      // { url: "localhost:3000", content: "content3", word_dictionary: "word_dictionary" }
    ]
  }
});

export default newsStates; 