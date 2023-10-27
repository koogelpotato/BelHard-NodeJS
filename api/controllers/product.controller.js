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
 *       500:
 *         description: Server error occured 
 * 
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
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Server error occured
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
 *       500:
 *         description: Server error occured
 */
function createProduct(req, res, next){
    productService.createProduct(req.body)
    .then(() => res.json({message: 'Product was created!'}))
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
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Server error occured
 */
function updateProduct(req,res,next){
    productService.updateProduct(req.params.id, req.body)
    .then(() => res.json({message: 'Product was updated'}))
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
 *       404:
 *         description: The product was not found
 */
function deleteProduct(req, res, next){
    productService.deleteProduct(req.params.id)
    .then(() => res.json({message: 'Product was deleted'}))
    .catch(next);
}

function createSchema(req, res, next){
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Name cannot be an empty value',
            'any.required': 'Enter a name'
        }),
        price: Joi.number().min(0.01).max(99999999.99).precision(2).required().messages({
            'number.base': 'Enter a price',
            'number.negative': 'Price must be positive',
            'number.min': 'Price cannot be zero',
            'number.max': 'Price must be less than 99999999.99',
            'any.required': 'Enter a price'
        })
    });

    validateRequest(req, next, schema);
}

function updateSchema(req, res, next){
    const schema = Joi.object({
        name: Joi.string().messages({
            'string.empty': 'Name cannot be an empty value'
        }),
        price: Joi.number().min(0.01).max(99999999.99).precision(2).messages({
            'number.base': 'Enter a price',
            'number.negative': 'Price must be positive',
            'number.min': 'Price cannot be zero',
            'number.max': 'Price must be less than 99999999.99'
        })
    });
    
    validateRequest(req, next, schema);
}
