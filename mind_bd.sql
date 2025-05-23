-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23/05/2025 às 04:17
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `mind_bd`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `like`
--

CREATE TABLE `like` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` varchar(191) NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `authorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `post`
--

INSERT INTO `post` (`id`, `title`, `content`, `image`, `publishedAt`, `updatedAt`, `authorId`) VALUES
(44, 'Por que o carro ainda é símbolo de liberdade e identidade no Brasil.', 'Mesmo com o avanço dos transportes por aplicativo e o crescimento do transporte público em grandes centros, o carro continua sendo mais do que um meio de locomoção: é um símbolo de liberdade,', '1747965153964-485642874.jpg', '2025-05-23 01:52:33.970', '2025-05-23 01:52:33.970', 10),
(45, 'Cuidar da saúde não é gasto, é investimento no seu maior patrimônio: você', 'A saúde é o bem mais valioso que temos — e ainda assim, muitas vezes só lembramos dela quando algo dá errado. A boa notícia é que pequenas atitudes diárias têm um impacto enorme na sua qualid', '1747965256007-869166405.jpg', '2025-05-23 01:54:16.089', '2025-05-23 01:54:16.090', 10),
(46, 'Ser dev é mais do que programar: é resolver problemas com lógica e criatividade', 'Na era digital, ser desenvolvedor vai muito além de escrever linhas de código. É ser a mente por trás das soluções que facilitam a vida de milhões. Cada sistema, aplicativo ou site que usamos', '1747965317868-938270238.jpg', '2025-05-23 01:55:17.874', '2025-05-23 01:55:17.874', 10),
(47, 'Não é sobre saber tudo, é sobre saber procurar: o poder do Google na vida dev', 'Todo dev já passou por isso: travar num erro, perder horas quebrando a cabeça, até que… uma busca simples no Google (ou Stack Overflow) resolve tudo. E tá tudo bem! A verdade é que programaçã', '1747966105307-485127986.jpg', '2025-05-23 02:08:25.437', '2025-05-23 02:08:25.437', 11),
(48, 'Soft skills: o que separa um dev júnior de um sênior não é só código', 'Muita gente acha que para ser um dev sênior basta dominar frameworks, bancos de dados e saber escalar sistemas complexos. Mas a realidade é que o que separa um júnior de um sênior vai além do', '1747966128996-883467743.png', '2025-05-23 02:08:49.004', '2025-05-23 02:08:49.004', 11),
(49, 'Todo bug tem uma causa. Encontrar é seu superpoder como dev', 'Poucas sensações no mundo dev são tão frustrantes quanto aquele erro misterioso que insiste em aparecer sem explicação. Mas também poucas são tão satisfatórias quanto encontrar a raiz do prob', '1747966170601-534087192.png', '2025-05-23 02:09:30.605', '2025-05-23 02:09:30.605', 11);

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `avatar` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `avatar`, `createdAt`, `updatedAt`) VALUES
(10, 'Matheus Rezende Borges', 'mrb123@teste.com', '$2b$10$A4vYD2h2mH6gxEHZymPsqubqn526/MKZvKKYPdCwWkI0o2vLOQjGy', '1747965667538-54326432.jpg', '2025-05-22 21:22:06.842', '2025-05-23 02:01:08.046'),
(11, 'Edgar', 'edgar@teste.com', '$2b$10$o7kNwXO4ftsPkpS7by1fXu2MMlyx1oNxdHRCUbNnAAn08WqZg7Sh.', '1747966202910-674797270.png', '2025-05-23 02:03:36.715', '2025-05-23 02:10:02.916');

-- --------------------------------------------------------

--
-- Estrutura para tabela `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('3ab094e3-f52a-4fa6-b50b-92e7adb8efa9', '80502083921f70f440d28034f61b4fd4d62701c2234bfe9b72e98ae9aec726b8', '2025-05-22 19:35:37.732', '20250522193523_add_cascade_delete', NULL, NULL, '2025-05-22 19:35:28.980', 1),
('ba9b6200-f185-4407-9b37-b14064cb6185', '952314c2e51d628da754e50b35d44e845292f3c81242fa571967bc33efefad9b', '2025-05-21 02:08:19.178', '20250521020807_add_avatar_to_user', NULL, NULL, '2025-05-21 02:08:11.139', 1),
('fd4818f0-f279-4672-8398-16c067d55f94', '573a5a685883543666ec183565b5c7e4ee92151d36e76d50b70874a03f95f47c', '2025-05-22 18:35:28.666', '20250522183524_add_likes', NULL, NULL, '2025-05-22 18:35:25.257', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `like`
--
ALTER TABLE `like`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Like_userId_postId_key` (`userId`,`postId`),
  ADD KEY `Like_postId_fkey` (`postId`);

--
-- Índices de tabela `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Post_authorId_fkey` (`authorId`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Índices de tabela `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `like`
--
ALTER TABLE `like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
