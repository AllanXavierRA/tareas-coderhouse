


class ProductManager{

    

    constructor(){
        this.products = []
    }

    getProducts(){        
        return this.products;
    }

    idIncrement(){
        return this.products.length + 1;
    }

    validadorCodigoUnico(codigo){
        return this.products.filter(producto => {
            return producto.code === codigo
        })
    }

    addProducts(title, description, price, code, stock, thumbnail = 'sin imagen'){
        
        if(this.validadorCodigoUnico(code).length !== 0){
            console.log(`No se pueden agregar productos con el mismo código`);
        }else{
            this.products.push({ id: this.idIncrement(), title: title, description, price, thumbnail, code, stock})
        }
    }

    getProductById(id){
        const productById = this.products.find(producto => {
            return producto.id === id 
        })

        if(productById){
            return productById
        }else{
            console.log(`Not Found`);
        }
    }
}

const product = new ProductManager();

product.getProducts()
product.addProducts('producto prueba', 'este es un producto prueba', 200, 'abcd', 25);
product.addProducts('producto prueba', 'este es un producto prueba', 200, 'abcd', 25);
product.addProducts('producto prueba', 'este es un producto prueba', 200, 'abcasdasdasdasdd', 25);
product.getProducts()
console.log(product.getProductById(5))
