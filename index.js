const { CONNREFUSED } = require("dns");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const{v4: uuidv4} = require('uuid');
const port = process.env.PORT || 8080;
app.use(express.urlencoded({extended : true}));
app.set("engine view", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));


let posts = [
    {
        id:uuidv4(),
        user:"Vedant",
        content: "I am learning REST"
    },
    {
        id:uuidv4(),
        user: "Sahil",
        content: "I am learning Stenography"
    },
    {
        id:uuidv4(),
        user:"Vishal",
        content:"I am learning Civil Engineering"
    }
];


app.get("/", (req,res)=>{
    res.render('post.ejs');
});

// for getting response : get
app.get("/posts",(req,res)=>{
    res.render("index.ejs", {posts});
});

//For adding(creating) : post
app.get("/posts/new",(req,res)=>{

    res.render("form.ejs");
    console.log("Request to new post is sent Successfully");
});
app.post("/posts", (req,res)=>{
    const id = uuidv4();
    let {user, content} = req.body;
    posts.push({id,user,content});
    console.log(req.body);
    res.redirect("/posts");
});

//GET for individual post --> posts/:id
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((post)=> id === post.id);
    res.render("show.ejs", {post});
    console.log(post);
});
    
// PATCH or PUT : Both are Same, used to update specific post.
app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    console.log("id: " ,id);
    let newContent = req.body.content;
    let post = posts.find((p)=>id == p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
       
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>{return id ===p.id;});
    res.render("edit.ejs",{post});
});

// DELETE
app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    posts = posts.filter((p)=>p != post);
    console.log(posts);
    res.redirect("/posts");
})


app.listen(port,(req,res)=>{    
    console.log("The app is listening");
});


