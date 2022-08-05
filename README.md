# CarCar

Team:

* Boden Bradley - Service
* Nikansha Maharaj - Sales

INSTALLATION & USE: 
-Fork and clone from git
-Run docker-compose build followed by docker-compose up
-Run migrations as necessary for service, sales, and inventory containers
-Open localhost:3000 in the browser to view react front end 
-If errors occur while trying to submit a form after migrations re-building/composing up with docker is recommended
-Open localhost:3000 in the browser to view react front end 

## Design

https://excalidraw.com/#room=5b5873ffb640630aabfb,XBWCq0PX9vwXcAT7wQ02zw

## Service microservice

Create Models:
    ServiceAppointment Model
        -with fields: owner, appt_datetime, reason, vip, completed, technician (FK to Technician model), and vin.
    Automobile VO Model (value object)
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

The Inventory models are Manufacturer, VehicleModel, and Automobile.
For Sales I created four models:

1. An Automobile VO model since I needed the vin number from each automobile. Since the Inventory API sits in a different microservice, I need to be able to access the vin property for this model through polling for data in order to check if any new cars have been added to the database and have not yet been sold. I used the vin as the unique key to keep track of each automobile sold so that one automobile (which is assigned one vin) is only sold once. From the sales team side using the vin makes more sense rather than remembering which car and vin was assigned to which id number.

2. The SalesRep model is used to create new sales employees so that they can be assigned to each sale they make. If this was a real dealership, we'd want to be able to keep track of sales history and how much revenue each employee generates.

3. The Customer model is used to keep track of potential customers so sales representatives can follow up on leads, for example, if someone visits the dealership or joins a mailing list. As a dealership and even as a sales representative, you'd want to track conversion rates, basically the number of potential customers who turned into buying customers.

4. Lastly, the Sales Record Model records the actual sales being made, if this was a real dealership, this would allow us to again, track customer conversion rates, to track which sales representatives are meeting their sales quota or those who are really good at selling. We're also able to track which automobiles are selling which can help drive business decisions if we realize that a certain make/model sells faster than others. The Sales Record has foreign key relationships to the AutomobileVO model, the SalesRep model, and the Customer model.
