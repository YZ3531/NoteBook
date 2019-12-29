/**
 *  1- 需求:怎么去产生一段学生数据,要求包含成功的状态,status 200 msg: success 学生数据包含,姓名,年龄性别
 */
var data = {
    status:200,
    msg:'success',
    stuData:[{
        name:'jack',
        age:18,
        gender:'男'
    },
    {
        name:'jack',
        age:18,
        gender:'男'
    },
    {
        name:'jack',
        age:18,
        gender:'男'
    },
    {
        name:'jack',
        age:18,
        gender:'男'
    },
    {
        name:'jack',
        age:18,
        gender:'男'
    }]
}
// 搭建服务器
const express = require('express');
const app = express();
app.get('/home',(req,res)=>{
    res.send(data)
})
app.listen(8080,()=>{
    console.log('服务器起飞了~')
})