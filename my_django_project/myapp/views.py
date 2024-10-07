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
    if request.method=='GET':
        query = request.GET.get('query', '')
        results = Person.objects.filter(name__icontains=query) 
        data = [{'name': result.name} for result in results]  
    return JsonResponse(data, safe=False)
        