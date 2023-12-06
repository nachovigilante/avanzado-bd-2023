-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2022 at 05:20 AM
-- Server version: 8.0.26
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spoticfy`
--

-- --------------------------------------------------------

--
-- Table structure for table `albumes`
--

CREATE TABLE `albumes` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `artista` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `albumes`
--

INSERT INTO `albumes` (`id`, `nombre`, `artista`) VALUES
(1, 'La Base de los Datos', 7),
(2, 'Ya lo sabIA', 3),
(3, 'No es Java', 4),
(4, 'Nada como Unity', 1),
(5, 'Desaparezco', 5),
(6, 'Dame inspiración', 6),
(7, 'Internet of Boca', 2),
(8, 'Cortocircuito', 2),
(9, 'Un contrato inteligente', 3);

-- --------------------------------------------------------

--
-- Table structure for table `artistas`
--

CREATE TABLE `artistas` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `artistas`
--

INSERT INTO `artistas` (`id`, `nombre`) VALUES
(1, 'Jero'),
(2, 'Ivo'),
(3, 'Chona'),
(4, 'Nacho'),
(5, 'Daro'),
(6, 'Ranzo'),
(7, 'Aro');

-- --------------------------------------------------------

--
-- Table structure for table `canciones`
--

CREATE TABLE `canciones` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `album` int NOT NULL,
  `duracion` int NOT NULL,
  `reproducciones` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `canciones`
--

INSERT INTO `canciones` (`id`, `nombre`, `album`, `duracion`, `reproducciones`) VALUES
(1, 'Momento phpMyAdmin ft. Nacho', 1, 115, 150),
(2, 'Orbitando Jupyter', 2, 145, 110),
(3, 'Es JavaScript', 3, 160, 5500),
(4, '¿Dónde estoy? ft. Chona', 5, 135, 1300),
(5, 'Modelame así en 3D', 4, 125, 1600),
(6, 'Protopersona', 6, 160, 400),
(7, 'Arduino (la mitad más) UNO', 7, 200, 600),
(8, 'Sos el WHERE de mi SELECT', 3, 115, 800),
(9, 'El WIFI de mi ESP', 8, 155, 1000),
(10, 'Mi chain de bloque\'', 9, 165, 6500);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albumes`
--
ALTER TABLE `albumes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `artistas`
--
ALTER TABLE `artistas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `canciones`
--
ALTER TABLE `canciones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albumes`
--
ALTER TABLE `albumes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `artistas`
--
ALTER TABLE `artistas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `canciones`
--
ALTER TABLE `canciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
