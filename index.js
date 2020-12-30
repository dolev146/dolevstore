// imports
const express = require("express")
const cors = require("cors")

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

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dolevstore/dist/dolevstore'))

app.get('/', function(req,res) {
    
    res.sendFile(path.join(__dirname+'/dist/dolevstore/index.html'));
    });



const port = process.env.PORT  || 1000

// listening
app.listen(port, () => { console.log("up and running on " + port) })