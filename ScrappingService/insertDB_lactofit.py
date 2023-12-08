import csv
import os

import sys
sys.path.append(r'C:\ReviewService\package')
from dbconn import mysqlDbConnection, mysqlDbClose

def insertDB_lactofit():
    dbConn = mysqlDbConnection('root', '0000', '127.0.0.1', 3306, 'reviewdb')
    cursor = dbConn.cursor()

    file = open('lactofit.csv','r', encoding='UTF8')
    fReader = csv.reader(file)
    next(fReader) # 맨 첫번째 행 제외

    for line in fReader:
        query = "INSERT INTO lactofit_review (name, content, date) VALUES (%s, %s, %s)"
        data = (line[1], line[2], line[3])
        cursor.execute(query, data)

    file.close()

    dbConn.commit() 
    cursor.close()
    mysqlDbClose(dbConn)

if __name__ == "__main__":
    insertDB_lactofit()