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
  ReservationDate DATE NOT NULL,
  ReservationTime TIME NOT NULL,
  ReservationSite VARCHAR(225) NOT NULL,
  SeatCode VARCHAR(50),
  HourAndRate DECIMAL(8, 2),
  Status ENUM('Booked', 'Cancelled', 'Completed') NOT NULL,
  Amount DECIMAL(8, 2),
  Extension DECIMAL(8, 2),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE QR_Codes (
	QRCodeID INT AUTO_INCREMENT PRIMARY KEY,
    ReservationID INT,
    QRCodeData LONGTEXT NOT NULL, 
    FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID)
);

INSERT INTO Users (GoogleID, Username, Email, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, School)
VALUES ('mel.id', 'mlss_riri', 'melaixrio@gmail.com', 'Melaissa', 'Rioveros', '1234567890', 'Melaissa Rioveros', '2003-03-05', 'Female', 'Adamson University');
