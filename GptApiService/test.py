import sys

sys.path.append('c:/ReviewService/package')
print(sys.path)

from package import dbconn

dbConn = dbconn.mysqlDbConnection('root', '0000', '127.0.0.1', 3306, 'reviewdb')
cursor = dbConn.cursor()
 
query = "SELECT productName, title, content FROM review"
cursor.execute(query)

datas = cursor.fetchall()
for data in datas:
	print(data)
		
dbConn.commit() 
cursor.close()
dbconn.mysqlDbClose(dbConn)

