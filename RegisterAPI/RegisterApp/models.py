from django.db import models

'''
Model of Register
RegisterId - Id of Register
RegisterDate - Date of Register
RegisterBackup - YES/NO Backup
RegisterObservations - Observations of Register
'''
class Register(models.Model):

    RegisterId=models.AutoField(primary_key=True)
    RegisterDate=models.DateField(auto_now=True)
    RegisterBackup=models.BooleanField()
    RegisterObservations=models.TextField(max_length=2548,null=True)

'''
Model of Specific Funcion
SfId - Id of SF
SfTitle - Title of SF
SfDescription - Description of SF
'''
class SpecificFunction(models.Model):
    SFId=models.AutoField(primary_key=True)
    SFTitle=models.TextField(max_length=2548,null=False)
    SFDescription=models.TextField(max_length=5000,null=True)