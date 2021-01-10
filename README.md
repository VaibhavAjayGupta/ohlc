Node OHLC server


Steps to run

1. git clone git@github.com:VaibhavAjayGupta/ohlc.git
2. cd ohlc
3. npm install
4. npm start
5. open localhost:3000 on browser
6. subscribe to XZECXXBT


Design

1. Implemented reading file using a readline module which reads the file stream line by line without blocking the main thread (using threads).
2. TimeStamp conversion - first 16 digits are the seconds, and the last 9 the nanoseconds.
3. 