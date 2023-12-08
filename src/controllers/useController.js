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
async function getUserId(userId) {
    try {
        const pool = await db.connect();
        const result = await pool
            .request()
            .input('userId', db.Int, userId)
            .query('Select * from User_Data Where id= @userId');
        if (result.recordset.length > 0) {
            const { id, first_name, last_name, age } = result.recordset[0];
            return new User(id, first_name, last_name, age)
        } else {
            return null;
        }

    } catch (error) {
        throw new Error(`Lỗi truy vấn userId: ${error.message}`)
    }
}
async function addUser(first_name, last_name, age) {
    try {
        const pool = await db.connect();
        const result = await pool
            .request()
            .input('first_name', db.NVarChar, first_name)
            .input('last_name', db.NVarChar, last_name)
            .input('age', db.Int, age)
            .query('Insert into  User_Data (first_name ,last_name ,age) VALUES (@first_name,@last_name,@age)');
        if (result.rowsAffected > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(`Lỗi thêm user: ${error.message}`)
    }
}
async function updateUser(userId, first_name, last_name, age) {
    try {
        const pool = await db.connect();
        const result = await pool
            .request()
            .input('userId', db.Int, userId)
            .input('first_name', db.NVarChar, first_name)
            .input('last_name', db.NVarChar, last_name)
            .input('age', db.Int, age)
            .query('UPDATE User_Data Set first_name = @first_name,last_name= @last_name,age= @age Where id= @userId');
        if (result.rowsAffected > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(`Lỗi thêm user: ${error.message}`)
    }
}
async function deleteUser(userId) {
    try {
        const pool = await db.connect();
        const result = await pool
            .request()
            .input('userId', db.Int, userId)
            .query('DELETE FROM User_Data WHERE id = @userId');
        return result.rowsAffected > 0;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}
module.exports = { getAllUser, getUserId, addUser, updateUser, deleteUser };
