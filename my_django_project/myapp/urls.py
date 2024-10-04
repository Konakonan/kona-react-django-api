from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSewt
from .views import create_person

router = DefaultRouter()
router.register(r'person',ProductViewSewt)

urlpatterns = [
    path("",include(router.urls)),
     path('api/person/', create_person, name='create_person')
]
