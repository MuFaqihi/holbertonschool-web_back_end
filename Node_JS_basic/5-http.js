const http = require('http');
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

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.method === 'GET') {
    if (req.url === '/') {
      res.end('Hello Holberton School!');
    } else if (req.url === '/students') {
      res.write('This is the list of our students\n');

      countStudents(process.argv[2])
        .then((data) => {
          res.end(`${data}`);
        })
        .catch(() => {
          res.end('Cannot load the database');
        });
    } else {
      res.statusCode = 404;
      res.end('404 Not Found');
    }
  } else {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  }
});

app.listen(1245);

module.exports = app;
