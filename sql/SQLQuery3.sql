exec  sp_addmessage
	@msgnum=50001,
	@severity=10,
	@msgtext='Trigger Executed',
	@lang='us_english',
	@with_log=true

exec  sp_addmessage
	@msgnum=50001,
	@severity=10,
	@msgtext='トリガーが実行されました',
	@with_log=true


create trigger trNotifyCustomerUpdate on Customers
for insert ,update,delete
as raiserror(50001,10,10)

UPDATE Customers SET Country = 'USA' WHERE Country = 'USA'


create trigger trGrnrtsyrContactName on Customers
for insert ,update
as
begin 
	if update(CompanyName)
		update Customers
		set ContactName='Contact For '+ CompanyName
		where CustomerID=(
			select CustomerID 
			from inserted --トリガーで利用される特殊な内部テーブル
			where ContactName is null)
end



INSERT INTO Customers
( CustomerID, CompanyName)
VALUES
( 'MIROS', 'Joan Miros Company')

SELECT * FROM Customers WHERE CustomerID = 'MIROS'

select count(*) from Customers where contactname is null
