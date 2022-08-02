# CarCar

Team:

* Boden Bradley - Service
* Nikansha Maharaj - Sales

## Design

## Service microservice

Create Models:
    ServiceAppointment Model
        -with fields: owner, appt_datetime, reason, vip, completed, technician (FK to Technician model), and vin.
    Automobile VO Model
        -with field: vin.
    Technician Model
        -with fields: name, emp_id.

(These were created using ubiquitous language. Variables, names, and properties are named appropriatly in line with the automotive industry.  These models are part of a bounded context (BC) and form what we call the 'service" BC or service microservice.  Initially we polled the Automobile model for more fields than just "vin" but realized we only need to use vin in this microservice so that was trimmed.)

Create Views/API Interface/URLs:
    -appointments:  list, detail, create, update, and delete. 
    -technician: list, detail, create, update, and delete. 

(For our MVP only certain view funcitonality was required, however we added full capability if/when that functionaly could be needed for the application.  Added functionality added to create appointment to check submitted vin against vin in AutomobileVO and if it exists set 'VIP' to true.)

Add Polling Function:
    -create poling function in polling microservice to copy Automobile model 'vin' data to AutomobileVO.

Test insomnia functions:
    -tested: list, create, details, update, and delete functions for all views to make sure api is functioning properly before designing front-end framework.

React Front End:
    Appointments List page:
        -lists all active appointments in a table with categories closely matching the ServiceAppointment model.
        -functionally added to cancel/delete an appointment or 'finish' an appointment which takes it off the active list but it remains saved in the database.
        -
    Appointments by vin:
        -lists all appointments (whether active or inactive) filtered by vin number.
        -user can search a vin number and the list populates the appropriate response. 
    New Technician Form:
        -allows user to create a new technician with which will then be saved in the database, fields include:  name and employee id.
    New Appointment Form:
        -allows a user to create a new appointment which will be saved in the database and be available to populate the list pages.  
        -functionality written in view so that if a submitted VIN matches an AutomobileVO vin "VIP" becomes true so the user knows if an owner purchased a vehicle from our inventory.


## Sales microservice

Explain your models and integration with the inventory
microservice, here.
