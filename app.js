const express = require('express')
const mongoose = require('mongoose')

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',()=>{
  console.log('mongoose error')
})

db.once('open',()=>{
  console.log('mongoose connect')
})

app.get('/',(req,res)=>{
  res.send('hello')
})


app.listen(3000,()=>{
  console.log('app is running on http://localhost:3000')
})