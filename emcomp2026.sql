-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 23/07/2026 às 13:51
-- Versão do servidor: 8.4.7
-- Versão do PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `emcomp2026`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cronograma`
--

DROP TABLE IF EXISTS `cronograma`;
CREATE TABLE IF NOT EXISTS `cronograma` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` date DEFAULT NULL,
  `horario` time DEFAULT NULL,
  `atividade` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `formato` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LocalLink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `cronograma`
--

INSERT INTO `cronograma` (`id`, `data`, `horario`, `atividade`, `formato`, `LocalLink`) VALUES
(1, '2026-10-26', '08:30:00', 'Abertura da Semana de Tecnologia', 'Presencial', 'Auditório Principal'),
(2, '2026-10-26', '14:00:00', 'Palestra: Introdução ao Desenvolvimento Web', 'Online', 'https://meet.google.com/segunda-web'),
(3, '2026-10-27', '09:00:00', 'Workshop: Dominando Banco de Dados SQL', 'Presencial', 'Laboratório 2'),
(4, '2026-10-27', '16:00:00', 'Mentoria Coletiva: Modelagem de Dados', 'Online', 'https://zoom.us/j/terca-dados'),
(5, '2026-10-28', '10:00:00', 'Mesa Redonda: O Papel das IAs no Mercado Atual', 'Híbrido', 'Auditório Central / https://youtube.com/quarta-ia'),
(6, '2026-10-28', '15:30:00', 'Minicurso: Criando APIs com Node.js e Express', 'Presencial', 'Laboratório 5'),
(7, '2026-10-29', '11:00:00', 'Palestra: Autenticação e Segurança em Aplicações', 'Online', 'https://teams.microsoft.com/quinta-seg'),
(8, '2026-10-29', '14:00:00', 'Bootcamp: Praticando React do Zero', 'Presencial', 'Laboratório 3'),
(9, '2026-10-30', '09:30:00', 'Apresentação dos Projetos Integradores', 'Híbrido', 'Salão de Eventos / https://youtube.com/sexta-projetos'),
(10, '2026-10-30', '17:00:00', 'Painel de Encerramento e Network Coquetel', 'Presencial', 'Saguão do Bloco B');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cursos`
--

DROP TABLE IF EXISTS `cursos`;
CREATE TABLE IF NOT EXISTS `cursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ministrantes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cargahoraria` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vagas` int DEFAULT NULL,
  `descri` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `tipo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nivel` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantDias` int DEFAULT NULL,
  `local` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `cursos`
--

INSERT INTO `cursos` (`id`, `nome`, `foto`, `ministrantes`, `cargahoraria`, `vagas`, `descri`, `tipo`, `nivel`, `quantDias`, `local`) VALUES
(1, 'Currículo Lattes: Do Cadastro à Gestão da Produção Acadêmica', 'Deivid(site).png', 'Deivid Barbosa Maia e Helen Dessa', '5', 0, 'effffffffffffffffffffffffffffffffffffffffffff', 'Online', 'Entusiasta', 2, 'Google Meet'),
(2, 'Uso de Agentes de IA na Criação de MVP’s', 'eduardo e gabrielreis(site).png', 'Eduardo Veronezi e Gabriel Reis', '3', 20, 'effffffffffffffffffffffffffffffffffff', 'Presencial', 'Entusiasta', 1, NULL),
(4, 'Java: Introdução à Programação Orientada a Objetos', 'foto ronald e lucas(site).png', 'Lucas Abreu Silveira e Ronald Carneiro Junior', '9', 10, 'effffffffffffffffffffffffffffffffffff', 'Presencial', 'Basico', 3, NULL),
(5, 'Introdução Git e Git Hub', 'gustavo e maria (site).png', 'Gustavo Maximiano Batista e Maria Luciana Teixeira', '5', 20, 'effffffffffffffffffffffffffffffffffff', 'Presencial', 'Basico', 2, NULL),
(6, 'Introdução a Lógica de Programação', 'icaro e otero(site).png', 'Gabriel Otero Freire e Ícaro de Andrade Honório', '8', 16, 'effffffffffffffffffffffffffffffffffff', 'Online', 'Medio', 2, 'Google Meet'),
(7, 'Como se Destacar no Mercado de Trabalho', 'Junior (site).jpeg', 'Maria Eduarda Silva Souza e  Junio Paulino Silva', '4', 0, 'effffffffffffffffffffffffffffffffffff', 'Online', 'Medio', 2, 'Google Meet'),
(10, 'Introdução ao Arduino: Lógica e Prática de Circuitos', 'rodrigo e emanuel (site).png', 'Rodrigo Miranda e Emanuel Ribeiro', '6', 10, 'effffffffffffffffffffffffffffffffffff', 'Presencial', 'Avancado', 2, 'Laboratório Redes'),
(11, 'Introdução a Montagem e Manutenção e Formatação de Computadores', 'vinicius e gabriel (site).png', 'Gabriel Amaral dos Reis e Vinicius dos Santos Oliveira Alves', '9', 12, 'effffffffffffffffffffffffffffffffffff', 'Presencial', 'Avancado', 3, 'Laboratório Hardware');

-- --------------------------------------------------------

--
-- Estrutura para tabela `data_crono`
--

DROP TABLE IF EXISTS `data_crono`;
CREATE TABLE IF NOT EXISTS `data_crono` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` date DEFAULT NULL,
  `HoraIni` time DEFAULT NULL,
  `HoraFim` time DEFAULT NULL,
  `id_curso` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_curso` (`id_curso`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `data_crono`
--

INSERT INTO `data_crono` (`id`, `data`, `HoraIni`, `HoraFim`, `id_curso`) VALUES
(1, '2026-10-26', '08:00:00', NULL, 1),
(2, '2026-10-27', NULL, NULL, 1),
(3, '2026-10-28', NULL, NULL, 2),
(4, '2026-10-29', NULL, NULL, 10),
(5, '2026-10-30', NULL, NULL, 10),
(6, '2026-10-26', '14:00:00', NULL, 11),
(7, '2026-10-27', NULL, NULL, 11),
(8, '2026-10-28', NULL, NULL, 11),
(9, '2026-10-26', NULL, NULL, 6),
(10, '2026-10-27', NULL, NULL, 6),
(11, '2026-10-28', NULL, NULL, 7),
(12, '2026-10-29', NULL, NULL, 7),
(13, '2026-10-26', NULL, NULL, 4),
(14, '2026-10-27', NULL, NULL, 4),
(15, '2026-10-28', NULL, NULL, 4),
(16, '2026-10-29', NULL, NULL, 5),
(17, '2026-10-30', NULL, NULL, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `palestra`
--

DROP TABLE IF EXISTS `palestra`;
CREATE TABLE IF NOT EXISTS `palestra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `palestrante` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tema` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descri` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `data` date DEFAULT NULL,
  `horario` time DEFAULT NULL,
  `local` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modalidade` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `palestra`
--

INSERT INTO `palestra` (`id`, `nome`, `palestrante`, `foto`, `status`, `tema`, `descri`, `data`, `horario`, `local`, `modalidade`) VALUES
(1, 'Fórmula Secreta do Sucesso', 'Sheldon J. Plankton', 'plank.png', 'Ex-aluno', 'Empreendedorismo e Espionagem Industrial', 'Uma análise profunda sobre como superar a concorrência e obter fórmulas de sucesso no mercado alimentício.', '2026-10-26', '14:00:00', 'Auditório Balde de Lixo', 'Presencial'),
(2, 'Maximização de Lucros e Economia', 'Eugene H. Sirigueijo', 'caranguejo.jpg', 'Professor', 'Finanças e Gestão de Negócios', 'Aprenda técnicas avançadas para economizar cada centavo e transformar pequenos negócios em impérios milionários.', '2026-10-27', '16:00:00', 'Salão de Convenções Siri Cascudo', 'Online'),
(3, 'A Arte da Atitude Positiva no Trabalho', 'Bob Esponja Calça Quadrada', 'bob.png', 'Externo ao campus', 'Motivação e Recursos Humanos', 'Como manter o entusiasmo diário, alcançar a excelência no atendimento ao cliente e ser o funcionário do mês consecutivamente.', '2026-10-28', '09:00:00', 'Auditório Central da Fenda do Biquíni', 'Online'),
(4, 'Estilo de Vida e Minimalismo Extremo', 'Patrick Estrela', 'patrick.jpg', 'Professor', 'Desenvolvimento Pessoal', 'Uma palestra disruptiva sobre os benefícios de não fazer absolutamente nada e como alcançar a paz interior sob uma rocha.', '2026-10-29', '11:00:00', 'Espaço Cultural da Fenda', 'Presencial'),
(5, 'Direção Defensiva e Controle de Danos', 'Sra. Poppy Puff', 'puf.webp', 'Ex-Professor', 'Segurança e Legislação', 'Estratégias fundamentais para sobrevivência no trânsito, controle de ansiedade ao volante e como evitar colisões catastróficas.', '2026-10-30', '15:30:00', 'Escola de Pilotagem da Sra. Puff', 'Presencial');

-- --------------------------------------------------------

--
-- Estrutura para tabela `patrocinador`
--

DROP TABLE IF EXISTS `patrocinador`;
CREATE TABLE IF NOT EXISTS `patrocinador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `patrocinador`
--

INSERT INTO `patrocinador` (`id`, `nome`, `foto`) VALUES
(1, 'Nushape', 'Nushape.jpeg'),
(2, 'Brasil Hiphop', 'Brasil Hiphop.jpeg'),
(3, 'Hollywood Games', 'Hollywood Games.jpeg'),
(4, 'Capim de Minas', 'Capim de Minas.jpeg'),
(5, 'milgrau', 'milgrau.jpg'),
(6, 'Via Ternos', 'Via Ternos.jpeg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
