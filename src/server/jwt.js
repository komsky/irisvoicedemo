
import jwt from 'jsonwebtoken'
const { SECRET } = process.env

export const signJWT = payload =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, (err, token) => {
      if (err) reject('Failed to sign JWT')
      resolve(token)
    })
  })

export const unpackJWT = payload =>
  new Promise((resolve, reject) => {
    jwt.verify(payload, SECRET, (err, decoded) => {
      if (err) reject('Failed to decode JWT')
      resolve(decoded)
    })
  })
