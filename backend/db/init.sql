CREATE DATABASE BrewandBrain;

USE BrewandBrain;

CREATE TABLE Users (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  GoogleID VARCHAR(225) NOT NULL,
  Username VARCHAR(225) UNIQUE NOT NULL,
  Email VARCHAR(225) NOT NULL, 
  UName VARCHAR(225) NOT NULL,
  Birthday DATE,
  Gender ENUM('Male', 'Female', 'Other'),
  School VARCHAR(225)
);

/*
INSERT INTO Users (GoogleID, Username, Email, Name, Birthday, Gender, School)
VALUES ('mel.id', 'mlss_riri', 'melaixrio@gmail.com', 'Melaissa Rioveros', '2003-03-05', 'Female', 'Adamson University'), 
	('eric.id', 'jerome_ramos', 'jeric@gmail.com', 'Eric Jerome Ramos', '2002-08-07', 'Male', 'Adamson University')
; 
*/


CREATE TABLE Reservations (
  ReservationID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT, 
  ReservationDate DATE NOT NULL,
  ReservationTime TIME NOT NULL,
  ReservationSite VARCHAR(225) NOT NULL,
  Status ENUM('Booked', 'Cancelled', 'Completed') NOT NULL,
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

/*
INSERT INTO Reservations (UserID, ReservationDate, ReservationTime, ReservationSite, Status)
VALUES (1, CURRENT_DATE(), CURRENT_TIME(), 'Manila', 'Booked'),
	(2, CURRENT_DATE(), CURRENT_TIME(), 'Manila', 'Completed')
;
*/

CREATE TABLE QR_Codes (
	QRCodeID INT AUTO_INCREMENT PRIMARY KEY,
    ReservationID INT,
    QRCodeData LONGTEXT NOT NULL, 
    FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID)
);


