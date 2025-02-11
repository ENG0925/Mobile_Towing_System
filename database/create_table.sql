-- Create the database
CREATE DATABASE MobileTowingSystem;
USE MobileTowingSystem;

-- Table: User
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phoneNumber BIGINT NOT NULL,
    password TEXT NOT NULL,
    accountStatus BOOLEAN NOT NULL,
    loginStatus BOOLEAN NOT NULL
);

-- Table: Driver
CREATE TABLE Driver (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phoneNumber BIGINT NOT NULL,
    password TEXT NOT NULL,
    accountStatus BOOLEAN NOT NULL,
    loginStatus BOOLEAN NOT NULL
);

-- Table: SystemAdmin
CREATE TABLE SystemAdmin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    adminLevel VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    accountStatus BOOLEAN NOT NULL,
    loginStatus BOOLEAN NOT NULL
);

-- Table: ManagementAdmin
CREATE TABLE ManagementAdmin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    accountStatus BOOLEAN NOT NULL,
    loginStatus BOOLEAN NOT NULL
);

-- Table: Feedback
CREATE TABLE Feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    comment TEXT NOT NULL,
    rating INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES User(id)
);

-- Table: LikeFeedback
CREATE TABLE LikeFeedback (
    userID INT NOT NULL,
    feedbackID INT NOT NULL,
    isLike BOOLEAN NOT NULL,
    PRIMARY KEY (userID, feedbackID),
    FOREIGN KEY (userID) REFERENCES User(id),
    FOREIGN KEY (feedbackID) REFERENCES Feedback(id)
);

-- Table: Vehicle
CREATE TABLE Vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    plateNumber VARCHAR(30) NOT NULL,
    model VARCHAR(30) NOT NULL,
    color VARCHAR(30) NOT NULL,
    isDeleted BOOLEAN NOT NULL,
    FOREIGN KEY (userID) REFERENCES User(id)
);

-- Table: InsurancePolicy
CREATE TABLE InsurancePolicy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicleID INT NOT NULL,
    policyNo VARCHAR(255) NOT NULL,
    policyholderName VARCHAR(255) NOT NULL,
    icNumber BIGINT NOT NULL,
    policyFile VARCHAR(255) NOT NULL,
    FOREIGN KEY (vehicleID) REFERENCES Vehicle(id)
);

-- Table: TowBooking
CREATE TABLE TowBooking (
    bookingNo INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    vehicleID INT NOT NULL,
    driverID INT,
    bookingDate DATE NOT NULL,
    serviceLocation TEXT NOT NULL,
    towingLocation TEXT NOT NULL,
    distance FLOAT NOT NULL,
    status VARCHAR(30) NOT NULL,
    estimatedCost FLOAT NOT NULL,
    FOREIGN KEY (userID) REFERENCES User(id),
    FOREIGN KEY (vehicleID) REFERENCES Vehicle(id),
    FOREIGN KEY (driverID) REFERENCES Driver(id)
);

-- Table: Payment
CREATE TABLE Payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bookingNo INT NOT NULL,
    amount FLOAT NOT NULL,
    date DATE NOT NULL,
    method VARCHAR(30) NOT NULL,
    FOREIGN KEY (bookingNo) REFERENCES TowBooking(bookingNo)
);
