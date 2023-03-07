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
  const username = req.body.username
  const password = req.body.password
  const hookUrl = req.body.HOOK_URL

  // uni Lund does not send customerId it will send buyercookie
  const buyercookie = getParameterByName('buyercookie', hookUrl)
  const customerId = buyercookie || req.body.customerId

  const returntarget = req.body.RETURNTARGET
    ? req.body.RETURNTARGET
    : req.body.returntarget
  res.redirect(
    `/oci/en?username=${username}&password=${password}&HOOK_URL=${hookUrl}&customerId=${customerId}&RETURNTARGET=${returntarget}`
  )
})

module.exports = app
