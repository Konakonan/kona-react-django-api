from django.shortcuts import render
from .models import Person
from rest_framework import viewsets
from .serializers import ProductSerializer

class ProductViewSewt(viewsets.ModelViewSet):
    queryset=Person.objects.all()
    serializer_class=ProductSerializer