const { Client } = require('pg');
require('dotenv').config();

async function setupAdminTables() {
  const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'vick3900',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'johsther_cakes_academy'
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // 1. Update/Create Cakes Table (using products as base)
    console.log('Setting up cakes table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS cakes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        color VARCHAR(50),
        price DECIMAL(12,2) NOT NULL,
        image_url TEXT,
        tag VARCHAR(100),
        description TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Create Online Courses Table
    console.log('Setting up courses table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle TEXT,
        price DECIMAL(12,2) NOT NULL,
        duration VARCHAR(100),
        sessions VARCHAR(100),
        image_url TEXT,
        brand_color VARCHAR(20),
        features JSONB DEFAULT '[]',
        tag VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Create Academy Batches Table
    console.log('Setting up academy_batches table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS academy_batches (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        start_date DATE,
        price DECIMAL(12,2),
        status VARCHAR(50) DEFAULT 'Open',
        status_color VARCHAR(50),
        course_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Create Registrations Table
    console.log('Setting up registrations table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        course_name VARCHAR(255),
        batch_id INTEGER REFERENCES academy_batches(id),
        status VARCHAR(50) DEFAULT 'Pending',
        payment_status VARCHAR(50) DEFAULT 'Unpaid',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Create Inquiries Table
    console.log('Setting up inquiries table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        type VARCHAR(50),
        message TEXT,
        status VARCHAR(50) DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ All admin tables setup successfully');

  } catch (error) {
    console.error('❌ Error setting up admin tables:', error.message);
  } finally {
    await client.end();
  }
}

setupAdminTables();
