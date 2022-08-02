from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

class Technician(models.Model):
    name = models.CharField(max_length=200)
    emp_id = models.CharField(max_length=200)

class ServiceAppointment(models.Model):
    owner = models.CharField(max_length=200)
    appt_datetime = models.DateTimeField(null=True)
    reason = models.TextField()
    vip = models.BooleanField(default=False, null=True)
    completed = models.BooleanField(default=False, null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    ) 
    vin = models.CharField(max_length=17, null=True)