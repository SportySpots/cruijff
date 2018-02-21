import apisauce from 'apisauce'

const create = (baseURL = 'https://graph.facebook.com/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const getProfile = (token, id) =>
    api.get(
      `${id}?fields=name,age_range,gender,locale,link,id,timezone&access_token=${token}`
    )

  return {
    getProfile
  }
}

export default {
  create
}
