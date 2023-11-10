import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middlewares/handle-input-errors'
import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/products'
import { createUpdate, deletedUpdate, getOneUpdate, getUpdates, updatedUpdate } from './handlers/updates'

const router = Router()

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, (req, res) => { })
router.delete('/product/:id', deleteProduct)
router.post('/product', body('name').isString(), handleInputErrors, createProduct)


router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('version').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    updatedUpdate)
router.delete('/update/:id', deletedUpdate)
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('product_id').exists().isString(),
    createUpdate)


router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id', () => { })
router.delete('/updatepoint/:id', () => { })
router.post('/updatepoint', () => { })

export default router;