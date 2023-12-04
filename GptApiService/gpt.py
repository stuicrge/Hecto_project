import sys
sys.path.append(r'C:\localrepository\Hecto_project\package')

from dbconn import mysqlDbConnection, mysqlDbClose
import openai
import pandas as pd


openai.api_key = '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'

dbConn = mysqlDbConnection('root', '0000', '127.0.0.1', 3306, 'reviewdb')
cursor = dbConn.cursor()

def gpt(csv_len):
   query = f"SELECT name, title, content FROM test3_ttobak_review WHERE title IS NOT NULL ORDER BY id DESC LIMIT {csv_len}"
   cursor.execute(query)

   data = cursor.fetchall()
   answerlist = []
   for i in range(1, len(data)):
      response = openai.ChatCompletion.create(
      model="gpt-4",
      messages=[
         {"role": "system", "content": "All you have to do is look at the product reviews and determine whether they are 'very good', 'good', 'average', 'bad' or 'very bad'." }, # 역할지시문은 한국어보다 영어로 작성해야 더 잘 동작함
         {"role": "user", "content": f"{data[i]} 이 후기 내용은 '매우좋음', '좋음', '보통', '나쁨', '매우나쁨' 중에 무엇인가요? 단어로만 답변해주세요."}
      ]   
      )
      answerlist.append(response['choices'][0]['message']['content'])
      print(data[i])
      print(answerlist[i-1])
         
   dbConn.commit() 
   cursor.close()
   mysqlDbClose(dbConn)

   # dataframe으로 변환 후 csv파일로 저장
   data = {"answer":answerlist}

   df = pd.DataFrame(data)
   df_reverse = df.iloc[::-1]

   df_reverse.to_csv("C:\localrepository\Hecto_project\GptApiService\gpt_answer.csv", encoding = "utf-8-sig")

if __name__ == "__main__":
   query = "SELECT count(*) FROM test3_ttobak_review"
   cursor.execute(query)

   rows_num = cursor.fetchone()[0]
   gpt(rows_num)
