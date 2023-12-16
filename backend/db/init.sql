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
  Birthday VARCHAR(225),
  Gender ENUM('Male', 'Female', 'Other'),
  School VARCHAR(225),
  Occupation VARCHAR(225),
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

