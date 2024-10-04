from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSewt

router = DefaultRouter()
router.register(r'person',ProductViewSewt)

urlpatterns = [
    path("",include(router.urls)),
]
