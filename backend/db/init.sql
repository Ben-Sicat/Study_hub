CREATE DATABASE BrewandBrain;

USE BrewandBrain;

CREATE TABLE Users (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  GoogleID VARCHAR(225),
  Username VARCHAR(225) UNIQUE NOT NULL,
  Email VARCHAR(225) NOT NULL, 
  Password VARCHAR(225),
  FirstName VARCHAR(100) NOT NULL,
  LastName VARCHAR(100) NOT NULL,
  PhoneNumber VARCHAR(20),
  UName VARCHAR(225) NOT NULL,
  Birthday DATE,
  Gender ENUM('Male', 'Female', 'Other'),
  School VARCHAR(225),
  Level ENUM('User', 'Admin', 'Employee') DEFAULT 'User'
);

CREATE TABLE Reservations (
  ReservationID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT, 
  StartTime VARCHAR(255) NOT NULL,
  EndTime VARCHAR(225) NOT NULL,
  Seat VARCHAR(50)
);


CREATE TABLE QR_Codes (
	QRCodeID INT AUTO_INCREMENT PRIMARY KEY,
    ReservationID INT,
    QRCodeData LONGTEXT NOT NULL, 
    FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID)
);

INSERT INTO Users (GoogleID, Username, Email, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, School)
VALUES ('mel.id', 'mlss_riri', 'melaixrio@gmail.com', 'Melaissa', 'Rioveros', '1234567890', 'Melaissa Rioveros', '2003-03-05', 'Female', 'Adamson University');