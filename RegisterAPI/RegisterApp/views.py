from django.http import FileResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import os

from RegisterApp.models import Register,SpecificFunction
from RegisterApp.serializers import RegisterSerializer,SfSerializer
from create_pdf import create_pdf_register,create_pdf_SF
# Create your views here.

'''
API of Register

GET /register
All registers DES

GET /register/<id>
Details of Register

POST /register
Save all data of register
Insert new register


PUT /register/<id>
Update of register

DELETE /register/<id>
Delete Register
'''
@csrf_exempt
def registerAPI(request,id=0):
    if request.method == 'GET':
        #GET /register
        if(id==0):
            all_regists=Register.objects.all().order_by('-RegisterId')
            registers_serializer=RegisterSerializer(all_regists,many=True)
            return JsonResponse(registers_serializer.data,safe=False)
        #GET /register/<id>
        else:
            register=Register.objects.get(RegisterId=id)
            registers_serializer=RegisterSerializer(register,many=False)
            return JsonResponse(registers_serializer.data,safe=False)
    
    #POST /register
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
    
    
    #PUT /register/<id>
    elif request.method=='PUT':
        register_data=JSONParser().parse(request)
        register=Register.objects.get(RegisterId=register_data['RegisterId'])
        registers_serializer=RegisterSerializer(register,data=register_data)
        if registers_serializer.is_valid():
            registers_serializer.save()
            return JsonResponse("Update Successfuly",safe=False)
        return JsonResponse("Failed to Update",safe=False)

    #DELETE /register/<id>
    elif request.method=='DELETE':
        try:
            register=Register.objects.get(RegisterId=id)
            register.delete()
            return JsonResponse("Deleted Successfully",safe=False)
        except Register.DoesNotExist:
            return JsonResponse("Fail Deleted",safe=False)


'''
Print details of register
'''
def registerPrint(request,id=0,test=0):
    # /GET /register/print/<id>
    if request.method=="GET":
        #print(f'ID=>{id}\nTEST=>{test}')

        #Verify and delete if exists report
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

            file=create_pdf_register(register_data)
            return FileResponse(open(file, 'rb'), as_attachment=True, content_type='application/pdf')
        except Register.DoesNotExist:
            return JsonResponse("Fail Deleted",safe=False)




'''
API of SF

GET /specific-function
All SF DES

GET /specific-function/<id>
Details of SF

POST /specific-function
Save all data of SF
Insert new SF


PUT /specific-function/<id>
Update of SF

DELETE /specific-function/<id>
Delete SF
'''
@csrf_exempt
def SFAPI(request,id=0):
    if request.method == 'GET':
        #GET /register
        if(id==0):
            all_sf=SpecificFunction.objects.all().order_by('-SFId')
            SF_serializer=SfSerializer(all_sf,many=True)
            return JsonResponse(SF_serializer.data,safe=False)
        
        #GET /register/<id>
        else:
            sf=SpecificFunction.objects.get(SFId=id)
            SF_serializer=SfSerializer(sf,many=False)
            return JsonResponse(SF_serializer.data,safe=False)
    
    #POST /register
    elif request.method=='POST':
        sf_data=JSONParser().parse(request)
        SF_serializer=SfSerializer(data=sf_data)
        if SF_serializer.is_valid():
            obj=SF_serializer.save()
            return JsonResponse({
                'SFId':obj.SFId
            },safe=False)
        return JsonResponse("Failed to Add",safe=False)
    
    
    #PUT /register/<id>
    elif request.method=='PUT':
        sf_data=JSONParser().parse(request)
        sf=SpecificFunction.objects.get(SFId=sf_data['SFId'])
        SF_serializer=SfSerializer(sf,data=sf_data)
        if SF_serializer.is_valid():
            SF_serializer.save()
            a=JsonResponse("Update Successfuly",safe=False)
            print(a)
            return a
        b=JsonResponse("Failed to Update",safe=False)
        print(b)
        return b

    #DELETE /register/<id>
    elif request.method=='DELETE':
        try:
            sf=SpecificFunction.objects.get(SFId=id)
            sf.delete()
            return JsonResponse("Deleted Successfully",safe=False)
        except Register.DoesNotExist:
            return JsonResponse("Fail Deleted",safe=False)


'''
Print details of SF
'''
def SFPrint(request,id=0,test=0):
    #/GET /register/print/<id>
    if request.method=="GET":
        #print(f'ID=>{id}\nTEST=>{test}')

        #Verify and delete if exists SF
        try:
            for i in os.listdir():
                igual=True;
                input="sf_"
                for c in range(len(input)):
                    if(input[c]!=i[c]): 
                        igual=False
                        break
                if igual:
                    os.remove(i)

            sf=SpecificFunction.objects.get(SFId=id)
            sf_data=SfSerializer(sf).data
            sf_data['SFDescription']=sf_data['SFDescription'].replace('\n', '<br />')

            file=create_pdf_SF(sf_data)
            return FileResponse(open(file, 'rb'), as_attachment=True, content_type='application/pdf')
        except Register.DoesNotExist:
            return JsonResponse("Fail Deleted",safe=False)
