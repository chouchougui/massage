var ObjectId = require("mongodb").ObjectID;
var page;
exports.showIndex=function(req,res){
    db.find("message",{},function(err,result){
        //console.log(result.length);
        var num = result.length;
        page=Math.ceil(num/5);
        //console.log(page);
    });
    db.find("message",{},{"pageSize":5,"page":1,"sort":{"time":-1}},function(err,result){
        var allResults = result;
        //console.log(allResults);
        res.render("message",{"allResults":allResults,"page":page});
    });
};
exports.message=function(req,res){
    var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    db.insertOne("message",{"name":req.query.name,"message":req.query.message,"time":time},function(err,result){
        //console.log(result);
        if (err){
            console.log("插入失败");
            return;
        }
        //console.log(result);
        console.log("插入成功");
        res.redirect("/");
    });
};
exports.del=function(req,res){
    var id = ObjectId(req.query._id);
    db.deleteMany("message",{"_id":id},function(err,result){
        if (err){
            console.log("删除失败");
            return;
        }
        console.log("删除成功");
        res.redirect("/");
    })
};
exports.page=function(req,res){
    var nowpage = req.query.page;
    db.find("message",{},{"pageSize":5,"page":nowpage,"sort":{"time":-1}},function(err,result){
        var allResults = result;
        //console.log(allResults);
        res.render("message",{"allResults":allResults,"page":page});
    })
};
