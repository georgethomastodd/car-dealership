from django.urls import path, include

from .views import (
    api_list_customers,
    api_list_sales_reps,
)


urlpatterns = [
    path("customers/", api_list_customers, name="api_list_customers"),
    path("salesreps/", api_list_sales_reps, name="api_list_sales_reps"),
]