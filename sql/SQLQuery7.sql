use sql100
--1
select top 10 * from receipt;

--2 
select 
	sales_ymd as '売上年月日',
	customer_id as '顧客ID',
	product_cd as '商品コード',
	amount as '売上金額'
from receipt;

--3
select 
	sales_ymd as 'sales_date',
	customer_id as '顧客ID',
	product_cd as '商品コード',
	amount as '売上金額'
from receipt;

--4
create view view1 --viewの作成
as (select 
		sales_ymd as '売上年月日',
		customer_id as '顧客ID',
		product_cd as '商品コード',
		amount as '売上金額'
	from receipt);

select * from view1 
where 顧客ID='CS018205000001'

--5
select * from view1
where (顧客ID='CS018205000001') and (売上金額>=1000);

--6 or使うだけ

--7
select * from view1 
where 顧客ID='CS018205000001' and 
(売上金額 between 1000 and 2000);

--8
select * from view1 
where 顧客ID='CS018205000001' and 
商品コード　!='P071401019'

--9
--やりたくない。

--10
select top 10 *  from store 
where store_cd like 'S14%'

--11
select top 5 * from customer 
where customer_id like '%1'

--12
select top 10 * from store
where address like '%横浜市%';

--13
select top 10 * from customer 
where status_cd like '[A-F]%';

--14 13と同じ

--15
select top 10 * from customer
where status_cd like '[A-F]%[1-9]'

--16

--17 小→大
select top 10 * from customer
order by birth_day asc;

--18 大→小
select top 10 * from customer
order by birth_day desc;

--19
select customer_id,amount,rank() over(order by amount desc)
from receipt 

--20
select customer_id,amount,dense_rank() over(order by amount desc) as rank
from receipt 

--21
select count(*) from receipt;

--22
select count(distinct(customer_id)) from receipt;

--23
select store_cd,sum(amount),sum(cast(quantity as int)) from receipt 
group by store_cd

--24
select customer_id,max(sales_ymd) as q from receipt
group by customer_id
 

 --25 min使うだけ

 --26
 select customer_id,max(sales_ymd) as p,min(sales_ymd) as q
 from receipt
group by customer_id
having max(sales_ymd) != min(sales_ymd);

--27
select store_cd,avg(amount) as q from receipt
group by store_cd
order by q desc;

--28 中央値(データの真ん中の値、データが偶数個ならば真ん中2個の平均)
select store_cd ,count(store_cd) as '店舗ごとに対するデータ数',
case 
	when count(store_cd)%2=0 then '偶数'
	else '奇数'
end　as '奇数偶数判定'
from receipt
group by store_cd


with tableA as (
	select 
		amount,
		ROW_NUMBER() over(order by amount) as a,
		ROW_NUMBER() over(order by amount desc) as b
		from receipt
),
tableb as(
		select amount
		from tableA
		where (a = b) or (a+1 = b)
)select avg(cast(amount as float)) as c from tableb;

--29　with as句で作成
with table1 as(
select store_cd,product_cd,count(*) as '数'
from receipt 
group by store_cd,product_cd
--order by store_cd
)
select top 10 store_cd,max(数)
from table1
group by store_cd


select top 10 store_cd,max(数)--サブクエリで作成
from(
	select store_cd,product_cd,count(*) as '数'
from receipt 
group by store_cd,product_cd)as table1
group by store_cd


--30
with table1 as
(select store_cd,avg(amount) as '平均'
	from receipt
	group by store_cd),
table2 as(
select receipt.store_cd,amount,平均,(amount-平均)*(amount-平均)　as '結果'
from receipt 
inner join table1 on receipt.store_cd=table1.store_cd
--order by store_cd
)
select  top 5store_cd,sum(結果)/count(store_cd) as '分散'
from table2
group by store_cd
order by　分散 desc

--31 標準偏差

--32
select top 1 
	PERCENTILE_CONT(0.25) within group(order by amount) over() as '0.25',
	PERCENTILE_CONT(0.50) within group(order by amount) over() as '0.5',
	PERCENTILE_CONT(0.75) within group(order by amount) over() as '0.75',
	PERCENTILE_CONT(1.0) within group(order by amount) over() as '1.0'
from receipt

--33
select store_cd,avg(amount)as '平均'
from receipt
group by store_cd
having avg(amount)>=330

--34
select sum(顧客ごとの合計)/sum(a) as 'No34'
from (select customer_id,sum(amount) as '顧客ごとの合計',1 as a
from receipt
group by customer_id
having customer_id not like 'Z%')as table1

--35
select top 10 customer_id,sum(amount) as 'No35'
from receipt
group by customer_id
having sum(amount)>=(
select sum(顧客ごとの合計)/sum(a) as 'No34'
from (select customer_id,sum(amount) as '顧客ごとの合計',1 as a
from receipt
group by customer_id
having customer_id not like 'Z%') as  table1
);

--36
select top 10 r.*,s.store_name
from receipt r inner join store s on r.store_cd=s.store_cd 


--37
select top 5* from product;
select top 5 * from category;

select top 10 p.*,c.category_small_name
from product p
inner join category c on p.category_major_cd=c.category_major_cd;

--38
select top 10 customer_id,
case 
	when sum(table1.amount) is null then '0'
	else sum(table1.amount)
	end as 'aaa'
from 
(select  c.customer_id,r.amount
from customer c left outer join receipt r on c.customer_id=r.customer_id
where gender_cd=1 and c.customer_id not like 'Z%') as table1
group by table1.customer_id

--39 ？？？？
with ppp as(
select customer_id,count(sales_ymd) as p --売上日数が多い順
from (select distinct customer_id,sales_ymd
from receipt
where customer_id not like 'Z%'
--order by sales_ymd
)as table1
group by customer_id
--order by p desc
),
qqq as (
select customer_id,sum(amount)
from receipt
group by customer_id
having customer_id not like 'Z%'
--order by sum(amount) desc
)
select * 
from ppp outer join qqq on ppp.custmoer_id=qqq.customer_id;


--40
select count(*) 
from store cross join product;

--41
select top 10 sales_ymd,p,lag_a,lag_b,
	p-lag_b
from(select 
	sales_ymd,p,
	lag(sales_ymd,1) over(order by sales_ymd) as lag_a,
	lag(p,1) over(order by sales_ymd) as lag_b
from (select sales_ymd,sum(amount)as p
from receipt
group by sales_ymd
)as table1) as table2

--42
select 
	sales_ymd,amount,
	lag(amount,1) over(order by sales_ymd) as lag_1,
	lag(amount,2) over(order by sales_ymd) as lag_2,
	lag(amount,3) over(order by sales_ymd) as lag_3
from (select sales_ymd,sum(amount) as 'amount'
from receipt 
group by sales_ymd) as table1

--43 大切！！！！！！
drop table sles_summary;

 select age,
	 sum(CASE WHEN gender_cd = '0' THEN amount END) AS '男性',
     SUM(CASE WHEN gender_cd = '1' THEN amount END) AS '女性',
     SUM(CASE WHEN gender_cd = '9' THEN amount END) AS '不明'
	 into sles_summary
 from ( select 
	cast((age/10) as int ) * 10 as 'age',gender_cd,amount
 from customer c inner join  receipt r on c.customer_id=r.customer_id
)as table1
group by age;

select * from sles_summary;
--44
select age,00 as '性別番号',男性 from sles_summary 
union all
select age,01 as '性別番号',女性 from sles_summary 
union all 
select age,00 as '性別番号',不明 from sles_summary 
order by age;

--45
select top 5 customer_id,format(birth_day,'yyyymmdd')
from customer

--46
select top 5 customer_id,convert(varchar(8),application_date)
from customer

--47
select top 5 receipt_sub_no,cast(convert(varchar(8),sales_ymd) as date)
from receipt

--48 ～～ 51 エポック秒の変換、年月日の各自を取り出す問題

--52
select customer_id,sum(amount),
case 
	 when sum(amount)>2000 then '1'
	 else '0'
	 end as '2000以上か以下か'
from receipt 
group by customer_id
having customer_id not like 'Z%'

--53
select customer_id,cast(convert(varchar(3),postal_cd) as int) as p
from customer

with t1 as(
select table1.customer_id,
case when table1.p between 100 and 209 then '1'
else '0'
end as pp
from(select customer_id,cast(convert(varchar(3),postal_cd) as int) as p
from customer
)as table1 ),
t2 as(
select distinct sales_ymd,pp,amount 
from receipt r inner join t1 on r.customer_id=t1.customer_id)
select pp,count(amount)
from t2
group by pp;

--54
select customer_id,address,
case 
 when convert(varchar(7),address) = '埼玉県' then '11' 
 when convert(varchar(7),address) = '千葉県' then '12'
 when convert(varchar(7),address) = '東京都' then '13' 
 when convert(varchar(7),address) = '神奈川' then '14' 
 end as aa
from customer

--55
with table1 as (
select customer_id,sum(amount) as '売上金額'
from receipt
group by customer_id),
table2 as(
select
	customer_id,
	PERCENTILE_CONT(0.25) within group(order by 売上金額) over() as 'a値',
	PERCENTILE_CONT(0.50) within group(order by 売上金額) over() as 'b値',
	PERCENTILE_CONT(0.75) within group(order by 売上金額) over() as 'c値'
from table1
)select top 10 t1.customer_id,t1.売上金額,
case 
	when 売上金額 <= t2.a値 then '1'
	when 売上金額 between t2.a値 and t2.b値 then '2'
	when 売上金額 between t2.b値 and t2.c値 then '3'
	else '4'	
	end as 'aaaa'
from table1 t1 left outer join  table2  t2 on t1.customer_id=t2.customer_id
order by customer_id


--56
with table1 as(
select customer_id,format(birth_day,'yyyy-mm-dd') as 'birth_day',(age/10) *10 as '年齢'
from customer)
select table1.customer_id,table1.birth_day,
case 
	when 年齢  >=60 then '60'
	else 年齢
	end as '年齢'
from table1 
--where table1.customer_id ='CS001105000001';

--57


--58
select customer_id,
case when gender_cd=0 then '1' else '0' end as gander_cd_0,
case when gender_cd=1 then '1' else '0' end as gander_cd_1,
case when gender_cd=9 then '1' else '0' end as gander_cd_9
from customer

--59


--63
select top 10 product_cd,unit_price,unit_cost,cast((unit_price-unit_cost) as varchar)+'円' as '利益額'
from product;

--64
select  
avg((unit_price*1.0 - unit_cost)/unit_price) as "a"
from product

--65
select top 10 * ,(new_price-unit_cost)/new_price as "a"
from 
(select product_cd,unit_price,unit_cost,
floor(unit_cost/0.7) as "new_price" --floor関数、整数切り捨て
from product)  as new_table1

-- ～67まで、丸め方を変えるだけ。

--68
select * ,
floor(unit_price*1.1) as "a"
from product

--69
select top 10 * from receipt;
select top 10 * from product;

select  r.customer_id,p.category_major_cd,avg(amount) as "合計金額"
from receipt r inner join  product p on r.product_cd=p.product_cd
and category_major_cd=7
group by r.customer_id,p.category_major_cd
order by r.customer_id

select customer_id,avg(amount) as "全合計金額"
from receipt
group by customer_id

select table1.customer_id,table1.全合計金額,table2.合計金額,
合計金額*1.0/全合計金額 as 'b' --*1.0する事で、double型に変換しています
from (select customer_id,sum(amount) as "全合計金額"
from receipt
group by customer_id) as table1 inner join 
(select  r.customer_id,p.category_major_cd,avg(amount) as "合計金額"
from receipt r inner join  product p on r.product_cd=p.product_cd
and category_major_cd=7
group by r.customer_id,p.category_major_cd) as table2 on table1.customer_id=table2.customer_id
