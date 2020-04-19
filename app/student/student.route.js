const { Router } = require('express');
const controller = require('./student.controller');

const router = new Router();

router.route('/').get(controller.getStudentsCtr);

router.route('/:id').get(controller.getStudentByIdCtr);

router.route('/').post(controller.createStudentCtr);

router.route('/:id').put(controller.updatedStudentCtr);

router.route('/:id').delete(controller.deleteStudentCtr);

router.route('/average').post(controller.getAverageCtr);

router.route('/updateGrade').post(controller.updateGradeCtr);

module.exports = router;
