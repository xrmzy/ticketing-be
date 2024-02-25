const { signin } = require('../../../services/mongoose/auth')
const { StatusCodes } = require('http-status-codes')

const signCms = async (req, res, next) => {
  try {
    const result = await signin(req)

    res.status(StatusCodes.CREATED).json({
      data: { token: result }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { signCms }
