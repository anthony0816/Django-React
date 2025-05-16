from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default= 1)
    title = models.CharField( max_length=50)
    description = models.TextField(blank= True)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.title