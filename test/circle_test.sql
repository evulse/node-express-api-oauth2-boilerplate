-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 24, 2013 at 05:47 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `express-api-boilerplate-dev`
--

DROP DATABASE IF EXISTS `circle_test`;
CREATE DATABASE IF NOT EXISTS `circle_test`;
USE `circle_test`;

-- --------------------------------------------------------

--
-- Table structure for table `access_token`
--

CREATE TABLE IF NOT EXISTS `access_token` (
  `client_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `token` varchar(256) NOT NULL,
  KEY `client_id` (`client_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `authorization_request`
--

CREATE TABLE IF NOT EXISTS `authorization_request` (
  `auth_code` varchar(25) NOT NULL,
  `redirect_uri` varchar(250) NOT NULL,
  `client_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`auth_code`),
  KEY `client_id` (`client_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authorization_request`
--

INSERT INTO `authorization_request` (`auth_code`, `redirect_uri`, `client_id`, `user_id`) VALUES
('sbo2fs3gpHVQWjcE', 'http://localhost:5000/test/callback', 'c67f0160-7aad-4aa5-8a88-92bbd6f02a4c', 'a2bf9b0f-198f-4df5-a396-590a007785bd');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE IF NOT EXISTS `clients` (
  `client_id` varchar(36) NOT NULL,
  `client_secret` varchar(36) NOT NULL,
  `redirect_uri` varchar(250) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `client_secret` (`client_secret`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `client_secret`, `redirect_uri`, `user_id`) VALUES
('c67f0160-7aad-4aa5-8a88-92bbd6f02a4c', '8638be31-2f91-479d-924a-3742feb17443', 'http://localhost:5000/test/callback', '912ac711-8b2e-44c6-a088-cb8cf5ab4916');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(40) NOT NULL,
  `confirm_password` varchar(40) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `confirm_password`, `first_name`, `last_name`, `full_name`, `verified`) VALUES
('04cbc262-176b-46ea-a91f-09e1793f5d7d', 'duplicate@test.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'Duplicate First Name', 'Duplicate Last Name', 'Duplicate Full Name', 1),
('269f1f69-29a9-4894-b33c-2e1753dd3ddd', 'mike@evulse.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'Mike', 'Angell', 'Mike Angell', 1),
('912ac711-8b2e-44c6-a088-cb8cf5ab4916', 'test@test.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'Test first name', 'Test Last name', 'Test full name', 0),
('a2bf9b0f-198f-4df5-a396-590a007785bd', 'muhammadghazali@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'Muhammad', 'Ghazali', 'Muhammad Ghazali', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `access_token`
--
ALTER TABLE `access_token`
  ADD CONSTRAINT `access_token_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  ADD CONSTRAINT `access_token_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
