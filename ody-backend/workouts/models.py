from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    #photo = models.ImageField(upload_to='lift_photos/', null=True, blank=True)

    def __str__(self):
        return self.description
    
class Exercise(models.Model):
    name = models.CharField(max_length = 60)
    
class Lift(Exercise):
    weight = models.DecimalField(max_digits=5, decimal_places = 1)
    reps = models.IntegerField()
    #superset = models.ForeignKey(Exercise, on_delete=models.CASCADE)

class FreeformAerobic(Exercise):
    distance = models.DecimalField(max_digits=5, decimal_places = 2)
    duration = models.DecimalField(max_digits=7, decimal_places = 3)

class Run(FreeformAerobic):
    pass

class Swim(FreeformAerobic):
    STROKES = {
        'FR': 'Freestyle',
        'BK': 'Backstroke',
        'BR': 'Breaststroke',
        'FL': 'Butterfly'
    }
    stroke = models.CharField(max_length = 2, choices = STROKES.items())
    

