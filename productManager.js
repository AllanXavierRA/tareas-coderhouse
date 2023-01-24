const fs = require("fs");


class ProductManager{

    path;

    constructor(path){
        this.path = path;
        this.products = []
    }

    async getProducts(){        
        
        try{
        const products = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(products);
        }catch(error){
            return this.products;
        }
    }

    async idIncrement(){
        let product = await this.getProducts()
        
        try {
            return product.length + 1;
        } catch (error) {
            console.log(error);
        }
    }

    async validadorCodigoUnico(codigo){
        let product = await this.getProducts();

        try{
            const filteredPRoduct =  product.filter(producto => {
                return producto.code === codigo
            })

            if(filteredPRoduct.length !== 0){
                return true
            }
        }catch(error){
            return false
        }
    }

    async addProducts(title, description, price, code, stock, thumbnail = 'sin imagen'){
        let product = await this.getProducts();
        let validador = await this.validadorCodigoUnico(code);
        let increment = await this.idIncrement();


        if(validador){
            console.log(`No se pueden agregar productos con el mismo código`);
        }else{
            product.push({ id: increment, title: title, description, price, thumbnail, code, stock})
            
            await fs.promises.writeFile(this.path, JSON.stringify(product));
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
                return this.products;
            }
    }


    async updateProduct(id, update){
        // let product = await this.getProducts();
        let product = await this.getProductById(id);
        let productArr = [];
        productArr.push(product)
        

        let inde = productArr.findIndex(obj => {
            return obj.price == 200
        })

        console.log(productArr[0].id);
    }

    async deleteProduct(id){
        let product = await this.getProducts();

        product.splice(id);

    }

}

// const product = new ProductManager('product.json');


// product.getProducts()
// product.addProducts('producto prueba UNO', 'este es un producto prueba', 200, '12asdrskf3dasasddasasdsdfasdafdgadsasd', 25);
// product.addProducts('producto prueba DOS', 'este es un producto prueba', 200, 'abfgyugtifasddswcdassdaasfgdsddasfddasd', 25);
// product.addProducts('producto prueba TRES', 'este es un producto prueba', 200, 'as56aqweuhq756dasdasa7dfsdasdfsdadsfruytrf', 25);
// product.getProducts()
// product.getProductById(1)
// product.updateProduct(2, 1);

// product.deleteProduct(1);

module.exports = ProductManager;