create procedure SelectBirthdayByMonth as 
begin 
	declare @EmployeeName nvarchar(31)
	declare @BirthDate Datetime
	declare @Counter int

	declare EmployeeBirthday cursor for --カーソルの生成
		select firstName + LastName as Employeename,birthdate
		from Employees

	create table #calendar --テーブル生成
	(birthMonth int primary key,employees nvarchar(100))

	set nocount on --メッセージの省略
	
	set @Counter=1 --ローカル変数に値を代入
	while @Counter<13 
	begin 
		insert into #calendar(BirthMonth,Employees)
		values(@Counter,'')
		set @Counter=@Counter+1
	end 


	open EmployeeBirthday --カーソルを開く
	fetch next from EmployeeBirthday
	into @EmployeeName,@BirthDate
	while @@FETCH_STATUS=0
	begin 
		update #calendar
		set Employees = Employees + @EmployeeName+'('+cast(day(@BirthDate) as nvarchar(2))+')'
		where BirthMonth = month(@birthdate)
		fetch next from EmployeeBirthday
		into @EmployeeName,@BirthDate

	end 

	select * from #calendar

	close EmployeeBirthday　--カーソルを閉じる
	deallocate EmployeeBirthday　--メモリの開放
end

drop procedure SelectBirthdayByMonth

exec SelectBirthdayByMonth