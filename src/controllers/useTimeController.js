const { DateTime } = require('luxon');
const db = require('../config/db');
const Time = require('../models/useModelTime');

//Format định dạng giờ phút giây
function formatTime(time) {
    const milliseconds = ('0' + time.getMilliseconds()).slice(-2)
    const minutes = ('0' + time.getMinutes()).slice(-2);
    const seconds = ('0' + time.getSeconds()).slice(-2);
    const hours = ('0' + time.getUTCHours()).slice(-2)
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
async function getAllTime() {
    try {
        const pool = await db.connect();
        const result = await pool.request().query('Select * from SAVE_TIME');
        const time = result.recordset.map((row) => {
            const saveTime = row.Save_Time ? formatTime(row.Save_Time) : null;
            const totalTime = row.Total_Time ? formatTime(row.Total_Time) : null;
            // Định dạng lại ngày thành chuỗi YYYY-MM-DD
            // const dateCreate = row.Date_Create ? row.Date_Create.toISOString().split('T')[0] : null;
            return new Time(saveTime, totalTime)
        })
        return (time)
    }
    catch (error) {
        throw new Error(`Lỗi truy vẫn dữ liệu ${error.message}`)
    }
}
async function addTime(Save_Time, Total_Time) {
    try {
        const pool = await db.connect()
        const result = await pool
            .request()
            .input('Save_Time', db.NVarChar, Save_Time)
            .input('Total_Time', db.NVarChar, Total_Time)
            // .input('Date_Create', db.NVarChar, Date_Create)
            .query('Insert Into SAVE_TIME (Save_Time,Total_Time) VALUES (@Save_Time,@Total_Time)')
        if (result.rowsAffected > 0) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        throw new Error(`Lỗi thêm time: ${error.message}`)
    }
}
module.exports = { getAllTime, addTime }