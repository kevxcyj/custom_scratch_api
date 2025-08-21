// Seeds databse with info from CSV file

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const connectDB = require('../db/connect');
const Title = require('../models/Title');

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Title.deleteMany();

    const results = [];
    fs.createReadStream(path.join(__dirname, '../data/netflix_titles.csv'))
      .pipe(csv())
      .on('data', (row) => {
        results.push({
          title: row.title,
          type: row.type,
          listed_in: row.listed_in,
          release_year: parseInt(row.release_year),
          date_added: row.date_added ? new Date(row.date_added) : null,
          country: row.country
        });
      })
      // Result
      .on('end', async () => {
        await Title.insertMany(results);
        console.log(`Database seeded with ${results.length} records!`);
        process.exit();
      });

  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();