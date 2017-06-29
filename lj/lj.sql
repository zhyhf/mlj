SET NAMES UTF8;
DROP DATABASE IF EXISTS lj;
CREATE DATABASE lj CHARSET=UTF8;
USE lj;
CREATE TABLE lj_user(
  uid   INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(25) NOT NULL DEFAULT '',
  upwd  VARCHAR(32) NOT NULL DEFAULT '',
  email VARCHAR(40) NOT NULL DEFAULT ''
);
CREATE TABLE lj_house(
    hid   INT PRIMARY KEY AUTO_INCREMENT,
    hpic VARCHAR(70) NOT NULL DEFAULT '',
    hname VARCHAR(40) NOT NULL DEFAULT '',
    hcontent VARCHAR(100) NOT NULL DEFAULT '',
    hprice DOUBLE(10,2) NOT NULL DEFAULT 0,
    hdprice DOUBLE(7,2) NOT NULL DEFAULT 0
  );
INSERT INTO lj_house VALUES
(null,'h1.jpg','江南名府 5楼跃6楼','房本满5年，随时看房',420.00,32917),
(null,'h2.jpg','天地新城 三房朝南','房本满5年',230.00,17917),
(null,'h3.jpg','三山街 居家两房','房本满5年，随时看房',340.00,30117),
(null,'h4.jpg','湖南路 一楼带院子','房本满5年',500.00,30917),
(null,'h5.jpg','南航揽翠山 5楼跃6楼','房本满5年',320.00,23552),
(null,'h6.jpg','东大宿舍小区 双南户型','房本满5年，随时看房',290.00,12421),
(null,'h7.jpg','翠屏国际 南北通透','房本满5年，随时看房',507.00,28917),
(null,'h8.jpg','奥体 5楼跃6楼','房本满5年',434.00,28917),
(null,'h9.jpg','紫萝苑 低楼层','房本满5年，随时看房',350.00,22317),
(null,'h10.jpg','银舟湾 5楼跃6楼','房本满5年',620.00,40000);
CREATE TABLE tj_lp(
    lid   INT PRIMARY KEY AUTO_INCREMENT,
    lpic VARCHAR(70) NOT NULL DEFAULT '',
    lname VARCHAR(40) NOT NULL DEFAULT '',
    addr VARCHAR(100) NOT NULL DEFAULT '',
    price DOUBLE(10,2) NOT NULL DEFAULT 0,
    lx VARCHAR(40) NOT NULL DEFAULT ''
  );
INSERT INTO tj_lp VALUES
(null,'lp_1.jpg','恒大翡翠华庭','[玄武]红山街道华飞路',32000,'住宅'),
(null,'lp_2.jpg','恒大龙珺','[江宁]麒麟接到袁家边路9号',27000,'住宅'),
(null,'lp_3.jpg','鲁能泰山七号院','[江宁]格致西路1号',37000,'别墅'),
(null,'lp_4.jpg','嘉屿山','[栖霞]兴贤路19号',28000,'住宅'),
(null,'lp_5.jpg','葛洲坝招商紫君兰苑','[鼓楼]和燕路葛洲坝招商紫君兰苑',35000,'别墅'),
(null,'lp_6.jpg','恒大翡翠华庭','[玄武红山街道华飞路]',26700,'住宅');

CREATE TABLE x_fzs(
    lid   INT PRIMARY KEY AUTO_INCREMENT,
    lpic VARCHAR(70) NOT NULL DEFAULT '',
	lgPic VARCHAR(100) NOT NULL DEFAULT '',
	hname VARCHAR(40) NOT NULL DEFAULT '',
    hprice DOUBLE(10,2) NOT NULL DEFAULT 0,
	hcontent VARCHAR(100) NOT NULL DEFAULT ''
  );
	INSERT INTO x_fzs VALUES
    (null,'xf1.jpg','xf_l1.jpg','中南世纪雅苑','22000','在售'),
    (null,'xf2.jpg','xf_l2.jpg','锦绣华府','30000','售罄'),
	(null,'xf3.jpg','xf_l3.jpg','融创玉兰公馆','29800','在售');

    CREATE TABLE s_fzs(
    sid   INT PRIMARY KEY AUTO_INCREMENT,
    spic VARCHAR(70) NOT NULL DEFAULT '',
    sgPic VARCHAR(100) NOT NULL DEFAULT '',
    sname VARCHAR(40) NOT NULL DEFAULT '',
    sintro VARCHAR(100) NOT NULL DEFAULT '',
    scontent VARCHAR(100) NOT NULL DEFAULT '',
    sbcontent VARCHAR(100) NOT NULL DEFAULT '',
    sprice DOUBLE(10,2) NOT NULL DEFAULT 0,
    scon VARCHAR(100) NOT NULL DEFAULT ''
    );
    INSERT INTO s_fzs VALUES
    (null,'sec1.jpg','sec_l1.jpg','江南名府','5楼跃6楼 赠送超大露台',' 配套成熟','4室2厅 145.07平米','5000','在租'),
    (null,'sec2.jpg','sec_l2.jpg','天津新村','低楼层大四房地铁4号线旁','小区环境好','4室1厅 90.81平米','7000','在租'),
    (null,'sec3.jpg','sec_l3.jpg','银城西堤国际一区','靠近地铁，交通方便','格局优美','3室2厅 134.02平米','3500','已租'),
    (null,'sec4.jpg','sec_l4.jpg','龙凤花园','南北通透 三房朝南 正规顶跃东边户','配套成熟','4室2厅 112.36平米','5600','在租');