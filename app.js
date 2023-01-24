const express = require('express');
const app = express();

const ProductManager = require('./productManager');

const productManager = new ProductManager('product.json');


app.get('/products', async (req, res) => {
    
    let products = await productManager.getProducts();
    let {limit} = req.query
    let productLimit = products.slice(0, limit);
    
    if(limit){
        res.send(productLimit)
    }else{
        res.send(products)
    }
})

app.get('/products/:pid', async(req, res) => {
    let id = parseInt(Object.values(req.params));
    let product = await productManager.getProductById(id);
    
    res.send(product)
})




app.listen(8080, () => {
    console.log(`app runing in port 8080`);
})