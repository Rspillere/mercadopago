import mercadopago from "mercadopago"
import { MERCADOPAGO_TOKEN } from "../config.js"

export const createOrder = async (req, res) => {

    mercadopago.configure({
        access_token: MERCADOPAGO_TOKEN
    })

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "laptop Lenovo",
                unit_price: 1200,
                currency_id: "UYU",
                quantity: 1
            }
        ],
        back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
        },
        notification_url: "https://a2a1-167-61-209-186.sa.ngrok.io/webhook",
    })

    console.log(result.body)

    return res.send(result.body)
}

export const recieveWebhook = async (req, res) => {
    const payment = req.query
    console.log(req.query)
    try {
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data);
            res.sendStatus(204)
        }        
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ error: error.message });
    }



}