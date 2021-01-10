const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const { Worker,workerData, parentPort } = require('worker_threads');

let instream = fs.createReadStream("./public/data/trades.json");
let outputLine = readline.createInterface({input:instream,output: false});
let processData = new Worker('./controllers/generateChartData.js');

outputLine.on('line',(line)=>{
    processData.postMessage(line);
});

outputLine.on('close',()=>{
    console.log("Closed");
});

exports.ohlc_data = function (req, res, next) {
    res.render('index', { title: 'Ohlc Data'});
};