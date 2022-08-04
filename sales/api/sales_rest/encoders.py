from common.json import ModelEncoder
from .models import SalesRep, Customer, AutomobileVO, SalesRecord


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        # "id",
        "import_href", 
        "vin",
        "sold",
    ]


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


class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        # "id",
        "price",
        "automobile",
        "sales_rep",
        "customer",
    ]
    def get_extra_data(self, o):
        return {"auto": o.automobile.vin, "sales rep": o.sales_rep.name, 
        "customer": o.customer.name}
    
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_rep": SalesRepEncoder(),
        "customer": CustomerEncoder(),
    }


