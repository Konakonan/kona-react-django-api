from django.db import models


class TestModel1(models.Model):
    name=models.CharField(max_length=100)
    
    
class Person(models.Model):
    id = models.PositiveIntegerField(primary_key=True) 
    name = models.CharField(max_length=100)  
    age = models.PositiveIntegerField()       
    gender = models.CharField(max_length=1, choices=[
        ('M', '男性'),
        ('F', '女性'),
        ('O', 'その他'),
    ])  
    address = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
     
    # def save(self, *args, **kwargs):
    #     if not self.id:  # idが未設定の場合
    #         last_id = Person.objects.aggregate(max('id'))['id__max']  # 最大IDを取得
    #         self.id = 1 if last_id is None else last_id + 1  # IDを設定
    #     super().save(*args, **kwargs)
        
    #     def __str__(self):
    #         return f'{self.name} ({self.age}歳, {self.get_gender_display()})'
