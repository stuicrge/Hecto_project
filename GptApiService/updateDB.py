import sys
sys.path.append(r'C:\localrepository\Hecto_project\package')
                
import csv
from dbconn import mysqlDbConnection, mysqlDbClose

dbConn = mysqlDbConnection('newuser', '1234', '210.110.33.220', 3306, 'reviewdb')
cursor = dbConn.cursor()
select_query = "SELECT count(*) FROM test3_ttobak_review"
cursor.execute(select_query)
total_rows_num = cursor.fetchone()[0]

def updateDB(csv_len):
    
    file = open('./gpt_answer.csv','r', encoding='UTF8')
    fReader = csv.reader(file)

    next(fReader)

    update_rows_num = total_rows_num - csv_len

    for line in fReader:
        update_query = f"UPDATE test3_ttobak_review SET gpt_answer = (%s) WHERE id = {update_rows_num+1}"
        data = (line[1])
        cursor.execute(update_query, data)
        update_rows_num += 1
    
    file.close()
    
    dbConn.commit() 
    cursor.close()
    mysqlDbClose(dbConn)

if __name__ == "__main__":
    updateDB(total_rows_num)