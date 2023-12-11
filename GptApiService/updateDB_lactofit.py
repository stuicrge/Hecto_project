import sys
sys.path.append(r'C:\localrepository\Hecto_project\package')
                
import csv
from dbconn import mysqlDbConnection, mysqlDbClose

def updateDB_lactofit():
    dbConn = mysqlDbConnection('root', '0000', '127.0.0.1', 3306, 'reviewdb')
    cursor = dbConn.cursor()
    select_query = "SELECT count(*) FROM lactofit_review"
    cursor.execute(select_query)
    total_rows_num = cursor.fetchone()[0]
    
    file = open('C:\ReviewService\GptApiService\gpt_lactofit_answer.csv','r', encoding='UTF8')
    fReader = csv.reader(file)

    next(fReader)

    update_rows_num = total_rows_num
    for line in fReader:
        update_query = '''UPDATE lactofit_review
                        SET gpt_answer = (%s)
                        WHERE id = (%s)
                        ORDER BY id DESC;'''
        data = (line[1].replace("'", ""), update_rows_num)
        cursor.execute(update_query, data)
        update_rows_num -= 1
    
    file.close()
    
    dbConn.commit() 
    cursor.close()
    mysqlDbClose(dbConn)

if __name__ == "__main__":
    updateDB_lactofit()