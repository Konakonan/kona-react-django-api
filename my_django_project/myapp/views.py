from django.shortcuts import render
from .models import Person
from rest_framework import viewsets
from .serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status



class ProductViewSewt(viewsets.ModelViewSet):
    queryset=Person.objects.all()
    serializer_class=ProductSerializer
    
    
@api_view(['POST'])
def create_person(request):
    if request.method=='POST':
        print(request.data)
        return Response({"message": "Data received"}, status=200)
    