from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, ServiceAppointment

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "emp_id",
        "id",
        ]

class ServiceAppointmentListEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "owner",
        "appt_datetime",
        "reason",
        "technician",
        "vin",
        "id",
        "vip",
        "completed"
        ]
    encoders = {
        "technician" : TechnicianEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()

        return JsonResponse(
            {"appointments": appointments},
            encoder=ServiceAppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)  
        if AutomobileVO.objects.filter(vin=content["vin"]).exists():
            content["vip"] = True


        try:
            if "technician" in content:
                technician = Technician.objects.get(name=content["technician"])
                content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician name"},
                status=400,
            )

        appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentListEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_appointment_details(request, pk):
    if request.method == "GET":
        appointment = ServiceAppointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = ServiceAppointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)

        # if content["vin"]:
        #     if AutomobileVO.objects.filter(vin=content["vin"]).exists():
        #         content["vip"] = True

        try:
            if "technician" in content:
                technician = Technician.objects.get(name=content["technician"])
                content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician name"},
                status=400,
            )
        ServiceAppointment.objects.filter(id=pk).update(**content)
        appointment = ServiceAppointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentListEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def api_list_appointments_by_vin(request, vin):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.filter(vin=vin)
        print(appointments)
        return JsonResponse(
            {"appointments": appointments},
            encoder=ServiceAppointmentListEncoder,
        )

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()

        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)

        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_technician_details(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)

        Technician.objects.filter(id=pk).update(**content)
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=ServiceAppointmentListEncoder,
            safe=False,
        )