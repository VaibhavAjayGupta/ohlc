const { workerData, parentPort, isMainThread } = require('worker_threads');
const { Worker} = require('worker_threads');
let StockBarData = require('./stockBarData');

let socketData = new Worker('./controllers/webSocketServer.js');

let stockBarDataMap = new Map();
let barStartTime = null;
let barCount = 1;

if (!isMainThread) {
    parentPort.on('message', (data) => {
        try {
            let tradeData = JSON.parse(data);

            if (barStartTime == null) {
                barStartTime = tradeData.TS2 / 1000000000;
            }

            if ((tradeData.TS2 / 1000000000) - barStartTime <= 15) {


                if (stockBarDataMap.get(tradeData.sym) != undefined) {
                    let currentStockData = stockBarDataMap.get(tradeData.sym);


                    if (currentStockData.high < tradeData.P)
                        currentStockData.updateHigh(tradeData.P);

                    if (currentStockData.low > tradeData.P)
                        currentStockData.updateLow(tradeData.P);

                    currentStockData.updateLastTrade(tradeData.P);
                    currentStockData.updateVolume(tradeData.Q);


                } else {
                    let newStockData = new StockBarData(tradeData.P, tradeData.sym, tradeData.Q, barCount);
                    stockBarDataMap.set(tradeData.sym, newStockData);
                }

                
                socketData.postMessage(JSON.stringify([...stockBarDataMap]));

            } else {

                stockBarDataMap.forEach((value, key) => {
                    value.updateClose();
                });

                socketData.postMessage(JSON.stringify([...stockBarDataMap]));
               
               
                stockBarDataMap.clear();
                barCount++;

                let newStockData = new StockBarData(tradeData.P, tradeData.sym, tradeData.Q, barCount);
                barStartTime = tradeData.TS2 / 1000000000;
                stockBarDataMap.set(tradeData.sym, newStockData);

            }
            
         
            
        } catch (e) {
            console.log(e);
        }
                  
});   
        
}