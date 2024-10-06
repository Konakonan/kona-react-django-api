from rest_framework import serializers
from .models import Person
from django.db.models import Max


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Person
        fields='__all__'   
        
        
class PersonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False,allow_null=True) #ユニークキーだがバリエーションを通過できないためnullまたはidフィールドがなくても許容
    
    class Meta:
        model=Person
        fields=['id','name','age','gender','address']
    
    def validate(self, attrs): #バリエーションチェック
        if 'id' not in attrs or attrs['id'] is None:
            attrs['id'] = self.generate_unique_id() 
        return attrs
    
    def generate_unique_id(self): #ユニークなidを生成
        max_id = Person.objects.aggregate(Max('id'))['id__max']
        return (max_id + 1) if max_id is not None else 1
    
    def create(self, validated_data): #idを含む新たなモデルを生成
        return super().create(validated_data)
    