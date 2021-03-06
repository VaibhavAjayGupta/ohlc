<b>Node OHLC server</b>

Gihub Repo link :- https://github.com/VaibhavAjayGupta/ohlc

<b>Steps to run</b>

1. git clone git@github.com:VaibhavAjayGupta/ohlc.git
2. cd ohlc
3. npm install
4. npm run start
5. open localhost:3000 on browser
6. subscribe to XZECXXBT


<b>Design</b>

 1. Async line by line file reading (using stream) module readline. - for reading the data line by line using stream and non blocking.

 2. 2 workers </br>
        <b>generateChartData</b> - for parsing the response , computing the OHLC packet, and constructing BAR chart data.</br>
        <b>webSocketServer</b> - for implementing the websocket which maintains the client list and publish the data which is computed in realtime.

<b>Classes & Methods </b> 

 <b>StockBarData</b> class is used for storing the bar data.</br>
  Methods:- </br>
   1. constructor(open,symbol,volume,bar_num) - for creating new bar with open, symbol, volume and bar_num.
   2. updateVolume(value) - for updating volume of bar.
   3. updateClose() for updating the close.
   4. updateLow(value) for updating low.
   5. updateHigh(value) for updating high.

 <b>PubSubManager</b> is used for maintaining the list of subscribed clients and publish the data. </br>
  Methods:- </br>
   1. subscribe(subscriber, channel) - for subscribing to a particular stock(channel).
   2. publish(channel, message) - for publishing a message to a particular stock(channel).
   3. broker() - for publishing messages to all the stocks(channels).
	

<b>DataStructers </b>

 1. Map is used for storing different subscribers for different stocks.
 2. Map is used for storing different bars.
 
<b>Flow of project</b>

 1. Reading file using a readline module which reads the file using stream, line by line without blocking the main thread.
 2. The line by line response is then posted immediately to a separate worker (generateChartData) for parsing, computing the OHLC packet, and constructing BAR chart data. 
 3. Realtime computed data is then posted to a separate worker (webSocketServer).
 4. webSocketServer maintains the list of subscribed clients and publish the response in realtime as received from the generateChartData.
 5. OHLC data is sent on Every trade.
 6. <b>Output on Every Trade</b>
 {"o":0.01762,"h":0.01762,"l":0.01762,"lastTrade":0.01762,"c":0.01762,"volume":7.8251401,"event":"ohlc_notify","symbol":"XZECXXBT","bar_num":10631}

<b>Note : </b>
  1. You won't see any data after subscribing to a particular stock because as soon as the node server is started it's done reading all the data from file and all the data is pushed to the already exisiting clients. As there is no new data pushed to the websocket there is no data recieved by the client. 
  2. TS2 TimeStamp conversion - first 16 digits are the seconds, and the last 9 are nanoseconds.