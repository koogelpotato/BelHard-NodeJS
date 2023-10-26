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
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The product name
 *         price:
 *           type: number
 *           description: The product price
 *       example:
 *         id: 1
 *         name: Oreo's 
 *         price: 2.85
 */


/**
 * @openapi
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     responses:
 *       200:
 *         description: An array of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 */
function getAllProducts(req,res, next){
    productService.getAllProducts()
    .then(products => res.json(products))
    .catch(next);
}

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 */
function getProductById(req, res, next){
    productService.getProductById(req.params.id)
    .then(product => res.json(product))
    .catch(next);
}

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: A message indicating the product was created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
function createProduct(req, res, next){
    productService.createProduct(req.body)
    .then(() => res.json({message: 'Товар был успешно создан!'}))
    .catch(next);
}

/**
 * @openapi
 * /products/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: A message indicating the product was updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
function updateProduct(req,res,next){
    productService.updateProduct(req.params.id, req.body)
    .then(() => res.json({message: 'Товар был обновлен'}))
    .catch(next);
}

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A message indicating the product was deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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