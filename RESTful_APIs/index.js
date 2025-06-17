const express=require("express")
const app =express();

app.set("view engine","ejs");
const path=require("path");
// Middleware to serve static files
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
// Middleware to parse JSON bodies
app.use(express.json()); //for parsing application/json
//for parsing application/json
app.use(express.urlencoded({ extended: true }));
let port=3000;

//uuid
const { v4: uuidv4 } = require('uuid');

// patch and delete
const methodOverride = require('method-override');
// Middleware to override HTTP methods
app.use(methodOverride('_method'));
//port
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);   
})

app.get("/",(req,res)=>{
    res.redirect("/posts");  
})
let posts=[
    {
        id:uuidv4(),
        name:"Farooq",
        content :"Hello, this is Farooq, welcome to my blog!,i hope you like it"
    },
    {
        id:uuidv4(),
        name:"Ali",
        content :"Hello, this is Ali,i like to write about technology and programming"
    },
    {
        id: uuidv4(),
        name:"Ahmed",
        content :"Hello, this is Ahmed,i like cooking and sharing recipes"
    }];
    // Routes for posts
    app.get("/posts",(req,res)=>{
        res.render("posts.ejs",{posts});
    })
    // Route to create a new post
    app.get("/posts/new",(req,res)=>{
        res.render("new.ejs")
    })
    // Route to handle form submission for creating a new post
    app.post("/posts",(req,res)=>{
        let id=uuidv4();
        // Extracting name and content from the request body
        let {name,content}=req.body;
        posts.push({id,name,content});
    //   res.send("Post created successfully! \n <a href='/posts'>View Posts</a>");
    res.redirect("/posts");
    })


    //id route

    app.get("/posts/:id",(req,res)=>{
        let {id}=req.params;
        let post=posts.find((p)=>id===p.id);
        // res.render("posts.ejs",{post})
        if(post){
            res.render("show.ejs",{post});
           }
    })
    
// patch route
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    // res.send("worked")
    // console.log(newContent)
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    // console.log(post);
res.redirect("/posts")
   
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params
    post=posts.find((p)=>id===p.id)
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params
    posts=posts.filter((p)=>id!=p.id)
    res.redirect("/posts")
})