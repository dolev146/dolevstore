const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dolevstore"
})

db.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected to db")
    }
})

const Query = (q, params) => {
    return new Promise((resolve, reject) => {
        db.query(q, params, (err, results) => {
            if (err) {
                reject(err)
                console.log(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = Query
