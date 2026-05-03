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


 ## Order Service
 
This service contains only one endpoint, to submit an order. 
Using MySQL as the database backing Order Service.    


| HTTP        | Method           | URL  |
| ------------- |:-------------:| -----:|
| POST      | `placeOrder()` | /api/order/ |
  	    

Using Docker to install the necessary software like Databases, Message Queues, and other required software for this project.  
_docker-compose.yml_  

Order Model
```java
public class Order {
    @Id
    private Long serial_id;
    private String orderNumber;
    private String skuCode;
    private BigDecimal price;
    private Integer quantity;
}
```

## Inventory Service

| HTTP        | Method           | URL  |
| ------------- |:-------------:| -----:|
| GET      | `isInStock()` | /api/inventory |


## Docker
In Order Service, we are going to use MySQL Database, we can download MySQL using docker-compose.
docker-compose.yml
```yml
version: '4'
services:
  mysql:
    image: mysql:8.3.0
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: mysql
    volumes:
      - ./mysql/init.sql:/docker-entrypoint-initdb.d/init.sql
      - ./docker/mysql/data:/var/lib/mysql

```
We need to create the database schema during the start-up of our MySQL Database, for that we added the line ./mysql/init.sql:/docker-entrypoint-initdb.d/init.sql which asks docker to copy the SQL file from the folder 'mysql' into the docker-entrypoint-initdb.d location and executes the SQL file.
If we don't add the above step, then we need to manually create the database.
Now we will configure our project to use MySQL by adding below properties in the application.properties file:
```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/order_service
spring.datasource.username=root
spring.datasource.password=mysql
spring.jpa.hibernate.ddl-auto=none
server.port=8081

```
We are using the spring.jpa.hibernate.ddl-auto property as none because we don't want Hibernate to create the database tables and manage migrations, we will be handling that using the Flyway library.



## Flyway

Using Flyway to execute database migrations. By using Flyway, we can provide the necessary SQL scripts that will be executed whenever we need to change our database schema. We need to provide these scripts under the src/main/resources/db/migration folder.

Flyway will look for the scripts under this particular folder, and Flyway will also follow a particular naming convention to identify the SQL scripts, we need to name the files like below:
V<Number>__file-name.sql
Example: V1__init.sql, V2__add_products.sql, etc.
Note that the number, inside the name of the SQL file, needs to be incremented for each database migration you want to run.
