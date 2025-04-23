-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2025 at 01:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `ID` int(11) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Author` varchar(255) DEFAULT NULL,
  `Genre` varchar(100) DEFAULT NULL,
  `Availability` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`ID`, `Title`, `Author`, `Genre`, `Availability`) VALUES
(1, 'Whispers of the Forgotten', 'Liam Johnson', 'Fantasy', 'Available'),
(2, 'Echoes in the Mist', 'Emma Brown', 'Mystery', 'Reserved'),
(3, 'The Silent Garden', 'Olivia Davis', 'Romance', 'Available'),
(4, 'Journey to the Edge', 'Noah Miller', 'Science Fiction', 'Reserved'),
(5, 'Tales of the North', 'Sophia Wilson', 'Historical Fiction', 'Checked Out'),
(6, 'Flicker in the Dark', 'James Moore', 'Thriller', 'Reserved'),
(7, 'The Lost Tides', 'Ava Taylor', 'Adventure', 'Available'),
(8, 'Crimson Sky', 'Elijah Anderson', 'Fantasy', 'Checked Out'),
(9, 'The Clockmaker\'s Code', 'Mia Thomas', 'Mystery', 'Available'),
(10, 'Shadows Over Eden', 'Lucas Jackson', 'Horror', 'Reserved'),
(11, 'A Light in the Hollow', 'Amelia White', 'Drama', 'Avaiable'),
(12, 'Veil of Ice', 'Benjamin Harris', 'Science Fiction', 'Checked Out'),
(13, 'Windswept', 'Harper Martin', 'Romance', 'Available'),
(14, 'The Last Chronicle', 'Ethan Thompson', 'Fantasy', 'Reserved'),
(15, 'Dust and Ashes', 'Abigail Garcia', 'Post-Apocalyptic', 'Available'),
(16, 'Silver Threads', 'Daniel Martinez', 'Historical Fiction', 'Available'),
(17, 'Voices Below', 'Grace Robinson', 'Thriller', 'Reserved'),
(18, 'Among the Willows', 'Jacob Clark', 'Drama', 'Checked Out'),
(19, 'Beneath Starlit Skies', 'Lily Rodriguez', 'Adventure', 'Available'),
(20, 'The Iron Road', 'Matthew Lewis', 'Science Fiction', 'Available'),
(21, 'House of Ink', 'Chloe Lee', 'Mystery', 'Reserved'),
(22, 'Rise of the Moonborn', 'Andrew Walker', 'Fantasy', 'Checked Out'),
(23, 'A Study in Violet', 'Ella Hall', 'Crime', 'Available'),
(24, 'Where the River Ends', 'Jack Allen', 'Romance', 'Reserved'),
(25, 'Caverns of Light', 'Scarlett Young', 'Adventure', 'Available'),
(26, 'The Forgotten Wall', 'Henry Hernandez', 'Historical Fiction', 'Checked Out'),
(27, 'Tides of War', 'Victoria King', 'War', 'Available'),
(28, 'The Vanishing Hour', 'Owen Wright', 'Mystery', 'Reserved'),
(29, 'Roots and Ruin', 'Zoe Lopez', 'Fantasy', 'Available'),
(30, 'Letters to the Sea', 'Sebastian Hill', 'Drama', 'Checked Out'),
(31, 'The Fractured Sky', 'Natalie Scott', 'Science Fiction', 'Available'),
(32, 'Shatterpoint', 'Julian Green', 'Thriller', 'Reserved'),
(33, 'Crown of Cinders', 'Aurora Adams', 'Fantasy', 'Checked Out'),
(34, 'Beneath the Willow Tree', 'Leo Nelson', 'Romance', 'Available'),
(35, 'The Oracle\'s Curse', 'Stella Baker', 'Fantasy', 'Reserved'),
(36, 'Empire of Dust', 'Miles Carter', 'Adventure', 'Available'),
(37, 'A Place for Shadows', 'Samantha Rivera', 'Mystery', 'Checked Out'),
(38, 'Lanterns in the Fog', 'Wyatt Perez', 'Historical Fiction', 'Reserved'),
(39, 'Ashes and Wine', 'Isla Roberts', 'Drama', 'Available'),
(40, 'Whispers at Dusk', 'Ryan Turner', 'Thriller', 'Available'),
(41, 'The Ninth Chamber', 'Layla Phillips', 'Horror', 'Reserved'),
(42, 'Beyond the Ice', 'Christian Campbell', 'Science Fiction', 'Checked Out'),
(43, 'Broken Compass', 'Aria Parker', 'Adventure', 'Available'),
(44, 'The Seventh Seal', 'Lincoln Evans', 'Fantasy', 'Reserved'),
(45, 'Fate of the Fireborn', 'Sadie Edwards', 'Fantasy', 'Checked Out'),
(46, 'Through the Iron Veil', 'Nathan Collins', 'Science Fiction', 'Available'),
(47, 'Nightshade Alley', 'Ellie Stewart', 'Crime', 'Reserved'),
(48, 'The Painted World', 'Aaron Sanchez', 'Mystery', 'Available'),
(49, 'Wildflower Serenade', 'Mila Morris', 'Romance', 'Available'),
(50, 'Voices in the Rain', 'Caleb Rogers', 'Thriller', 'Reserved');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `TransactionID` int(11) NOT NULL,
  `BookID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `IssueDate` date DEFAULT NULL,
  `ReturnDate` date DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`TransactionID`, `BookID`, `UserID`, `IssueDate`, `ReturnDate`, `Status`) VALUES
(1, 1, 2, '2025-04-01', '2025-04-10', 'Returned'),
(2, 2, 3, '2025-03-15', '2025-03-22', 'Rented'),
(3, 3, 5, '2025-03-20', '2025-03-30', 'Returned'),
(4, 4, 7, '2025-04-05', '2025-04-15', 'Returned'),
(5, 5, 1, '2025-04-03', '2025-04-12', 'Rented'),
(6, 6, 6, '2025-03-28', '2025-04-07', 'Returned'),
(7, 7, 4, '2025-04-01', '2025-04-11', 'Rented'),
(8, 8, 8, '2025-04-04', '2025-04-13', 'Rented'),
(9, 9, 9, '2025-03-25', '2025-04-05', 'Rented'),
(10, 10, 10, '2025-04-02', '2025-04-10', 'Returned'),
(11, 11, 3, '2025-04-06', '2025-04-16', 'Returned'),
(12, 12, 5, '2025-04-03', '2025-04-13', 'Rented'),
(13, 13, 6, '2025-04-05', '2025-04-14', 'Returned'),
(14, 14, 7, '2025-04-01', '2025-04-09', 'Rented'),
(15, 15, 8, '2025-04-07', '2025-04-17', 'Returned'),
(16, 16, 9, '2025-03-29', '2025-04-08', 'Rented'),
(17, 17, 10, '2025-04-02', '2025-04-12', 'Rented'),
(18, 18, 2, '2025-03-31', '2025-04-10', 'Returned'),
(19, 19, 1, '2025-04-03', '2025-04-13', 'Rented'),
(20, 20, 4, '2025-04-01', '2025-04-10', 'Returned');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Role` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Name`, `Role`, `Email`, `Password`) VALUES
(1, 'Alice Thompson', 'Librarian', 'alice.thompson@library.com', 'alice123'),
(2, 'Brian Carter', 'Librarian', 'brian.carter@library.com', 'brian123'),
(3, 'Cynthia Nguyen', 'Librarian', 'cynthia.nguyen@library.com', 'cynthia123'),
(4, 'Derek White', 'Member', 'derek.white@example.com', 'derekpass'),
(5, 'Emily Foster', 'Member', 'emily.foster@example.com', 'emilypass'),
(6, 'Franklin Moore', 'Member', 'frank.moore@example.com', 'frank123'),
(7, 'Grace Lee', 'Member', 'grace.lee@example.com', 'gracepw'),
(8, 'Henry Adams', 'Member', 'henry.adams@example.com', 'henrypw'),
(9, 'Isabella Scott', 'Member', 'isabella.scott@example.com', 'isab123'),
(10, 'Jacob Allen', 'Member', 'jacob.allen@example.com', 'jacobpw');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`TransactionID`),
  ADD KEY `BookID` (`BookID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `TransactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `books` (`ID`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
