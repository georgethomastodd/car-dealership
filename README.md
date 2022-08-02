# CarCar

Team:

* Boden Bradley - Service
* Nikansha Maharaj - Sales

## Design

## Service microservice

Create Models:
    ServiceAppointment Model
        -with fields: owner, appt_datetime, reason, vip, completed, technician (FK to Technician model), and vin
    Automobile VO Model
        -with fields: vin, year, color 
    Technician Model
        -with fields: name, emp_id

(These were created using ubiquitous language. Variables, names, and properties are named appropriatly in line with the automotive industry.  These models are part of a bounded context (BC) and form what we call the 'service" BC or service microservice)

Create Views/API Interface:
    -list hats, create hats, delete hats
Add Polling Function:
    -create poling function in polling microservice to copy Location model data to LocationVO
Test insomnia functions:
    -test create, delete, list functions and create items in location before adding hats 
React Front End:
    -hat list and hat create pages made to fetch appropriate data from localhost 
    -create form made with drop down list of locations
    -list form made with delete button that uses the delete view to remove a hat 
    -nav links routed 

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
