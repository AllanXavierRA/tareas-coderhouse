const fs = require("fs");


class ProductManager{

    path;

    constructor(path){
        this.path = path;
        this.products = []
    }

    async getProducts(){        
        
        try{
        let products = await fs.promises.readFile(this.path, 'utf-8');
        this.products = await fs.promises.readFile(this.path, 'utf-8');
        console.log(JSON.parse(this.products));
        return JSON.parse(products);
        }catch(error){
            console.log(this.products);
        }
    }

    idIncrement(){
        return this.products.length + 1;
    }

    validadorCodigoUnico(codigo){
        return this.products.filter(producto => {
            return producto.code === codigo
        })
    }

    async addProducts(title, description, price, code, stock, thumbnail = 'sin imagen'){
        


        if(this.validadorCodigoUnico(code).length !== 0){
            console.log(`No se pueden agregar productos con el mismo código`);
        }else{
            this.products.push({ id: this.idIncrement(), title: title, description, price, thumbnail, code, stock})
            
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        }
    }

    async getProductById(id){
        let product = await this.getProducts();
        const productById = product.find(producto => {
            return producto.id === id 
        })

        if(productById){
            console.log(productById);
            return productById
        }else{
            console.log(`Not Found`);
        }
    }
}

const product = new ProductManager('product.json');

product.getProducts()
// product.addProducts('producto prueba', 'este es un producto prueba', 200, 'abcd', 25);
// product.addProducts('producto prueba', 'este es un producto prueba', 200, 'abcdasdasd', 25);
// product.addProducts('producto prueba', 'este es un producto prueba', 200, 'abcasdasdasdasdd', 25);
// product.getProducts()
// product.getProductById(1)
