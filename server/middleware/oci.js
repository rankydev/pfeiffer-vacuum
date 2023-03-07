import {
  OCI_USERNAME,
  OCI_PASSWORD,
  OCI_HOOK_URL,
  OCI_RETURN_TARGET,
  OCI_CUSTOMER_ID,
} from '../constants.js'

const express = require('express')
const app = express()
app.set('x-powered-by', false)

// extracts parameter (name) from url string
function getParameterByName(name, url) {
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)

  if (!results) {
    return null
  }
  if (!results[2]) {
    return ''
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

app.use('/oci', express.urlencoded({ extended: true }))
app.post('/oci', (req, res) => {
  const username = req.body[OCI_USERNAME]
  const password = req.body[OCI_PASSWORD]
  const hookUrl = req.body[OCI_HOOK_URL]

  // uni Lund does not send customerId it will send buyercookie
  const buyercookie = getParameterByName('buyercookie', hookUrl)
  const customerId = buyercookie || req.body[OCI_CUSTOMER_ID]

  const returntarget = req.body[OCI_RETURN_TARGET]
    ? req.body[OCI_RETURN_TARGET]
    : req.body.returntarget
  res.redirect(
    `/oci/en?${OCI_USERNAME}=${username}&${OCI_PASSWORD}=${password}&${OCI_HOOK_URL}=${hookUrl}&${OCI_CUSTOMER_ID}=${customerId}&${OCI_RETURN_TARGET}=${returntarget}`
  )
})

module.exports = app
