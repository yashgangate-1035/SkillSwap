const express = require('express');
const router = express.Router();
const { getSkills, getUserSkills, createSkill, deleteSkill } = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getSkills).post(protect, createSkill);
router.route('/my-skills').get(protect, getUserSkills);
router.route('/:id').delete(protect, deleteSkill);

module.exports = router;
