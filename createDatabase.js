/* BU DOSYAYI AÇMAK İÇİN:
ÖNCE .ENV DOSYASI OLUŞTUR, İÇİNE
DATABASE =
HOST = localhost
DATABASE_USER = root

YAZ. SONRASINDA AŞAĞIDA ÇAĞIRILAN FONKSİYONLARIN BAŞINDA
createDatabase(newDatabaseName);
YAZILI OLMASI GEREKLİ. YAZMIYOSA YAZ VE KODU ÇALIŞTIR.
YAZDIKTAN SONRA HATA ÇIKACAK, PANİK YAPMA.
ŞİMDİ .ENV DOSYASINDA
DATABASE = epaw
OLARAK DÜZENLE VE AZ ÖNCE EKLEDİĞİMİZ createDatabase FONKSİYON ÇAĞIRMASINI SİL.
TEKRAR ÇALIŞTIR. AFİYET OLSUN.

BRANCH ÇALIŞIYOR MU*/

const mysql = require('mysql2');
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();


const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});


const newDatabaseName = "epaw"; // Yeni oluşturulacak veritabanı adı
function createDatabase(newDatabaseName){


// Yeni veritabanı oluşturma sorgusu
const createDatabaseQuery = `CREATE DATABASE ${newDatabaseName}`;

db.query(createDatabaseQuery, (err) => {
  if (err) {
    console.error('Veritabanı oluşturma hatası:', err);
  } else {
    console.log(`Veritabanı '${newDatabaseName}' başarıyla oluşturuldu.`);

    // Veritabanı oluşturulduktan sonra veri eklemek için kodlar burada devam edebilir
    // Örneğin, yeni veritabanı içinde bir tablo oluşturmak ve veri eklemek gibi işlemler
    // ...

  }

  // Bağlantıyı kapatma
  db.end();
});
}

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL bağlantısı başarılı.');

  // Fonksiyon ile tablo oluşturma işlemi
  function createUserTable() {
    const createTableQuery = `
       
      CREATE TABLE IF NOT EXISTS user (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(20),
        user_surname VARCHAR(20),
        email VARCHAR(100) NOT NULL,
        user_phone VARCHAR(11),
        user_age DATE,
        user_address VARCHAR(200),
        password VARCHAR(20)
      )
    `;

    db.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log('user tablosu başarıyla oluşturuldu.');
     
    });
  }
  function createVetTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS vet (
        vet_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        vet_name VARCHAR(20),
        vet_surname VARCHAR(20),
        email VARCHAR(100) NOT NULL,
        vet_phone VARCHAR(11),
        vet_age DATE,
        vet_address VARCHAR(200),
        vet_certificate VARCHAR(20),
        password VARCHAR(20)
      )
    `;

    db.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log('vet tablosu başarıyla oluşturuldu.');
      
    });
  }

  function createPetTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS pet (
        pet_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        pet_name VARCHAR(20),
        pet_birthdate date,
        animal_species VARCHAR(30),
        pet_kind VARCHAR(20),
        owner_id  INT(11),
        FOREIGN KEY (owner_id) REFERENCES user (user_id)
      )
    `;

    db.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log('pet tablosu başarıyla oluşturuldu.');
      
    });
  }

  function createHealthTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS health_info (
        health_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        pet_id INT(11),
        vet_id  INT(11),
        health_treatment VARCHAR(100),
        healt_notes VARCHAR(500),
        
        FOREIGN KEY (pet_id) REFERENCES pet (pet_id),
        FOREIGN KEY (vet_id) REFERENCES vet (vet_id)
      )
    `;

    db.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log('health_info tablosu başarıyla oluşturuldu.');
     
    });
  }

  function createAppointmentTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS appointment (
        appointment_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        pet_id INT(11),
        vet_id  INT(11),
        date DATETIME NOT NULL,
        
        FOREIGN KEY (pet_id) REFERENCES pet (pet_id),
        FOREIGN KEY (vet_id) REFERENCES vet (vet_id)
      )
    `;

    db.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log('appointment tablosu başarıyla oluşturuldu.');
      
    });
  }
  function createCampaignTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS campaign (
        campaign_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        user_id INT(11),
        vet_id INT(11),
        pet_id INT(11),
        campaign_title VARCHAR(100),
        campaign_detail VARCHAR(500),
        donation_date DATETIME NOT NULL,
        donation_amount INT(100),
        campaign_goal INT(11),
        campaign_date DATETIME,
        
        FOREIGN KEY (user_id) REFERENCES user (user_id),
        FOREIGN KEY (vet_id) REFERENCES vet (vet_id),
        FOREIGN KEY (pet_id) REFERENCES pet (pet_id)
        
      )
    `;

    db.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log('campaign tablosu başarıyla oluşturuldu.');
     
    });
  }

  

  function createDonationTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS donation (
        donation_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        user_id INT(11),
        vet_id  INT(11),
        campaign_id INT(11),
        donation_date DATETIME NOT NULL,
        donation_amount INT(100),
        
        FOREIGN KEY (user_id) REFERENCES user (user_id),
        FOREIGN KEY (vet_id) REFERENCES vet (vet_id),
        FOREIGN KEY (campaign_id) REFERENCES campaign (campaign_id)
      )
    `;

    db.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log('donation tablosu başarıyla oluşturuldu.');
     
    });
  }

  function createVolunteerTable() {
    const createTableQuery = `
       
      CREATE TABLE IF NOT EXISTS user (
        volunteer_id INT AUTO_INCREMENT PRIMARY KEY,
        volunteer_name VARCHAR(20),
        volunteer_surname VARCHAR(20),
        volunteer_email VARCHAR(100) NOT NULL,
        volunteer_phone VARCHAR(11),
        volunteer_age DATE,
        volunteer_address VARCHAR(200),
        password VARCHAR(20)
      )
    `;

    db.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log('volunteer tablosu başarıyla oluşturuldu.');
     
    });
  }
function addForeign(){
  const createTableQuery = `ALTER TABLE campaign
        FOREIGN KEY (donation_date) REFERENCES donation (donation_date),
        FOREIGN KEY (donation_amount) REFERENCES donation (donation_amount)
  `;
       
}



  // Örnek olarak fonksiyonu kullanma
  //createDatabase(newDatabaseName);
  createUserTable();
  createVetTable();
  createPetTable();
  createHealthTable();
  createAppointmentTable();
  createCampaignTable();
  createDonationTable();
  createVolunteerTable();
  addForeign();


  db.end((err) => {
    if (err) throw err;
    console.log('MySQL bağlantısı kapatıldı.');
  });
});
/*
FOREIGN KEY (donation_date) REFERENCES donation (donation_date),
        FOREIGN KEY (donation_amount) REFERENCES donation (donation_amount)*/