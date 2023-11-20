import sys
import pymysql
 
def mysqlDbConnection(u, pw, h, p, d):
    try:
        conn = pymysql.connect(user = u, password = pw, host = h, port = p, database = d)
        print("DB Connection Success: {0}".format(h))
    except pymysql.Error as e:
        print("Error connecting to MySQL Platform : {}".format(e))
        sys.exit(1)
 
    return conn
 
 
def mysqlDbClose(_dbConn):
    try:
        _dbConn.close()
        print("DB Close Success")
    except pymysql.Error as e:
        print("Error closing from MySQL Platform")
        sys.exit(1)