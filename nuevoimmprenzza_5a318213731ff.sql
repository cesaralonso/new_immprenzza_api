-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2017 a las 20:17:59
-- Versión del servidor: 10.1.26-MariaDB
-- Versión de PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `immprenzza`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `abono`
--

CREATE TABLE `abono` (
  `idabono` int(4) NOT NULL,
  `cantidadAbonada` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `cantidadRestante` int(11) DEFAULT NULL,
  `orden_idorden` int(4) NOT NULL,
  `status` varchar(30) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alerta`
--

CREATE TABLE `alerta` (
  `idalerta` int(4) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `personal_idpersonal` int(11) NOT NULL,
  `tipoalerta_idtipoalerta` int(4) NOT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `checkout`
--

CREATE TABLE `checkout` (
  `idcheckout` int(4) NOT NULL,
  `entrada` datetime DEFAULT NULL,
  `salida` datetime DEFAULT NULL,
  `tiempo_trabajado` int(11) DEFAULT NULL,
  `personal_idpersonal` int(4) NOT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idcliente` int(4) NOT NULL,
  `persona_idpersona` int(4) NOT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concepto`
--

CREATE TABLE `concepto` (
  `idconcepto` int(6) NOT NULL,
  `nombre` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresoconcepto`
--

CREATE TABLE `egresoconcepto` (
  `idegresoconcepto` int(5) NOT NULL,
  `fecha` date DEFAULT NULL,
  `preciosiniva` int(11) DEFAULT NULL,
  `precioconiva` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `concepto_concepto` int(11) NOT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE `modulo` (
  `idmodulo` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `idorden` int(4) NOT NULL,
  `factura` tinyint(4) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `status_avance` varchar(25) DEFAULT NULL,
  `status_pago` varchar(25) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `iva` int(11) DEFAULT NULL,
  `deuda` int(11) DEFAULT NULL,
  `f_limite` datetime DEFAULT NULL,
  `cliente_idcliente` int(4) NOT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `idpermiso` int(11) NOT NULL,
  `acceso` tinyint(4) DEFAULT NULL,
  `rol_idrol` int(4) NOT NULL,
  `modulo_idmodulo` int(4) NOT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `idpersona` int(4) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `sexo` varchar(15) DEFAULT NULL,
  `rfc` varchar(45) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `domicilio` varchar(60) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `idpersonal` int(11) NOT NULL,
  `f_ingreso` datetime DEFAULT NULL,
  `nomina` int(11) DEFAULT NULL,
  `frec_nomina` varchar(30) DEFAULT NULL,
  `persona_idpersona` int(4) NOT NULL,
  `puesto_idpuesto` int(4) NOT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puesto`
--

CREATE TABLE `puesto` (
  `idpuesto` int(4) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idrol` int(4) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoalerta`
--

CREATE TABLE `tipoalerta` (
  `idtipoalerta` int(4) NOT NULL,
  `nombre` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipotrabajo`
--

CREATE TABLE `tipotrabajo` (
  `idtipotrabajo` int(4) NOT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `largo` int(11) DEFAULT NULL,
  `ancho` int(11) DEFAULT NULL,
  `publico` int(11) DEFAULT NULL,
  `mayoreo` int(11) DEFAULT NULL,
  `maquila` int(11) DEFAULT NULL,
  `preciopublico` int(11) DEFAULT NULL,
  `preciomayoreo` int(11) DEFAULT NULL,
  `preciomaquila` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajo`
--

CREATE TABLE `trabajo` (
  `idtrabajo` int(4) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `archivo` varchar(150) DEFAULT NULL,
  `foto` varchar(150) DEFAULT NULL,
  `f_entregaesperada` datetime DEFAULT NULL,
  `f_entregareal` datetime DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `especificaciones` varchar(150) DEFAULT NULL,
  `f_recibe` datetime DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `personal_idpersonal` int(4) NOT NULL,
  `tipotrabajo_idtipotrabajo` int(4) NOT NULL,
  `orden_idorden` int(4) NOT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `iduser` int(4) NOT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `rol_idrol` int(4) NOT NULL,
  `baja` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `abono`
--
ALTER TABLE `abono`
  ADD PRIMARY KEY (`idabono`),
  ADD KEY `fk_Abono_Orden1_idx` (`orden_idorden`);

--
-- Indices de la tabla `alerta`
--
ALTER TABLE `alerta`
  ADD PRIMARY KEY (`idalerta`),
  ADD KEY `fk_alerta_personal1_idx` (`personal_idpersonal`),
  ADD KEY `fk_alerta_tipoalerta1_idx` (`tipoalerta_idtipoalerta`);

--
-- Indices de la tabla `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`idcheckout`),
  ADD KEY `fk_Checkout_Personal1_idx` (`personal_idpersonal`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idcliente`),
  ADD KEY `fk_Cliente_Persona1_idx` (`persona_idpersona`);

--
-- Indices de la tabla `concepto`
--
ALTER TABLE `concepto`
  ADD PRIMARY KEY (`idconcepto`);

--
-- Indices de la tabla `egresoconcepto`
--
ALTER TABLE `egresoconcepto`
  ADD PRIMARY KEY (`idegresoconcepto`),
  ADD KEY `fk_egresoconcepto_concepto1_idx` (`concepto_concepto`);

--
-- Indices de la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD PRIMARY KEY (`idmodulo`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`idorden`),
  ADD KEY `fk_Orden_Cliente1_idx` (`cliente_idcliente`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD PRIMARY KEY (`idpermiso`),
  ADD KEY `fk_Permiso_Rol1_idx` (`rol_idrol`),
  ADD KEY `fk_Permiso_Modulo1_idx` (`modulo_idmodulo`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idpersona`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`idpersonal`),
  ADD KEY `fk_Personal_Persona1_idx` (`persona_idpersona`),
  ADD KEY `fk_Personal_Puesto1_idx` (`puesto_idpuesto`);

--
-- Indices de la tabla `puesto`
--
ALTER TABLE `puesto`
  ADD PRIMARY KEY (`idpuesto`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idrol`);

--
-- Indices de la tabla `tipoalerta`
--
ALTER TABLE `tipoalerta`
  ADD PRIMARY KEY (`idtipoalerta`);

--
-- Indices de la tabla `tipotrabajo`
--
ALTER TABLE `tipotrabajo`
  ADD PRIMARY KEY (`idtipotrabajo`);

--
-- Indices de la tabla `trabajo`
--
ALTER TABLE `trabajo`
  ADD PRIMARY KEY (`idtrabajo`),
  ADD KEY `fk_Trabajo_Personal1_idx` (`personal_idpersonal`),
  ADD KEY `fk_Trabajo_TipoTrabajo1_idx` (`tipotrabajo_idtipotrabajo`),
  ADD KEY `fk_Trabajo_Orden1_idx` (`orden_idorden`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`iduser`),
  ADD KEY `fk_User_Rol_idx` (`rol_idrol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
  MODIFY `idmodulo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `idpermiso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personal`
--
ALTER TABLE `personal`
  MODIFY `idpersonal` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `abono`
--
ALTER TABLE `abono`
  ADD CONSTRAINT `fk_Abono_Orden1` FOREIGN KEY (`orden_idorden`) REFERENCES `orden` (`idorden`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `alerta`
--
ALTER TABLE `alerta`
  ADD CONSTRAINT `fk_alerta_personal1` FOREIGN KEY (`personal_idpersonal`) REFERENCES `personal` (`idpersonal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_alerta_tipoalerta1` FOREIGN KEY (`tipoalerta_idtipoalerta`) REFERENCES `tipoalerta` (`idtipoalerta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `checkout`
--
ALTER TABLE `checkout`
  ADD CONSTRAINT `fk_Checkout_Personal1` FOREIGN KEY (`personal_idpersonal`) REFERENCES `personal` (`idpersonal`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_Cliente_Persona1` FOREIGN KEY (`persona_idpersona`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `egresoconcepto`
--
ALTER TABLE `egresoconcepto`
  ADD CONSTRAINT `fk_egresoconcepto_concepto1` FOREIGN KEY (`concepto_concepto`) REFERENCES `concepto` (`idconcepto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `fk_Orden_Cliente1` FOREIGN KEY (`cliente_idcliente`) REFERENCES `cliente` (`idcliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD CONSTRAINT `fk_Permiso_Modulo1` FOREIGN KEY (`modulo_idmodulo`) REFERENCES `modulo` (`idmodulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Permiso_Rol1` FOREIGN KEY (`rol_idrol`) REFERENCES `rol` (`idrol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `fk_Personal_Persona1` FOREIGN KEY (`persona_idpersona`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Personal_Puesto1` FOREIGN KEY (`puesto_idpuesto`) REFERENCES `puesto` (`idpuesto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `trabajo`
--
ALTER TABLE `trabajo`
  ADD CONSTRAINT `fk_Trabajo_Orden1` FOREIGN KEY (`orden_idorden`) REFERENCES `orden` (`idorden`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Trabajo_Personal1` FOREIGN KEY (`personal_idpersonal`) REFERENCES `personal` (`idpersonal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Trabajo_TipoTrabajo1` FOREIGN KEY (`tipotrabajo_idtipotrabajo`) REFERENCES `tipotrabajo` (`idtipotrabajo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_User_Rol` FOREIGN KEY (`rol_idrol`) REFERENCES `rol` (`idrol`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
