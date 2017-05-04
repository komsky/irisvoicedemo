
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.end('DYNAMIC INFO')
})

router.get('/hard-coded', (req, res) => {
  res.end('INFO ABOUT THE HOTEL')
})

export default router
