from common.json import ModelEncoder
from .models import SalesRep, Customer, AutomobileVO, SalesRecord

class SalesRepEncoder(ModelEncoder):
    model = SalesRep
    properties = [
        "id",
        "name",
        "employee_number",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "sold",
        "sales_rep",
    ]
    encoders = {
        "sales_rep": SalesRepEncoder(),
    }

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "id",
        "price",
        "auto_vo",
        "sales_rep",
        "customer",
    ]
    encoders = {
        "auto_vo": AutomobileVOEncoder(),
        "sales_rep": SalesRepEncoder(),
        "customer": CustomerEncoder(),
    }