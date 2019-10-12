SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tasks
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tasks` ;
CREATE SCHEMA IF NOT EXISTS `tasks` DEFAULT CHARACTER SET utf8 ;

-- -----------------------------------------------------
-- Schema users
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `users` ;
CREATE SCHEMA IF NOT EXISTS `users` DEFAULT CHARACTER SET utf8 ;
USE `tasks` ;

-- -----------------------------------------------------
-- Table `users`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users`.`users` ;

CREATE TABLE IF NOT EXISTS `users`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `tasks`.`user_tasks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tasks`.`user_tasks` ;

CREATE TABLE IF NOT EXISTS `tasks`.`user_tasks` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `state` TINYINT(4) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `users`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8;

USE `users` ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
