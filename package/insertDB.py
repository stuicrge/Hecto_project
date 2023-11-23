import csv
from dbconn import mysqlDbConnection, mysqlDbClose

def insertDB(query):
    dbConn = mysqlDbConnection('root', '0000', '127.0.0.1', 3306, 'reviewdb')
    cursor = dbConn.cursor()

    file = open('./ttobakcare.csv','r', encoding='UTF8')
    fReader = csv.reader(file)

    for line in fReader:
        query = "INSERT INTO test_ttobak_review (productName, title, content, date) VALUES (%s, %s, %s, %s)"
        data = (line[1], line[2], line[3])
        cursor.execute(query, data)
    file.close()

    dbConn.commit() 
    cursor.close()
    mysqlDbClose(dbConn)