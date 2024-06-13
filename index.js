const express = require('express');
const path = require("path")
const fs = require("fs")

const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")))

app.get("/",(req, res)=>{
    fs.readdir(`./files`, function(err, files){
        // console.log(files);
        res.render("index", {files:files})
    })
})

app.get("/file/:filename",(req, res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err, filedata){
        // console.log(filedata);
        res.render("show",{filename: req.params.filename, filedata: filedata})
    })
})

app.get("/edit/:filename",(req, res)=>{
    res.render("edit", {filename:req.params.filename})
})

app.post("/create",(req, res)=>{
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(" ").join("_")}.txt`, `${req.body.description}`, function(err){
        res.redirect("/")
    })
})

app.post("/edit",(req, res)=>{
    console.log(req.body);
    fs.rename(`./files/${req.body.privious}` ,`./files/${req.body.new}.txt`, function(err){
        res.redirect("/")
    })
})

app.listen(3000, ()=>{
    console.log("server running");
})