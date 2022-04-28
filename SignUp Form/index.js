// Dependencies used
var express = require("express") // express.js to write server 
var bodyParser = require("body-parser") // Parse the data got from POST Method
var mongoose = require("mongoose") // Helps to create db and connect to MongoDB

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var roll = req.body.roll;
    var branch = req.body.branch;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "name": name,
        "roll": roll,
        "branch": branch,
        "password": password,
        "email": email,
    }

    db.collection('Users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('success.html')

})



app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*' // used for access for localhost
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");