const express = require('express')
const path = require('path')
const app = express()

//middleware to bind to static directory
app.use(express.static('./public'))

//middleware to read form content
app.use(express.urlencoded({extended: true}))

//serve json to api endpoint
app.get('/answers', (req, res) => {
  res.sendFile(path.resolve('./api/example.json'))
})

//send the reply page
app.get('/reply', (req, res) => {
  console.log(req.query)
  res.sendFile(path.resolve('./public/reply.html'))
})

//Handle form submission
app.post('/quest', (req, res) => {
  //store form info as var
  let formInfo = req.body

  //attach data as header to response, Value MUST be a string
  res.redirect(`/reply?name=${formInfo.name}&quest=${formInfo.quest}&color=${formInfo.color}`)

})

app.listen(5000)
