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
    console.log(err)
    res.json({message: `had an error: ${err.message}`})
  })

export default app

