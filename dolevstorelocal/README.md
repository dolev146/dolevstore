# Dolevstore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.7.

|Description|Method + Path|Request|Response Success | Error Respnse |
|:----------|:------------|:------|:---------------|:--------------|
| Welcome to api  | "/" GET  | noting   |Response : "welcome to my api" | noting |    
| register customer  | "/api/customers/register" POST  | Req.body : { customer_id, email, fname, lname, city, street, password }|  Response : res.status(201).json({ error: false, msg: "customer added successfully" })|   res.status(400).json({ error: true, msg: "customer id already taken" }) OR  res.status(400).json({ error: true, msg: "missing some info" }) |   
| login customer  | "/api/customers/login" POST  | Req.body : { email, password }|  Response :   res.status(200).json({ error: false, access_token, refresh_token, customer_id: customer[0].customer_id }) | res.status(401).json({ error: true, msg: "wrong password" }) OR   res.status(401).json({ error: true, msg: "user not found" })|    
| check if customer id is taken  | "/api/customers/isidtaken" POST  | Req.body : { customer_id }|  Response :  { error: false, msg: "free to use the customer_id" } | { error: true, msg: "customer_id already taken" }|   
| get the number of products in the store  | "/api/homepage/numberofproducts" GET  | none|  Response : { total_NumberOfProducts: total_NumberOfProducts[0], total_NumberOfOrders: total_NumberOfOrders[0] } |  status(500) internal server error |   
| what is the cart status of the customer  | "/api/customers/cartstatus" GET  | Req is the access token which provides the customer_id |  Response : .json{ customerCartStatus } // "first_order" Or "continue_cart" Or "new_cart"  |  res.sendStatus(500)| 
| give the customer a new cart or the cart that is still open for them  | "/api/customers/startresumeshopping" POST  | Req :  { customerCartStatus, customer_id } + User access token |  Response : { msg: "cart_Created", cart_id: cart_id.cart_id } Or { msg: "continue cart1", cart_id } Or  { msg: "continue cart2", cart_id } |  res.sendStatus(500)|    
| Add item to cart  | "/api/customers/addcartitem" POST  | Req :  { product_id, quantity, General_price, cart_id } + user access token |  Response :     res.json({ error: false, msg: "cart_item added successfully" }) Or  res.json({ error: false, msg: "cart_item UPDATED successfully" }) Or   res.json({ error: true, msg: "missing some info" })|  res.sendStatus(500)| 
| Get all cart items  | "/api/customers/getallcartitemsbycartid" POST  | Req : { cart_id } + access token |  Response :      res.json(result) => the cart items  Or   res.json({ error: true, msg: "missing cart id" }) |  res.sendStatus(500)| 
| Get all cart items  | "/api/customers/getallcartitemsbycartid" POST  | Req :  { product_id, quantity, General_price, cart_id }  +  access token|  Response :     res.json({ error: false, msg: "cart_item added successfully" }) Or  res.json({ error: false, msg: "cart_item UPDATED successfully" })|  Or   res.json({ error: true, msg: "missing some info" })| 
| delete item from cart | "/api/customers/deletecartitem" POST  | Req :  { item_id } + access token|  Response : res.json({ error: false, msg: "item  deleted successfully" }) | res.json({ error: true, msg: "missing some info" })| 
| clear the cart from items | "/api/customers/clearitemsfromcart" POST  | Req :  { cart_id }  + access token|  Response :   res.json({ error: false, msg: "cart cleared successfully" }) | res.json({ error: true, msg: "missing some info" })| 
| Get the information by double click | "/api/orders/getuserinformationbydoubleclick" POST  | Req :  { customer_id }  + access token|  Response : customer information | res.json({ error: true, msg: "missing some info" })| 
| Array of dates to filter the dates that are full | "/api/orders/getoccupieddates" GET   | Req : access token|  Response :  res.json(dates_that_have_three_orders) |   res.sendStatus(500)| 
| Place the order | "/api/orders/placeorder" POST   | Req body : { customer_id, cart_id, total_price, city, street, date_for_delivery, date_of_purchase, four_digits }  + access token|  Response :   res.json({ error: false, msg: "Order Placed Successfully" }) |   res.json({ error: true, msg: "missing customer_id" })| 
| Get recipt information | "/api/orders/getrecieptinformation" POST   | Req body : { customer_id, cart_id } + access token|  Response :   res.json({ error: false, order_details, customer_details, cart_items })) |   res.json({ error: true, msg: "missing customer_id" })| 
| Search For product | "/api/products/searchproductbyname" POST   | Req body : { product_name } + access token|  Response :  product information |   none | 
| Get all products | "/api/products/allproducts" Get   | none |  Response : res.json(ContainAllArrays) all the products |  none|
| Add a product | "/api/products/addproduct" POST | Req body : { product_name, category_id, price, image_url }   + access token Admin |  Response :  res.json({ error: false, msg: "product added successfully" }) |   res.json({ error: true, msg: "missing customer_id" })| 
| Add a product | "/api/products/editproduct" PUT | Req body : { product_id ,product_name, category_id, price, image_url }   + access token Admin |  Response : res.json({ error: false, msg: "product edited successfully" }) |   res.json({ error: true, msg: "missing customer_id" })| 
| logo image | "/images/logo.png" GET | none | none | none | 


