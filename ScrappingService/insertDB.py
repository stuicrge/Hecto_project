import csv
from package.dbconn import mysqlDbConnection, mysqlDbClose

dbConn = mysqlDbConnection('newuser', '1234', '210.110.33.220:3306', 3306, 'reviewdb') 
cursor = dbConn.cursor()
 
 
file = open('./ttobakcare.csv','r', encoding='UTF8')
fReader = csv.reader(file)
 
for line in fReader:
    query = "INSERT INTO test_ttobak_review (productName, title, content) VALUES (%s, %s, %s)"
    data = (line[1], line[2], line[3])
    cursor.execute(query, data)
 
file.close()
 
dbConn.commit() 
cursor.close()
mysqlDbClose(dbConn)