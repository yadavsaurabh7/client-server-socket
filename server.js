var moment = require('moment');
function serverConnection(io){
    var count = {};
    var subscriberCount = 0;

    io.on('connection',(socket)=> {
        count[`${socket.id}`]={
            "type": '',
            "status": '',
            "updatedAt": moment().format('YYYY-MM-DD H:m:s')
            };;
        console.log('a user connected');
    
        socket.on('CountSubscribers', () => {
            for (socket_id in count) {
                if (count.hasOwnProperty(socket_id) && count[socket_id].type=='Subscribe')
                    // If the key is found, add it to the total length
                    subscriberCount++;
            }
            objectLenght = count;
            socket.emit("CountSubscribers", {
                "type": 'CountSubscribers',
                "count": subscriberCount,
                "updatedAt": moment().format('YYYY-MM-DD H:m:s')
                });
        });
        socket.on('Unsubscribe', () => {
            console.log('user Un Subscribed');
            if(count[`${socket.id}`].type!=undefined && count[`${socket.id}`].type!='Unsubscribe'){
                count[`${socket.id}`] = {
                    "type": 'Unsubscribe',
                    "status": "Unsubscribe",
                    "updatedAt": moment().format('YYYY-MM-DD H:m:s')
                    };
            }
    
            socket.emit("Unsubscribe",  count[`${socket.id}`] );
        });
        socket.on('Subscribe',() => {
            if(count[`${socket.id}`].type!=undefined && count[`${socket.id}`].type!='Subscribe'){
                count[`${socket.id}`] = {
                    "type": 'Subscribe',
                    "status": "Subscribe",
                    "updatedAt": moment().format('YYYY-MM-DD H:m:s')
                    };
            }
            console.log('user Subscribed');
    
            socket.emit("Subscribe", count[`${socket.id}`]);
            
          
        });
    
        socket.on('disconnect', () => {
            //console.log('user disconnected');
        });
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
        });
    
        setInterval(function() {
            socket.emit('heartbeat', {
                "type": 'heartbeat',
                "updatedAt": moment().format('YYYY-MM-DD H:m:s')
                });
        }, 1000);
    })
}

module.exports = serverConnection;