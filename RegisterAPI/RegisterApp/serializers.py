from rest_framework import serializers
from RegisterApp.models import Register

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Register
        fields=("RegisterId","RegisterDate","RegisterBackup","RegisterObservations")