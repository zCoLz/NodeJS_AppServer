const db = require('../config/db');
const User = require('../models/useModel');

async function getAllUser() {
    try {
        const pool = await db.connect();
        const result = await pool.request().query('Select * from User_Data');
        return result.recordset.map((row) => new User(row.id, row.first_name, row.last_name, row.age));
    } catch (error) {
        throw new Error(`Lỗi truy vấn users: ${error.message}`)
    }
}
module.exports = { getAllUser };
