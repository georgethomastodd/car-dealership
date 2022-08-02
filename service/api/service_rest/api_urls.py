from django.urls import path

from .api_views import (api_list_appointments, api_appointment_details, api_list_technicians, api_technician_details, api_list_appointments_by_vin)

urlpatterns = [
    path("appts/", api_list_appointments, name="api_list_appointments"),
    path("techs/", api_list_technicians, name="api_list_technicians"),
    # path(
    #     "conferences/<int:conference_vo_id>/attendees/",
    #     api_list_attendees,
    #     name="api_list_attendees",
    # ),
    path("appts/<int:pk>/", api_appointment_details, name="api_show_appt"),
    path("byvin/<str:vin>/", api_list_appointments_by_vin, name="api_list_apptbyvin"),
    path("techs/<int:pk>/", api_technician_details, name="api_show_tech"),
]
