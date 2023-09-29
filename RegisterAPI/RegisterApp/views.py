from django.http import FileResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import os

from RegisterApp.models import Register
from RegisterApp.serializers import RegisterSerializer
from create_pdf import create_pdf
# Create your views here.

@csrf_exempt
def registerAPI(request,id=0):
    if request.method == 'GET':
        if(id==0):
            all_regists=Register.objects.all().order_by('-RegisterId')
            registers_serializer=RegisterSerializer(all_regists,many=True)
            return JsonResponse(registers_serializer.data,safe=False)
        else:
            register=Register.objects.get(RegisterId=id)
            registers_serializer=RegisterSerializer(register,many=False)
            return JsonResponse(registers_serializer.data,safe=False)
    elif request.method=='POST':
        register_data=JSONParser().parse(request)
        registers_serializer=RegisterSerializer(data=register_data)
        if registers_serializer.is_valid():
            obj=registers_serializer.save()
            return JsonResponse({
                'RegisterDate':obj.RegisterDate,
                'RegisterId':obj.RegisterId
            },safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        register_data=JSONParser().parse(request)
        register=Register.objects.get(RegisterId=register_data['RegisterId'])
        registers_serializer=RegisterSerializer(register,data=register_data)
        if registers_serializer.is_valid():
            registers_serializer.save()
            return JsonResponse("Update Successfuly",safe=False)
        return JsonResponse("Failed to Update",safe=False)
    elif request.method=='DELETE':
        try:
            register=Register.objects.get(RegisterId=id)
            register.delete()
            return JsonResponse("Deleted Successfully",safe=False)
        except Register.DoesNotExist:
            return JsonResponse("Fail Deleted",safe=False)
def registerPrint(request,id=0,test=0):
    if request.method=="GET":
        print(f'ID=>{id}\nTEST=>{test}')
        try:
            for i in os.listdir():
                igual=True;
                input="relatorio_"
                for c in range(len(input)):
                    if(input[c]!=i[c]): 
                        igual=False
                        break
                
                if igual:
                    os.remove(i)

            register=Register.objects.get(RegisterId=id)
            register_data=RegisterSerializer(register).data
            register_data['RegisterObservations']=register_data['RegisterObservations'].replace('\n', '<br />')

            file=create_pdf(register_data)
            return FileResponse(open(file, 'rb'), as_attachment=True, content_type='application/pdf')
        except Register.DoesNotExist:
            return JsonResponse("Fail Deleted",safe=False)

        
