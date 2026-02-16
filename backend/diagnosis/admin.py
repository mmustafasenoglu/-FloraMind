from django.contrib import admin
from .models import Condition


@admin.register(Condition)
class ConditionAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'upvotes', 'downvotes', 'feedback_ratio', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('upvotes', 'downvotes', 'created_at')
    
    fieldsets = (
        ('Temel Bilgiler', {
            'fields': ('name', 'slug')
        }),
        ('1. ACİL EYLEM (HAREKET/POZİSYON)', {
            'fields': ('emergency_action_title', 'emergency_action_steps'),
            'description': 'JSON formatında adımlar listesi. Örnek: ["Adım 1", "Adım 2"]'
        }),
        ('2. MUTFAK ECZANESİ (KANITLI BESİNLER)', {
            'fields': ('kitchen_pharmacy',),
            'description': 'JSON formatında besin listesi. Örnek: [{"food": "Kimyon", "mechanism": "Açıklama"}]'
        }),
        ('3. YASAK BÖLGE (TETİKLEYİCİLER)', {
            'fields': ('forbidden_zone',),
            'description': 'JSON formatında tetikleyici listesi. Örnek: ["Tetikleyici 1", "Tetikleyici 2"]'
        }),
        ('4. BİLİMSEL KÖŞE (MEKANİZMA)', {
            'fields': ('scientific_corner_text',),
        }),
        ('📊 Geri Bildirim İstatistikleri', {
            'fields': ('upvotes', 'downvotes', 'created_at'),
            'classes': ('collapse',),
        }),
    )

    def feedback_ratio(self, obj):
        total = obj.upvotes + obj.downvotes
        if total == 0:
            return '—'
        ratio = (obj.upvotes / total) * 100
        if ratio >= 70:
            return f'👍 %{ratio:.0f} ({total} oy)'
        elif ratio >= 40:
            return f'➖ %{ratio:.0f} ({total} oy)'
        else:
            return f'👎 %{ratio:.0f} ({total} oy)'
    feedback_ratio.short_description = 'Memnuniyet'
