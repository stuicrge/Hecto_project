import csv
from package.dbconn import mysqlDbConnection, mysqlDbClose

dbConn = mysqlDbConnection('root', '0000', '127.0.0.1', 3306, 'reviewdb')
cursor = dbConn.cursor()
 
 
file = open('./answer.csv','r', encoding='UTF8')
fReader = csv.reader(file)

i = 1
for line in fReader:
    query = f"UPDATE test_ttobak_review SET answer = (%s) WHERE id = {i}"
    data = (line[1])
    cursor.execute(query, data)
    i += 1
 
file.close()
 
dbConn.commit() 
cursor.close()
mysqlDbClose(dbConn)