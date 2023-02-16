CREATE DATABASE  IF NOT EXISTS `youtil` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `youtil`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: i8d210.p.ssafy.io    Database: youtil
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo` (
  `todo_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `due_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` bit(1) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `goal_id` bigint DEFAULT NULL,
  PRIMARY KEY (`todo_id`),
  KEY `FK2ekhn9fdkc3sekb6lmtbk9uec` (`goal_id`),
  CONSTRAINT `FK2ekhn9fdkc3sekb6lmtbk9uec` FOREIGN KEY (`goal_id`) REFERENCES `goal` (`goal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=239 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo`
--

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;
INSERT INTO `todo` VALUES (55,'2023-02-02 09:41:34.306574','2023-02-10 16:33:07.038919','이게 1번','2023-01-31T00:00:00.000Z',_binary '','1번 할일',226),(56,'2023-02-02 09:41:43.942026','2023-02-10 16:33:14.356156','이게 2번ㅇㅇ','2023-01-26T00:00:00.000Z',_binary '','2번이라고',226),(57,'2023-02-02 09:42:02.451620','2023-02-14 13:15:37.841101','이게 3번ㅇㅇ','2023-02-01T00:00:00.000Z',_binary '','3번 할일',226),(68,'2023-02-02 12:20:21.168057','2023-02-10 17:45:56.854046','stringgsererfdasf','2023-05-25T00:00:00.000Z',_binary '\0','stringgsergrsejkl',238),(73,'2023-02-02 15:52:50.112632','2023-02-14 14:22:16.632313','sdaflkjasdjflksadjfjdaslkadfjlkadjfkjasdfjlkadjfkdsjafjkadfjlkadjfkajsdfjasdkld','2022-12-31T00:00:00.000Z',_binary '\0','dsafsdfasdf',241),(74,'2023-02-02 16:46:04.749524','2023-02-07 15:33:45.187791','fdsa','2022-12-12T00:00:00.000Z',_binary '\0','fsdafsd',238),(81,'2023-02-03 09:34:06.504412','2023-02-10 17:06:10.986071','목표','2023-03-16',_binary '\0','1번째',244),(82,'2023-02-03 09:34:25.642787','2023-02-10 17:06:09.918447','ㅋ','2023-03-09',_binary '\0','2번째',244),(114,'2023-02-04 19:45:54.600861','2023-02-04 19:45:54.600861','string111','string',_binary '\0','string',274),(115,'2023-02-04 19:45:58.321187','2023-02-04 19:45:58.321187','string111','string',_binary '\0','string',274),(116,'2023-02-05 14:28:47.971760','2023-02-05 14:28:57.082087','','2023-02-05',_binary '','신기하다',277),(117,'2023-02-06 10:13:14.317652','2023-02-09 12:57:56.742240','','2023-03-01T00:00:00.000Z',_binary '','공부한다',300),(122,'2023-02-06 16:19:26.677742','2023-02-14 14:22:16.632530','알았죠?','2023-01-04T00:00:00.000Z',_binary '\0','이것도 추가해요',241),(123,'2023-02-06 16:19:35.862759','2023-02-14 14:22:16.632653','이히히','2023-01-04T00:00:00.000Z',_binary '\0','다음꺼도 추가해요',241),(130,'2023-02-06 23:10:34.199369','2023-02-06 23:11:14.296370','adsf','2023-02-06',_binary '','dfsaf',308),(133,'2023-02-07 08:52:55.999258','2023-02-07 08:56:53.116967','ㄱㄷ','2023-02-07',_binary '','Track 1',311),(134,'2023-02-07 08:53:05.375909','2023-02-07 08:55:56.381264','ㄱㄷㄴ','2023-02-07',_binary '','Track 2',311),(138,'2023-02-07 10:28:21.922154','2023-02-14 12:53:29.246838','123124','2023-02-18',_binary '','북마크 탭 만들기',253),(139,'2023-02-07 12:04:07.142622','2023-02-07 23:13:22.930974','ser','2023-02-07',_binary '','resger',315),(140,'2023-02-07 12:04:09.715997','2023-02-07 21:45:46.940429','srgrse','2023-02-07',_binary '','grsegserger',315),(141,'2023-02-07 12:04:12.001936','2023-02-07 21:33:43.887935','gesrgser','2023-02-07',_binary '','gserger',315),(142,'2023-02-07 12:04:42.361059','2023-02-07 12:07:27.673556','fewfwe','2023-02-07',_binary '','fawef',315),(143,'2023-02-07 12:04:44.959192','2023-02-07 21:33:46.842174','fewfawe','2023-02-07',_binary '','fewawe',315),(144,'2023-02-07 12:04:45.142790','2023-02-07 13:44:02.065163','fewfawe','2023-02-07',_binary '','fewawe',315),(145,'2023-02-07 12:05:07.977959','2023-02-08 00:21:14.932017','grsegser','2023-02-07',_binary '','gsergse',315),(146,'2023-02-07 12:05:12.560916','2023-02-08 00:21:25.772853','gserr','2023-02-07',_binary '','g',315),(147,'2023-02-07 15:34:11.243049','2023-02-07 15:34:23.065458','2123158','2023-03-20',_binary '','하이',303),(148,'2023-02-07 15:49:29.268608','2023-02-07 15:49:33.714461','건초 많이많이','2023-02-12',_binary '\0','토르 밥',301),(149,'2023-02-07 15:52:23.040764','2023-02-07 15:56:28.827447','건초 마니마니','2023-02-27',_binary '\0','토르 밥',316),(151,'2023-02-07 15:56:48.241876','2023-02-10 16:40:48.732192','??','2023-01-08T00:00:00.000Z',_binary '','6번?',226),(152,'2023-02-07 16:17:27.550580','2023-02-10 16:33:01.138693','ㅋㅋ','2023-01-08T00:00:00.000Z',_binary '','스크롤',226),(153,'2023-02-07 23:00:18.756657','2023-02-08 13:33:31.759484','few','2023-02-06',_binary '','fewfw',315),(156,'2023-02-08 14:42:37.828500','2023-02-09 09:58:41.279323','메모메모','2023-02-09T00:00:00.000Z',_binary '','투두투두',300),(159,'2023-02-09 08:52:48.596625','2023-02-09 12:53:42.603084','워워','2023-02-13',_binary '','빗질1',326),(198,'2023-02-09 12:51:10.113961','2023-02-13 09:29:54.709936','1만원 적금하기','2023-02-09T00:00:00.000Z',_binary '','적금하기',254),(199,'2023-02-09 12:55:59.887225','2023-02-09 12:56:03.206296','','2023-02-09',_binary '\0','미팅',333),(200,'2023-02-09 13:05:27.296917','2023-02-09 13:05:29.026323','jft','2023-02-09',_binary '','jfjj',332),(201,'2023-02-09 13:05:58.126747','2023-02-10 15:32:35.626911','kgh','2023-09-21',_binary '','jftjftj',334),(202,'2023-02-09 13:06:01.004702','2023-02-10 15:30:17.581995','hdrtgrsege','2023-09-21',_binary '','hdrthdhrt',334),(203,'2023-02-09 13:20:16.795892','2023-02-09 13:21:37.671015','','2023-02-09',_binary '','트랙 1 ',335),(204,'2023-02-09 13:20:21.969467','2023-02-09 13:20:45.690751','','2023-02-10T00:00:00.000Z',_binary '\0','트랙 2',335),(205,'2023-02-09 13:51:46.226136','2023-02-09 13:54:44.625425','','2023-02-22T00:00:00.000Z',_binary '','ㅁㄴㅇㄹㅋㅌㅊ',336),(206,'2023-02-09 13:51:55.291384','2023-02-09 13:55:21.189062','ㅂㅈㄷ','2023-02-22T00:00:00.000Z',_binary '','ㄷㅈㄷㄹ',336),(207,'2023-02-09 13:52:01.191764','2023-02-09 22:43:49.608545','ㅁㄴㅌㅊㅋㅌㅍㅈㄷ','2023-02-22T00:00:00.000Z',_binary '','ㅁㄴㅇㅍㅋㅌㅊㅍ',336),(208,'2023-02-09 13:52:10.967684','2023-02-11 13:53:28.107800','','2023-01-30T00:00:00.000Z',_binary '\0','ㅍㅁㄴㅇㅍㅋㅌㅊ ',337),(209,'2023-02-09 13:52:16.912389','2023-02-11 13:53:28.107982','ㅋㅌㅊㅍ','2023-02-11T00:00:00.000Z',_binary '\0','ㅍㄱㅁㅋㅌㅊ',337),(210,'2023-02-09 13:52:23.146141','2023-02-09 22:50:58.900314','','2022-12-26T00:00:00.000Z',_binary '\0','ㅇㄷㅈㅈㄹㄷ',338),(213,'2023-02-09 13:57:33.515095','2023-02-10 15:30:16.781820','sergser','2023-09-21',_binary '','gserg',334),(214,'2023-02-09 13:57:37.294255','2023-02-10 14:52:53.583164','sergser','2023-09-21T00:00:00.000Z',_binary '','gserg',334),(215,'2023-02-09 13:57:48.002809','2023-02-10 14:52:53.073631','ㅎㄴㄷㄱ','2023-09-21T00:00:00.000Z',_binary '','grsegrse탘',334),(217,'2023-02-09 15:06:14.111453','2023-02-10 16:33:02.363880','asdf','2023-01-08T00:00:00.000Z',_binary '','asdf',226),(219,'2023-02-10 11:42:54.421825','2023-02-10 11:42:58.879807','RETRE','2023-02-10',_binary '\0','TREWT',349),(225,'2023-02-11 20:07:52.600166','2023-02-11 20:08:16.350474','ㅊㄴㅎㄴㅎㄴ','2023-02-11',_binary '','ㅎㅇㅇㅎㅇㅎ',355),(226,'2023-02-11 23:50:23.494001','2023-02-14 09:04:17.047948','hhdfg','2023-01-10T00:00:00.000Z',_binary '','gfh',347),(227,'2023-02-13 09:19:14.115043','2023-02-13 09:19:14.115043',NULL,'2023-02-13',_binary '\0','ucc 촬영',352),(229,'2023-02-13 15:20:35.254082','2023-02-13 15:20:38.891753','앤트맨2 정주행','2023-02-13',_binary '','앤트맨2',357),(230,'2023-02-13 15:29:27.080394','2023-02-13 15:29:28.634016','22','2023-02-13',_binary '','앤트맨2-1',357),(231,'2023-02-14 09:07:58.701943','2023-02-14 09:07:59.885149','fre','2023-01-25',_binary '','frse',350),(232,'2023-02-14 09:08:15.727060','2023-02-14 09:08:17.123591','fawe','2023-02-10',_binary '','few',351),(233,'2023-02-14 09:08:16.128134','2023-02-14 09:08:18.751641','fawe','2023-02-10',_binary '','few',351),(234,'2023-02-14 09:08:46.466863','2023-02-14 09:08:47.443277','gse','2023-02-14',_binary '','gser',368),(237,'2023-02-14 09:21:03.286915','2023-02-14 09:23:42.104195','ㅎㅎㄴㄷㄱㅎㄱㄷ','2023-01-19T00:00:00.000Z',_binary '\0','ㄱㄴㄷ',371),(238,'2023-02-14 15:24:41.789345','2023-02-14 15:25:03.546068','ㅇㅇㅇㅇ','2023-02-14',_binary '','ㅇㅇㅇ',372);
/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-14 15:56:36
