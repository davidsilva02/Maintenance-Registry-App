from django.db import models

# Create your models here.

class Register(models.Model):

    RegisterId=models.AutoField(primary_key=True)
    RegisterDate=models.DateField(auto_now=True)
    RegisterBackup=models.BooleanField()
    RegisterObservations=models.TextField(max_length=2548,null=True)