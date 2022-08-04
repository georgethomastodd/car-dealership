from django.db import models

# Create your models here.


# AutomobileVO
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField(null=True, blank=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


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


# Sales Record
class SalesRecord(models.Model):
    price = models.CharField(max_length= 10, null=True, blank=True)

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.PROTECT,
    )

    sales_rep = models.ForeignKey(
        SalesRep,
        related_name="sales_rep",
        on_delete=models.PROTECT,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"{self.automobile}, Sales Rep:{self.sales_rep}"