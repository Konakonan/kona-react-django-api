from datetime import datetime

date1=datetime(2024,12,31)

date11=date1.date()
now = datetime.today().date()

date2=date11-now
print(date2.days)

