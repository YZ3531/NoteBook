/** 
 * 3- 使用mock.js产生随机数据
*/
const express = require('express');
// 1- 引入Mock,下载依赖包,安装到当前目录中
const Mock=require('mockjs');
const app = express();
// status:200,
//     msg:'success',
//     stuData:[{
//         name:'jack',
//         age:28,
//         gender:'男'
//     }


app.get('/home',(req,res)=>{
    var data = Mock.mock({
        status:'200',
        msg:'success',
        // 1- 代表生成数据的条数
        'stuData|2-6':[{
            //  2- 要匹配名字的规则
            'name|1-4':/[uu4e00-\u9fa5]/,
            'age|16-18':1,
            'gender|1':['男','女']
        }]
    })
    res.send(data)
})
app.listen(8080,()=>{
    console.log('running')
})
