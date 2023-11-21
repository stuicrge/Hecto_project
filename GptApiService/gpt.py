
from package.dbconn import mysqlDbConnection, mysqlDbClose
import openai
import pandas as pd

#오픈 apikey라 가렸습니다!
openai.api_key = '****'

dbConn = mysqlDbConnection('root', '0000', '127.0.0.1', 3306, 'reviewdb')
cursor = dbConn.cursor()
 
query = "SELECT productName, title, content FROM review"
cursor.execute(query)

{"prompt":"좋아요","completion":"긍정"}
{"prompt":"환불하고싶어요","completion":"부정"}

data = cursor.fetchall()
answerlist = []
for i in range(1, len(data)):
	response = openai.ChatCompletion.create(
	model="gpt-4",
	messages=[
		{"role": "system", "content": "All you have to do is look at the product reviews and determine whether they are 'very good', 'good', 'average', 'bad' or 'very bad'." }, # 역할지시문은 한국어보다 영어로 작성해야 더 잘 동작함
		{"role": "user", "content": f"{data[i]} 이 후기 내용은 긍정인가요, 부정인가요?"}
	]	
	)
	answerlist.append(response['choices'][0]['message']['content'])
	print(answerlist[i-1])
		
dbConn.commit() 
cursor.close()
mysqlDbClose(dbConn)

# dataframe으로 변환 후 csv파일로 저장
data = {"PorN":answerlist}

df = pd.DataFrame(data)

df.to_csv("answer.csv", encoding = "utf-8-sig")
