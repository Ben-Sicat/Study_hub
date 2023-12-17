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
  ResDate VARCHAR(225),
  StartTime VARCHAR(255) NOT NULL,
  EndTime VARCHAR(225) NOT NULL,
  Seat VARCHAR(50),
  TableFee DECIMAL(10,2) DEFAULT 0.00,
  FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE

);


CREATE TABLE QR_Codes (
	QRCodeID INT AUTO_INCREMENT PRIMARY KEY,
    ReservationID INT,
    QRCodeData LONGTEXT NOT NULL, 
    FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID)
);

CREATE TABLE Waitlist (
  WaitlistID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT,
  Username VARCHAR(225) NOT NULL,
  Seat VARCHAR(50)
);


INSERT INTO Waitlist(UserID, Username,Seat)
VALUES
(1, 'user_1' ,'chair1'),
(2, 'user_2','chair2'),
(3, 'user_3','chair3'),
(4, 'user_4','chair4');

INSERT INTO Users (GoogleID, Username, Email, Password, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, School, Occupation, Level)
VALUES 
('google_id_1', 'user_1', 'user1@example.com', 'password1', 'John', 'Doe', '1234567890', 'UName1', '1990-01-01', 'Male', 'School1', 'Occupation1', 'User'),
('google_id_2', 'admin', 'user2@example.com', 'password', 'Jane', 'Doe', '9876543210', 'UName2', '1985-05-15', 'Female', 'School2', 'Occupation2', 'Admin'),

('google_id_3', 'user_3', 'user3@example.com', 'password3', 'Alice', 'Johnson', '5555555555', 'UName3', '1988-08-22', 'Female', 'School3', 'Occupation3', 'User'),
('google_id_4', 'user_4', 'user4@example.com', 'password4', 'Bob', 'Smith', '6666666666', 'UName4', '1975-12-10', 'Male', 'School4', 'Occupation4', 'User');


INSERT INTO Reservations (UserID, StartTime, EndTime, Seat)
VALUES 
(1, '08:00:00', '12:00:00', 'chair1'),
(2, '09:00:00', '3:00:00', 'chair10'),
(3, '2023-01-03 10:00:00', '2023-01-03 14:00:00', 'chair4'),
(4, '2023-01-04 11:00:00', '2023-01-04 15:00:00', 'chair5');

