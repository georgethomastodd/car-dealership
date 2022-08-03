from django.contrib import admin
from .models import AutomobileVO, SalesRecord, SalesRep, Customer

# Register your models here.

class AutomobileVOAdmin(admin.ModelAdmin):
    pass

class SalesRecordAdmin(admin.ModelAdmin):
    pass

class SalesRepAdmin(admin.ModelAdmin):
    pass

class CustomerAdmin(admin.ModelAdmin):
    pass


admin.site.register(AutomobileVO, AutomobileVOAdmin)
admin.site.register(SalesRecord, SalesRecordAdmin)
admin.site.register(SalesRep, SalesRepAdmin)
admin.site.register(Customer, CustomerAdmin)