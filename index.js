// imports
const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

// mw
app.use(cors())
app.use(express.json())
app.use("/api/customers", require("./routes/customers"))
app.use("/api/homepage", require("./routes/homepage"))
app.use("/api/products", require("./routes/products"))
app.use("/api/items", require("./routes/items"))
app.use("/api/orders", require("./routes/orders"))
app.use("/images", express.static("./images"))

app.get("/api", (req, res) => {
    res.send("welcome to my api") 
})

// Serve only the static files form the  directory
app.use( express.static(path.join(__dirname + '/dolevstore')))




// app.get('/', (req,res)=> {
//     res.sendFile(path.join(__dirname+'/dolevstore/index.html'));
//     });

app.get("/", (req,res)=>{
   res.sendFile(path.join(__dirname+'/dolevstore/index.html'));
})



const port = process.env.PORT  || 8080
console.log(port)
// listening
app.listen(port, () => { console.log("up and running on " + port), 
console.log(path.join(__dirname + '/dolevstore'))
console.log(path.join(__dirname + '/dolevstore/index.html')) })