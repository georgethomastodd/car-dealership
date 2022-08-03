from django.db import models

# Create your models here.


# Sales Rep Model
class SalesRep(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return f"{self.name } #{self.employee_number}"


# Potential Customer Model
class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(unique=True, max_length=10)

    def __str__(self):
        return self.name


# AutomobileVO
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, blank=True, null=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    sales_rep = models.ForeignKey(
        SalesRep,
        related_name="automobile_vos",
        on_delete=models.PROTECT,
    )
    
    def __str__(self):
        return self.vin


# Sales Record
class SalesRecord(models.Model):
    price = models.FloatField(null=False, blank=False)

    auto_vo = models.ForeignKey(
        AutomobileVO,
        related_name="sales_records",
        on_delete=models.PROTECT,
    )

    sales_rep = models.ForeignKey(
        SalesRep,
        related_name="sales_records",
        on_delete=models.PROTECT,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="customers",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"{self.auto_vo}, Sales Rep:{self.sales_rep}"