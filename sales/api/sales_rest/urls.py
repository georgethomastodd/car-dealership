from django.urls import path, include

from .views import (
    api_list_customers,
    api_list_sales_reps,
    api_list_sales_records,
    api_show_sale_record,
)


urlpatterns = [
    path("customers/", api_list_customers, name="create_customer"),
    path("salesreps/", api_list_sales_reps, name="create_sales_reps"),
    path("salesrecord/", api_list_sales_records, name="create_sales_record"),
    path("salesrecord/<int:pk>/", api_show_sale_record, name="edit_sales_record"),
]