// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

let nextId=1
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
server.post('/posts', (req,res)=>{
    if (req.body.author && req.body.contents && req.body.title){
        let post= {
            author:req.body.author,
            title:req.body.title,
            contents:req.body.contents,
            id: nextId,
        }
        posts.push(post)
        nextId++
        res.json(post)
    }
    else return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
})

server.post('/posts/author/:author', (req,res)=>{
const {title, contents}=req.body
const {author}=req.params
if(!title||!contents||!author){
    res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
}
let post={
    author,
    title,
    contents,
    id:nextId
}
posts.push(post)
        nextId++
        res.json(post)
})

server.get('/posts', (req,res)=>{
    let {term}=req.query
    if (term){
        let filtrados=posts.filter(post=>post.title.includes(term)||post.contents.includes(term))
        return res.json(filtrados)
    }
    return res.json(posts)
})

server.get('/posts/:author',(req,res)=>{
    let {author}=req.params
    let filtrados= posts.filter(post=>post.author===author)
    if (filtrados.length>0){
        res.json(filtrados)
    }
    res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
})

server.get('/posts/:author/:title', (req, res)=>{
    const {author}=req.params
    const {title}=req.params
    let filtrados= posts.filter(post=>post.author===author && post.title===title)
    if (filtrados.length>0){
        res.json(filtrados)
    }
    res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
})

server.put('/posts', (req,res)=>{
    let {id, contents, title}=req.body
    if (id && contents && title){
        let filtrado= posts.filter(post=>post.id===id)
        if(filtrado.length>0){
            filtrado[0].contents=contents
            filtrado[0].title=title
            return res.json(filtrado[0])
            
        }
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho id"})
    }
    res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
})

server.delete('/posts', (req,res)=>{
    let {id}=req.body
    let post= posts.find(post=>post.id===id)
    if (!post){
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }
    posts=posts.filter(post=>post.id!==id)
    res.json({ success: true })
})

server.delete('/author', (req,res)=>{
    let {author}=req.body
    let post= posts.filter(post=>post.author===author)
    if (post.length===0){
        return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    } 
    posts=posts.filter(post=>post.author!==author)
    res.json(post)
})

module.exports = { posts, server };
