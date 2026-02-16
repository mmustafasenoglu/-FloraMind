from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Condition
from .serializers import ConditionSerializer

class ConditionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Condition.objects.all()
    serializer_class = ConditionSerializer
    lookup_field = 'slug'

    @action(detail=True, methods=['post'])
    def feedback(self, request, slug=None):
        condition = self.get_object()
        vote = request.data.get('vote')
        
        if vote == 'up':
            condition.upvotes += 1
            condition.save(update_fields=['upvotes'])
            return Response({
                'status': 'success',
                'message': 'Teşekkürler! Geri bildiriminiz kaydedildi.',
                'upvotes': condition.upvotes,
                'downvotes': condition.downvotes,
            })
        elif vote == 'down':
            condition.downvotes += 1
            condition.save(update_fields=['downvotes'])
            return Response({
                'status': 'success',
                'message': 'Teşekkürler! Geri bildiriminiz kaydedildi.',
                'upvotes': condition.upvotes,
                'downvotes': condition.downvotes,
            })
        else:
            return Response(
                {'error': 'vote parametresi "up" veya "down" olmalıdır.'},
                status=status.HTTP_400_BAD_REQUEST
            )

from rest_framework.views import APIView
from .rag_service import RAGService

class CheckSymptomView(APIView):
    def post(self, request):
        symptom_text = request.data.get('symptoms')
        if not symptom_text:
            return Response({"error": "Semptom bilgisi gerekli."}, status=status.HTTP_400_BAD_REQUEST)
        
        service = RAGService()
        result = service.diagnose(symptom_text)
        
        return Response(result)
