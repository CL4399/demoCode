const { Message } = require("mirai-js");
const bot = require("./../main");

/**
 *  给好友发送消息
 * @param {发送的消息 string} text
 * @returns 返回发送人的id
 */
async function sendMessageFriendText(text, qNumber = 707302305) {
  let res = "";
  try {
    res = await bot.sendMessage({
      // 好友 qq 号
      friend: qNumber,
      // Message 实例，表示一条消息
      message: new Message().addText(text),
    });
  } catch (error) {
    console.log(error);
  }

  return res;
}
/**
 * 控制机器人对QQ群发送文本
 * @param {string} text 内容
 * @param {number} qNumber 发送的目标QQ群
 * @returns
 */
async function sendMessageGroupText(text, qNumber = 674760358) {
  let res = "";
  try {
    res = await bot.sendMessage({
      // 好友 qq 号
      group: qNumber,
      // Message 实例，表示一条消息
      message: new Message().addText(text),
    });
  } catch (error) {
    console.log(error);
  }

  return res;
}

/**
 * 本人发送包含退群语句可以使机器人自动退群
 * @param {Number}qNumber QQ群号
 * @returns
 */
async function quitGroup(qNumber) {
  return await bot.quitGroup({ group: qNumber });
}

async function seeAllStopedPeople(group) {
  const memberList = await bot.getMemberList({ group });
  const stopList = memberList.filter((item) => item.muteTimeRemaining != 0);
  const message = new Message();
  if (stopList.length == 0) {
    message.addText("本群没有人被禁言~");
    await bot.sendMessage({
      // 好友 qq 号
      group,
      // Message 实例，表示一条消息
      message,
    });
  } else {
    message.addText("被禁言的名单有:");
    stopList.forEach((item, index) => {
      if (index == stopList.length - 1) {
        message.addAt(item.id);
      } else {
        message.addAt(item.id).addText("-");
      }
    });
    await bot.sendMessage({
      // 好友 qq 号
      group,
      // Message 实例，表示一条消息
      message,
    });
  }
}

/**
 *  判断是否包含
 * @param {判断列表} list
 * @param {判断列表对象中的key} val
 * @param  {...any} args
 * @returns
 */
function isIncludesType(list, val, target) {
  const result = list.some((item) => {
    if (!item[val]) return false;
    return (item[val] + "").includes(target);
  });
  return result;
}

function getAllText(list) {
  let str = "";
  list.forEach((item) => {
    if (item.text) {
      str += item.text;
    }
  });
  return str;
}

module.exports = {
  sendMessageFriendText,
  sendMessageGroupText,
  quitGroup,
  seeAllStopedPeople,
  isIncludesType,
  getAllText,
};
