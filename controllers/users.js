const createHttpError = require('http-errors')
const { User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const  bcrypt  = require('bcrypt')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await User.findAll({
        attributes:['fistName','LastName','email','createdAt']
      })
      endpointResponse({
        res,
        message: 'Users retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  create: catchAsync(async (req, res, next) => {
    try {
      var {fistName,lastName,email,password} = req.body

      password = bcrypt.hashSync(password,10)
 
      const response = await User.create({
        fistName,
        lastName,
        email,
        password
      })
      
      endpointResponse({
        res,
        message:'success',
        body: response
      })
    } catch(error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  })
}
