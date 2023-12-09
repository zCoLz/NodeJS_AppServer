const express = require('express')
const useController = require('../controllers/useTimeController')
const router = express.Router()

router.get('/times', async (req, res) => {
    try {
        const times = await useController.getAllTime()

        res.json(times)
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/times', async (req, res) => {
    try {
        const { Save_Time, Total_Time } = req.body
        console.log(req.body);
        const success = await useController.addTime(Save_Time, Total_Time)
        res.json({ success, message: 'Thêm time thành công' })
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send('Internal Server Error')
    }
})
module.exports = router;
