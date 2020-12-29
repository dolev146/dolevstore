const Query = require("../db")
let router = require("express").Router()
const { verifyAdmin } = require("../verify")

router.post("/searchproductbyname", async (req, res) => {
    const { product_name } = req.body
    let q = `select * from products
    where (product_name LIKE ? )`
    let result = await Query(q, ["%" + product_name + "%"])
    res.json(result)
})

router.get("/allproducts", async (req, res) => {
    let q = `select * from products`
    const NotOrderedArray = await Query(q)
    const Milk_Dairy_Array = NotOrderedArray.filter(i => i.category_id === 1)
    const Vegetables_Fruits_Array = NotOrderedArray.filter(i => i.category_id === 2)
    const Meat_Fish_Array = NotOrderedArray.filter(i => i.category_id === 3)
    const Wine_Drinks_Array = NotOrderedArray.filter(i => i.category_id === 4)
    const ContainAllArrays = {
        NotOrderedArray,
        Milk_Dairy_Array,
        Vegetables_Fruits_Array,
        Meat_Fish_Array,
        Wine_Drinks_Array
    }
    res.json(ContainAllArrays)
})

// not in use
router.get("/productsbycategory", async (req, res) => {
    try {
        const { category_id } = req.body
        let q = `select * from products WHERE category_id = ?`
        let result = await Query(q, [category_id])
        res.json(result)
    } catch (error) {
        res.sendStatus(500)
    }
})


router.post("/addproduct", verifyAdmin, async (req, res) => {
    try {
        const { product_name, category_id, price, image_url } = req.body
        console.log(req.body)
        if (product_name && category_id && price && image_url) {
            let q = `insert into products (product_name , category_id , price, image_url )
            values ( ?, ?, ?, ?);`
            let result = await Query(q, [product_name, category_id, price, image_url])
            res.json({ error: false, msg: "product added successfully" })
        } else {
            res.json({ error: true, msg: "missing some info" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

router.put("/editproduct", verifyAdmin, async (req, res) => {
    try {
        const { product_id, product_name, category_id, price, image_url } = req.body
        if (product_id && product_name && category_id && price && image_url) {
            let q = `UPDATE products
                    SET product_name = ?, category_id = ?, price = ?, image_url = ?
                    WHERE product_id = ?;`
            let result = await Query(q, [product_name, category_id, price, image_url, product_id])
            res.json({ error: false, msg: "product edited successfully" })
        }
        else {
            res.json({ error: true, msg: "missing some info" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

// not in use because the project didnt asked for the ability to delete
router.delete("/deleteproduct", verifyAdmin, async (req, res) => {
    try {
        const { product_id } = req.body
        if (product_id) {
            let q = `DELETE FROM products
                    WHERE product_id = ?;`
            let result = await Query(q, [product_id])
            res.json({ error: false, msg: "product deleted successfully" })
        }
        else {
            res.json({ error: true, msg: "missing some info" })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router