<b>Node OHLC server</b>

<b>Steps to run</b>

1. git clone git@github.com:VaibhavAjayGupta/ohlc.git
2. cd ohlc
3. npm install
4. npm run start
5. open localhost:3000 on browser
6. subscribe to XZECXXBT


<b>Design</b>

 1 Async line by line file reading (using stream) module readline. - for reading the data line by line using stream and non blocking.

 2 workers 
  generateChartData - for parsing the response , computing the OHLC packet, and constructing BAR chart data
  webSocketServer - for implementing the websocket which maintains the client list and publish the data which is computed in realtime.

Classes & Methods - 

 StockBarData class is used for storing the bar data.
  Methods:- 
   constructor(open,symbol,volume,bar_num) - for creating new bar with open, symbol, volume and bar_num
   updateVolume(value) - for updating volume of bar
   updateClose() for updating the close
   updateLow(value) for updating low
   updateHigh(value) for updating high

 PubSubManager is used for maintaining the list of subscribed clients and publish the data. 
  Methods:- 
   subscribe(subscriber, channel) - for subscribing to a particular stock(channel).
   publish(channel, message) - for publishing a message to a particular stock(channel)
   broker() - for publishing messages to all the stocks(channels).
	

DataStructers -
 HashMap is used for storing different subscribers for different stocks.
 HashMap is used for storing different bars.
 
Flow

 Reading file using a readline module which reads the file using stream, line by line without blocking the main thread.
 The line by line response is then posted immediately to a separate worker (generateChartData) for parsing, computing the OHLC packet, and constructing BAR chart data. 
 Realtime computed data is then posted to a separate worker (webSocketServer).
 webSocketServer maintains the list of subscribed clients and publish the response in realtime as received from the generateChartData.

Note : TS2 TimeStamp conversion - first 16 digits are the seconds, and the last 9 the nanoseconds.