const express = require('express');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'arduino_mariadb', 
     port: 3306,
     user: process.env.USER, 
     password: process.env.PASSWD,
     database: process.env.DBNAME,
     connectionLimit: 5
});

console.log(process.env.USER);

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  pool.getConnection().then(conn => {
    conn.query("SELECT * FROM data").then((rows) => {
      console.log(rows);
    })
  }).catch(err => {
    //not connected
    console.log("fail!" + err);
  });
});

app.get('/insert', (req, res) => {
  console.log(req.query.temp);
  console.log(req.query.humi);
  console.log(req.query.ir1);
  console.log(req.query.ir2);
  console.log(req.query.flex);
  console.log(req.query.ult);

  pool.getConnection().then(conn => {

    conn.query("INSERT INTO data (date, temp, humidity, ir1, ir2, flex, ultrasonic) VALUES (now()," + req.query.temp + "," + req.query.humi + "," + req.query.ir1 + "," + req.query.ir2 + "," + req.query.flex + "," + req.query.ult + ")");
  }).catch(err => {
    //not connected
    console.log("fail!" + err);
    res.send("MySQL successfully connected!");
  });
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);