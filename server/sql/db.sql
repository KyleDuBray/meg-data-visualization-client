-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema meg
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema meg
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `meg` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `meg` ;

-- -----------------------------------------------------
-- Table `meg`.`project`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meg`.`project` ;

CREATE TABLE IF NOT EXISTS `meg`.`project` (
  `project_id` INT NOT NULL AUTO_INCREMENT,
  `project_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`project_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `meg`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meg`.`user` ;

CREATE TABLE IF NOT EXISTS `meg`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `organization` VARCHAR(255) NULL DEFAULT NULL,
  `password` CHAR(60) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `meg`.`event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meg`.`event` ;

CREATE TABLE IF NOT EXISTS `meg`.`event` (
  `event_id` INT NOT NULL AUTO_INCREMENT,
  `raw_event_data` LONGBLOB NOT NULL,
  `event_type` VARCHAR(45) NULL DEFAULT NULL,
  `project_id` INT NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  INDEX `fk_project_id_idx` (`project_id` ASC) VISIBLE,
  INDEX `fk_project_id_event_idx` (`project_id` ASC) VISIBLE,
  INDEX `fk_user_id_event_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_project_id_event`
    FOREIGN KEY (`project_id`)
    REFERENCES `meg`.`project` (`project_id`),
  CONSTRAINT `fk_user_id_event`
    FOREIGN KEY (`user_id`)
    REFERENCES `meg`.`user` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `meg`.`notification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meg`.`notification` ;

CREATE TABLE IF NOT EXISTS `meg`.`notification` (
  `notification_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `message` VARCHAR(240) NOT NULL,
  `read` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`notification_id`),
  INDEX `fk_user_id_notification_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_id_notification`
    FOREIGN KEY (`user_id`)
    REFERENCES `meg`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `meg`.`works_on`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meg`.`works_on` ;

CREATE TABLE IF NOT EXISTS `meg`.`works_on` (
  `works_on_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  `is_admin` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`works_on_id`),
  INDEX `fk_project_id_idx` (`project_id` ASC) VISIBLE,
  INDEX `fk_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_project_id`
    FOREIGN KEY (`project_id`)
    REFERENCES `meg`.`project` (`project_id`),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `meg`.`user` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;