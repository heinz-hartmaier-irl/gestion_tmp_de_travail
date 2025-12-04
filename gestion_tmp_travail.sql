-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 04 déc. 2025 à 11:04
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_tmp_travail`
--

-- --------------------------------------------------------

--
-- Structure de la table `conges_spec`
--

CREATE TABLE `conges_spec` (
  `id_demande` int(11) NOT NULL,
  `nature` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `demande`
--

CREATE TABLE `demande` (
  `id_demande` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `type` enum('conge','maladie','hsup') NOT NULL,
  `date_demande` date NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `statut_demande` varchar(50) DEFAULT NULL,
  `justificatif` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `demande`
--

INSERT INTO `demande` (`id_demande`, `id_user`, `type`, `date_demande`, `date_debut`, `date_fin`, `statut_demande`, `justificatif`) VALUES
(4, 3, 'conge', '2025-10-10', '2025-09-30', '2025-10-16', 'en attente', ''),
(5, 2, 'maladie', '2025-10-10', '2025-10-01', '2025-10-30', 'en attente', '');

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

CREATE TABLE `historique` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `table_name` varchar(100) NOT NULL,
  `record_id` int(11) NOT NULL,
  `action` varchar(50) NOT NULL,
  `field_name` varchar(100) DEFAULT NULL,
  `old_value` text DEFAULT NULL,
  `new_value` text DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `historique`
--

INSERT INTO `historique` (`id`, `user_id`, `table_name`, `record_id`, `action`, `field_name`, `old_value`, `new_value`, `message`, `created_at`) VALUES
(1, 2, 'user', 2, 'UPDATE', 'nom', 'Sam', 'Sam', 'Modification de nom de Sam à Sam', '2025-12-02 12:54:29'),
(2, 2, 'user', 2, 'UPDATE', 'prenom', 'Arch', 'Arch', 'Modification de prenom de Arch à Arch', '2025-12-02 12:54:29'),
(3, 2, 'user', 2, 'UPDATE', 'poste', 'RH', 'RH', 'Modification de poste de RH à RH', '2025-12-02 12:54:29'),
(4, 2, 'user', 2, 'UPDATE', 'mail', 'ioio@ze-com.com', 'ioio@ze-com.com', 'Modification de mail de ioio@ze-com.com à ioio@ze-com.com', '2025-12-02 12:54:29'),
(5, 2, 'user', 2, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-02 12:54:29'),
(6, 2, 'user', 2, 'UPDATE', 'solde_conge', '25', '25', 'Modification de solde_conge de 25 à 25', '2025-12-02 12:54:29'),
(7, 1, 'user', 1, 'UPDATE', 'nom', 'Letellier', 'Letellier', 'Modification de nom de Letellier à Letellier', '2025-12-04 08:45:37'),
(8, 1, 'user', 1, 'UPDATE', 'prenom', 'Ioni', 'Ioni', 'Modification de prenom de Ioni à Ioni', '2025-12-04 08:45:37'),
(9, 1, 'user', 1, 'UPDATE', 'poste', 'admin', 'admin', 'Modification de poste de admin à admin', '2025-12-04 08:45:37'),
(10, 1, 'user', 1, 'UPDATE', 'mail', 'ioni.letell@gmail.com', 'ioni.letell@gmail.com', 'Modification de mail de ioni.letell@gmail.com à ioni.letell@gmail.com', '2025-12-04 08:45:37'),
(11, 1, 'user', 1, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-04 08:45:37'),
(12, 1, 'user', 1, 'UPDATE', 'jours_conge_pris', '0', '5', 'Modification de jours_conge_pris de 0 à 5', '2025-12-04 08:45:37'),
(13, 3, 'user', 3, 'UPDATE', 'nom', 'user', 'user', 'Modification de nom de user à user', '2025-12-04 08:48:47'),
(14, 3, 'user', 3, 'UPDATE', 'prenom', 'user', 'user', 'Modification de prenom de user à user', '2025-12-04 08:48:47'),
(15, 3, 'user', 3, 'UPDATE', 'poste', 'salarié', 'salarié', 'Modification de poste de salarié à salarié', '2025-12-04 08:48:47'),
(16, 3, 'user', 3, 'UPDATE', 'mail', 'user@gmail.com', 'user@gmail.com', 'Modification de mail de user@gmail.com à user@gmail.com', '2025-12-04 08:48:47'),
(17, 3, 'user', 3, 'UPDATE', 'solde_hsup', '20', '20', 'Modification de solde_hsup de 20 à 20', '2025-12-04 08:48:47'),
(18, 3, 'user', 3, 'UPDATE', 'jours_conge_pris', '5', '5', 'Modification de jours_conge_pris de 5 à 5', '2025-12-04 08:48:47'),
(19, 2, 'user', 2, 'UPDATE', 'nom', 'Sam', 'Sam', 'Modification de nom de Sam à Sam', '2025-12-04 08:56:47'),
(20, 2, 'user', 2, 'UPDATE', 'prenom', 'Arch', 'Arch', 'Modification de prenom de Arch à Arch', '2025-12-04 08:56:47'),
(21, 2, 'user', 2, 'UPDATE', 'poste', 'RH', 'RH', 'Modification de poste de RH à RH', '2025-12-04 08:56:47'),
(22, 2, 'user', 2, 'UPDATE', 'mail', 'ioio@ze-com.com', 'ioio@ze-com.com', 'Modification de mail de ioio@ze-com.com à ioio@ze-com.com', '2025-12-04 08:56:47'),
(23, 2, 'user', 2, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-04 08:56:47'),
(24, 2, 'user', 2, 'UPDATE', 'jours_conge_pris', '0', '10', 'Modification de jours_conge_pris de 0 à 10', '2025-12-04 08:56:47'),
(25, 2, 'user', 2, 'UPDATE', 'nom', 'Sam', 'Sam', 'Modification de nom de Sam à Sam', '2025-12-04 08:57:14'),
(26, 2, 'user', 2, 'UPDATE', 'prenom', 'Arch', 'Arch', 'Modification de prenom de Arch à Arch', '2025-12-04 08:57:14'),
(27, 2, 'user', 2, 'UPDATE', 'poste', 'RH', 'RH', 'Modification de poste de RH à RH', '2025-12-04 08:57:14'),
(28, 2, 'user', 2, 'UPDATE', 'mail', 'ioio@ze-com.com', 'ioio@ze-com.com', 'Modification de mail de ioio@ze-com.com à ioio@ze-com.com', '2025-12-04 08:57:14'),
(29, 2, 'user', 2, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-04 08:57:14'),
(30, 2, 'user', 2, 'UPDATE', 'jours_conge_pris', '10', '0', 'Modification de jours_conge_pris de 10 à 0', '2025-12-04 08:57:14'),
(31, 3, 'user', 3, 'UPDATE', 'nom', 'user', 'Maie', 'Modification de nom de user à Maie', '2025-12-04 09:02:07'),
(32, 3, 'user', 3, 'UPDATE', 'prenom', 'user', 'Nön', 'Modification de prenom de user à Nön', '2025-12-04 09:02:07'),
(33, 3, 'user', 3, 'UPDATE', 'poste', 'salarié', 'salarié', 'Modification de poste de salarié à salarié', '2025-12-04 09:02:07'),
(34, 3, 'user', 3, 'UPDATE', 'mail', 'user@gmail.com', 'user@gmail.com', 'Modification de mail de user@gmail.com à user@gmail.com', '2025-12-04 09:02:07'),
(35, 3, 'user', 3, 'UPDATE', 'solde_hsup', '20', '20', 'Modification de solde_hsup de 20 à 20', '2025-12-04 09:02:07'),
(36, 2, 'user', 2, 'UPDATE', 'nom', 'Sam', 'Sam', 'Modification de nom de Sam à Sam', '2025-12-04 09:09:13'),
(37, 2, 'user', 2, 'UPDATE', 'prenom', 'Arch', 'Arch', 'Modification de prenom de Arch à Arch', '2025-12-04 09:09:13'),
(38, 2, 'user', 2, 'UPDATE', 'poste', 'RH', 'RH', 'Modification de poste de RH à RH', '2025-12-04 09:09:13'),
(39, 2, 'user', 2, 'UPDATE', 'mail', 'ioio@ze-com.com', 'ioio@ze-com.com', 'Modification de mail de ioio@ze-com.com à ioio@ze-com.com', '2025-12-04 09:09:13'),
(40, 2, 'user', 2, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-04 09:09:13'),
(41, 2, 'user', 2, 'UPDATE', 'jours_conge_pris', '0', '8', 'Modification de jours_conge_pris de 0 à 8', '2025-12-04 09:09:13'),
(42, 2, 'user', 2, 'UPDATE', 'nom', 'Sam', 'Sam', 'Modification de nom de Sam à Sam', '2025-12-04 09:40:48'),
(43, 2, 'user', 2, 'UPDATE', 'prenom', 'Arch', 'Arch', 'Modification de prenom de Arch à Arch', '2025-12-04 09:40:48'),
(44, 2, 'user', 2, 'UPDATE', 'poste', 'RH', 'RH', 'Modification de poste de RH à RH', '2025-12-04 09:40:48'),
(45, 2, 'user', 2, 'UPDATE', 'mail', 'ioio@ze-com.com', 'ioio@ze-com.com', 'Modification de mail de ioio@ze-com.com à ioio@ze-com.com', '2025-12-04 09:40:48'),
(46, 2, 'user', 2, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-04 09:40:48'),
(47, 2, 'user', 2, 'UPDATE', 'jours_conge_pris', '8', '5', 'Modification de jours_conge_pris de 8 à 5', '2025-12-04 09:40:48'),
(48, 1, 'user', 1, 'UPDATE', 'nom', 'Letellier', 'Letellier', 'Modification de nom de Letellier à Letellier', '2025-12-04 09:47:35'),
(49, 1, 'user', 1, 'UPDATE', 'prenom', 'Ioni', 'Ioni', 'Modification de prenom de Ioni à Ioni', '2025-12-04 09:47:35'),
(50, 1, 'user', 1, 'UPDATE', 'poste', 'admin', 'admin', 'Modification de poste de admin à admin', '2025-12-04 09:47:35'),
(51, 1, 'user', 1, 'UPDATE', 'mail', 'ioni.letell@gmail.com', 'ioni.letell@gmail.com', 'Modification de mail de ioni.letell@gmail.com à ioni.letell@gmail.com', '2025-12-04 09:47:35'),
(52, 1, 'user', 1, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-04 09:47:35'),
(53, 1, 'user', 1, 'UPDATE', 'jours_conge_pris', '5', '0', 'Modification de jours_conge_pris de 5 à 0', '2025-12-04 09:47:35'),
(54, 2, 'user', 2, 'UPDATE', 'nom', 'Sam', 'Sam', 'Modification de nom de Sam à Sam', '2025-12-04 09:47:39'),
(55, 2, 'user', 2, 'UPDATE', 'prenom', 'Arch', 'Arch', 'Modification de prenom de Arch à Arch', '2025-12-04 09:47:39'),
(56, 2, 'user', 2, 'UPDATE', 'poste', 'RH', 'RH', 'Modification de poste de RH à RH', '2025-12-04 09:47:39'),
(57, 2, 'user', 2, 'UPDATE', 'mail', 'ioio@ze-com.com', 'ioio@ze-com.com', 'Modification de mail de ioio@ze-com.com à ioio@ze-com.com', '2025-12-04 09:47:39'),
(58, 2, 'user', 2, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-04 09:47:39'),
(59, 2, 'user', 2, 'UPDATE', 'jours_conge_pris', '5', '0', 'Modification de jours_conge_pris de 5 à 0', '2025-12-04 09:47:39'),
(60, 3, 'user', 3, 'UPDATE', 'nom', 'Maie', 'Maie', 'Modification de nom de Maie à Maie', '2025-12-04 09:47:43'),
(61, 3, 'user', 3, 'UPDATE', 'prenom', 'Nön', 'Nön', 'Modification de prenom de Nön à Nön', '2025-12-04 09:47:43'),
(62, 3, 'user', 3, 'UPDATE', 'poste', 'salarié', 'salarié', 'Modification de poste de salarié à salarié', '2025-12-04 09:47:43'),
(63, 3, 'user', 3, 'UPDATE', 'mail', 'user@gmail.com', 'user@gmail.com', 'Modification de mail de user@gmail.com à user@gmail.com', '2025-12-04 09:47:43'),
(64, 3, 'user', 3, 'UPDATE', 'solde_hsup', '20', '20', 'Modification de solde_hsup de 20 à 20', '2025-12-04 09:47:43'),
(65, 3, 'user', 3, 'UPDATE', 'jours_conge_pris', '5', '0', 'Modification de jours_conge_pris de 5 à 0', '2025-12-04 09:47:43'),
(66, 2, 'user', 2, 'UPDATE', 'nom', 'Sam', 'Sam', 'Modification de nom de Sam à Sam', '2025-12-04 09:49:53'),
(67, 2, 'user', 2, 'UPDATE', 'prenom', 'Arch', 'Arch', 'Modification de prenom de Arch à Arch', '2025-12-04 09:49:53'),
(68, 2, 'user', 2, 'UPDATE', 'poste', 'RH', 'RH', 'Modification de poste de RH à RH', '2025-12-04 09:49:53'),
(69, 2, 'user', 2, 'UPDATE', 'mail', 'ioio@ze-com.com', 'ioio@ze-com.com', 'Modification de mail de ioio@ze-com.com à ioio@ze-com.com', '2025-12-04 09:49:53'),
(70, 2, 'user', 2, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-04 09:49:53'),
(71, 2, 'user', 2, 'UPDATE', 'jours_conge_pris', '0', '5', 'Modification de jours_conge_pris de 0 à 5', '2025-12-04 09:49:53'),
(72, 2, 'user', 2, 'UPDATE', 'nom', 'Sam', 'Sam', 'Modification de nom de Sam à Sam', '2025-12-04 09:51:57'),
(73, 2, 'user', 2, 'UPDATE', 'prenom', 'Arch', 'Arch', 'Modification de prenom de Arch à Arch', '2025-12-04 09:51:57'),
(74, 2, 'user', 2, 'UPDATE', 'poste', 'RH', 'RH', 'Modification de poste de RH à RH', '2025-12-04 09:51:57'),
(75, 2, 'user', 2, 'UPDATE', 'mail', 'ioio@ze-com.com', 'ioio@ze-com.com', 'Modification de mail de ioio@ze-com.com à ioio@ze-com.com', '2025-12-04 09:51:57'),
(76, 2, 'user', 2, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-04 09:51:57'),
(77, 2, 'user', 2, 'UPDATE', 'jours_conge_pris', '5', '0', 'Modification de jours_conge_pris de 5 à 0', '2025-12-04 09:51:57'),
(78, 2, 'user', 2, 'UPDATE', 'nom', 'Sam', 'Sam', 'Modification de nom de Sam à Sam', '2025-12-04 09:52:20'),
(79, 2, 'user', 2, 'UPDATE', 'prenom', 'Arch', 'Arch', 'Modification de prenom de Arch à Arch', '2025-12-04 09:52:20'),
(80, 2, 'user', 2, 'UPDATE', 'poste', 'RH', 'RH', 'Modification de poste de RH à RH', '2025-12-04 09:52:20'),
(81, 2, 'user', 2, 'UPDATE', 'mail', 'ioio@ze-com.com', 'ioio@ze-com.com', 'Modification de mail de ioio@ze-com.com à ioio@ze-com.com', '2025-12-04 09:52:20'),
(82, 2, 'user', 2, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-04 09:52:20'),
(83, 2, 'user', 2, 'UPDATE', 'jours_conge_pris', '0', '5', 'Modification de jours_conge_pris de 0 à 5', '2025-12-04 09:52:20'),
(84, 2, 'user', 2, 'UPDATE', 'nom', 'Sam', 'Sam', 'Modification de nom de Sam à Sam', '2025-12-04 09:54:03'),
(85, 2, 'user', 2, 'UPDATE', 'prenom', 'Arch', 'Arch', 'Modification de prenom de Arch à Arch', '2025-12-04 09:54:03'),
(86, 2, 'user', 2, 'UPDATE', 'poste', 'RH', 'RH', 'Modification de poste de RH à RH', '2025-12-04 09:54:03'),
(87, 2, 'user', 2, 'UPDATE', 'mail', 'ioio@ze-com.com', 'ioio@ze-com.com', 'Modification de mail de ioio@ze-com.com à ioio@ze-com.com', '2025-12-04 09:54:04'),
(88, 2, 'user', 2, 'UPDATE', 'solde_hsup', '10', '10', 'Modification de solde_hsup de 10 à 10', '2025-12-04 09:54:04'),
(89, 2, 'user', 2, 'UPDATE', 'jours_conge_pris', '5', '0', 'Modification de jours_conge_pris de 5 à 0', '2025-12-04 09:54:04');

-- --------------------------------------------------------

--
-- Structure de la table `hsup_spec`
--

CREATE TABLE `hsup_spec` (
  `id_demande` int(11) NOT NULL,
  `heure_debut` time DEFAULT NULL,
  `heure_fin` time DEFAULT NULL,
  `heures` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `maladie_spec`
--

CREATE TABLE `maladie_spec` (
  `id_demande` int(11) NOT NULL,
  `justificatif` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `mail` varchar(150) NOT NULL,
  `statut` enum('au travail','en congés','malade') DEFAULT 'au travail',
  `poste` enum('salarié','cadre','alternant','stagiaire','mi-temps','admin','RH') DEFAULT 'salarié',
  `date_entree` date DEFAULT NULL,
  `solde_conge` int(11) DEFAULT 0,
  `solde_hsup` int(11) DEFAULT 0,
  `photo` varchar(255) DEFAULT 'uploads/default.png',
  `mdp` varchar(255) NOT NULL,
  `jours_conge_pris` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `nom`, `prenom`, `mail`, `statut`, `poste`, `date_entree`, `solde_conge`, `solde_hsup`, `photo`, `mdp`, `jours_conge_pris`) VALUES
(1, 'Letellier', 'Ioni', 'ioni.letell@gmail.com', 'au travail', 'admin', '2024-09-09', 37, 10, 'gestion_tmp_travail/app/uploads/linkedin.jpg', '$2a$10$2aI9hK3hJ9vZ1BzLgWjWQe0xLcn9rx1YwBjvBzQDz/N9m9bE1uCaK\n', 0),
(2, 'Sam', 'Arch', 'ioio@ze-com.com', 'au travail', 'RH', '2024-09-09', 32, 10, 'uploads/default.png', '$2b$10$41gSSwdVHBgMzZjQjE8nUuefiZw4YfyhMs3LcfXYuXXfa/4D1f.zS', 0),
(3, 'Maie', 'Nön', 'user@gmail.com', 'au travail', 'salarié', '2024-09-09', 37, 20, 'uploads/default.png', '$2b$10$sEeqaD/YC314iwretl.vgOzVagSeHKOG.ciiLOsfa7LSC4bdXEZzm', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `conges_spec`
--
ALTER TABLE `conges_spec`
  ADD PRIMARY KEY (`id_demande`);

--
-- Index pour la table `demande`
--
ALTER TABLE `demande`
  ADD PRIMARY KEY (`id_demande`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `historique`
--
ALTER TABLE `historique`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `hsup_spec`
--
ALTER TABLE `hsup_spec`
  ADD PRIMARY KEY (`id_demande`);

--
-- Index pour la table `maladie_spec`
--
ALTER TABLE `maladie_spec`
  ADD PRIMARY KEY (`id_demande`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `demande`
--
ALTER TABLE `demande`
  MODIFY `id_demande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `historique`
--
ALTER TABLE `historique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `conges_spec`
--
ALTER TABLE `conges_spec`
  ADD CONSTRAINT `conges_spec_ibfk_1` FOREIGN KEY (`id_demande`) REFERENCES `demande` (`id_demande`) ON DELETE CASCADE;

--
-- Contraintes pour la table `demande`
--
ALTER TABLE `demande`
  ADD CONSTRAINT `demande_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Contraintes pour la table `hsup_spec`
--
ALTER TABLE `hsup_spec`
  ADD CONSTRAINT `hsup_spec_ibfk_1` FOREIGN KEY (`id_demande`) REFERENCES `demande` (`id_demande`) ON DELETE CASCADE;

--
-- Contraintes pour la table `maladie_spec`
--
ALTER TABLE `maladie_spec`
  ADD CONSTRAINT `maladie_spec_ibfk_1` FOREIGN KEY (`id_demande`) REFERENCES `demande` (`id_demande`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
