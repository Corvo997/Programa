const sqlite3 = require('sqlite3').verbose();
 
// open the database connection
db = new sqlite3.Database('database/database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to database.');
  });
 
 db.run('CREATE TABLE IF NOT EXISTS Nomes(name text)');

let nomes = ['Douglas', 'Moyses', 'Kennzy', 'Andrew', 'Denyson','Ana'];
 
let placeholders = nomes.map((nome) => '(?)').join(',');
let sql = 'INSERT INTO Nomes(name) VALUES ' + placeholders;
 

console.log(sql);
 
db.run(sql, nomes, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Rows inserted ${this.changes}`);
});
 

db.close();