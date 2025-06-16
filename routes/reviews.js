const express=require('express')
const router=express.Router({mergeParams:true});
const {isReviewAuthor}=require('../middleware.js')
const catchAsync=require('../utils/catchAsync.js')
const {validateReview}=require('../middleware.js')
const reviews=require('../controllers/review.js')

router.post('/',validateReview,catchAsync(reviews.createReview))

router.delete('/:reviewId',isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports=router;