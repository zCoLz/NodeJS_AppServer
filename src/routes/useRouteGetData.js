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
router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await useController.getUserId(id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' })
        }
    }
    catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/users', async (req, res) => {
    try {
        console.log(req.body);
        const { first_name, last_name, age } = req.body
        console.log(req.body);
        const success = await useController.addUser(first_name, last_name, age);
        res.json({ success, message: 'Thêm user thành công' });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
})
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { first_name, last_name, age } = req.body
        console.log(req.body);
        const success = await useController.updateUser(id, first_name, last_name, age);
        res.json({ success, message: 'Cập nhật user thành công' });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
})
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const success = await useController.deleteUser(id);
        res.json({ success, message: 'Xóa user thành công' })
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
})
module.exports = router;
