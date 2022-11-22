//client.js
var io = require('socket.io-client');
class Client {
    constructor(port) {
        this.port = port;
        this.socket = {};
    }

    initializeSocket(){
        return new Promise((resolve,reject)=>{
        })

    }
    connect(){
        return new Promise((resolve, reject)=>{
            this.socket = io.connect(`http://127.0.0.1:${this.port}`, {reconnect: true});
            this.socket.on('connect', (sock) =>{
                resolve('connected');
            });
        })
    }

    heartBeat(cb){
        this.socket.on('heartbeat', (data) => {
            cb(data)
        });
    }
    eventHandle(type){
        return new Promise((resolve, reject)=>{

            this.socket.on(type, (data) => {
                resolve(data);
            });
        });
    }

    eventEmit(type){
       return new Promise((resolve,reject)=>{

            this.socket.emit(type, 'me', 'test msg',(val)=>{
               resolve('val');
            });
        })
    }

    clientClose(){
        return new Promise((resolve,reject)=>{
            this.socket.disconnect(() => {
                resolve('client disconnected');
            });

        })

    }
}



module.exports = Client;