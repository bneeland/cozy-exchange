// Backend

import axios from 'axios'

let accessToken: string | undefined

export async function getAccessToken() {
  if (accessToken) return accessToken

  const response = await axios({
    method: 'post',
    url: 'https://api.logdrive.io/api/tokens/access',
    data: {
      refreshToken: process.env.LOGDRIVE_REFRESH_TOKEN,
    },
  })
  accessToken = response.data.accessToken
  return accessToken
}
