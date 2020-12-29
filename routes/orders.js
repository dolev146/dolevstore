let router = require("express").Router()
const { verifyUser, verifyAdmin } = require("../verify")
const Query = require("../db")

// not in use
router.get("/getallcartitemsbycartid", verifyUser, async (req, res) => {
    try {
        const { cart_id } = req.body
        if (cart_id) {
            let q = `SELECT c.quantity quantity , c.General_price General_price ,  p.product_name product_name, p.image_url image_url 
            FROM cart_item c
            join products p on c.product_id = c.product_id WHERE c.cart_id = ?;`
            let result = await Query(q, [cart_id])
            res.json(result)
        } else {
            res.json({ error: true, msg: "missing cart id" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post("/getuserinformationbydoubleclick", verifyUser, async (req, res) => {
    try {
        const { customer_id } = req.body
        console.log(customer_id)
        if (customer_id) {
            let q = `SELECT * FROM customers WHERE customer_id = ?;`
            let result = await Query(q, [customer_id])
            console.log(result)
            res.json(result)
        } else {
            res.json({ error: true, msg: "missing customer_id" })
        }
    } catch (error) {
        res.sendStatus(404)
    }
})


router.get("/getoccupieddates", verifyUser, async (req, res) => {
    try {
        let q = `SELECT COUNT(date_for_delivery) count, date_for_delivery
            FROM orders
            group by date_for_delivery;`
        let result = await Query(q)
        console.log(result)
        let dates_that_have_three_orders = result.filter(item => item.count >= 3)
        console.log(dates_that_have_three_orders)
        res.json(dates_that_have_three_orders)
    } catch (error) {
        res.sendStatus(500)
    }
})


router.post("/placeorder", verifyUser, async (req, res) => {
    try {
        const { customer_id, cart_id, total_price, city, street, date_for_delivery, date_of_purchase, four_digits } = req.body
        if (customer_id && cart_id && total_price && city && street && date_for_delivery && date_of_purchase && four_digits) {
            let q = `INSERT INTO orders (customer_id, cart_id, total_price, city, street, date_for_delivery, date_of_purchase, four_digits)
            VALUES (?,?,?,?,?,?,?,?)`
            let result = await Query(q, [customer_id, cart_id, total_price, city, street, date_for_delivery, date_of_purchase, four_digits])
            q = `update carts
            set completed = true
            where customer_id = ?`
            result = await Query(q, [customer_id])
            res.json({ error: false, msg: "Order Placed Successfully" })
        } else {
            res.json({ error: true, msg: "missing customer_id" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post("/getrecieptinformation", verifyUser, async (req, res) => {
    try {
        const { customer_id, cart_id } = req.body
        if (customer_id && cart_id) {
            let q = `SELECT order_id, total_price, city, street, date_for_delivery, date_of_purchase, four_digits FROM orders WHERE cart_id = ?`
            let order_details = await Query(q, [cart_id])
            q = `SELECT fname, lname FROM customers WHERE customer_id = ? `
            let customer_details = await Query(q, [customer_id])
            q = `SELECT p.product_name,c.quantity, c.General_price FROM cart_item c
            join products p 
            on c.product_id = p.product_id
            WHERE c.cart_id = ?
            ; `
            let cart_items = await Query(q, [cart_id])
            res.json({ error: false, order_details, customer_details, cart_items })
        } else {
            res.json({ error: true, msg: "missing customer_id" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router