import express from 'express'
import morgan from 'morgan'
import router from './router'
import { protect } from './modules/auth';
import { createUser, signin } from './handlers/user';

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' })
})

app.use('/api', protect, router);
app.post('/user', createUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {

    if(err.type === 'auth') res.status(401).json({ message: "unauthenticated"})

    if(err.type === 'input') res.status(400).json({ message: "invalid input" })

    else res.status(500).json({ message: "Sorry bro, It's my fault!"})

})

export default app

