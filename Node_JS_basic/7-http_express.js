kconst express = require('express');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n');
      const students = lines.slice(1).filter((line) => line.trim() !== '');

      let output = `Number of students: ${students.length}\n`;

      const fields = {};

      students.forEach((student) => {
        const [firstName, , , field] = student.split(',');
        if (field) {
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstName);
        }
      });

      Object.entries(fields).forEach(([field, names]) => {
        output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      });

      resolve(output.trim());
    });
  });
}

const app = express();

const dbFile = process.argv[2];

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const header = 'This is the list of our students\n';

  countStudents(dbFile)
    .then((data) => {
      res.send(`${header}${data}`);
    })
    .catch((err) => {
      res.send(`${header}Cannot load the database`);
      // console.error(err);
    });
});

app.listen(1245);

module.exports = app;

