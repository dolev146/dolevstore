let router = require("express").Router()
const { verifyUser } = require("../verify")
const Query = require("../db")


router.get("/numberofproducts", async (req, res) => {
    try {
        let q = `SELECT COUNT(product_id) as total_NumberOfProducts FROM products`
        const total_NumberOfProducts = await Query(q)
        q = `SELECT COUNT(order_id) as total_NumberOfOrders FROM orders`
        const total_NumberOfOrders = await Query(q)
        res.json({ total_NumberOfProducts: total_NumberOfProducts[0], total_NumberOfOrders: total_NumberOfOrders[0] })
    } catch (error) {
        res.sendStatus(500)
    }
})



router.get("/cartstatus", verifyUser, async (req, res) => {
    try {
        const { customer_id } = req.customer
        let customerCartStatus = ""
        let q = `SELECT * FROM carts WHERE customer_id = ?`
        const array_customerCart = await Query(q, [customer_id])

        if (!array_customerCart.length) {
            customerCartStatus = "first_order"
        } else if (!array_customerCart[array_customerCart.length - 1].completed) {
            customerCartStatus = "continue_cart"
        } else {
            customerCartStatus = "new_cart"
        }
        res.json({ customerCartStatus })
    } catch (error) {
        res.sendStatus(500)
    }
})


router.post("/startresumeshopping", verifyUser, async (req, res) => {
    try {
        const { customerCartStatus, customer_id } = req.body
        if (customerCartStatus === "first_order" || customerCartStatus === "new_cart") {
            let q = `  INSERT INTO carts (customer_id,creation_date)
              Values (?,?);`
            const today = new Date
            const formated_Date = today.toISOString().split('T')[0]
            const result = await Query(q, [customer_id, formated_Date])
            q = `SELECT * FROM carts WHERE customer_id = ?`
            const array_customerCart = await Query(q, [customer_id])
            let cart_id = array_customerCart[array_customerCart.length - 1]
            console.log(cart_id.cart_id, "fisrt")
            res.json({ msg: "cart_Created", cart_id: cart_id.cart_id })
        } else {
            let q = `SELECT * FROM carts WHERE customer_id = ?`
            const array_customerCart = await Query(q, [customer_id])

            if (array_customerCart.length) {
                let cart_id = array_customerCart[0].cart_id
                console.log(cart_id, "secound")
                res.json({ msg: "continue cart1", cart_id })
            }
            else {
                let cart_id = array_customerCart[array_customerCart.length - 1]
                console.log(cart_id, "third")
                res.json({ msg: "continue cart2", cart_id })
            }
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router