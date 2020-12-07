const mysql=require('mysql');
const {promisify}=require('util');
const {database}=require('./keys');
const pool=mysql.createPool(database);
pool.getConnection((err,connection)=>{
    if(err){
        console.log('error conectando a la base de datos');
    }
    if(connection){
        connection.release();
        console.log('bd connection');
        return;
    }
});
pool.query=promisify(pool.query);
module.exports=pool;