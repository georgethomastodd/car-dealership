# CarCar

Team:

* Boden - Service
* Nikansha - Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

The Inventory models are Manufacturer, VehicleModel, and Automobile. 

In the Sales Model I created an Automobile VO since I needed the vin number from each automobile. The vin is a unique key used to keep track of each automobile sold so that one automobile (which is assigned one vin) is only sold once. From the sales team side using the vin makes more sense rather than remembering which car and vin was assigned to which id number. 
