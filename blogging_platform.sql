-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 31, 2024 at 02:39 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blogging_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Nanotecnología', 'Categoría sobre avances en nanotecnología.', '2024-05-29 20:55:06', '2024-05-29 20:55:06'),
(2, 'Redes Neuronales', 'Aprende y enseña a entrenar tus primeras redes neuronales.', '2024-05-29 21:09:50', '2024-05-29 21:09:50'),
(3, 'Anime', '¡Date prisa Gokú!', '2024-05-30 16:27:59', '2024-05-30 16:27:59'),
(4, 'Lord of The Rings', '¿Eres un verdadero fan?', '2024-05-30 16:27:59', '2024-05-30 16:27:59'),
(6, 'Marvel', 'Superhéroes y villanos de Marvel', '2024-05-30 16:27:59', '2024-05-30 16:27:59'),
(7, 'Aprende y Enseña: Principios de Programación', 'Programación para principiantes', '2024-05-30 16:27:59', '2024-05-30 16:27:59'),
(8, 'Aprende y Enseña: Entrenar tus primeras redes neuronales', 'Entrenamiento de redes neuronales para principiantes', '2024-05-30 16:27:59', '2024-05-30 16:27:59'),
(11, 'Física', 'Descubrimientos, teorías, fronteras', '2024-05-30 16:27:59', '2024-05-30 16:27:59'),
(12, 'Matemáticas', 'Problemas y soluciones matemáticas', '2024-05-30 16:27:59', '2024-05-30 16:27:59'),
(13, 'Astronomía', 'Exploración del universo y más allá', '2024-05-30 16:27:59', '2024-05-30 16:27:59'),
(14, 'Biotecnología', 'Innovaciones en biotecnología', '2024-05-30 16:27:59', '2024-05-30 16:27:59'),
(15, 'Electrónica', 'Proyectos y avances en ingeniería electrónica y robótica', '2024-05-30 16:27:59', '2024-05-30 16:27:59');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `user_id`, `content`, `created_at`, `updated_at`) VALUES
(7, 13, 10, 'This is a comment by reguser.', '2024-05-30 17:36:42', '2024-05-30 17:36:42'),
(10, 18, 13, 'This is a comment by Maria.', '2024-05-30 21:54:17', '2024-05-30 21:54:17'),
(11, 18, 13, 'This is an updated comment by Maria.', '2024-05-30 21:54:24', '2024-05-30 22:03:02');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `title`, `content`, `created_at`, `updated_at`) VALUES
(8, 9, 'First Post', 'Content of the first post', '2024-05-30 16:34:25', '2024-05-30 16:34:25'),
(9, 9, 'Updated Second Post', 'Updated content of the second post', '2024-05-30 16:38:38', '2024-05-30 16:41:18'),
(10, 9, 'Third Post', 'Content of the first post', '2024-05-30 16:39:03', '2024-05-30 16:39:03'),
(11, 9, 'Fourth Post', 'Content of the fourth post', '2024-05-30 16:39:27', '2024-05-30 16:39:27'),
(13, 10, 'Post by reguser', 'This is a post created by a regular user.', '2024-05-30 17:35:01', '2024-05-30 17:35:01'),
(16, 13, 'Post by Maria', 'This is a post created by Maria.', '2024-05-30 21:52:18', '2024-05-30 21:52:18'),
(17, 13, 'Post by Maria', 'This is another post created by Maria.', '2024-05-30 21:52:25', '2024-05-30 21:52:25'),
(18, 13, 'Updated Post by Maria', 'This is an updated post created by Maria.', '2024-05-30 21:52:53', '2024-05-30 21:57:16');

-- --------------------------------------------------------

--
-- Table structure for table `post_categories`
--

CREATE TABLE `post_categories` (
  `post_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_categories`
--

INSERT INTO `post_categories` (`post_id`, `category_id`) VALUES
(8, 1),
(8, 2),
(10, 1),
(10, 2),
(11, 1),
(11, 2),
(11, 3),
(13, 1),
(16, 1),
(17, 1),
(18, 1),
(18, 2);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `rol_id` int(11) NOT NULL,
  `nombre_rol` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`rol_id`, `nombre_rol`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2024-05-29 19:18:55', '2024-05-29 19:18:55'),
(2, 'user', '2024-05-29 19:18:55', '2024-05-29 19:18:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `rol_id`, `created_at`, `updated_at`) VALUES
(9, 'testuser', 'testuser@example.com', '$2b$10$gWjETeXO29lhCmgMjet2ku82PC.fdvVc7MZ0aWYGIDgTCD5v/3ohO', 1, '2024-05-30 14:09:45', '2024-05-30 14:09:45'),
(10, 'reguser', 'reguser@example.com', '$2b$10$WNL0W5eTPO/.UTltPwS9AOAs6tazaudcespz/QS6t6hmyEu4.xh7K', 2, '2024-05-30 14:13:43', '2024-05-30 14:13:43'),
(12, 'John', 'John@example.com', '$2b$10$gUg5pEpDfDjfoucTqQzKVeOpq2n5oMK1/apnMzU7Hk0HyV1839tSK', 2, '2024-05-30 14:15:31', '2024-05-30 14:15:31'),
(13, 'MariaUpdated', 'mariaupdated@example.com', 'newpassword123', 2, '2024-05-30 21:49:07', '2024-05-30 21:55:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `post_categories`
--
ALTER TABLE `post_categories`
  ADD PRIMARY KEY (`post_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `post_categories`
--
ALTER TABLE `post_categories`
  ADD CONSTRAINT `post_categories_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `post_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
