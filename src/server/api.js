
import agent from 'superagent'
import { unpackJWT, signJWT } from './jwt'

const {
  API_HOST,
  API_PREFIX,
  PROPERTY_CODE: propertyCode,
  INTERFACE_TOKEN: interfaceToken,
  LAST_NAME: lastName,
  ROOM_NUMBER: roomNumber } = process.env

const sessionPayload = {
  propertyCode,
  interfaceToken
}

const initLogin = () => {
  return agent.post(`${API_HOST}/${API_PREFIX}/system/session/initialisebyroom`)
  .set('Content-Type', 'application/json')
  .send({ ...sessionPayload, lastName, roomNumber })
  .then(res => res.body)
};

const tokenExpired = body =>
  body.responses.some(x => x[Object.keys(x)[0]].areaError === 'IdentityTokenExpired')

const formatReponse = async res => {
  const { status: statusCode, body: { status }, body } = res
  if (statusCode === 200 && status === 'Success') {
    return {
      ...res.body,
      session: {
        jwt: await signJWT({ lastName, roomNumber, sessionToken: res.body.sessionToken })
      }
    }
  }

  if (statusCode === 401 && tokenExpired(body)) {
    return {
      statusCode: 401,
      error: 'IdentityTokenExpired'
    }
  }

  return res
}

const api = method => async (path, payload) => {
  const { attributes: { session: { jwt } } } = payload.session

  // IF NO GXP SESSION EXISTS -> CREATE IT
  // TODO CLARIFY WHEN TO LOGIN vs JUST SESSION INIT
  const { sessionToken } = jwt ? await unpackJWT(jwt.token) : await initLogin()

  return agent[method.toLowerCase()](`${API_HOST}/${API_PREFIX}/${path}`)
  .query({ sessionToken })
  .set('Content-Type', 'application/json')
  .send(payload)
  .then(res => formatReponse(res))
}

export default api
