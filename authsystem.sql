
--
-- Estructura de tabla para la tabla `si_modulo`
--

CREATE TABLE `si_modulo` (
  `idsi_modulo` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT '0',
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_permiso`
--

CREATE TABLE `si_permiso` (
  `idsi_permiso` int(11) NOT NULL,
  `acceso` tinyint(4) DEFAULT NULL,
  `Rol_idsi_rol` int(11) NOT NULL,
  `Modulo_idsi_modulo` int(11) NOT NULL,
  `baja` tinyint(1) DEFAULT '0',
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_rol`
--

CREATE TABLE `si_rol` (
  `idsi_rol` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT '0',
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `si_rol`
--

INSERT INTO `si_rol` (`idsi_rol`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'administracion', NULL, NULL, '2017-11-28 17:38:10', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_user`
--

CREATE TABLE `si_user` (
  `idsi_user` int(11) NOT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `email` varchar(60) NOT NULL,
  `password` binary(60) DEFAULT NULL,
  `Rol_idsi_rol` int(11) NOT NULL,
  `baja` tinyint(1) DEFAULT '0',
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `si_user`
--

INSERT INTO `si_user` (`idsi_user`, `usuario`, `email`, `password`, `Rol_idsi_rol`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, NULL, 'admin@softwarecreator.com', 0x243261243130246362766c3943474b4d525146327a564a4a577945747549676c4f4651384f5056517951436c4c6d344e50314e386e4d4a6175476b47, 1, 0, NULL, '2017-11-28 17:51:08', '2017-11-28 17:51:08');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  ADD PRIMARY KEY (`idsi_modulo`);

--
-- Indices de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  ADD PRIMARY KEY (`idsi_permiso`),
  ADD KEY `si_fk_Permiso_Rol1_idx` (`Rol_idsi_rol`),
  ADD KEY `si_fk_Permiso_Modulo1_idx` (`Modulo_idsi_modulo`);

--
-- Indices de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  ADD PRIMARY KEY (`idsi_rol`);

--
-- Indices de la tabla `si_user`
--
ALTER TABLE `si_user`
  ADD PRIMARY KEY (`idsi_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `si_fk_User_Rol_idx` (`Rol_idsi_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  MODIFY `idsi_modulo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  MODIFY `idsi_permiso` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  MODIFY `idsi_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `si_user`
--
ALTER TABLE `si_user`
  MODIFY `idsi_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  ADD CONSTRAINT `si_fk_Permiso_Modulo1` FOREIGN KEY (`Modulo_idsi_modulo`) REFERENCES `si_modulo` (`idsi_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `si_fk_Permiso_Rol1` FOREIGN KEY (`Rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_user`
--
ALTER TABLE `si_user`
  ADD CONSTRAINT `si_fk_User_Rol` FOREIGN KEY (`Rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
