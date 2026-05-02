# QuickCart

A simple E-Commerce application where customers can order products. This application contains the following services:

:sparkles: Product Service  
:sparkles: Order Service  
:sparkles: Inventory Service  
:sparkles: Notification Service  


 ## Product Service
A REST API endpoint that will CREATE and READ products.  
Using MongoDB as the database backing Product Service.  


| HTTP        | Method           | URL  |
| ------------- |:-------------:| -----:|
| POST      | `createProduct()` | /api/product/ |
| GET      | `getAllProduct()`      |   /api/product/ |
 		      
  	    

Using Docker to install the necessary software like Databases, Message Queues, and other required software for this project.  
_docker-compose.yml_  

Product Model
```java
public class Product {
    @Id
    private String id;
    private String name;
    private String description;
    private BigDecimal price;
}
```
