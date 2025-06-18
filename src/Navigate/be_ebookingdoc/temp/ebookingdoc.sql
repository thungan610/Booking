-- ===========================
-- 1. BỆNH VIỆN (HOSPITALS)
-- ===========================

CREATE TABLE `hospitals` (
  `uuid` char(32) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO hospitals (uuid, name, address, image) VALUES
('hosp0001uuid00000000000000000001','BV Đại Học Y Dược','217 Hồng Bàng, Q.5, TP.HCM','https://cdn-pkh.longvan.net/prod-partner/1482e04d-1f50-44d6-a0e0-a6324ffab01e-umc1.png'),
('hosp0002uuid00000000000000000002','BV Bạch Mai','78 Giải Phóng, Hà Nội','https://bcp.cdnchinhphu.vn/Uploaded/hoangtrongdien/2020_02_18/kh%C3%A1m-b%E1%BB%87nh-%E1%BB%9F-b%E1%BB%87nh-vi%E1%BB%87n-B%E1%BA%A1ch-Mai-1-1024x449.jpg'),
('hosp0003uuid00000000000000000003','BV Chợ Rẫy','201B Nguyễn Chí Thanh, TP.HCM','https://images2.thanhnien.vn/528068263637045248/2024/2/15/img3752-17079665726211198504579.jpg'),
('hosp0004uuid00000000000000000004','BV Nhi Đồng 1','532 Lý Thái Tổ, TP.HCM','https://nhidong.org.vn/UploadImages/bvnhidong/PHP06/2023_5/bvdna.jpg'),
('hosp0005uuid00000000000000000005','BV Đa Khoa Đà Nẵng','124 Hải Phòng, Đà Nẵng','https://lh6.googleusercontent.com/proxy/09gi6SMr0POZVcl3OW3I-fnhYPpw3rmbtG7gy4ouTXR5Hl5csq0rYEj_umcUCG0op6e7zVKpcPiVN2AFJiflTCRrycALComSNL4tAjyW'),
('hosp0006uuid00000000000000000006','BV Việt Pháp','1 Phương Mai, Hà Nội','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCBHhY6L-q8_TbikEiK2_cuUVn6V1Mcj_NXA&s'),
('hosp0007uuid00000000000000000007','BV Ung Bướu','3 Nơ Trang Long, TP.HCM','https://youmed.vn/photos/c90bc798-1748-4cfa-9472-53882038476c.png'),
('hosp0008uuid00000000000000000008','BV Phụ Sản Từ Dũ','284 Cống Quỳnh, TP.HCM','https://images2.thanhnien.vn/zoom/686_429/Uploaded/tranduy/2022_09_10/bv-tu-du-0110092022-1043.jpg'),
('hosp0009uuid00000000000000000009','BV Quân Y 175','786 Nguyễn Kiệm, Gò Vấp, TP.HCM','https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/blog/benh-vien-quan-y-115.webp'),
('hosp0010uuid00000000000000000010','BV Hữu Nghị','1 Tràng Tiền, Hà Nội','https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2020/04/images1534192_3.jpg');

-- ===========================
-- 2. CHUYÊN KHOA (SPECIALIZATIONS)
-- ===========================
CREATE TABLE `specializations` (
  `uuid` char(32) NOT NULL,
  `name` varchar(75) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO specializations (uuid, name) VALUES
('spec0001uuid00000000000000000001','Tim mạch'),
('spec0002uuid00000000000000000002','Nhi khoa'),
('spec0003uuid00000000000000000003','Da liễu'),
('spec0004uuid00000000000000000004','Thần kinh'),
('spec0005uuid00000000000000000005','Ngoại tổng quát'),
('spec0006uuid00000000000000000006','Sản phụ khoa'),
('spec0007uuid00000000000000000007','Răng hàm mặt'),
('spec0008uuid00000000000000000008','Ung bướu'),
('spec0009uuid00000000000000000009','Nội tiết'),
('spec0010uuid00000000000000000010','Chấn thương chỉnh hình');


-- ===========================
-- 3. PHÒNG KHÁM (CLINICS)
-- ===========================
CREATE TABLE `clinics` (
  `uuid` char(32) NOT NULL,
  `name` varchar(75) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(75) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `hospital_id` char(32) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `clinics_hospital_id` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`uuid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO clinics (uuid, name, address, phone, email, image, hospital_id) VALUES
('cli0001uuid00000000000000000001','PK Nội Tổng Quát','123 Pasteur, TP.HCM','0908000001','ntq1@bv.com','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnpAc6NmJ7rpiDKR5NzMU-flZ28IK8o1EapA&s','hosp0001uuid00000000000000000001'),
('cli0002uuid00000000000000000002','PK Nhi','50 Hoàng Văn Thụ, Đà Nẵng','0908000002','nhi@bv.com','https://saigonreview.vn/wp-content/uploads/2023/12/phong-kham-nhi-tai-tphcm-5.jpg  ','hosp0002uuid00000000000000000002'),
('cli0003uuid00000000000000000003','PK Da liễu','15 Lê Lợi, Hà Nội','0908000003','dalieu@bv.com','https://ecopharma.com.vn/wp-content/uploads/2024/12/phong-kham-da-lieu-pro-skin-tai-tphcm.jpg','hosp0003uuid00000000000000000003'),
('cli0004uuid00000000000000000004','PK Răng Hàm Mặt','22 Nguyễn Huệ, TP.HCM','0908000004','rhm@bv.com','https://benhviensaigonnamdinh.vn/wp-content/uploads/2023/06/khoa-rang-ham-mat-sn2.webp','hosp0004uuid00000000000000000004'),
('cli0005uuid00000000000000000005','PK Ngoại','88 Trường Chinh, Đà Nẵng','0908000005','ngoai@bv.com','https://benhvientthhatinh.vn/public/img/images/phong-kham-ngoai-tong-hop-tth-ha-tinh.jpg','hosp0005uuid00000000000000000005'),
('cli0006uuid00000000000000000006','PK Sản Phụ','56 Nguyễn Tri Phương, Hà Nội','0908000006','sanphu@bv.com','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9hbhivpNWEe_5Ai25CjaGWtlrW48ixpXOA&s','hosp0006uuid00000000000000000006'),
('cli0007uuid00000000000000000007','PK Nội Tiết','24 Phan Đăng Lưu, TP.HCM','0908000007','noitiet@bv.com','https://cdn.benhvienthucuc.vn/wp-content/uploads/2021/06/kham-noi-tiet-la-gi.jpg','hosp0007uuid00000000000000000007'),
('cli0008uuid00000000000000000008','PK Thần Kinh','37 Nguyễn Trãi, Hà Nội','0908000008','thankinh@bv.com','https://www.victoriavn.com/images/cacchuyenkhoa/N%E1%BB%98I_TH%E1%BA%A6N_KINH.JPG','hosp0008uuid00000000000000000008'),
('cli0009uuid00000000000000000009','PK Ung Bướu','10 Nguyễn Văn Trỗi, TP.HCM','0908000009','ungbuou@bv.com','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIM8CpFHw3CygRmoU3QADdi6-cjzjSYr9snw&s','hosp0009uuid00000000000000000009'),
('cli0010uuid00000000000000000010','PK Chấn Thương','90 Đinh Tiên Hoàng, Đà Nẵng','0908000010','chcth@bv.com','https://phongkhambsvinh.com/thumbs/1366x544x1/upload/photo/blue-simple-medical-clinic-banner-1-7489.png','hosp0010uuid00000000000000000010');


-- ===========================
-- 4.(premission)
-- ===========================

CREATE TABLE `premission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(75) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;

INSERT INTO `premission` (`id`, `name`) VALUES
(1, 'Quản trị viên'),
(2, 'Bác sĩ'),
(3, 'Người dùng');


-- ===========================
-- 5. NGƯỜI DÙNG (USER)
-- ===========================
CREATE TABLE `user` (
  `uuid` char(32) NOT NULL,
  `premission_id` INT DEFAULT NULL,
  `name` varchar(75) DEFAULT NULL,
  `email` varchar(75) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `address` varchar(75) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`),
  KEY `premission_id` (`premission_id`),
  CONSTRAINT `user_premission_id` FOREIGN KEY (`premission_id`) REFERENCES `premission` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO user (uuid, premission_id, name, email, phone, gender, address, username, password, status, image) VALUES
('user0001uuid00000000000000000001',2,'BS Nguyễn Quang H','bs1@bv.com','0911000001',1,'TP.HCM','bs1','123456',1,'https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169.jpg'),
('user0002uuid00000000000000000002',2,'BS Trần Thị Bích','bs2@bv.com','0911000002',0,'Hà Nội','bs2','123456',1,'https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-1.jpg'),
('user0003uuid00000000000000000003',2,'BS Lê Văn C','bs3@bv.com','0911000003',1,'Đà Nẵng','bs3','123456',1,'https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-5.jpg'),
('user0004uuid00000000000000000004',2,'BS Nguyễn Minh D','bs4@bv.com','0911000004',1,'TP.HCM','bs4','123456',1,'https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-8.jpg'),
('user0005uuid00000000000000000005',2,'BS Phạm Thị E','bs5@bv.com','0911000005',0,'Hà Nội','bs5','123456',1,'https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-10.jpg'),
('user0006uuid00000000000000000006',2,'BS Nguyễn Thị F','bs6@bv.com','0911000006',0,'Đà Nẵng','bs6','123456',1,'https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-12.jpg'),
('user0007uuid00000000000000000007',2,'BS Trương Văn G','bs7@bv.com','0911000007',1,'TP.HCM','bs7','123456',1,'https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-13.jpg'),
('user0008uuid00000000000000000008',3,'BN Trần Thị A','bn1@bn.com','0922000008',0,'TP.HCM','bn1','123456',1,'https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-15.jpg'),
('user0009uuid00000000000000000009',3,'BN Lê Văn B','bn2@bn.com','0922000009',1,'Hà Nội','bn2','123456',1,'https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-17.jpg'),
('user0010uuid00000000000000000010',3,'BN Nguyễn Văn C','bn3@bn.com','0922000010',1,'Đà Nẵng','bn3','123456',1,'https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-28.jpg');

-- ===========================
-- 6. BỆNH NHÂN (PATIENTS)
-- ===========================
CREATE TABLE `patients` (
  `uuid` char(32) NOT NULL,
  `user_id` char(32) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `patients_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO patients (uuid, user_id) VALUES
('pat0001uuid00000000000000000001','user0008uuid00000000000000000008'),
('pat0002uuid00000000000000000002','user0009uuid00000000000000000009'),
('pat0003uuid00000000000000000003','user0010uuid00000000000000000010');


-- ===========================
-- 7. BÁC SĨ (DOCTORS)
-- ===========================
CREATE TABLE `doctors` (
  `uuid` char(32) NOT NULL,
  `user_id` char(32) DEFAULT NULL,
  `doctor_type` tinyint(1) DEFAULT NULL,
  `specialization_id` char(32) DEFAULT NULL,
  `license` varchar(32) DEFAULT NULL,
  `introduce` varchar(2000) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`),
  KEY `user_id` (`user_id`),
  KEY `specialization_id` (`specialization_id`),
  CONSTRAINT `doctors_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctors_specialization_id` FOREIGN KEY (`specialization_id`) REFERENCES `specializations` (`uuid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO doctors (uuid, user_id, doctor_type, specialization_id, license, introduce, image) VALUES
('doc0001uuid00000000000000000001','user0001uuid00000000000000000001',1,'spec0001uuid00000000000000000001','BS12345','Chuyên gia tim mạch','https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-31.jpg'),
('doc0002uuid00000000000000000002','user0002uuid00000000000000000002',2,'spec0002uuid00000000000000000002','BS23456','Chuyên gia nhi','https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-32.jpg'),
('doc0003uuid00000000000000000003','user0003uuid00000000000000000003',1,'spec0003uuid00000000000000000003','BS34567','Chuyên gia da liễu','https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-39.jpg'),
('doc0004uuid00000000000000000004','user0004uuid00000000000000000004',2,'spec0004uuid00000000000000000004','BS45678','Chuyên gia thần kinh','https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-40.jpg'),
('doc0005uuid00000000000000000005','user0005uuid00000000000000000005',1,'spec0005uuid00000000000000000005','BS56789','Chuyên gia ngoại tổng quát','https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-40.jpg'),
('doc0006uuid00000000000000000006','user0006uuid00000000000000000006',2,'spec0006uuid00000000000000000006','BS67890','Chuyên gia sản phụ khoa','https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-46.jpg'),
('doc0007uuid00000000000000000007','user0007uuid00000000000000000007',1,'spec0007uuid00000000000000000007','BS78901','Chuyên gia răng hàm mặt','https://chienthanky.vn/wp-content/uploads/2024/01/top-100-anh-gai-2k7-cuc-xinh-ngay-tho-thuan-khiet-2169-46.jpg');

-- ===========================
-- 8. LỊCH LÀM VIỆC (SCHEDULES)
-- ===========================
CREATE TABLE `schedules` (
  `uuid` char(32) NOT NULL,
  `doctor_id` char(32) DEFAULT NULL,
  `clinic_id` char(32) DEFAULT NULL,
  `start_time` TIME DEFAULT NULL,
  `end_time` TIME DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`),
  KEY `doctor_id` (`doctor_id`),
  KEY `clinic_id` (`clinic_id`),
  CONSTRAINT `schedules_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `schedules_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO schedules (uuid, doctor_id, clinic_id, start_time, end_time) VALUES
('sch0001uuid00000000000000000001','doc0001uuid00000000000000000001','cli0001uuid00000000000000000001','08:00:00','12:00:00'),
('sch0002uuid00000000000000000002','doc0002uuid00000000000000000002','cli0002uuid00000000000000000002','13:00:00','15:00:00'),
('sch0003uuid00000000000000000003','doc0003uuid00000000000000000003','cli0003uuid00000000000000000003','15:00:00','17:00:00'),
('sch0004uuid00000000000000000004','doc0004uuid00000000000000000004','cli0004uuid00000000000000000004','08:00:00','12:00:00'),
('sch0005uuid00000000000000000005','doc0005uuid00000000000000000005','cli0005uuid00000000000000000005','13:00:00','15:00:00'),
('sch0006uuid00000000000000000006','doc0006uuid00000000000000000006','cli0006uuid00000000000000000006','15:00:00','17:00:00'),
('sch0007uuid00000000000000000007','doc0007uuid00000000000000000007','cli0007uuid00000000000000000007','08:00:00','12:00:00'),
('sch0008uuid00000000000000000008','doc0001uuid00000000000000000001','cli0008uuid00000000000000000008','13:00:00','15:00:00'),
('sch0009uuid00000000000000000009','doc0002uuid00000000000000000002','cli0009uuid00000000000000000009','15:00:00','17:00:00'),
('sch0010uuid00000000000000000010','doc0003uuid00000000000000000003','cli0010uuid00000000000000000010','08:00:00','12:00:00');

-- ===========================
-- 9. HỒ SƠ BỆNH ÁN (MEDICAL_RECORDS)
-- ===========================
CREATE TABLE `medical_records` (
  `uuid` char(32) NOT NULL,
  `patient_id` char(32) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `medical_records_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO medical_records (uuid, patient_id) VALUES
('mr0001uuid00000000000000000001','pat0001uuid00000000000000000001'),
('mr0002uuid00000000000000000002','pat0002uuid00000000000000000002'),
('mr0003uuid00000000000000000003','pat0003uuid00000000000000000003'),
('mr0004uuid00000000000000000004','pat0001uuid00000000000000000001'),
('mr0005uuid00000000000000000005','pat0002uuid00000000000000000002'),
('mr0006uuid00000000000000000006','pat0003uuid00000000000000000003'),
('mr0007uuid00000000000000000007','pat0001uuid00000000000000000001'),
('mr0008uuid00000000000000000008','pat0002uuid00000000000000000002'),
('mr0009uuid00000000000000000009','pat0003uuid00000000000000000003'),
('mr0010uuid00000000000000000010','pat0001uuid00000000000000000001');



-- ===========================
-- 9. DỊCH VỤ Y TẾ (MEDICAL_SERVICES)
-- ===========================
CREATE TABLE `medical_services` (
  `uuid` char(32) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `specialization_id` char(32) DEFAULT NULL,
  `clinic_id` char(32) DEFAULT NULL,
  `hospital_id` char(32) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`),
  KEY `specialization_id` (`specialization_id`),
  KEY `clinic_id` (`clinic_id`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `ms_specialization_id` FOREIGN KEY (`specialization_id`) REFERENCES `specializations` (`uuid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ms_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`uuid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ms_hospital_id` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`uuid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO medical_services (uuid, name, description, price, specialization_id, clinic_id, hospital_id, image) VALUES
('ms0001uuid00000000000000000001','Xét nghiệm máu','Kiểm tra chỉ số máu',200000,'spec0001uuid00000000000000000001','cli0001uuid00000000000000000001','hosp0001uuid00000000000000000001','https://chienthanky.vn/wp-content/uploads/2024/01/150-hinh-anh-gai-xinh-2k5-2k6-ngay-tho-hon-nhien-3183-1.jpg'),
('ms0002uuid00000000000000000002','Khám nhi','Khám sức khỏe cho trẻ',150000,'spec0002uuid00000000000000000002','cli0002uuid00000000000000000002','hosp0002uuid00000000000000000002','https://chienthanky.vn/wp-content/uploads/2024/01/150-hinh-anh-gai-xinh-2k5-2k6-ngay-tho-hon-nhien-3183-4.jpg'),
('ms0003uuid00000000000000000003','Khám da liễu','Tư vấn da',180000,'spec0003uuid00000000000000000003','cli0003uuid00000000000000000003','hosp0003uuid00000000000000000003','https://chienthanky.vn/wp-content/uploads/2024/01/150-hinh-anh-gai-xinh-2k5-2k6-ngay-tho-hon-nhien-3183-14.jpg'),
('ms0004uuid00000000000000000004','Khám thần kinh','Khám và tư vấn thần kinh',250000,'spec0004uuid00000000000000000004','cli0004uuid00000000000000000004','hosp0004uuid00000000000000000004','https://chienthanky.vn/wp-content/uploads/2024/01/150-hinh-anh-gai-xinh-2k5-2k6-ngay-tho-hon-nhien-3183-15.jpg'),
('ms0005uuid00000000000000000005','Khám ngoại','Khám các vấn đề ngoại tổng quát',200000,'spec0005uuid00000000000000000005','cli0005uuid00000000000000000005','hosp0005uuid00000000000000000005','https://chienthanky.vn/wp-content/uploads/2024/01/150-hinh-anh-gai-xinh-2k5-2k6-ngay-tho-hon-nhien-3183-18.jpg'),
('ms0006uuid00000000000000000006','Khám sản phụ','Khám thai sản',300000,'spec0006uuid00000000000000000006','cli0006uuid00000000000000000006','hosp0006uuid00000000000000000006','https://chienthanky.vn/wp-content/uploads/2024/01/150-hinh-anh-gai-xinh-2k5-2k6-ngay-tho-hon-nhien-3183-21.jpg'),
('ms0007uuid00000000000000000007','Khám nội tiết','Kiểm tra hormone',210000,'spec0009uuid00000000000000000009','cli0007uuid00000000000000000007','hosp0007uuid00000000000000000007','https://chienthanky.vn/wp-content/uploads/2024/01/100-hinh-anh-gai-xinh-2k4-de-thuong-hot-nhat-hien-nay-2746-2.jpg'),
('ms0008uuid00000000000000000008','Khám ung bướu','Tầm soát ung thư',350000,'spec0008uuid00000000000000000008','cli0009uuid00000000000000000009','hosp0009uuid00000000000000000009','https://chienthanky.vn/wp-content/uploads/2024/01/100-hinh-anh-gai-xinh-2k4-de-thuong-hot-nhat-hien-nay-2746-5.jpg'),
('ms0009uuid00000000000000000009','Khám răng hàm mặt','Khám nha khoa',160000,'spec0007uuid00000000000000000007','cli0004uuid00000000000000000004','hosp0004uuid00000000000000000004','https://chienthanky.vn/wp-content/uploads/2024/01/100-hinh-anh-gai-xinh-2k4-de-thuong-hot-nhat-hien-nay-2746-7.jpg'),
('ms0010uuid00000000000000000010','Khám chấn thương','Khám chấn thương chỉnh hình',240000,'spec0010uuid00000000000000000010','cli0010uuid00000000000000000010','hosp0010uuid00000000000000000010','https://chienthanky.vn/wp-content/uploads/2024/01/100-hinh-anh-gai-xinh-2k4-de-thuong-hot-nhat-hien-nay-2746-9.jpg');

-- ===========================
-- 10. CUỘC HẸN (APPOINTMENTS)
-- ===========================
CREATE TABLE `appointments` (
  `uuid` char(32) NOT NULL,
  `doctor_id` char(32) DEFAULT NULL,
  `patient_id` char(32) DEFAULT NULL,
  `clinic_id` char(32) DEFAULT NULL,
  `hospital_id` char(32) DEFAULT NULL,
  `schedule_id` char(32) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`),
  KEY `doctor_id` (`doctor_id`),
  KEY `patient_id` (`patient_id`),
  KEY `clinic_id` (`clinic_id`),
  KEY `hospital_id` (`hospital_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `appointments_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointments_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointments_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`uuid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `appointments_hospital_id` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`uuid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `appointments_schedule_id` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`uuid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO appointments (uuid, doctor_id, patient_id, clinic_id, hospital_id, schedule_id, date, status) VALUES
('app0001uuid00000000000000000001','doc0001uuid00000000000000000001','pat0001uuid00000000000000000001','cli0001uuid00000000000000000001','hosp0001uuid00000000000000000001','sch0001uuid00000000000000000001','2025-06-15 09:00:00',1),
('app0002uuid00000000000000000002','doc0002uuid00000000000000000002','pat0002uuid00000000000000000002','cli0002uuid00000000000000000002','hosp0002uuid00000000000000000002','sch0002uuid00000000000000000002','2025-06-16 10:30:00',1),
('app0003uuid00000000000000000003','doc0003uuid00000000000000000003','pat0003uuid00000000000000000003','cli0003uuid00000000000000000003','hosp0003uuid00000000000000000003','sch0003uuid00000000000000000003','2025-06-17 14:00:00',1),
('app0004uuid00000000000000000004','doc0004uuid00000000000000000004','pat0002uuid00000000000000000002','cli0004uuid00000000000000000004','hosp0004uuid00000000000000000004','sch0004uuid00000000000000000004','2025-06-18 09:00:00',1),
('app0005uuid00000000000000000005','doc0005uuid00000000000000000005','pat0001uuid00000000000000000001','cli0005uuid00000000000000000005','hosp0005uuid00000000000000000005','sch0005uuid00000000000000000005','2025-06-19 15:00:00',1),
('app0006uuid00000000000000000006','doc0006uuid00000000000000000006','pat0003uuid00000000000000000003','cli0006uuid00000000000000000006','hosp0006uuid00000000000000000006','sch0006uuid00000000000000000006','2025-06-20 08:00:00',1),
('app0007uuid00000000000000000007','doc0007uuid00000000000000000007','pat0002uuid00000000000000000002','cli0007uuid00000000000000000007','hosp0007uuid00000000000000000007','sch0007uuid00000000000000000007','2025-06-21 13:00:00',1);

-- ===========================
-- 11. HỒ SƠ PHỤ (SELECT_PROFILES)
-- ===========================
CREATE TABLE `select_profiles` (
  `uuid` char(32) NOT NULL,
  `user_id` char(32) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `relationship` varchar(100) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sp_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO select_profiles (uuid, user_id, name, relationship, image) VALUES
('sp0001uuid00000000000000000001','user0008uuid00000000000000000008','Nguyễn Văn An','Con','https://chienthanky.vn/wp-content/uploads/2024/01/100-hinh-anh-gai-xinh-2k4-de-thuong-hot-nhat-hien-nay-2746-10.jpg'),
('sp0002uuid00000000000000000002','user0009uuid00000000000000000009','Trần Thị Bình','Vợ','https://chienthanky.vn/wp-content/uploads/2024/01/100-hinh-anh-gai-xinh-2k4-de-thuong-hot-nhat-hien-nay-2746-13.jpg'),
('sp0003uuid00000000000000000003','user0010uuid00000000000000000010','Lê Văn Cường','Anh','https://chienthanky.vn/wp-content/uploads/2024/01/100-hinh-anh-gai-xinh-2k4-de-thuong-hot-nhat-hien-nay-2746-16.jpg'),
('sp0004uuid00000000000000000004','user0008uuid00000000000000000008','Đỗ Thị Dung','Em','https://chienthanky.vn/wp-content/uploads/2024/01/100-hinh-anh-gai-xinh-2k4-de-thuong-hot-nhat-hien-nay-2746-19.jpg'),
('sp0005uuid00000000000000000005','user0009uuid00000000000000000009','Nguyễn Hữu Dũng','Cháu','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k7-toc-ngan.jpg'),
('sp0006uuid00000000000000000006','user0010uuid00000000000000000010','Nguyễn Văn Em','Bố','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k7-deo-kinh.jpg'),
('sp0007uuid00000000000000000007','user0008uuid00000000000000000008','Trần Thị Hoa','Mẹ','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k7-deo-kinh.jpg'),
('sp0008uuid00000000000000000008','user0009uuid00000000000000000009','Lê Thị Hòa','Ông','https://anhnail.com/wp-content/uploads/2024/11/Hinh-anh-gai-xinh-2k7-cute.jpg'),
('sp0009uuid00000000000000000009','user0010uuid00000000000000000010','Nguyễn Thị Hạnh','Bà','https://anhnail.com/wp-content/uploads/2024/11/Gai-xinh-2k7-toc-dai-cute.jpg'),
('sp0010uuid00000000000000000010','user0008uuid00000000000000000008','Đỗ Văn Hiếu','Chị','https://anhnail.com/wp-content/uploads/2024/11/Anh-hinh-gai-xinh-2k7.jpg');


-- ===========================
-- 12. BÀI VIẾT (ARTICLES)
-- ===========================
CREATE TABLE `articles` (
  `uuid` char(32) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO articles (uuid, title, content, image, author) VALUES
('art0001uuid00000000000000000001','Chăm sóc sức khỏe mùa hè','Nội dung bài viết số 1','https://anhnail.com/wp-content/uploads/2024/11/Anh-hinh-gai-xinh-2k7-mac-vay.jpg','BS Nguyễn Quang H'),
('art0002uuid00000000000000000002','Tư vấn da liễu','Nội dung bài viết số 2','https://anhnail.com/wp-content/uploads/2024/11/Anh-gai-xinh-2k7-sieu-cute.jpg','BS Trần Thị Bích'),
('art0003uuid00000000000000000003','Chế độ ăn hợp lý','Nội dung bài viết số 3','https://anhnail.com/wp-content/uploads/2024/11/Anh-gai-xinh-2k7-mac-vay-mau-hong-de-thuong.jpg','BS Lê Văn C'),
('art0004uuid00000000000000000004','Phòng chống COVID','Nội dung bài viết số 4','https://anhnail.com/wp-content/uploads/2024/11/Anh-gai-xinh-2k7-deo-kinh-den.jpg','BS Nguyễn Minh D'),
('art0005uuid00000000000000000005','Chủ động phòng bệnh','Nội dung bài viết số 5','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k8-deo-kinh-den-ngau.jpg','BS Phạm Thị E'),
('art0006uuid00000000000000000006','Dinh dưỡng cho trẻ','Nội dung bài viết số 6','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k2-toc-dai.jpg','BS Nguyễn Thị F'),
('art0007uuid00000000000000000007','Cách giữ gìn sức khỏe','Nội dung bài viết số 7','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k2-de-thuong.jpg','BS Trương Văn G'),
('art0008uuid00000000000000000008','Cách giảm cân an toàn','Nội dung bài viết số 8','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k1-toc-dai-mac-vay.jpg','BS Nguyễn Quang H'),
('art0009uuid00000000000000000009','Luyện tập thể thao','Nội dung bài viết số 9','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k1-toc-dai-cute.jpg','BS Trần Thị Bích'),
('art0010uuid00000000000000000010','Tăng sức đề kháng','Nội dung bài viết số 10','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k1-mac-vay-ngan.jpg','BS Lê Văn C');

-- ===========================
-- 13. SLIDE QUẢNG CÁO (CAROUSEL_ITEMS)
-- ===========================
CREATE TABLE `carousel_items` (
  `uuid` char(32) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO carousel_items (uuid, image, title, description) VALUES
('car0001uuid00000000000000000001','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k1-mac-vay-2-day.jpg','Khám tổng quát giảm giá','Ưu đãi cho khách mới 15%'),
('car0002uuid00000000000000000002','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k1-doi-mu-sieu-banh-beo.jpg','Miễn phí xét nghiệm máu','Áp dụng 10/6 đến 30/6'),
('car0003uuid00000000000000000003','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k-toc-dai-2.jpg','Ưu đãi mùa hè','Tặng quà cho khách hàng đặt khám'),
('car0004uuid00000000000000000004','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k4-dang-yeu.jpg','Tư vấn sức khỏe trực tuyến','Gặp bác sĩ online, miễn phí lần đầu'),
('car0005uuid00000000000000000005','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k4-cute-de-thuong.jpg','Giảm giá xét nghiệm','Chỉ còn 99k/lần'),
('car0006uuid00000000000000000006','https://anhnail.com/wp-content/uploads/2024/11/Hinh-anh-gai-xinh-2k4-toc-dai.jpg','Miễn phí đo huyết áp','Dành cho khách lớn tuổi'),
('car0007uuid00000000000000000007','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k5-nhe-nhang-de-thuong.jpg','Gói khám cho trẻ em','Tặng sữa cho trẻ dưới 6 tuổi'),
('car0008uuid00000000000000000008','https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k5-cute-de-thuong.jpg','Ưu đãi khám nha khoa','Tặng nước súc miệng'),
('car0009uuid00000000000000000009','https://anhnail.com/wp-content/uploads/2024/11/Hinh-anh-gai-xinh-2k5-de-thuong.jpg','Gói xét nghiệm tổng quát','Giá chỉ 1 triệu đồng'),
('car0010uuid00000000000000000010','https://anhnail.com/wp-content/uploads/2024/11/Anh-hinh-gai-xinh-2k5.jpg','Miễn phí tư vấn dinh dưỡng','Đặt lịch qua app, không cần chờ');


-- ===========================
-- 14. BẢNG TOKEN (XÁC THỰC)
-- ===========================
CREATE TABLE `token` (
  `uuid` char(32) NOT NULL,
  `user_id` char(32) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uuid`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `token_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO token (uuid, user_id, access_token, refresh_token) VALUES
('tok0001uuid00000000000000000001','user0001uuid00000000000000000001','token1','refreshtoken1'),
('tok0002uuid00000000000000000002','user0002uuid00000000000000000002','token2','refreshtoken2'),
('tok0003uuid00000000000000000003','user0003uuid00000000000000000003','token3','refreshtoken3'),
('tok0004uuid00000000000000000004','user0004uuid00000000000000000004','token4','refreshtoken4'),
('tok0005uuid00000000000000000005','user0005uuid00000000000000000005','token5','refreshtoken5'),
('tok0006uuid00000000000000000006','user0006uuid00000000000000000006','token6','refreshtoken6'),
('tok0007uuid00000000000000000007','user0007uuid00000000000000000007','token7','refreshtoken7'),
('tok0008uuid00000000000000000008','user0008uuid00000000000000000008','token8','refreshtoken8'),
('tok0009uuid00000000000000000009','user0009uuid00000000000000000009','token9','refreshtoken9'),
('tok0010uuid00000000000000000010','user0010uuid00000000000000000010','token10','refreshtoken10');

CREATE TABLE `reviews` (
  `uuid` CHAR(32) NOT NULL,
  `user_id` CHAR(32) NOT NULL,
  `doctor_id` CHAR(32) NOT NULL,
  `appointment_id` CHAR(32) NOT NULL,
  `stars` TINYINT NOT NULL CHECK (`stars` BETWEEN 1 AND 5),
  `comment` VARCHAR(1000) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  KEY `user_id` (`user_id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `appointment_id` (`appointment_id`),
  CONSTRAINT `reviews_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_appointment_id` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO reviews (uuid, user_id, doctor_id, appointment_id, stars, comment) VALUES
('rev0001uuid00000000000000000001','user0008uuid00000000000000000008','doc0001uuid00000000000000000001','app0001uuid00000000000000000001',5,'Bác sĩ tận tâm, hướng dẫn rõ ràng!'),
('rev0002uuid00000000000000000002','user0009uuid00000000000000000009','doc0002uuid00000000000000000002','app0002uuid00000000000000000002',4,'Khám kỹ càng, cảm ơn bác sĩ.'),
('rev0003uuid00000000000000000003','user0010uuid00000000000000000010','doc0003uuid00000000000000000003','app0003uuid00000000000000000003',5,'Tư vấn tốt, sẽ quay lại!'),
('rev0004uuid00000000000000000004','user0009uuid00000000000000000009','doc0004uuid00000000000000000004','app0004uuid00000000000000000004',3,'Chờ hơi lâu nhưng bác sĩ vui vẻ.'),
('rev0005uuid00000000000000000005','user0008uuid00000000000000000008','doc0005uuid00000000000000000005','app0005uuid00000000000000000005',4,'Dịch vụ ổn, nhân viên nhiệt tình.'),
('rev0006uuid00000000000000000006','user0010uuid00000000000000000010','doc0006uuid00000000000000000006','app0006uuid00000000000000000006',5,'Khám nhanh gọn, hài lòng.'),
('rev0007uuid00000000000000000007','user0009uuid00000000000000000009','doc0007uuid00000000000000000007','app0007uuid00000000000000000007',4,'Bác sĩ thân thiện, tư vấn tận tâm.'),
('rev0008uuid00000000000000000008','user0008uuid00000000000000000008','doc0003uuid00000000000000000003','app0003uuid00000000000000000003',5,'Lần nào khám cũng rất hài lòng.'),
('rev0009uuid00000000000000000009','user0010uuid00000000000000000010','doc0002uuid00000000000000000002','app0002uuid00000000000000000002',4,'Khám nhi chu đáo, bác sĩ dễ thương.'),
('rev0010uuid00000000000000000010','user0008uuid00000000000000000008','doc0004uuid00000000000000000004','app0004uuid00000000000000000004',3,'Bệnh viện sạch sẽ, thủ tục hơi lâu.');
