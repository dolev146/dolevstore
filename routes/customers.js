let router = require("express").Router()
const bcrypt = require('bcrypt')
const Query = require("../db")
// const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
let jwt = require("jsonwebtoken")


// REGISTER
router.post("/register", async (req, res) => {
    try {
        let { customer_id, email, fname, lname, city, street, password } = req.body
        if (customer_id === 0) { res.json({ error: true, msg: "customer id cannot be 0" }) }
        //check body validity
        let user = await Query(`SELECT * FROM customers WHERE customer_id = ?`, [customer_id])
        if (customer_id && email && fname && lname && city && street && password) {
            //check if user already exist
            if (!user.length) {
                // const salt = genSaltSync(10)
                // const hash = hashSync(password, salt)

                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                // const user = { name: req.body.name, password: hashedPassword }

                let q = `INSERT INTO customers(customer_id ,email, fname, lname, city , street , password)
               VALUES(? ,? , ? , ? , ? , ? , ? )`
                let results = await Query(q, [customer_id, email, fname, lname, city, street, hashedPassword])
                res.status(201).json({ error: false, msg: "customer added successfully" })
            } else {
                res.status(400).json({ error: true, msg: "customer id already taken" })
            }
        } else {
            res.status(400).json({ error: true, msg: "missing some info" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    // data exist
    if (email && password) {
        try {
            let q = `SELECT * FROM customers WHERE email = ?`
            let customer = await Query(q, [email])
            console.log(customer)
            if (customer.length) {
                // password match
                if (await bcrypt.compare(password, customer[0].password)) {
                    let access_token = jwt.sign({
                        customer_id: customer[0].customer_id,
                        fname: customer[0].fname,
                        role: customer[0].role
                    }, "BlAh", {
                        expiresIn: "10m"
                    })
                    let refresh_token = jwt.sign({ customer_id: customer[0].customer_id }, "refresh", {
                        expiresIn: "7d"
                    })
                    res.status(200).json({ error: false, access_token, refresh_token, customer_id: customer[0].customer_id })
                } else {
                    res.status(401).json({ error: true, msg: "wrong password" })
                }
            } else {
                res.status(401).json({ error: true, msg: "user not found" })
            }
        } catch (error) {
            res.sendStatus(500)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some imfo" })
    }
})


router.post("/isidtaken", async (req, res) => {
    const { customer_id } = req.body
    //check body validity
    let user = await Query(`SELECT * FROM customers WHERE customer_id = ?`, [customer_id])
    if (!user.length) {
        res.json({ error: false, msg: "free to use the customer_id" })
    } else {
        res.status(400).json({ error: true, msg: "customer_id already taken" })
    }
})



module.exports = router