class PubSubManager {
    constructor() {
        this.channels = new Map();
    }
    subscribe(subscriber, channel) {
       if(this.channels.get(channel)==undefined){
        this.channels.set(channel,{
            message: '',
            subscribers: []
        })
       }
        this.channels.get(channel).subscribers.push(subscriber);
    }

    publish(channel, message) {        
        if(this.channels.get(channel)==undefined){
            this.channels.set(channel,{
                    message: '',
                    subscribers: []
                })
           }
        this.channels.get(channel).message = message;
    }

    broker() {

        this.channels.forEach((value,key)=>{

            
            if(value.message){
                
                value.subscribers.forEach(subscriber => {
                        subscriber.send(JSON.stringify({
                            message: value.message
                        }));
                    });

                     value.message = '';
            }

        })
    }
}
module.exports = PubSubManager;