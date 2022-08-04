from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import SalesRep, Customer, AutomobileVO, SalesRecord
from .encoders import (
    SalesRepEncoder,
    CustomerEncoder,
    AutomobileVOEncoder,
    SalesRecordEncoder,
)

# Create your views here.


# CUSTOMER
@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    
    else: #POST
        try: 
            content = json.loads(request.body)
            print(content)

            new_customer = Customer.objects.create(**content)
            return JsonResponse(
                new_customer, 
                encoder = CustomerEncoder,
                safe=False,
            )
        except: 
            response = JsonResponse({"MESSAGE": "Unable to create customer."})
            response.status_code = 400
            return response


# SALES REP
@require_http_methods(["GET", "POST"])
def api_list_sales_reps(request):
    if request.method == "GET":
        sales_reps = SalesRep.objects.all()
        return JsonResponse(
            {"sales_reps": sales_reps},
            encoder=SalesRepEncoder,
        )
    
    else: #POST
        try: 
            content = json.loads(request.body)
            print(content)

            new_sales_rep = SalesRep.objects.create(**content)
            return JsonResponse(
                new_sales_rep, 
                encoder = SalesRepEncoder,
                safe=False,
            )
        except: 
            response = JsonResponse({"MESSAGE": "Unable to create sales rep."})
            response.status_code = 400
            return response



# SALES RECORD
@require_http_methods(["GET", "POST"])
def api_list_sales_records(request):
    if request.method == "GET":
        # get a list of all sales
        sales_records = SalesRecord.objects.all()
        # print(sales_records)
        return JsonResponse(
            {"all_sales_records": sales_records},
            encoder=SalesRecordEncoder,
        )
    
    # if we want to create a new sale record
    else: #POST
        content = json.loads(request.body)
        # print(content)
        try:
            automobile_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content["automobile"] = automobile
            print("!!!!!!!!!!! automobile !!!!!!!!!!!!!!", content)

            sales_rep_id = content["sales_rep"]
            sales_rep = SalesRep.objects.get(id=sales_rep_id)
            content["sales_rep"] = sales_rep
            print("$$$$$$$$$$$ sales_rep $$$$$$$$$$$", content)

            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
            print("******* customer *************", content)

            new_sales_record = SalesRecord.objects.create(**content)
            return JsonResponse(
                new_sales_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        
        # errors will be stored in the letter e
        except Exception as e:
            response = JsonResponse ({"MESSAGE": e})
            response.status_code = 400
            return response 
