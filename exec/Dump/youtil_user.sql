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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `department` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discriptioin` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nick_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2023-01-30 14:15:27.892482','2023-02-08 09:09:44.238314','SSAFY','토르뇸뇸뇸','gml05211@gmail.com','c10fdeb0-3265-4128-8970-752592390467122.jpg','o6e1',NULL,'google','112536743349016552421','박찬희[구미_2반_D210]'),(4,'2023-01-30 21:03:40.739816','2023-02-14 15:35:33.531037','구미 SSAFY','안녕하세요 송기훈입니다.','kihunbuzz@naver.com','e34d37ec-5b4a-47a7-9de6-146e23f1ef52ile.png','songkihun',NULL,'kakao','2644071532','송기훈'),(7,'2023-01-31 00:09:07.907278','2023-02-11 22:33:19.250012','ssafy','10조 화이팅','gms942400@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg','nylee',NULL,'google','118262321105110447764','이나연'),(9,'2023-01-31 13:18:08.616351','2023-02-14 13:29:14.234964','','','ai06010@naver.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg','HJ',NULL,'kakao','2642935209','남현지'),(10,'2023-01-31 16:27:22.254144','2023-02-04 16:58:31.258979','tst','string','gms9424@naver.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg','string',NULL,'kakao','2644234426','이나연'),(11,'2023-02-02 09:36:34.314329','2023-02-08 17:16:50.240342','싸피','칙칙이붐','totolo312@naver.com','fe9f00f0-7238-4761-b371-861de661aca313.jfif','칙칙이',NULL,'kakao','2647409272','칙칙이'),(13,'2023-02-04 18:57:15.822531','2023-02-13 22:28:43.266204','string','','voxifera@naver.com','13bf4904-1d28-4f95-bb64-b64653202e6eete.png','싸피화이ㅋ',NULL,'kakao','2638361553','김동주'),(14,'2023-02-05 00:52:27.168638','2023-02-05 00:52:27.168638',NULL,NULL,'gn05211@naver.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg',NULL,NULL,'naver','taS-lM4Z4rhYAtTKulo3SbRpLzQdkLDo4_-81phlAoY','박찬희'),(15,'2023-02-05 02:34:43.785328','2023-02-05 02:34:43.785328',NULL,NULL,'gml05211@naver.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg',NULL,NULL,'naver','coG3P7zV8RNz8HGx8nDN7zhU8KjAO6YAnBJS4t8CiUI','박찬희'),(16,'2023-02-05 14:27:55.355884','2023-02-05 14:27:55.355884',NULL,NULL,'avjg123@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg',NULL,NULL,'google','115186051777558896583','이흥종[구미_1반_D106]팀원'),(17,'2023-02-05 14:51:18.182392','2023-02-05 16:07:11.100462','SSAFY','하윙','gn05211@gmail.com','4cce51d3-c2a5-4a4b-850f-b57c9bb97376172.jpg','차차차니',NULL,'google','102519653980983973526','박찬희'),(18,'2023-02-05 23:24:42.553908','2023-02-05 23:24:42.553908',NULL,NULL,'correct127676@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg',NULL,NULL,'google','103759715623967608616','박재현[구미_1반_D105]팀원'),(19,'2023-02-06 03:56:01.782626','2023-02-09 01:48:26.091394','하하하','하하하','2heedol@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg','God',NULL,'google','111639697385545395988','이희수'),(20,'2023-02-06 09:59:13.182030','2023-02-13 09:47:18.689505','ssafy','','ai06010@gmail.com','4dcc2d5b-3dc5-4829-9337-34dd8a6485f5920.png','현지',NULL,'google','109658562433111819306','HJ'),(21,'2023-02-06 12:44:23.466387','2023-02-08 09:08:43.076537','','','shine7065@naver.com','6782452a-9edb-49da-8728-1e24d6594f19172.jpg','thorthor',NULL,'kakao','2628799501','박찬희'),(22,'2023-02-09 13:02:19.161894','2023-02-09 13:04:32.785661','지브리','토토로','totolossafy@gmail.com','882cc380-f011-494e-9846-02134278ce23hfh.jpg','totolo',NULL,'google','114300439896200705280','최지훈'),(23,'2023-02-09 13:14:24.158469','2023-02-09 13:41:14.374956','SSAFY','안녕하세요!','jook1356a@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg','김동주',NULL,'google','113985273259800307672','Dong Ju Kim'),(24,'2023-02-10 11:41:18.934526','2023-02-10 11:41:18.934526',NULL,NULL,'eaea7314@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg',NULL,NULL,'google','112429820157532559499','[구미_1반_이동엽]'),(25,'2023-02-10 20:45:46.857501','2023-02-10 20:45:46.857501',NULL,NULL,'songsindorim@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg',NULL,NULL,'google','105905752732296361268','송기훈'),(26,'2023-02-11 20:06:28.854332','2023-02-11 20:06:28.854332',NULL,NULL,'smhong2358@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg',NULL,NULL,'google','105914960071042096362','홍성민[구미_2반_D204]팀장'),(27,'2023-02-12 14:41:57.668898','2023-02-12 14:41:57.668898',NULL,NULL,'kskw25@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg',NULL,NULL,'google','100011362767740734472','김종혁[구미_1반_D111]'),(28,'2023-02-12 19:58:34.178629','2023-02-12 19:58:34.178629',NULL,NULL,'201601367@hufs.ac.kr','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg',NULL,NULL,'google','101646585431762140997','‍박주현[졸업생 / 경영학전공]'),(30,'2023-02-13 23:24:39.092056','2023-02-13 23:36:09.330966','','','jook1356@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg','가갸각',NULL,'google','102851211346175066217','김동주'),(31,'2023-02-13 23:53:39.491932','2023-02-13 23:54:30.955213','','','jook1356b@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg','dsa',NULL,'google','101352377776601142351','김동주'),(32,'2023-02-14 15:18:38.393726','2023-02-14 15:19:17.770408','hihi','hihi','ssafymailjh@gmail.com','cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg','hihi',NULL,'google','101029529264409914105','google mail');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-14 15:56:34
