var express= require("express");
var app= express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.listen("7242", function(error){
    if(error){
        console.log ("port is not working");
    }else{
        console.log("port is working 7242");
    }
});
//mongoose database connection
var mongoose = require('mongoose');
//end of database connection
mongoose.connect('mongodb://udaykumaruday:iloveindia143@ds149905.mlab.com:49905/udaykumar', function(error){
    if(error){
        console.log("database is not working");
    }else{
        console.log("database is working");
    }
});//connect database


var Schema = mongoose.Schema;
var userCollectionInterface = new Schema({
    firstname: String,
    lastname: String,
    email:String,
    username:String,
    password:String
});


var userCollection = mongoose.model("user",userCollectionInterface);


var bodyParser = require('body-parser');
 
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



            // REGISTER API

app.post("/create",createName1); 
// create
function createName1(req,res) {
    console.log(req.body);
    var firstname_input = req.body.firstname;
    var lastname_input = req.body.lastname;
    var email_input = req.body.email;
    var username_input = req.body.username;
    var password_input = req.body.password;

var user = new userCollection({
    firstname: firstname_input,
    lastname: lastname_input,
    email: email_input,
    username: username_input,
    password: password_input
    });
user.save(function(error){
    if(error){
        console.log("register data not saved");
        res.send ("something went wrong with registration");
    }else{
        console.log("register data saved");
        res.send ("Register data created ");
    }
});
}
// end 

// update
app.post("/update",createName1); 
// create
function createName1(req,res) {
    console.log(req.body);
    var firstname_input = req.body.firstname;
    var lastname_input = req.body.lastname;
    var email_input = req.body.email;
    var username_input = req.body.username;
    var password_input = req.body.password;
    var _id=req.body._id;


     // use our bear model to find the bear we want
     userCollection.findById(_id, function(err, oldData) {

        if (err)
            res.send(err);

          
            oldData.firstname=firstname_input;
            oldData.lastname= lastname_input;
            oldData.email= email_input;
            oldData.username= username_input;
            oldData.password= password_input;

        // save the bear
        oldData.save(function(err) {
            if (err)
                res.send(err);

            res.send("success updated");
        });

    });


}
// end

            // LOGIN API

app.post("/login",createName2);   

function createName2(req,res) {
    console.log(req.body);
    var username_input = req.body.username;
    var password_input = req.body.password;


}

            // VIEW API        

app.get("/view",viewUsersData);

function viewUsersData(req,res) {

    userCollection.find({},function(error,data){

res.send(data);
})

}

// delte API

app.post("/delete",deleteUsersData);

function deleteUsersData(req,res) {
userCollection.remove({ _id: req.body.id }, function(err) {
    if (!err) {
        res.send("deleted");
    }
    else {
        res.send("not deleted");
    }
});



}