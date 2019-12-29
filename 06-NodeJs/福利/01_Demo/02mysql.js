/** 
 * 2- 连接mysql
 * 
*/
const express = require('express');
const mysql = require('mysql');
const app = express();
// 1- 创建连接对象
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'newshop'
})

app.get('/home',(req,res)=>{
// 2- 调用query方法,并且设置查询语句
var sql = 'select * from sp_role'
// 3- 调用query方法
connection.query(sql,(err,result)=>{
    if(err){
        return console.log(err)
    }else{
    res.send(result)
    }
})
})
app.listen(8080,()=>{
    console.log('服务器起飞了~')
})