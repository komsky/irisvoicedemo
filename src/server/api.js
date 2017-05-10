
import request from 'superagent'
import { unpackJWT, signJWT } from './jwt'

const {
  API_HOST,
  API_PREFIX,
  PROPERTY_CODE: propertyCode,
  INTERFACE_TOKEN: interfaceToken,
  LAST_NAME: lastName,
  ROOM_NUMBER: roomNumber } = process.env

const payload = {
  propertyCode,
  interfaceToken
}

const initSession = () => {
  return request.post(`${API_HOST}/${API_PREFIX}/system/session/initialise`)
  .set('Content-Type', 'application/json')
  .send(payload)
};

const initLogin = () => {
  return request.post(`${API_HOST}/${API_PREFIX}/system/session/initialisebyroom`)
  .set('Content-Type', 'application/json')
  .send({ ...payload, lastName, roomNumber })
};

const isAuthenticated = payload => {

}

const api = method => (path, payload) => {
  const { attributes: { jwt } } = payload.session

  // IF NO GXP SESSION EXISTS -> CREATE IT
  // TODO CLARIFY WHEN TO LOGIN vs JUST SESSION INIT
  const sessionToken = jwt ? await unpackJWT(jwt) : await initLogin()

  return request[method](`${API_HOST}/${API_PREFIX}/${path}`)
  .query({ sessionToken })
  .set('Content-Type', 'application/json')
  .send()
}

export default api
