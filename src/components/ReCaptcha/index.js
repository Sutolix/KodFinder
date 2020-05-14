const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

export const reCaptcha = {
  base: //,
  secret: //,
  sitekey: //
}

export function verifySuccess (token, callback) {
  const targetUrl = `${reCaptcha.base}secret=${reCaptcha.secret}&response=${token}`

  try {
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(result => {
        if(!result.success){
        	console.log('There was an error during the security check.')
        }
      })
  } catch (error) {
      console.log('Error checking ReCaptcha token: ', error)
  	}
}
