// index.js

"use strict"

// Nodemailer是一个简单易用的Node.js邮件发送组件
const nodeMailer = require('nodemailer');
// 易用、简洁且高效的http库
const axios = require('axios');
// 请求签到、抽奖的接口
const checkInApi = "https://api.juejin.cn/growth_api/v1/check_in"
const drawApi = "https://api.juejin.cn/growth_api/v1/lottery/draw"
const ListApi = "https://api.juejin.cn/recommend_api/v1/short_msg/recommend?aid=2608&uuid=7073778555888551432"

// 请求接口的cookie配置 cookie的获取见下面的图片说明
const cookieInfo = `xxx`
// 发送邮件的配置
// user、from、to都填写自己的qq邮箱, pass的获取见下面的图片说明
const emailInfo =  {
  "user": "xxx@qq.com",
  "from": "xxx@qq.com",
  "to": "xxx@qq.com",
  "pass": "xxx"
}
const getList = async () => {
  let {data} = await axios({ url: ListApi, method: 'post', headers: { Cookie: cookieInfo } ,data:{id_type: 4, sort_type: 300, cursor: "0", limit: 20}});
  return data
}
// 请求签到接口
const checkIn = async () => {
  let {data} = await axios({url: checkInApi, method: 'post', headers: {Cookie: cookieInfo}});
  return data
}
// 请求抽奖接口
const draw = async () => {
  let {data} = await axios({ url: drawApi, method: 'post', headers: { Cookie: cookieInfo } });
  return data
}
// 签到完成 发送邮件
const sendQQEmail = async (subject, html) => {
  let {user, from, to, pass } = emailInfo;
  const transporter = nodeMailer.createTransport({ service: 'qq', auth: { user, pass } });
  transporter.sendMail({ from, to, subject, html },  (err) => {
    if (err) return console.log(`发送邮件失败：${err}`);
    console.log('发送邮件成功')
  })
}
// 触发签到和抽奖的方法
exports.signIn = async () => {
  getList()
  const checkInData = await checkIn();
  const drawData = await draw();
  console.log('🔥', checkInData, drawData)
  if(checkInData.data && drawData.data) {
    sendQQEmail('掘金签到和抽奖成功', `掘金签到成功！今日获得${checkInData.data.incr_point}积分，当前总积分：${checkInData.data.sum_point}。 掘金免费抽奖成功, 获得：${drawData.data.lottery_name}`);
  } else if(checkInData.data && !drawData.data) {
    sendQQEmail('掘金签到成功, 抽奖失败', `掘金签到成功！今日获得${checkInData.data.incr_point}积分，当前总积分：${checkInData.data.sum_point}。 掘金免费抽奖失败, ${JSON.stringify(drawData)}`);
  }  else if(!checkInData.data && drawData.data) {
    sendQQEmail('掘金签到失败, 抽奖成功', `掘金签到失败！${JSON.stringify(checkInData)}。 掘金免费抽奖成功, 获得：${drawData.data.lottery_name}`);
  } else if(!checkInData.data && !drawData.data) {
    sendQQEmail('掘金签到和抽奖失败', `掘金签到失败！${JSON.stringify(checkInData)}。 掘金免费抽奖失败, ${JSON.stringify(drawData)}`);
  } 
};
let list = [];



