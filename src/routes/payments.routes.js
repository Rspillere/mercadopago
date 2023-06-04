import {Router} from 'express'
import {createOrder, recieveWebhook} from "../controllers/payment.controller.js"

const router = Router();

router.use('/create-order', createOrder)

router.get('/success', (req, res) => res.send('create order'))

router.get('/failure', (req, res) => res.send('failure'))

router.get('/pending', (req, res) => res.send('pending'))

router.post('/webhook', recieveWebhook)


export default router