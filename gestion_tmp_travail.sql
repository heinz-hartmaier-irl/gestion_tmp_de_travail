-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 02 déc. 2025 à 13:55
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
(6, 2, 'user', 2, 'UPDATE', 'solde_conge', '25', '25', 'Modification de solde_conge de 25 à 25', '2025-12-02 12:54:29');

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
  `mdp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `nom`, `prenom`, `mail`, `statut`, `poste`, `date_entree`, `solde_conge`, `solde_hsup`, `photo`, `mdp`) VALUES
(1, 'Letellier', 'Ioni', 'ioni.letell@gmail.com', 'au travail', 'admin', '2024-09-09', 25, 10, 'gestion_tmp_travail/app/uploads/linkedin.jpg', '$2a$10$2aI9hK3hJ9vZ1BzLgWjWQe0xLcn9rx1YwBjvBzQDz/N9m9bE1uCaK\n'),
(2, 'Sam', 'Arch', 'ioio@ze-com.com', 'au travail', 'RH', '2024-09-09', 25, 10, 'uploads/default.png', '$2b$10$41gSSwdVHBgMzZjQjE8nUuefiZw4YfyhMs3LcfXYuXXfa/4D1f.zS'),
(3, 'user', 'user', 'user@gmail.com', 'au travail', 'salarié', '2024-09-09', 10, 20, 'uploads/default.png', '$2b$10$sEeqaD/YC314iwretl.vgOzVagSeHKOG.ciiLOsfa7LSC4bdXEZzm');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
