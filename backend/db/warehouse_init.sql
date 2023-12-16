-- Create the BrewandBrain_warehouse database if not exists
CREATE DATABASE IF NOT EXISTS BrewandBrain_warehouse;

-- Use the BrewandBrain_warehouse database
USE BrewandBrain_warehouse;

-- Drop the UserSummary table if it exists
DROP TABLE IF EXISTS UserSummary;

-- Create the UserSummary table
CREATE TABLE UserSummary (
    UserID INT NOT NULL,
    ReservationID INT NOT NULL,
    School VARCHAR(100),
    Occupation VARCHAR(100),
    StartTime VARCHAR(255) NOT NULL,
    EndTime VARCHAR(225) NOT NULL,
    Seat VARCHAR(50),
    Gender ENUM('Male', 'Female', 'Other'),
    PRIMARY KEY (UserID)
);

-- Create an index on the UserID column
CREATE INDEX idx_UserSummary_UserID ON UserSummary(UserID);

-- INSERT INTO UserSummary (UserID, ReservationID, School, Occupation, StartTime, EndTime, Seat, Gender)
-- VALUES
--     (1, 101, 'University of the Philippines', 'Student', '2023-01-01 08:00:00', '2023-01-01 10:00:00', 'A1', 'Male'),
--     (2, 102, 'Tech Institute', 'Engineer', '2023-01-02 09:00:00', '2023-01-02 12:00:00', 'B2', 'Female'),
--     (3, 103, 'Business School', 'Entrepreneur', '2023-01-03 10:00:00', '2023-01-03 11:30:00', 'C3', 'Other');