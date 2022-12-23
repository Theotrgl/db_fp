var mysql = require('mysql');
var con = mysql.createConnection({
  host: "{203.175.8.57}",
  user: "{peth4676}",
  password: "{160903Ps}",
  database: "{peth4676_testing}"
});

con.connect(function() {
  let sql = `INSERT INTO UserPerson( UserName, email, password_hash) VALUES( 'Peter', 'peterns1609@gmail.com' , '12345678')`;

  con.query(sql);
  con.release();
  con.end();
});
