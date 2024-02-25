const Categories = require('../../api/v1/categoreis/model')
const { BadRequestError, NotFoundError } = require('../../errors')

const getAllCategories = async (req) => {
  const result = await Categories.find({ organizer: req.user.organizer }).select('_id name organizer')
  return result
}

const getOneCatergories = async (req) => {
  const { id } = req.params
  const result = await Categories.findOne({ _id: id }).select('_id name')
  if (!result) throw new NotFoundError(`Categories not found with id: ${id}`)
  return result
}

const createCategories = async (req) => {
  const { name } = req.body
  const check = await Categories.findOne({ name, organizer: req.user.organizer })

  if (check) throw new BadRequestError('Duplicate category name')

  const result = await Categories.create({ name, organizer: req.user.organizer })
  return result
}

const updateCategories = async (req) => {
  const { id } = req.params
  const { name } = req.body
  const check = await Categories.findOne({
    name,
    _id: { $ne: id }
  })

  if (check) throw new BadRequestError('Duplicate category name')

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  )

  if (!result) throw new NotFoundError(`Category not found with id : ${id}`)
  return result
}

const deleteCategories = async (req) => {
  const { id } = req.params

  const result = await Categories.findOneAndDelete({
    _id: id
  })

  if (!result) throw new NotFoundError(`Category not found with id : ${id}`)

  return result
}

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id })
  if (!result) throw new NotFoundError(`Category not found with id : ${id}`)
  return result
}

module.exports = {
  getAllCategories,
  createCategories,
  getOneCatergories,
  updateCategories,
  deleteCategories,
  checkingCategories
}
