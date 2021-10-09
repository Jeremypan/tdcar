```console
docker run --name TestDriveAppMYSQL -p3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql
```



```SQL
CREATE TABLE cars (
	  ID int Not Null AUTO_INCREMENT,
    MODEL varchar(15) Not null,
    YEARMANUFACTURED INT(4) Not null,
    COLOR varchar(10) Not null,
    ENGINETRANSMISSION varchar(6) Not null,
    PLATE_NO varchar(10) Not null,
    PRIMARY KEY(ID)
);
```



```sql
INSERT INTO Cars (MODEL,YEARMANUFACTURED,COLOR,ENGINETRANSIMISSION,PLATE_NO) VALUES
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



