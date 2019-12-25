/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50728
Source Host           : localhost:3306
Source Database       : logistics

Target Server Type    : MYSQL
Target Server Version : 50728
File Encoding         : 65001

Date: 2019-12-25 11:55:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `sys_menu`
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent_id` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `sort` int(4) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('41e76d00-26c5-11ea-b739-e910835ff1ce', '系统管理', '', '/sysSetting', '1', null, 'md-settings', '2019-12-25 03:18:44', '2019-12-25 03:18:44');
INSERT INTO `sys_menu` VALUES ('79254580-26c5-11ea-b2f6-5fe478e3d93f', '用户管理', '41e76d00-26c5-11ea-b739-e910835ff1ce', '/sysSetting', '1', null, 'md-settings', '2019-12-25 03:20:17', '2019-12-25 03:20:17');
INSERT INTO `sys_menu` VALUES ('79256c90-26c5-11ea-b2f6-5fe478e3d93f', '系统管理', '41e76d00-26c5-11ea-b739-e910835ff1ce', '/base/user', '1', null, 'md-settings', '2019-12-25 03:20:17', '2019-12-25 03:20:17');
INSERT INTO `sys_menu` VALUES ('79256c91-26c5-11ea-b2f6-5fe478e3d93f', '系统管理', '41e76d00-26c5-11ea-b739-e910835ff1ce', '/sysSetting', '1', null, 'md-settings', '2019-12-25 03:20:17', '2019-12-25 03:20:17');

-- ----------------------------
-- Table structure for `sys_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` varchar(255) NOT NULL COMMENT 'id',
  `role` varchar(50) NOT NULL COMMENT '角色',
  `name` varchar(50) DEFAULT NULL COMMENT '角色名',
  `modules` text COMMENT '权限',
  `describe` text COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('79254580-26c5-11ea-b2f6-5fe47813d93f', 'ROLE_ADMIN', '超级管理员', '4;5;6;7;8;9;10;11;14;1;12;13;16;', '超级管理员，拥有全部权限。');

-- ----------------------------
-- Table structure for `sys_role_menu`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` varchar(255) NOT NULL COMMENT 'id',
  `menu_id` varchar(255) NOT NULL COMMENT '菜单ID',
  `role_id` varchar(255) NOT NULL COMMENT '权限ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单权限';

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES ('65129db0-1641-11ea-b03f-63eacea3e', '79256c90-26c5-11ea-b2f6-5fe478e3d93f', '65129db0-2641-11ea-b03f-63eacea3e');
INSERT INTO `sys_role_menu` VALUES ('65129db0-2611-11ea-b03f-63eacea3e', '79254580-26c5-11ea-b2f6-5fe478e3d93f', '65129db0-2641-11ea-b03f-63eacea3e');
INSERT INTO `sys_role_menu` VALUES ('65129db0-2641-11ea-b03f-632acea3e', '41e76d00-26c5-11ea-b739-e910835ff1ce', '65129db0-2641-11ea-b03f-63eacea3e');
INSERT INTO `sys_role_menu` VALUES ('65129db0-2645-11ea-b03f-63eacea3e', '79256c91-26c5-11ea-b2f6-5fe478e3d93f', '65129db0-2641-11ea-b03f-63eacea3e');

-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `login_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_type` varchar(255) DEFAULT '0',
  `is_delete` varchar(255) DEFAULT 'false',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('06cf1e10-2644-11ea-93b3-fb2640c0cb35', '123', '测试', '123', null, '0', 'false', '2019-12-24 11:53:40', '2019-12-25 01:29:23');
INSERT INTO `sys_user` VALUES ('65129db0-2641-11ea-b03f-63eacea3e69f', 'admin', 'admin', '$2a$10$.XX8viuA1q0.2BKS8O0sRO3QfdctdIsgHEeuBkY75fJ1Y.2tHA2Km', null, '0', 'false', '2019-12-24 11:34:49', '2019-12-24 11:34:49');

-- ----------------------------
-- Table structure for `sys_user_detail`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_detail`;
CREATE TABLE `sys_user_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userid` int(11) NOT NULL COMMENT '用户id',
  `article_sign` int(1) DEFAULT '0' COMMENT '文章标志为（0:可发布文章，1:不可发布文章）',
  `info` varchar(255) DEFAULT NULL COMMENT '个人简介',
  `location` varchar(255) DEFAULT NULL COMMENT '所在位置',
  `skill` varchar(255) DEFAULT NULL COMMENT '技能',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='用户详情表';

-- ----------------------------
-- Records of sys_user_detail
-- ----------------------------
INSERT INTO `sys_user_detail` VALUES ('3', '1', '0', 'my name is smallsnail.。', 'shanghai', 'java');
INSERT INTO `sys_user_detail` VALUES ('4', '12', '0', null, null, null);
INSERT INTO `sys_user_detail` VALUES ('5', '13', '0', null, null, null);

-- ----------------------------
-- Table structure for `sys_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` varchar(255) NOT NULL COMMENT 'id',
  `user_id` varchar(255) NOT NULL COMMENT '用户ID',
  `role_id` varchar(255) NOT NULL COMMENT '权限ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户权限';

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('65129db0-2641-122a-b03f-63eacea3e69f', '65129db0-2641-11ea-b03f-63eacea3e69f', '65129db0-2641-11ea-b03f-63eacea3e');
