module.exports = class StockBarData{
    constructor(open,symbol,volume,bar_num){
        this.o=open;
        this.h=open;
        this.l=open;
        this.lastTrade=open;
        this.c=0;
        this.volume=volume;
        this.event="ohlc_notify";
        this.symbol=symbol;
        this.bar_num=bar_num;
    }

    updateHigh(value){
        this.h=value;
    }

    updateLow(value){
        this.l=value;
    }

    updateLastTrade(value){
        this.lastTrade=value;
    }

    updateClose(){
        this.c=this.lastTrade;
    }

    updateVolume(value){
        this.volume+=value;
    }

    updateBar(){
        this.bar_num++;
    }

}
