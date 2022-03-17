/*
 Navicat Premium Data Transfer

 Source Server         : A
 Source Server Type    : MySQL
 Source Server Version : 100413
 Source Host           : localhost:3306
 Source Schema         : dosare

 Target Server Type    : MySQL
 Target Server Version : 100413
 File Encoding         : 65001

 Date: 09/02/2022 19:29:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for penas
-- ----------------------------
DROP TABLE IF EXISTS `penas`;
CREATE TABLE `penas`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `project_id` int(10) NULL DEFAULT NULL,
  `type` int(1) NULL DEFAULT NULL,
  `procent_zi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `asupra` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dela` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pana_la` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `zile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `suma` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of penas
-- ----------------------------
INSERT INTO `penas` VALUES (36, 9, 1, '0,20', '22.983,92', '01.02.2022', 'data plății', '27', '1.241,13', '2022-02-08 12:16:00', '2022-02-09 16:11:56');
INSERT INTO `penas` VALUES (37, 9, 2, '0,20', '4.592,03', '03.04.2021', '21.01.2022', '294', '2.700,11', '2022-02-08 12:16:00', '2022-02-09 17:30:29');

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `dosar_nr` int(10) NULL DEFAULT NULL,
  `dosar_an` int(4) NULL DEFAULT NULL,
  `data_deschidere` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Step1',
  `instanta` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `adresa_instanta` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `creditor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `adresa_creditor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `debitor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `adresa_debitor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cui` int(10) NULL DEFAULT NULL,
  `titlul_executoriu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `inscrisuri` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `format_titlu_executoriu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cheltuieli_judecata` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `debit` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `taxa_timbru` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `data_poprire` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Step2',
  `data_incuviintare` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total_penalitati` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `debit_plus_penalitati` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `onorariu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cheltuieli_materiale` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `onorariu_avocat` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total_cheltuieli` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total_somatie` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `banca` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `adresa_banca` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `data_eliberare` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Step3',
  `data_recipisa` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `suma_consmnata` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `recipisa_nr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `suma_creditor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `op_nr_creditor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `suma_cheltuieli` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `op_nr_cheltuieli` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nr_ff` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `data_incetare` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO `projects` VALUES (9, 88, 2022, '08.02.2022', 'Sectorului 1', 'Buftea, str. Ştirbei Vodă, nr. 24, judeţ Ilfov', 'ANDREI FLORIN', 'București, str. Unirii, nr. 3, et. 3-5, ap. 19, sector 3', 'ȘTEFAN DROBOTĂ', 'București, bd. Constituției, nr. 7E, sc. 8, ap. 10, sector 5', 3243283, 'Sentința Civilă 23823/2021 pronunțată de Judecătoria Buftea definitivă prin neapelare', 'Împuternicire avocațială nr. 323128/2022', 'copie legalizată', '1.390,00 lei, reprezentând cheltuieli de judecată', '22.983,92 lei, reprezentând debit', '20,00', '27.02.2022', '12.02.2022', '3.941,24', '28.315,16', '3.369,50', '1.428,00', '2.975,00', '7.792,50', '36.107,66', 'BANCA COMERCIALĂ ROMÂNĂ S.A.', 'Bucureşti, Calea Plevnei nr. 159, Business Garden Bucharest, cladirea A, etajul 6, sector 6', '03.03.2022', '02.03.2022', '36.117,95', 'BREL000123489820', '31.310,16', '1203', '4.797,50', '1202', '2322', '04.03.2022', '2022-02-08 12:16:00', '2022-02-09 17:30:29');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp(0) NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (5, 'CupidGracer', 'cupidgracer@gmail.com', NULL, '$2y$10$izmc6yhBsPYOfiSiSjSo9.TSa1uk/WZZpi2XQ3SU.wH5bLO0pK.Ym', NULL, '2022-02-04 06:49:11', '2022-02-04 06:49:11');

SET FOREIGN_KEY_CHECKS = 1;
