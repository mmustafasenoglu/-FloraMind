from django.db import models

class Condition(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    
    # ACİL EYLEM (HAREKET/POZİSYON)
    emergency_action_title = models.CharField(max_length=200, default="ACİL EYLEM")
    emergency_action_steps = models.JSONField() # List of steps
    
    # MUTFAK ECZANESİ (KANITLI BESİNLER)
    kitchen_pharmacy = models.JSONField() # List of {food, mechanism}
    
    # YASAK BÖLGE (TETİKLEYİCİLER)
    forbidden_zone = models.JSONField() # List of gıda/davranış
    
    # BİLİMSEL KÖŞE (MEKANİZMA)
    scientific_corner_text = models.TextField()
    
    # Feedback counts
    upvotes = models.PositiveIntegerField(default=0)
    downvotes = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class MedicalArticle(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    embedding = models.JSONField()  # Stores vector as a list of floats

    def __str__(self):
        return self.title
