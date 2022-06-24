const connectToMongo = require('./db');
const express = require('express')
const cors = require("cors");


connectToMongo();
const app = express()
const port = 5000
const corsOptions ={
   origin:'*' 
  //  credentials:true,            //access-control-allow-credentials:true
  //  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
app.use(express.json())
//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`My NoteBook app listening on port ${port}`)
})