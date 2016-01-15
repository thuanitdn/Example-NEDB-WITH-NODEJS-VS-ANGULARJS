/**
 * Created by ThuanLe on 1/11/2016.
 */
exports.index= function (req,res) {
    if(process.env.NODE_ENV === "test"){
        var data={userName:"Test"}
    }
    else{
        var data={userName:req.session.passport.user.DisplayName}
    }
    res.render('DashboardPage',data);
}