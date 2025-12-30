from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BrandViewSet, FounderViewSet

router = DefaultRouter()
router.register(r'brands', BrandViewSet)
router.register(r'founders', FounderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
