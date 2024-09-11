-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-09-2024 a las 17:55:33
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `lider` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL DEFAULT 'Activo',
  `publishedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `codigo` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id`, `nombre`, `lider`, `estado`, `publishedAt`, `codigo`) VALUES
('612e3b1436c9d1a534bdfcd5', 'Desarrollo', '9a6ed900-abd4-4423-a55f-b1254d8f70e8', 'Activo', '2024-09-10 14:48:00', 0),
('62a2bc37-d65f-4f9a-882b-0f43d98f6dbc', 'Recursos Humanos', '123e4567-e89b-12d3-a456-426614174000', 'Activo', '2024-09-10 14:48:00', 12),
('730c0cf3-200f-4ad5-b0da-6e45c907a45c', 'Testing 2', '9a6ed900-abd4-4423-a55f-b1254d8f70e8', 'Activo', '2024-09-11 14:36:53', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` varchar(36) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `email` varchar(50) NOT NULL,
  `numeroDocumento` bigint(20) NOT NULL,
  `salario` decimal(10,2) NOT NULL,
  `estado` varchar(255) NOT NULL DEFAULT 'Activo',
  `publishedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `areaId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombres`, `apellidos`, `fechaNacimiento`, `email`, `numeroDocumento`, `salario`, `estado`, `publishedAt`, `areaId`) VALUES
('21659e05-99e8-449d-b344-52d96578d06c', 'Corrupti dolore lor', 'Et cupidatat omnis u', '1992-04-26', 'fali@mailinator.com', 57, '83.00', 'Inactivo', '2024-09-11 14:07:52', '612e3b1436c9d1a534bdfcd5'),
('9a6ed900-abd4-4423-a55f-b1254d8f70e8', 'Edgar', 'Maldonado', '1998-01-28', 'edgar@mail.com', 123456789, '4500.59', 'Activo', '2024-09-11 06:42:19', '612e3b1436c9d1a534bdfcd5'),
('f0c16aeb-af70-4880-aa12-0de643c8165c', 'Test 2', 'Testing', '1990-05-12', 'juan.perez@mail.com', 1234567, '1500.50', 'Activo', '2024-09-11 06:58:40', '612e3b1436c9d1a534bdfcd5');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_2863682842e688ca198eb25c12` (`email`),
  ADD UNIQUE KEY `IDX_9dcae82a1293f07c465c2dd45a` (`numeroDocumento`),
  ADD KEY `FK_a8e871a4e8fd7e2e7fd1ea29385` (`areaId`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_a8e871a4e8fd7e2e7fd1ea29385` FOREIGN KEY (`areaId`) REFERENCES `area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
