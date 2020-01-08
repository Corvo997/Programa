const fs = require('fs')
function readdir(path){
   return new Promise((resolve, reject) => {
   	fs.readdir(path, (err, paths) => {
   		if (err){
   			reject(err)
   		}else{
   			resolve(paths)
   		}
   	})
   })
}
function stat(path){
  return new Promise((resolve, reject) => {
  	fs.stat(path, (err,stat) => {
  		if(err){
  			reject(err)
  		}else{
  			resolve({path, stat})
  		}
  	})
  })
}
/*stat('./').then( stat =>{
	console.log(stat.isFile())
})*/

// readdir('./').then((paths) => console.log(paths))

async function lista(){
	const paths = await readdir('./')
	const statsPromises = paths.map(async (path) => await stat(path))
	const stats= await Promise.all(statsPromises)
	const pathsWithIsFile = stats.map ( path => ({ path: path.path, isFile: path.stat.isFile()}) ) 
    const files = pathsWithIsFile.filter( path=> path.isFile)
    console.log(files)

 const sqlite3 = require('sqlite3').verbose()
	
let db = new sqlite3.Database('./arquivos.db', sqlite3.OPEN_READWRITE, (err) => {
if (err) {
console.error(err.message);
  }
  console.log('Connected to database.');
});

/*const placeholders = files.map((file)=>'(?)').join(',');*/
const sql =  'INSERT INTO Nomes(Nome) VALUES' + files;

db.run(sql, function(err) {
  if (err) {
    return console.error(err.message);
  }
});

}
lista()

/*function salvar(){
	const sqlite3 = require('sqlite3').verbose()
	
	let db = new sqlite3.Database('./arquivos.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database.');
});

let apelidos = ['moyses','douglas','moyses'];
let placeholders = files.map((file)=>'(?)').join(',');
let sql =  'INSERT INTO Nomes(Nome) VALUES' + placeholders;

db.run(sql, apelidos, function(err) {
  if (err) {
    return console.error(err.message);
  }
});
}
salvar()

function filtro(){
	const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./arquivos.db');

let sql = 'SELECT DISTINCT Nome * FROM Nomes';
 
db.all(sql,[],(err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.name);
  });
});
 
db.close(); 
}
filtro()*/