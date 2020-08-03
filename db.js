var mysql = require('mysql');
var moment = require('moment');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'dark-light',
  password: 'Hddev1@',
  database: 'dark_light'
});

function setupDb() {
  connection.connect();
  
  connection.query(
    'CREATE TABLE IF NOT EXISTS switches (indirizzo_ip VARCHAR(15) NOT NULL, mode VARCHAR(10), time_click DATETIME)',
    function(err) { if (err) throw(err); }
  );
  
  connection.query(
    `CREATE TABLE IF NOT EXISTS switches_stats (
      indirizzo_ip VARCHAR(15) NOT NULL PRIMARY KEY, 
      clicks INT, 
      last_status VARCHAR(10), 
      average_switch_time TIME)`, 
    function(err) { if (err) throw(err); }
  );
}

function getStats(ip, next) {
  connection.query(`SELECT * FROM switches_stats WHERE indirizzo_ip = '${ip}'`, (err, rows, _fields) => {
    if (err) throw(err);
    next(rows);
  });
}

function getLastStatus(ip, next) {
  connection.query(`SELECT last_status FROM switches_stats WHERE indirizzo_ip = '${ip}'`, (err, rows, _fields) => {
    if (err) throw(err);
    if (rows.length === 0) {
      next('light'); 
    } else {
      next(rows[0].last_status);
    }
  });
}

function insertSwitch(ip, mode, next) {
  var now = moment().format('YYYY-MM-DD HH:mm:ss');
  var nowTime = moment().format('HH:mm:ss');
  
  connection.query(`INSERT INTO switches VALUES ('${ip}', '${mode}', '${now}')`, function(err, _rows, _fields) {
    if (err) throw err;
  });

  connection.query(`
    INSERT INTO switches_stats VALUES ('${ip}', 1, '${mode}', '${nowTime}')
    ON DUPLICATE KEY UPDATE 
    clicks = clicks + 1, 
    last_status = '${mode}', 
    average_switch_time = (SELECT SEC_TO_TIME(AVG(TIME_TO_SEC(time_click))) FROM switches WHERE indirizzo_ip = '${ip}')
  `, function(err, _rows, _fields) { 
    if (err) throw err; 
    next();
  });
}

module.exports = { setupDb, getStats, getLastStatus, insertSwitch }