from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet
from .views import create_person

router = DefaultRouter()
router.register(r'person2',ProductViewSet)

urlpatterns = [
     path('person/', create_person, name='create_person'),
    path('',include(router.urls)),

]
