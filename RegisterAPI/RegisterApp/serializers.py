from rest_framework import serializers
from RegisterApp.models import Register,SpecificFunction

'''
Serializer of Register
'''
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Register
        fields=("RegisterId","RegisterDate","RegisterBackup","RegisterObservations")



'''
Serializer of SpecifFunctionModel
'''
class SfSerializer(serializers.ModelSerializer):
    class Meta:
        model=SpecificFunction
        fields=("SFId","SFTitle","SFDescription")
