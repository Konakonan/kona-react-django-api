import pyodbc
import pandas as pd

connection_string = (
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=;"
    "DATABASE=sql100;"
    "Trusted_Connection=yes;"
)
conn = pyodbc.connect(connection_string)
query_receipt = """
SELECT *
FROM dbo.receipt
"""

df_receipt = pd.read_sql(query_receipt, conn)

#print(df_receipt.head())

df_1=df_receipt.groupby("customer_id").sum()[["amount"]].reset_index()

df_2=df_receipt.groupby("customer_id").sum()["amount"].reset_index()
print(df_1.head())
print(df_2.head())

#print(type(df_1))
#print(type(df_2))
