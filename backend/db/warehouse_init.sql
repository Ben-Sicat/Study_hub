CREATE DATABASE BrewandBrain_warehouse;

USE BrewandBrain_warehouse;

CREATE TABLE IF NOT EXISTS UserSummary(
    UserID INT NOT NULL,
    School VARCHAR (100),
    Occupation VARCHAR(100),
    StartTime DATETIME,
    EndTime DATETIME,
    PRIMARY KEY (UserID)
);

CREATE INDEX idx_UserSumamry_UserID ON UserSummary(UserID);