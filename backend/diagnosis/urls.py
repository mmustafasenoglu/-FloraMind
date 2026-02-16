from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ConditionViewSet, CheckSymptomView

router = DefaultRouter()
router.register(r'conditions', ConditionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('check-symptom/', CheckSymptomView.as_view(), name='check-symptom'),
]
