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
    # get list of customers
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    
    # otherwise, create a customer
    else: #POST
        content = json.loads(request.body)
        print(content)

        new_customer = Customer.objects.create(**content)
        return JsonResponse(
            new_customer, 
            encoder = CustomerEncoder,
            safe=False,
        )


# SALES REP
@require_http_methods(["GET", "POST"])
def api_list_sales_reps(request):
    # get list of sales reps
    if request.method == "GET":
        sales_reps = SalesRep.objects.all()
        return JsonResponse(
            {"sales_reps": sales_reps},
            encoder=SalesRepEncoder,
        )
    
    # otherwise, create a sales rep
    else: #POST
        content = json.loads(request.body)
        print(content)

        sales_reps = SalesRep.objects.create(**content)
        return JsonResponse(
            sales_reps, 
            encoder = SalesRepEncoder,
            safe=False,
        )


# SALES RECORD
