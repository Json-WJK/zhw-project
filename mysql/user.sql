SET NAMES UTF8;
DROP DATABASE IF EXISTS zhw;
CREATE DATABASE zhw CHARSET=UTF8;
USE zhw;
#用户信息表
DROP TABLE IF EXISTS zhw_user;
CREATE TABLE zhw_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(32),#账号
	upwd VARCHAR(32),
	phone VARCHAR(32),
	avatar VARCHAR(128),
	gender INT,
	nickname VARCHAR(32),#名称
	balance Decimal(10,2),#可用余额
	freeze Decimal(10,2),#不可用余额
	redPacket Decimal(10,2),#红包
	frequency INT#租号次数
);
INSERT INTO zhw_user VALUES(1,"920819994","18696052995","18696052995",null,1,"后台账号","9999.99","9999.99","0.00",2);