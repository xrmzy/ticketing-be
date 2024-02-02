const Events = require('../../api/v1/events/model')
const { BadRequestError, NotFoundError } = require('../../errors')
const { checkingCategories } = require('./categories')
const { checkingImage } = require('./images')
const { checkingTalents } = require('./talents')

const getAllEvents = async (req) => {
  const { keyword, category, talent } = req.query
  let condition = {}

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $option: 'i' } }
  }
  if (category) {
    condition = { ...condition, category }
  }

  if (talent) {
    condition = { ...condition, talent }
  }

  const result = await Events.find(condition)
    .populate({
      path: 'image',
      select: '_id name'
    })
    .populate({
      path: 'category',
      select: '_id name role image',
      populate: { path: 'image', select: '_id name' }
    })

  return result
}

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent
  } = req.body

  await checkingImage(image)
  await checkingCategories(category)
  await checkingTalents(talent)

  const check = await Events.findOne({ title })

  if (check) throw new BadRequestError('Title of event has been registered')

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent
  })

  return result
}

const getOneEvents = async (req) => {
  const { id } = req.params
  const result = await Events.findOne({ _id: id })
    .populate({
      path: 'category',
      select: '_id name'
    })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: { path: 'iamge', select: '_id name' }
    })

  if (!result) throw new NotFoundError(`Talents not found with id : ${id}`)
  return result
}

const updateEvents = async (req) => {
  const { id } = req.params
  const {
    title,
    date,
    about,
    tagline,
    vanueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent
  } = req.body

  await checkingImage(image)
  await checkingCategories(category)
  await checkingTalents(talent)

  const check = await Events.findOne({
    title,
    _id: { $ne: id }
  })

  if (check) throw new BadRequestError('Title event has been registered')

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      vanueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent
    },
    { new: true, runValidators: true }
  )

  if (!result) throw new NotFoundError(`Events not found with id : ${id}`)
  return result
}

const deleteEvents = async (req) => {
  const { id } = req.params
  const result = await Events.findOneAndDelete({
    _id: id
  })

  if (!result) throw new NotFoundError(`Not found talents with id : ${id}`)
  return result
}

module.exports = {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  deleteEvents
}
