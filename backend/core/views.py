from rest_framework import viewsets
from .models import Brand, Founder
from .serializers import BrandSerializer, FounderSerializer

class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class FounderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Founder.objects.all()
    serializer_class = FounderSerializer
