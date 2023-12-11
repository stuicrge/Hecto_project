import csv
import os

import sys
sys.path.append(r'C:\localrepository\Hecto_project\package')
from dbconn import mysqlDbConnection, mysqlDbClose

def insertDB():
    dbConn = mysqlDbConnection('root', '0000', '127.0.0.1', 3306, 'reviewdb')
    cursor = dbConn.cursor()

    file1 = open('ttobakcare.csv','r', encoding='UTF8')
    fReader1 = csv.reader(file1)
    next(fReader1) # 맨 첫번째 행 제외

    for line in fReader1:
        query = "INSERT INTO ttobak_review (productName, title, content, date) VALUES (%s, %s, %s, %s)"
        data = (line[1], line[2], line[3], line[4])
        cursor.execute(query, data)

    file1.close()

    file2_path = 'ttobakcare_image.csv'
    if os.path.exists(file2_path):
        file2 = open(file2_path, 'r', encoding='UTF8')
        fReader2 = csv.reader(file2)

        next(fReader2)

        try:
            for line in fReader2:
                query = "INSERT INTO ttobak_image (name, image) VALUES (%s, %s)"
                data = (line[1], line[5])
                cursor.execute(query, data)

        except Exception as e:
            print(f"An error occurred while processing {file2_path}: {e}")

        finally:
            file2.close()

    else:
        print(f"{file2_path} does not exist.")

    dbConn.commit() 
    cursor.close()
    mysqlDbClose(dbConn)

if __name__ == "__main__":
    insertDB()