const mongoose = require('mongoose')
const dbData = `${process.env.DB_URL}/${process.env.DB_NAME}`

mongoose.connect(dbData, { useNewUrlParser: true, useUnifiedTopology: true })
.then((res) => console.log("Database connected."))
.catch((err) => console.log('Error while connect database.'))