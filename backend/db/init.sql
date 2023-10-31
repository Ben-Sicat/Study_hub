
CREATE DATABASE bnb;
USE bnb;


CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    GoogleID VARCHAR(255) NOT NULL,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Birthday DATE,
    Gender ENUM('Male', 'Female', 'Other'),
    School VARCHAR(255),
    Occupation VARCHAR(255),
    UNIQUE(Username)
);


CREATE TABLE Reservations (
    ReservationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    ReservationDate DATE NOT NULL,
    ReservationTime TIME NOT NULL,
    ReservationSite VARCHAR(255) NOT NULL,
    Status ENUM('Booked', 'Cancelled', 'Completed') NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE QR_Codes (
    QRCodeID INT AUTO_INCREMENT PRIMARY KEY,
    ReservationID INT,
    QRCodeData LONGTEXT NOT NULL,
    FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID)
);
