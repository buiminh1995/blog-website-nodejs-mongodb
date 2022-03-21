const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
//express app
const app = express()

//connect to database
const dbURI = "mongodb+srv://user1:1234@cluster0.0mw2p.mongodb.net/node-tuts?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000)) //listen to request from user only after connection to database
.catch((err) => console.log(err))

//register view engine 
//ejs automatically goes to views folder
app.set('view engine', 'ejs')
 
//listen for requests


//middleware and static file
app.use(express.static('public'))
app.use(morgan('dev'))

//mongoose and mongo sandbox routes
// app.get("/app-blog",(req,res) => {
//      const blog = new Blog({
//          title: 'new blog',
//          snippet: 'about my new blog',
//          body: 'more about my new blog'
//      })
//      blog.save()
//      .then((result) => {
//          res.send(result)
//      })
//      .catch((err) => {
//          console.log(err)
//      })
// })

// app.get('/all-blogs',(req,res) => {
//     Blog.find() // returns all documents in collection. Don't have to create an instance of Blog
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

// app.get('/single-blog',(req,res) => {
//     Blog.findById("6237afb98341e786e4e36c0f") // returns all documents in collection. Don't have to create an instance of Blog
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

//browser hangs here because it doesn't know how to move on after this use method
//next() helps the program move on
// app.use((req,res, next) => {
//     console.log('new request made');
//     console.log('host: ', req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next() //go to other functions down below
// })


app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    //res.send('<p>home page</p>')
    // res.sendFile('./views/index.html', {root:__dirname})
    //ejs
    res.render('index', {title: 'Home', blogs}) //could be written as blog: blog //the object will be sent to index.ejs
})

// app.use((req,res, next) => {
//     console.log('in the next middleware');
//     next() //go to other functions down below
// })

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root:__dirname})
    res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'})
})

//must put this at the bottom because it runs for every single request 
//the code runs top-down and if one of the above get() runs and it stops right there
//use() runs for every single url
//If none of the above get() functions run it means we don't have the page with the requested url
//so we return 404
app.use((req, res) => {
    //have to actually set the status
    // res.status(404).sendFile('./views/404.html', {root:__dirname})
    res.status(404).render('404', {title: '404'}) 
}) 