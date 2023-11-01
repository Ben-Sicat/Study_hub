command to access the myusql container inside copyable code:
```docker exec -it brain_and_brew mysql -u root -p```
password: utotnijc


##current schema
mysql> use bnb
Database changed
mysql> CREATE TABLE Users (
    ->     UserID INT AUTO_INCREMENT PRIMARY KEY,
    ->     GoogleID VARCHAR(255) NOT NULL,
    ->     Username VARCHAR(255) NOT NULL,
    ->     Email VARCHAR(255) NOT NULL,
    ->     Name VARCHAR(255) NOT NULL,
    ->     Birthday DATE,
    ->     Gender ENUM('Male', 'Female', 'Other'),
    ->     School VARCHAR(255),
    ->     Occupation VARCHAR(255),
    ->     UNIQUE(Username)
    -> );
Query OK, 0 rows affected (0.11 sec)

mysql> CREATE TABLE Reservations (
    ->     ReservationID INT AUTO_INCREMENT PRIMARY KEY,
    ->     UserID INT,
    ->     ReservationDate DATE NOT NULL,
    ->     ReservationTime TIME NOT NULL,
    ->     ReservationSite VARCHAR(255) NOT NULL,
    ->     Status ENUM('Booked', 'Cancelled', 'Completed') NOT NULL,
    ->     FOREIGN KEY (UserID) REFERENCES Users(UserID)
    -> );
Query OK, 0 rows affected (0.11 sec)

mysql> CREATE TABLE QR_Codes (
    ->     QRCodeID INT AUTO_INCREMENT PRIMARY KEY,
    ->     ReservationID INT,
    ->     QRCodeData LONGTEXT NOT NULL,
    ->     FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID)
    -> );
Query OK, 0 rows affected (0.10 sec)

mysql> show tables
    -> ;
+---------------+
| Tables_in_bnb |
+---------------+
| QR_Codes      |
| Reservations  |
| Users         |
+---------------+

  
docker command to run container:
``` docker run -d -p 5000:5000  --name brain_and_brew brain_and_brew:latest```
or 
```docker run -p 5000:5000 brain_and_brew```
docker command to see images:
```docker images```