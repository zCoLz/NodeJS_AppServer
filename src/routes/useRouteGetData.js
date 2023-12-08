const express = require('express');
const useController = require('../controllers/useController');

const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await useController.getAllUser();
        res.json(users);
    }
    catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
