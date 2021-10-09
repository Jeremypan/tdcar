# TestDriveCarApplication
The application is developed by server-Spring Boot and client-AngularJS.

## Steps of running application at dev Envrionment
- Set Up Database
- Run Server
- Run Client

### Set Up Database
Use Docker to install and run MySQL server 

Here is docker command to set up MySQL Server with port 3306 and root user password (password).
```console
docker run --name TestDriveAppMYSQL -p3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql
```

Connect to MySQL by any IDE/Console

Run the below SQL Statement.

- Create database called 'testdrive'
```SQL
CREATE database testdrive;
```
- Create table 'cars'
```SQL
CREATE TABLE testdrive.cars (
	  ID int Not Null AUTO_INCREMENT,
    MODEL varchar(15) Not null,
    YEARMANUFACTURED INT(4) Not null,
    COLOR varchar(10) Not null,
    ENGINETRANSMISSION varchar(6) Not null,
    PLATE_NO varchar(10) Not null UNIQUE,
    PRIMARY KEY(ID)
);
```
- Insert data into 'cars' table
```sql
INSERT INTO testdrive.cars (MODEL,YEARMANUFACTURED,COLOR,ENGINETRANSMISSION,PLATE_NO) VALUES
('CX5',2021,'Red','auto','1AB2CD'),
('CX5',2021,'Blue','manual','2AB3CD'),
('MX5',2020,'Red','auto','3AB4CD'),
('MX5',2021,'Black','auto','4AB5CD'),
('CX9',2021,'Black','auto','5AB6CD'),
('CX9',2021,'Grey','auto','6AB7CD'),
('CX9',2020,'Red','manual','7AB8CD'),
('BT50',2020,'White','auto','8AB9CD'),
('Mazda3',2019,'Red','auto','8AB1CD'),
('CX8',2021,'White','auto','1AC2AB');
```
### Run Server
Use Intellij to run Spring Boot Server

Open Repo by Intellij and configure spring boot application and start it.

### Run ClientSide

Use Node.js to run ClientSide Application

- to AngularJS App main directory
```console
cd ./Client/tdcar-webapp
```
- install necessary packages
```console
npm install
```
- start application
```console
npm start
```


