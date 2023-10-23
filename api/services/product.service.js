const db = require('../db/db');

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

async function getAllProducts(){
    return await db.Product.findAll();
}

async function getProductById(id){
    return await getProduct(id);
}


async function createProduct(params){
    if(await db.Product.findOne({where: {name: params.name}})){
        throw 'Такой продукт уже существует, пожалуйста попробуйте заново';
    }
    
    

    if(params.price < 0){
        throw 'Цена продукта не может быть меньше нуля';
    }

    const product = new db.Product(params);

    await product.save();
}

async function updateProduct(id, params){
    const product = await getProduct(id);

    if(params.price < 0){
        throw 'Цена продукта не может быть меньше нуля';
    }

    Object.assign(product,params)
    await product.save();
}

async function deleteProduct(id){
    const product = await getProduct(id);
    await product.destroy();
}

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Товар не найден';
    return product;
}