import pyodbc
import pandas as pd

connection_string = (
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=;"
    "DATABASE=sql100;"
    "Trusted_Connection=yes;"
)
try:
    conn = pyodbc.connect(connection_string)
    print("接続成功")
except pyodbc.Error as e:
    print("接続失敗:", e)