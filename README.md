Node OHLC server

1. Implemented reading file using a readline module which reads the file stream line by line without blocking the main thread (using threads).
2. TimeStamp conversion - first 16 digits are the seconds, and the last 9 the nanoseconds.
3. 