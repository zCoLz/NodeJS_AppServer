const express = require('express');
const sql = require('mssql');
const app = express()
require('dotenv').config()

const config = {
    user: process.env.DATA_USER,
    password: process.env.DATA_PASSWORD,
    server: process.env.SERVER_NAME,
    database: process.env.DATABASE,
    dialect: process.env.DIALECT,
    port: parseInt(process.env.PORT_SQL, 10),
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
}
sql.connect(config, (err) => {
    if (err) {
        console.error("Không thể kết nối vào SQL Server: ", err)
    }
    else {
        console.log('Đã kết nối thành công SQL Server');
        const request = new sql.Request();
        request.query("Select * from User_Data", (err, result) => {
            if (err) {
                console.log("Lỗi truy vấn", err);
            } else {
                console.log("kết quả truy vấn ", result);

            }
        })
    }
})
app.listen(3000, () => {
    console.log("Ứng dụng đang lắng đối nghe cổng 3000");
});
module.exports = sql;
// async function connectDB() {
//     const pool = new sql.ConnectionPool(config)
//     try {
//         await pool.connect();
//         console.log("Connected to DB");
//         return pool;
//     } catch (error) {
//         console.log("Failed to connect to DB");
//         return error;
//     }
// }
// exports.Execute = async (query) => {
//     const DB = await connectDB();
//     try {
//         const result = await DB.request().query(query);
//         await DB.close()
//         return result;
//     } catch (error) {
//         console.error("Lỗi khi kết nối đến cơ sở dữ liệu MSSQL:", error)
//     }
//     finally {
//         await DB.close()
//     }
// }
// Execute('Select * from User_Data')
