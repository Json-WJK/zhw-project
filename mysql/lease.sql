SET NAMES UTF8;
USE zhw;
/*订单状态表（是否被租用，，，，，租用剩余时间 租用账号的用户）*/
DROP TABLE IF EXISTS zhw_lease;
CREATE TABLE zhw_lease(
	lease_id INT PRIMARY KEY AUTO_INCREMENT,
	uid INT,
	game_id INT,
	starting_date datetime,#起始时间
	duration INT    #租用时长
);
INSERT INTO zhw_lease VALUES
(1,1,1,"2018-10-31 23:50:00",1),
(2,1,2,"2018-10-31 23:50:00",2);

