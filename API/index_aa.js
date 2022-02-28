const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/' , (req , res)=>{

   res.send(req.body)

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))