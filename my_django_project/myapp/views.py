from django.shortcuts import render
from .models import Person
from rest_framework import viewsets
from .serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
from .serializers import PersonSerializer
from django.http import JsonResponse





class ProductViewSewt(viewsets.ModelViewSet):
    queryset=Person.objects.all()
    serializer_class=ProductSerializer
    
    
@api_view(['POST'])
def create_person(request):
    if request.method == 'POST':
        print("Received data:", json.dumps(request.data, indent=4))
        serializer = PersonSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])   
def create_person(request):
    print(request.GET)
    if request.method=='GET':
        name = request.GET.get('name', None)
        min_age = request.GET.get('minage',None) 
        max_age = request.GET.get('maxage', None)
        gender = request.GET.get('gender', None)
        queryset = Person.objects.all()
        
        if min_age == '': #どうしても空文字が入ってしまうと処理できなかったため
            min_age = None  #空文字列" "とNoneは区別される
        if max_age =='':
            max_age=None
        
        if name:
            queryset=queryset.filter(name__contains=name) #name_cobtain,age_gte以外にもフィルタはたくさんある
        
        
        if min_age is not None and max_age is not None:
            queryset = queryset.filter(age__gte=min_age, age__lte=max_age)
        elif min_age is not None:
            queryset = queryset.filter(age__gte=min_age)
        elif max_age is not None:
            queryset = queryset.filter(age__lte=max_age)

        if gender:
            queryset = queryset.filter(gender=gender)
            

        serializer = PersonSerializer(queryset, many=True)
    return Response(serializer.data)


        