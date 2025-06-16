const express = require('express')
const router = express.Router();

const campgrounds = require('../controllers/campground.js')
const multer=require('multer')
const catchAsync = require('../utils/catchAsync.js');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware.js');
const {storage}=require('../cloudinary')
const upload=multer({storage})


router.route('/')
    .get(campgrounds.index)
    .post(isLoggedIn, upload.array('image'), validateCampground,catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor,upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))




router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderUpdateForm))






module.exports = router;