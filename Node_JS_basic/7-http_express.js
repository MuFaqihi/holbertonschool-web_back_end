const express = require('express');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      
      const lines = data.trim().split('\n');
      const students = lines.slice(1).filter(line => line.trim() !== '');
      
      let output = `Number of students: ${students.length}\n`;
      
      const fields = {};
      students.forEach(student => {
        const [firstName, , , field] = student.split(',');
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      });
      
      Object.keys(fields).forEach(field => {
        output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
      });
      
      resolve(output.trim());
    });
  });
}

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  let output = 'This is the list of our students\n';
  
  countStudents(process.argv[2])
    .then((data) => {
      output += data;
      res.send(output);
    })
    .catch(() => {
      output += 'Cannot load the database';
      res.send(output);
    });
});

app.listen(1245);

module.exports = app;
