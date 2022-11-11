const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');


const router = express.Router();

// router.param('id', tourController.checkID);

// POST /tour/5453fsdd54/reviews       To send review
// GET /tour/5453fsdd54/reviews       To get review of tour
// GET /tour/5453fsdd54/reviews/45616d456d       To get a perticullar review of tour

router.use('/:tourId/reviews', reviewRouter);

router
    .route('/top-5-cheap')
    .get(tourController.alaisTopTour, tourController.getAllTours)

router
    .route('/tour-stats')
    .get(tourController.getTourStats);

router
    .route('/monthly-plan/:year')
    .get(authController.protect, authController.restrictTo('admin', 'lead-guide', 'guide'), tourController.getMonthlyPlan);

router
    .route('/tours-within/:distance/center/:lat lng/unit/:unit')
    .get(tourController.getToursWithin);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.posTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.uploadTourImages, tourController.resizeTourImages, tourController.patchTour)
    .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);



module.exports = router;
