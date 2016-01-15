/**
 * Created by ThuanLe on 1/14/2016.
 */
var io=require('socket.io');
module.exports= function (http) {
    io = io.listen(http);
    var numUser=0;
    io.on('connection', function (socket) {
        numUser++;
        socket.on('new message', function (data) {
            socket.broadcast.emit('new message', data);
        });
        socket.on('online', function () {
            socket.broadcast.emit('online', {
                numUsers: numUser
            });
        });
        socket.emit('online', {
            numUsers: numUser
        })
        socket.on('disconnect', function() {
            numUser--;
            socket.broadcast.emit('online', {
                numUsers: numUser
            });
        });
    });
}