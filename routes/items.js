let router = require("express").Router()
const Query = require("../db")
const { verifyUser } = require("../verify")

router.post("/addcartitem", verifyUser, async (req, res) => {
    try {
        const { product_id, quantity, General_price, cart_id } = req.body
        if (product_id && quantity && General_price && cart_id) {
            let q = `SELECT * FROM cart_item WHERE product_id = ? AND cart_id = ? `
            let result = await Query(q, [product_id, cart_id])
            console.log(!!result.length)
            if (!result.length) {
                q = `insert into cart_item (product_id, quantity, General_price, cart_id)
                         values(?,?,?,?)`
                result = await Query(q, [product_id, quantity, General_price, cart_id])
                res.json({ error: false, msg: "cart_item added successfully" })
            } else {
                let newQuantity = result[0].quantity + quantity
                let newPrice = result[0].General_price + General_price
                q = `UPDATE cart_item
                SET quantity = ? ,General_price = ?
                WHERE item_id = ? `
                result = await Query(q, [newQuantity, newPrice, result[0].item_id])
                res.json({ error: false, msg: "cart_item UPDATED successfully" })
            }
        } else {
            res.json({ error: true, msg: "missing some info" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

// this route not in use
router.put("/editcartitem", verifyUser, async (req, res) => {
    try {
        const { item_id, quantity, General_price } = req.body
        if (item_id && quantity && General_price) {
            let q = `UPDATE cart_item
            SET General_price = ?, quantity = ?
            WHERE item_id = ?;`
            let result = await Query(q, [General_price, quantity, item_id])
            res.json({ error: false, msg: "item edited successfully" })
        } else {
            res.json({ error: true, msg: "missing info" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})


router.post("/getallcartitemsbycartid", verifyUser, async (req, res) => {
    try {
        const { cart_id } = req.body
        console.log(cart_id)
        if (cart_id) {
            let q = `SELECT c.item_id , c.quantity, c.General_price , c.cart_id, p.product_name
            FROM cart_item c
            join products p on c.product_id = p.product_id WHERE c.cart_id = ?;`
            let result = await Query(q, [cart_id])
            res.json(result)
        } else {
            res.json({ error: true, msg: "missing cart id" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post("/deletecartitem", verifyUser, async (req, res) => {
    try {
        const { item_id } = req.body
        if (item_id) {
            let q = `DELETE FROM cart_item
                    WHERE item_id = ?;`
            let result = await Query(q, [item_id])
            res.json({ error: false, msg: "item  deleted successfully" })
        }
        else {
            res.json({ error: true, msg: "missing some info" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post("/clearitemsfromcart", verifyUser, async (req, res) => {
    try {
        const { cart_id } = req.body
        if (cart_id) {
            let q = `DELETE FROM cart_item
                     WHERE cart_id = ?;`
            let result = await Query(q, [cart_id])
            res.json({ error: false, msg: "cart cleared successfully" })
        }
        else {
            res.json({ error: true, msg: "missing some info" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router


