const express = require('express')
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../validator/validate-request');
const productService = require('../services/product.service');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createSchema,createProduct);
router.patch('/:id', updateSchema, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

function getAllProducts(req,res, next){
    productService.getAllProducts()
    .then(products => res.json(products))
    .catch(next);
}

function getProductById(req, res, next){
    productService.getProductById(req.params.id)
    .then(product => res.json(product))
    .catch(next);
}

function createProduct(req, res, next){
    productService.createProduct(req.body)
    .then(() => res.json({message: 'Товар был успешно создан!'}))
    .catch(next);
}

function updateProduct(req,res,next){
    productService.updateProduct(req.params.id, req.body)
    .then(() => res.json({message: 'Товар был обновлен'}))
    .catch(next);
}

function deleteProduct(req, res, next){
    productService.deleteProduct(req.params.id)
    .then(() => res.json({message: 'Товар был удален'}))
    .catch(next);
}

function createSchema(req, res, next){

    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Имя не может быть пустым значением',
            'any.required': 'Введите имя'
        }),
        price: Joi.number().max(99999999.99).precision(2).required().messages({
            'number.base': 'Введите цену',
            'number.negative': 'Цена должна быть положительной',
            'number.min': 'Цена не может быть равна нулю',
            'number.max': 'Цена должна быть ниже 99999999.99',
            'any.required': 'Введите цену'
        })
    });

    validateRequest(req, next, schema);
}

function updateSchema(req, res, next){
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Имя не может быть пустым значением',
            'any.required': 'Введите имя'
        }),
        price: Joi.number().max(99999999.99).precision(2).required().messages({
            'number.base': 'Введите цену',
            'number.negative': 'Цена должна быть положительной',
            'number.min': 'Цена не может быть равна нулю',
            'number.max': 'Цена должна быть ниже 99999999.99',
            'any.required': 'Введите цену'
        })
    });
    
    validateRequest(req, next, schema);
}