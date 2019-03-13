function getUnauthorizedResponse(req) {
  return req.auth ? 'Credentials rejected' : 'No credentials provided'
}

module.exports = getUnauthorizedResponse;