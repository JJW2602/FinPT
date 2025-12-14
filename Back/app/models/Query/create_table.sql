CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    news_date TIMESTAMP WITH TIME ZONE,
    news_ranking INT,
    category TEXT,
    url TEXT,
    title TEXT,
    content_summarize TEXT,
    content TEXT,
    word_dictionary TEXT,
    test_question TEXT,
    test_option1 TEXT,
    test_option2 TEXT,
    test_option3 TEXT,
    test_option4 TEXT,
    test_answer TEXT
);

CREATE TABLE vector (
    id SERIAL PRIMARY KEY,
    vector FLOAT[]
);

CREATE TABLE learn_category (
    id SERIAL PRIMARY KEY,
    category TEXT,
    words TEXT[]
);

CREATE TABLE learn_word (
    id SERIAL PRIMARY KEY,
    category TEXT,
    category_id INT,
    word TEXT,
    explanation TEXT
);

DROP TABLE news;
DROP TABLE vector; 

DROP TABLE learn_category;
DROP TABLE learn_word;

SELECT * FROM news ORDER BY news_date DESC, news_ranking ASC LIMIT 100;

SELECT * FROM news ORDER BY id DESC LIMIT 100;

# 중복제거
WITH RankedNews AS (
  SELECT ctid, 
         ROW_NUMBER() OVER (PARTITION BY news_date, news_ranking ORDER BY id) AS row_num
  FROM news
)
DELETE FROM news WHERE ctid IN (
  SELECT ctid
  FROM RankedNews
  WHERE row_num > 1
);