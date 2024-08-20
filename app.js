const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food","Make Food","Cook Food"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    
    const day = date.getDate();
    
    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){

    const item = req.body.newItem;
    
    if (req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
    
});

app.post("/work", function(req,res){
    var item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/work", function(req, res){
    res.render("list",{listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function(req,res){
    res.render("about");
});


app.listen(8000, function(){
    console.log("Server Started on Port 8000");
});
