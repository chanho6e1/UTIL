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
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `is_private` bigint DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `goal_id` bigint DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FKaff6xhxcugvvslg4nyjgx5xmx` (`goal_id`),
  CONSTRAINT `FKaff6xhxcugvvslg4nyjgx5xmx` FOREIGN KEY (`goal_id`) REFERENCES `goal` (`goal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'2023-02-02 10:05:05.882733','2023-02-09 09:19:16.477926','<p>과연 쌔다 수정</p>',0,'2023년 02월 02일',226),(2,'2023-02-02 10:05:38.467909','2023-02-02 10:05:38.467909','친구 내 친구야',0,'어께 동무 어께 동무',226),(3,'2023-02-02 10:07:01.692037','2023-02-02 10:07:01.692037','두한아 넌 장군의 아들이다!',0,'일어나 일어나라 김두한',226),(6,'2023-02-02 10:07:01.692037','2023-02-02 10:07:01.692037','test',0,'test',262),(7,'2023-02-03 10:07:01.692037','2023-02-03 10:07:01.692037','test1',0,'test1',262),(23,'2023-02-06 22:37:00.635291','2023-02-06 22:37:00.635291','string',NULL,'string',238),(24,'2023-02-06 22:57:54.124350','2023-02-06 22:57:54.124350','string',NULL,'string',238),(25,'2023-02-06 23:11:28.731109','2023-02-06 23:11:28.731109','<p>nhfgnfhg</p>',NULL,'2023년 1월 6일 회고록',308),(26,'2023-02-07 08:57:18.874953','2023-02-07 08:57:18.874953','<p>ㄹㅈㄷ</p>',NULL,'2023년 1월 7일 회고록',311),(27,'2023-02-07 14:52:06.989126','2023-02-09 09:19:27.153004','<p>이게 회고록이지</p>',NULL,'2023년 02월 07일',226),(28,'2023-02-07 15:50:23.696918','2023-02-07 15:50:23.696918','<p>념념굿</p>',NULL,'2023년 1월 7일 회고록',301),(29,'2023-02-08 13:34:12.604190','2023-02-08 13:34:12.604190','<p>gsergre</p>',NULL,'2023년 1월 8일 회고록',315),(31,'2023-02-08 14:46:31.739090','2023-02-08 14:46:31.739090','<p>글작성글작성</p>',NULL,'2023년 1월 8일 회고록',300),(34,'2023-02-09 12:58:40.868980','2023-02-09 12:58:40.868980','<p>회고록</p>',NULL,'2023년 1월 9일 회고록',300),(35,'2023-02-09 13:05:36.891189','2023-02-09 13:05:36.891189','<p>jfj</p>',NULL,'2023년 1월 9일 회고록',332),(36,'2023-02-09 13:06:08.278801','2023-02-09 13:06:08.278801','<p>grsegrse</p>',NULL,'2023년 1월 9일 회고록',334),(37,'2023-02-09 13:23:11.196360','2023-02-09 13:23:11.196360','<p>회고록입니다.</p>',NULL,'2023년 1월 9일 회고록',335),(38,'2023-02-09 13:55:14.830011','2023-02-09 13:55:14.830011','<p>사-랑-해-요</p><p><br></p>',NULL,'2023년 1월 9일 회고록',336),(39,'2023-02-09 13:55:54.821228','2023-02-09 13:55:54.821228','<p>회고록이야</p>',NULL,'2023년 1월 9일 회고록',336),(40,'2023-02-09 22:47:02.747376','2023-02-09 22:47:02.747376','<p>오늘 공부하는게 어려웠다.</p>',NULL,'2023년 1월 9일 회고록',336),(41,'2023-02-10 11:43:09.718801','2023-02-10 11:43:09.718801','<p>TEWRER</p>',NULL,'2023년 1월 10일 회고록',349),(42,'2023-02-10 15:32:44.607922','2023-02-10 15:32:44.607922','<p>ㅎㄴㄷㄱㅎㄷ</p>',NULL,'2023년 2월 10일 회고록',334),(43,'2023-02-13 15:30:16.204330','2023-02-13 15:30:16.204330','<h1>오늘의 회고록</h1><p>얍얍</p>',NULL,'2023년 2월 13일 회고록',357);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-14 15:56:33
