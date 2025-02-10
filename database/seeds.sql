-- Seeding data for User table
INSERT INTO User (name, email, phoneNumber, password, accountStatus, loginStatus) VALUES
('Alice Johnson', 'alice@example.com', 1234567890, 'MTIzNDU2', 1, 1),
('Bob Smith', 'bob@example.com', 1234567891, 'MTIzNDU2', 1, 0);

-- Seeding data for Driver table
INSERT INTO Driver (name, phoneNumber, password, accountStatus, loginStatus) VALUES
('Charlie Davis', 1234567892, 'MTIzNDU2', 1, 1),
('David Clark', 1234567893, 'MTIzNDU2', 1, 0);

-- Seeding data for SystemAdmin table
INSERT INTO SystemAdmin (name, adminLevel, password, accountStatus, loginStatus) VALUES
('Eve Adams', 'SuperAdmin', 'MTIzNDU2', 1, 1),
('Frank White', 'Admin', 'MTIzNDU2', 1, 0);

-- Seeding data for ManagementAdmin table
INSERT INTO ManagementAdmin (name, department, password, accountStatus, loginStatus) VALUES
('Grace Hall', 'Operations', 'MTIzNDU2', 1, 1),
('Henry Lee', 'Finance', 'MTIzNDU2', 1, 0);

-- Seeding data for Feedback table
INSERT INTO Feedback (userID, comment, rating) VALUES
(1, 'Great service!', 5),
(2, 'Average experience.', 3);

-- Seeding data for LikeFeedback table
INSERT INTO LikeFeedback (userID, feedbackID, isLike) VALUES
(1, 1, 1),
(2, 2, 0);

-- Seeding data for Vehicle table
INSERT INTO Vehicle (userID, plateNumber, model, color, isDeleted) VALUES
(1, 'ABC1234', 'Toyota Corolla', 'Blue', false),
(2, 'XYZ5678', 'Honda Civic', 'Red', false);

-- Seeding data for InsurancePolicy table
INSERT INTO InsurancePolicy (vehicleID, policyNo, policyholderName, icNumber, policyFile) VALUES
(1, 'POLICY001', 'Alice Johnson', 900101011234, '1.pdf'),
(2, 'POLICY002', 'Bob Smith', 880202022345, '2.pdf');

-- Seeding data for TowBooking table
INSERT INTO TowBooking (userID, vehicleID, driverID, bookingDate, serviceLocation, towingLocation, distance, status, estimatedCost) VALUES
(1, 1, 1, '2025-01-15', '123 Main St', '456 Elm St', 15.5, 'complete', 100.00),
(2, 2, 2, '2025-01-16', '789 Oak St', '321 Pine St', 10.0, 'in-progress', 80.00),
(2, 2, 2, '2025-01-16', '789 Oak St', '321 Pine St', 10.0, 'pending', 80.00),
(2, 2, 2, '2025-01-16', '789 Oak St', '321 Pine St', 10.0, 'unpaid', 80.00);

-- Seeding data for Payment table
INSERT INTO Payment (bookingNo, amount, date, method) VALUES
(1, 100.00, '2025-01-15', 'Credit Card'),
(2, 80.00, '2025-01-16', 'Cash');
