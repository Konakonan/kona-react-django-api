create function fnNumOfContactsByRegion (@Region nvarchar(15))
returns int 
as 
begin 
	declare @NumContacts int

	if @Region is null
		begin 
			select @NumContacts=(select count(*) from Customers where Region is null)
		end
	else 
		begin 
			select @NumContacts=(select count(*) from Customers where Region=@Region)
		end

	return (@NumContacts)
end


select dbo.fnNumOfContactsByRegion('WA') as 'numofcontacts'




create function fnSelectBirthdayByMonth()
returns @retCalendar table
	(BirthMonth int primary key,Employees nvarchar(100))
as
begin 
	declare @EmployeeName nvarchar(31)
	declare @BirthDate datetime
	declare @Counter int

	declare EmployeeBirthday cursor for 
		select FirstName + LastName as EmployeeName,BirthDate
		from Employees 

	declare @Calendar table
	(BirthMonth int primary key,
	 Employees nvarchar(100))


	 set @Counter =1 
	 while @Counter <13
	 begin 
		insert into @Calendar(BirthMonth,Employees)
		values(@Counter,'')
		set @Counter=@Counter +1
	end

	open EmployeeBirthday
	fetch next from EmployeeBirthday
	into @EmployeeName,@BirthDate

	while @@fetch_status=0
	begin 
		update @Calendar
		set Employees=Employees+@EmployeeName+'('+cast(day(@BirthDate) as nvarchar(2))+')'
		where BirthMonth = month(@BirthDate)

		fetch next from EmployeeBirthday
		into @EmployeeName,@BirthDate
	end

	insert into @retCalendar
	select BirthMonth,Employees from @Calendar

	close EmployeeBirthday
	deallocate EmployeeBirthday

	return 

end

select * from dbo.fnSelectBirthdayByMonth() where BirthMonth =12;