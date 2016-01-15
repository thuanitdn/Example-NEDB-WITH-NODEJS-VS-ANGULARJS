/**
 * Created by ThuanLe on 1/11/2016.
 */
var data={success:false,messageInfo:"",body:""};

var Object=function() {}
Object.prototype.get = function() {
    return data;
};
Object.prototype.setSuccess=function(success){
    data.success=success;
}
Object.prototype.setMessageInfo=function(messageInfo){
    data.messageInfo=messageInfo;
}
Object.prototype.setBody=function(body){
    data.body=body;
}
module.exports = Object;