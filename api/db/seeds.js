const pool = require('./pool');
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const { createUser } = require('./models/users');
const { createBook } = require('./models/books');
const { usersData } = require('./seedData');
const { booksData } = require('./seedData');


async function dropTables() {
    console.log(chalk.red('Dropping tables...'));
    try {
        await pool.query('DROP TABLE IF EXISTS users CASCADE');
        await pool.query('DROP TABLE IF EXISTS session CASCADE');
        await pool.query('DROP TABLE IF EXISTS books CASCADE');
        console.log(chalk.green('Dropped users, session, and books tables.'));
    } catch (error) {
        console.error(chalk.red('Error dropping tables:', error));
    }
}

async function createTables() {
    console.log(chalk.green('Creating tables...'));
    try {
        await pool.query(`
            CREATE TABLE  users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );

            CREATE TABLE IF NOT EXISTS "session" (
            "sid" varchar NOT NULL COLLATE "default",
            "sess" json NOT NULL,
            "expire" timestamp(6) NOT NULL
        )
        WITH (OIDS=FALSE);

        ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");

            CREATE TABLE IF NOT EXISTS books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            genre VARCHAR(100) NOT NULL,
            published_year INTEGER,
            image_url TEXT,
            users_id INTEGER REFERENCES users(id)
        );
        `);

        console.log(chalk.green('Created users table.'));
    } catch (error) {
        console.error(chalk.red('Error creating users table:', error));
    }
}

async function createInitialUsers() {
    console.log(chalk.blue('Seeding Userdata...'));
    console.log(usersData);
    try {
        for (const userData of usersData) {
           // const hashedPassword = await bcrypt.hash(userData.password, 10);
            await createUser({
                username: userData.username,
                password: userData.password
            });
        }
        console.log(chalk.blue('Seeding completed.'));
    } catch (error) {
        console.error(chalk.red('Error seeding data:', error));
    }
}

async function createInitialBooks() {
    console.log(chalk.blue('Seeding book data...'));
    console.log(booksData);
    try {
        for (const bookData of booksData) {
            await createBook({
                title: bookData.title,
                author: bookData.author,
                genre: bookData.genre,
                published_year: bookData.published_year,
                image_url: bookData.image_url,
                users_id: bookData.usersId
            });
        }
        console.log(chalk.blue('Book seeding completed.'));
    } catch (error) {
        console.error(chalk.red('Error seeding book data:', error));
    }
}

async function seedDatabase() {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialBooks();
    pool.end();
    console.log(chalk.blue('Database seeding completed.'));
}

seedDatabase();