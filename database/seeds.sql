-- Seeding data for User table
INSERT INTO User (name, email, phoneNumber, password, accountStatus, loginStatus) VALUES
('Alice Johnson', 'alice@example.com', 1234567890, 'MTIzNDU2', 1, 0),
('Bob Smith', 'bob@example.com', 1234567891, 'MTIzNDU2', 1, 1),
('Charlie Brown', 'charlie@example.com', 1234567892, 'MTIzNDU2', 1, 0),
('David White', 'david@example.com', 1234567893, 'MTIzNDU2', 1, 1),
('Emma Stone', 'emma@example.com', 1234567894, 'MTIzNDU2', 1, 0),
('Frank Lee', 'frank@example.com', 1234567895, 'MTIzNDU2', 1, 1),
('Grace Kim', 'grace@example.com', 1234567896, 'MTIzNDU2', 1, 0),
('Henry Adams', 'henry@example.com', 1234567897, 'MTIzNDU2', 1, 1),
('Isla Fisher', 'isla@example.com', 1234567898, 'MTIzNDU2', 1, 0),
('Jack Daniels', 'jack@example.com', 1234567899, 'MTIzNDU2', 1, 1);

-- Seeding data for Driver table
INSERT INTO Driver (name, phoneNumber, password, accountStatus, loginStatus) VALUES
('Tom Hardy', 2234567890, 'MTIzNDU2', 1, 0),
('Bruce Wayne', 2234567891, 'MTIzNDU2', 1, 1),
('Clark Kent', 2234567892, 'MTIzNDU2', 1, 0),
('Diana Prince', 2234567893, 'MTIzNDU2', 1, 1),
('Barry Allen', 2234567894, 'MTIzNDU2', 1, 0),
('Hal Jordan', 2234567895, 'MTIzNDU2', 1, 1),
('Arthur Curry', 2234567896, 'MTIzNDU2', 1, 0),
('Victor Stone', 2234567897, 'MTIzNDU2', 1, 1),
('Oliver Queen', 2234567898, 'MTIzNDU2', 1, 0),
('John Constantine', 2234567899, 'MTIzNDU2', 1, 1);

-- Seeding data for SystemAdmin table
INSERT INTO SystemAdmin (name, adminLevel, password, accountStatus, loginStatus) VALUES
('Admin1', 'SuperAdmin', 'MTIzNDU2', 1, 1),
('Admin2', 'Admin', 'MTIzNDU2', 1, 1),
('Admin3', 'Admin', 'MTIzNDU2', 1, 0),
('Admin4', 'Admin', 'MTIzNDU2', 1, 1),
('Admin5', 'Admin', 'MTIzNDU2', 1, 0),
('Admin6', 'Admin', 'MTIzNDU2', 1, 1),
('Admin7', 'Admin', 'MTIzNDU2', 1, 0),
('Admin8', 'Admin', 'MTIzNDU2', 1, 1),
('Admin9', 'Admin', 'MTIzNDU2', 1, 0),
('Admin10', 'Admin', 'MTIzNDU2', 1, 1);

-- Seeding data for ManagementAdmin table
INSERT INTO ManagementAdmin (name, department, password, accountStatus, loginStatus) VALUES
('Manager1', 'HR', 'MTIzNDU2', 1, 1),
('Manager2', 'Finance', 'MTIzNDU2', 1, 1),
('Manager3', 'IT', 'MTIzNDU2', 1, 0),
('Manager4', 'HR', 'MTIzNDU2', 1, 1),
('Manager5', 'Finance', 'MTIzNDU2', 1, 0),
('Manager6', 'IT', 'MTIzNDU2', 1, 1),
('Manager7', 'HR', 'MTIzNDU2', 1, 0),
('Manager8', 'Finance', 'MTIzNDU2', 1, 1),
('Manager9', 'IT', 'MTIzNDU2', 1, 0),
('Manager10', 'HR', 'MTIzNDU2', 1, 1);

-- Seeding data for Feedback table
INSERT INTO Feedback (userID, comment, rating) VALUES
(1, 'Great service!', 5),
(2, 'Average experience.', 3),
(3, 'Quick response!', 5),
(4, 'Could be better.', 3),
(5, 'Driver was very professional.', 4),
(6, 'Long wait time.', 2),
(7, 'Very helpful staff!', 5),
(8, 'Service was okay.', 3),
(9, 'Fantastic support!', 5),
(10, 'Not satisfied with the delay.', 2),
(1, 'Smooth process and friendly driver.', 5),
(2, 'Car was handled with care.', 4),
(3, 'Would recommend to others.', 5),
(4, 'Took longer than expected.', 3),
(5, 'Affordable and reliable.', 5),
(6, 'The process was confusing.', 2),
(7, 'Fast and efficient.', 5),
(8, 'Staff was rude.', 1),
(9, 'Decent service.', 3),
(10, 'Best towing experience ever!', 5);

-- Seeding data for LikeFeedback table
INSERT INTO LikeFeedback (userID, feedbackID, isLike) VALUES
(1, 1, 1), (2, 2, 0), (3, 3, 1), (4, 4, 0), (5, 5, 1),
(6, 6, 0), (7, 7, 1), (8, 8, 0), (9, 9, 1), (10, 10, 0),
(1, 11, 1), (2, 12, 1), (3, 13, 1), (4, 14, 0), (5, 15, 1),
(6, 16, 0), (7, 17, 1), (8, 18, 0), (9, 19, 1), (10, 20, 1),
(2, 1, 0), (3, 2, 1), (4, 3, 1), (5, 4, 0), (6, 5, 1),
(7, 6, 1), (8, 7, 0), (9, 8, 1), (10, 9, 0), (1, 10, 1),
(2, 11, 1), (3, 12, 0), (4, 13, 1), (5, 14, 0), (6, 15, 1),
(7, 16, 0), (8, 17, 1), (9, 18, 0), (10, 19, 1), (1, 20, 1),
(3, 5, 1), (4, 6, 0), (5, 7, 1), (6, 8, 0), (7, 9, 1),
(8, 10, 0), (9, 11, 1), (10, 12, 1), (1, 13, 1), (2, 14, 0);

-- Seeding data for Vehicle table
INSERT INTO Vehicle (userID, plateNumber, model, color, isDeleted) VALUES
(1, 'ABC123', 'Toyota Camry', 'Black', 0),
(1, 'DEF456', 'Honda Civic', 'White', 0),
(1, 'GHI789', 'Ford Focus', 'Blue', 0),
(1, 'JKL012', 'BMW X5', 'Red', 0),
(2, 'MNO345', 'Audi A4', 'Silver', 0),
(2, 'PQR678', 'Chevrolet Malibu', 'Green', 0),
(3, 'STU901', 'Hyundai Sonata', 'Grey', 0),
(4, 'VWX234', 'Kia Sorento', 'Black', 0),
(4, 'YZA567', 'Tesla Model 3', 'White', 0),
(5, 'BCD890', 'Mazda CX-5', 'Blue', 0);

-- Seeding data for InsurancePolicy table
INSERT INTO InsurancePolicy (vehicleID, policyNo, policyholderName, icNumber, policyFile) VALUES
(1, 'POLICY001', 'Tom Hardy', 900101011234, '1.pdf'),
(3, 'POLICY002', 'Tom Hardy', 880202022345, '2.pdf'),
(5, 'POLICY003', 'Charlie Brown', 870303033456, '3.pdf'),
(6, 'POLICY004', 'David White', 860404044567, '4.pdf'),
(7, 'POLICY005', 'Emma Stone', 850505055678, '5.pdf'),
(8, 'POLICY006', 'Frank Lee', 840606066789, '6.pdf'),
(9, 'POLICY007', 'Grace Kim', 830707077890, '7.pdf');

-- Seeding data for TowBooking table
INSERT INTO TowBooking (userID, vehicleID, driverID, bookingDate, serviceLocation, towingLocation, distance, status, estimatedCost) VALUES
(1, 1, 1, '2025-01-17', '222 Birch St', '555 Cedar St', 20.0, 'complete', 120.00),
(1, 2, 1, '2025-01-18', '777 Maple St', '999 Walnut St', 18.0, 'in-progress', 110.00),
(1, 4, 1, '2025-01-20', '444 Palm St', '111 Bamboo St', 25.0, 'unpaid', 130.00),
(2, 5, 7, '2025-01-21', '333 Cherry St', '222 Magnolia St', 30.0, 'complete', 150.00);

INSERT INTO TowBooking (userID, vehicleID, bookingDate, serviceLocation, towingLocation, distance, status, estimatedCost) VALUES
(1, 3, '2025-01-19', '666 Spruce St', '888 Redwood St', 12.5, 'pending', 90.00);

-- Seeding data for Payment table
INSERT INTO Payment (bookingNo, amount, date, method) VALUES
(1, 20.00, '2025-01-15', 'ebank'),
(4, 30.00, '2025-01-16', 'credit');
