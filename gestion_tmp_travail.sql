-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
<<<<<<< HEAD
-- Hôte : localhost:8889
-- Généré le : lun. 06 oct. 2025 à 06:58
-- Version du serveur : 8.0.35
-- Version de PHP : 8.2.20
=======
-- Hôte : 127.0.0.1
-- Généré le : mer. 24 sep. 2025 à 16:06
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12
>>>>>>> 0069097b9dc4aaed56e2598a409a885a3ee455cb

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
<<<<<<< HEAD
  `id_demande` int NOT NULL,
  `nature` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL
=======
  `id_demande` int(11) NOT NULL,
  `nature` varchar(100) DEFAULT NULL
>>>>>>> 0069097b9dc4aaed56e2598a409a885a3ee455cb
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `demande`
--

CREATE TABLE `demande` (
<<<<<<< HEAD
  `id_demande` int NOT NULL,
  `id_user` int DEFAULT NULL,
  `type` enum('conge','maladie','hsup') COLLATE utf8mb4_general_ci NOT NULL,
  `date_demande` date NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `statut_demande` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL
=======
  `id_demande` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `type` enum('conge','maladie','hsup') NOT NULL,
  `date_demande` date NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `statut_demande` varchar(50) DEFAULT NULL
>>>>>>> 0069097b9dc4aaed56e2598a409a885a3ee455cb
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hsup_spec`
--

CREATE TABLE `hsup_spec` (
<<<<<<< HEAD
  `id_demande` int NOT NULL,
  `heure_debut` time DEFAULT NULL,
  `heure_fin` time DEFAULT NULL,
  `heures` decimal(5,2) DEFAULT NULL
=======
  `id_demande` int(11) NOT NULL,
  `heure_debut` date DEFAULT NULL,
  `heure_fin` date DEFAULT NULL,
  `heures` int(50) DEFAULT NULL
>>>>>>> 0069097b9dc4aaed56e2598a409a885a3ee455cb
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `maladie_spec`
--

CREATE TABLE `maladie_spec` (
<<<<<<< HEAD
  `id_demande` int NOT NULL,
  `justificatif` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
=======
  `id_demande` int(11) NOT NULL,
  `justificatif` varchar(255) DEFAULT NULL
>>>>>>> 0069097b9dc4aaed56e2598a409a885a3ee455cb
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
<<<<<<< HEAD
  `id_user` int NOT NULL,
  `nom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `mail` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `statut` enum('au travail','en congés','malade') COLLATE utf8mb4_general_ci DEFAULT 'au travail',
  `poste` enum('salarié','cadre','alternant','stagiaire','mi-temps','admin','RH') COLLATE utf8mb4_general_ci DEFAULT 'salarié',
  `date_entree` date DEFAULT NULL,
  `solde_conge` int DEFAULT '0',
  `solde_hsup` int DEFAULT '0',
  `photo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'uploads/default.png',
  `mdp` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `nom`, `prenom`, `mail`, `statut`, `poste`, `date_entree`, `solde_conge`, `solde_hsup`, `photo`, `mdp`) VALUES
(1, 'Letellier', 'Ioni', 'ioni.letell@gmail.com', 'au travail', 'admin', '2024-09-09', 25, 10, 'gestion_tmp_travail/app/uploads/linkedin.jpg', 'Ioni2012$'),
(2, 'user', 'user', 'ioio@ze-com.com', 'au travail', 'RH', '2024-09-09', 25, 10, 'uploads/default.png', 'root'),
(3, 'user', 'user', 'user@gmail.com', 'au travail', 'salarié', '2024-09-09', 10, 20, 'uploads/default.png', 'root');

--
=======
  `id_user` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `mail` varchar(150) NOT NULL,
  `statut` varchar(50) DEFAULT NULL,
  `poste` varchar(50) DEFAULT NULL,
  `date_entree` date DEFAULT NULL,
  `solde_conge` int(11) DEFAULT 0,
  `solde_hsup` int(11) DEFAULT 0,
  `photo` varchar(255) DEFAULT NULL,
  `mdp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
>>>>>>> 0069097b9dc4aaed56e2598a409a885a3ee455cb
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
<<<<<<< HEAD
  MODIFY `id_demande` int NOT NULL AUTO_INCREMENT;
=======
  MODIFY `id_demande` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> 0069097b9dc4aaed56e2598a409a885a3ee455cb

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
<<<<<<< HEAD
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
=======
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> 0069097b9dc4aaed56e2598a409a885a3ee455cb

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
<<<<<<< HEAD
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
=======
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
>>>>>>> 0069097b9dc4aaed56e2598a409a885a3ee455cb
