const axios = require("axios").default;
const dayjs = require("dayjs")
const {
    Message
} = require("mirai-js");
const bot = require("./main");
const {
    Bot
} = require("mirai-js");
const fetch = require("node-fetch");
const https = require("https");
const httprequest = require("./js/request/init");
const fs = require("fs");
const xml2js = require("xml2js");
const {
    sendMessageFriendText,
    sendMessageGroupText,
    quitGroup,
    seeAllStopedPeople,
    isIncludesType,
    getAllText,
} = require("./js/utils");
const { getAnimeIMG, getBeautyIMG,getTopSearch, getDailySentence, DogDiary,getJoke,getNews } = require("./api_post")
//谁禁言的机器人    可以写入到xml文件中 麻烦 我懒得写
let dog_number = "";
let dog_group = "";
let max_time_stop = 5;
let time_stop_number = 0;
//机器人QQ
const BOT_NUMBER = "2535465243";
//复读列表
let RereadingList = [];
//上一次复读得文本
let lastText = "";
//是否正在请求
let isRequesting = false;
let time = {}
async function startBot() {
    // 连接到一个 mirai-api-http 服务
    await bot.open({
        baseUrl: "http://0.0.0.0:7777",
        verifyKey: "INITKEYApGKCGii",
        // 要绑定的 qq，须确保该用户已在 mirai-console 登录
        qq: 2535465243,
    });
    bot.on("BotUnmuteEvent", async (data) => {
        if (dog_number) {
            await bot.sendMessage({
                group: dog_group,
                message: new Message().addAt(dog_number).addText("吃屎吧，敢禁言老子"),
            });
            dog_number = "";
            dog_group = "";
        }
    });
    bot.on("BotMuteEvent", async (data) => {
        dog_number = data.operator.id;
        dog_group = data.operator.group.id;
        console.log(data);
    });
    // 监听群消息事件
    bot.on("GroupMessage", async (data) => {
        //发送消息的qq群
        const group = data.sender.group.id;
        //发送消息的列表
        const messageList = data.messageChain;

        //全部text
        const allText = getAllText(messageList);
        //发送消息人的QQ
        const message_qq = data.sender.id;

        //发送消息人的权限

        //判断是否被禁言
        const {
            muteTimeRemaining,
            permission: bot_permission
        } =
            await bot.getMemberInfo({
                group,
                qq: BOT_NUMBER,
            });

        if (muteTimeRemaining > 0) {
            bot
                .getMemberInfo({
                    qq: BOT_NUMBER,
                    group: group,
                })
                .then((res) => {
                    console.log(res);
                });

            return;
        }
        //辱骂禁言机器人的人
        if (dog_number) {
            await bot.sendMessage({
                group: dog_group,
                message: new Message().addAt(dog_number).addText("吃屎吧，敢禁言老子"),
            });
            dog_number = "";
            dog_group = "";
        }
        //只回复特定群的
        //复读功能
        if (RereadingList.length == 0) {
            if (lastText != allText) {
                RereadingList.push(allText);
            }
        } else if (RereadingList.length == 2) {
            if (RereadingList[0] == allText) {
                lastText = allText;
                bot.sendMessage({
                    group,
                    message: new Message().addAt(message_qq).addText(allText),
                });
                RereadingList = [];
            } else {
                RereadingList[0] = allText;
            }
        }

        // message_qq == QQ_FRIEND
        //查看禁言列表
        if (
            isIncludesType(messageList, "type", "Plain") &&
            allText.includes("禁言列表")
        ) {
            await seeAllStopedPeople(group);
            return;
        }
        //退群判断
        if (
            isIncludesType(messageList, "type", "Plain") &&
            allText.includes("退群") &&
            allText.includes("滚") &&
            allText.includes("机器人") &&
            isIncludesType(messageList, "type", "At") &&
            isIncludesType(messageList, "target", BOT_NUMBER)
        ) {
            await sendMessageGroupText("我滚了~", group);

            await quitGroup(group);
            return;
        }
        
        //机器人被艾特   自己骂人
        if (
            isIncludesType(messageList, "type", "At") &&
            isIncludesType(messageList, "target", BOT_NUMBER)
        ) {
            let list = [
                "死肥宅！死肥宅！",
                "小飞机冲晕了，快报警！",
                "别@了，无不无聊呀，臭傻逼",
                "老王，机机炸了!"
            ];
            const regexTwo = new RegExp(/傻逼|sb|nmd|cnm|傻屌|沙雕/);
            const regexS = new RegExp(/设置上班时间/);
            if (regexTwo.test(allText.trim())) {
                bot.sendMessage({
                    group,
                    quote: data.messageChain[0].id,
                    // Message 实例，表示一条消息
                    message: new Message()
                        .addAt(message_qq)
                        .addText("傻狗！"),
                });
                return
            } else if (allText.trim() == '') {
                let i = Math.floor(Math.random() * list.length);
                sendMessageGroupText(list[i], group);
                return;
            } else if (allText.trim() == '打卡') {
                let hour = message_qq == '1506884346' ? 9.5 : 8; 
                let outTime = new Date(dayjs().add(hour, 'hour').format("YYYY/MM/DD HH:mm:ss")); 
                if (time[message_qq]) { 
                    sendMessageGroupText(`今日已打卡 请勿重复打卡！`, group); 
                } 
                else { 
                    time[message_qq] = outTime; 
                    const formatTime = dayjs(outTime).format('YYYY-MM-DD HH:mm:ss'); 
                    sendMessageGroupText(`打卡成功 今日下班时间为${formatTime}`, group); 
                }
            } else if (regexS.test(allText.trim())) {
                let nowTime = allText.trim().match(/{(\S*)}/)[1];

                let num = message_qq == '1506884346' ? 9.5 : 8
                let outTime = new Date(dayjs(nowTime).add(num, 'hour').format("YYYY/MM/DD HH:mm:ss"))
                console.log(nowTime, outTime, num, "???????????");
                if (time[message_qq] && time[message_qq] !== '') {
                    sendMessageGroupText(`今日已打卡 请勿重复打卡！`, group);
                } else {
                    time[message_qq] = outTime
                    sendMessageGroupText(`打卡成功 今日下班时间为${dayjs(outTime).format('YYYY-MM-DD HH:mm:ss')}`, group);
                }
            } else if (allText.trim() == '清除打卡') {
                time[message_qq] = ''
                sendMessageGroupText(`清除成功`, group);
            } else if (allText.trim() == '倒计时') {
                let nowtime = new Date(),
                    days = nowtime.getDay()
                let showtime = function (endtime) {
                    let nowtimes = new Date()
                    let lefttime = message_qq == '439621652' ?new Date(dayjs().format("YYYY/MM/DD 17:00:00")) - nowtimes.getTime() : endtime.getTime() - nowtimes.getTime()
                    if (lefttime < 0) {
                        return "下班了，别bb了！"
                    }
                    if (days > 5) {
                        return "今日休假"
                    }
                    let leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
                        lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24) > 9 ? Math.floor(lefttime / (1000 * 60 * 60) % 24) : "0" + Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
                        leftm = Math.floor(lefttime / (1000 * 60) % 60) > 9 ? Math.floor(lefttime / (1000 * 60) % 60) : "0" + Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
                        lefts = Math.floor(lefttime / 1000 % 60) > 9 ? Math.floor(lefttime / 1000 % 60) : "0" + Math.floor(lefttime / 1000 % 60); //计算秒数
                        return '下班倒计时:' + lefth + " 小时 " + leftm + " 分钟 " + lefts + " 秒 "; //返回倒计时的字符串
                    
                }
                if (message_qq == '439621652' || time[message_qq]) {
                    bot.sendMessage({
                        group,
                        quote: data.messageChain[0].id,
                        // Message 实例，表示一条消息
                        message: new Message()
                            .addAt(message_qq)
                            .addText(`${showtime(time[message_qq])}`),
                    });
                } else {
                    sendMessageGroupText('请先打卡！', group);
                    return;
                }
            } else {
                sendMessageGroupText('什么勾八，看不懂！', group);
                return;
            }
        }
        //chat gpt 访问
        if (allText.startsWith("gpt")) {
            const text = allText.replace("gpt", "").trim();
            // bot.sendMessage({
            //   group,
            //   // Message 实例，表示一条消息
            //   message: new Message().addText("维护中~~~"),
            // });
            // return;
            let gpt_data = {
                model: "text-davinci-003",
                prompt: text,
                temperature: 0,
                max_tokens: 4000,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
            };
            // if (gpt_counts > gpt_data.max_tokens) {
            //   bot.sendMessage({
            //     group,
            //     // Message 实例，表示一条消息
            //     message: new Message()
            //       .addAt(message_qq)
            //       .addText("超过接口访问上线~请明天在尝试"),
            //   });
            //   return;
            // }
            try {
                const res = await fetch("https://api.openai.com/v1/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer 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",
                    },
                    body: JSON.stringify(gpt_data),
                }).then((res) => {
                    return res.json();
                });
                const mes = res.choices.reduce((pre, cur) => {
                    return pre + cur.text;
                }, "");
                // gpt_counts = res.usage.total_tokens;
                bot.sendMessage({
                    group,
                    quote: data.messageChain[0].id,
                    // Message 实例，表示一条消息
                    message: new Message()
                        .addAt(message_qq)
                        .addText(mes.replace(/\n\n/, "")),
                });
            } catch (error) {
                bot.sendMessage({
                    group,
                    quote: data.messageChain[0].id,
                    // Message 实例，表示一条消息
                    message: new Message()
                        .addAt(message_qq)
                        .addText("我寄了~快艾特我主人修好我！"),
                });
            }
        }
        let numberList = allText.match(/\d+/g);
        //禁言功能
        if (allText.includes("禁言") && numberList?.length > 0) {
            //禁言时长
            const Estoppel = Math.max(...numberList);
            const maxEstoppel =
                Estoppel > 2_505_600 ? 2_505_600 : Estoppel < 60 ? 60 : Estoppel;
            //禁言目标账号
            let targetData = messageList.find((item) => item.type == "At");
            if (!targetData) return;
            if (bot_permission == Bot.groupPermission.MEMBER) {
                sendMessageGroupText(
                    "鸡鸡人还不是管理哦 ~ 没有禁言权限  快求群主给鸡鸡人一个管理吧~",
                    group
                );
                return;
            }

            const {
                permission: target_permission
            } = await bot.getMemberInfo({
                group,
                qq: targetData.target,
            });
            //判断权限
            switch (target_permission) {
                case Bot.groupPermission.OWNER:
                    // 群主
                    sendMessageGroupText(
                        "不能禁言群主~必须让群主退位给我才可以哦",
                        group
                    );
                    break;
                case Bot.groupPermission.ADMINISTRATOR:
                    // 管理员
                    sendMessageGroupText(
                        "不能禁言狗管理员~只有我当上群主才可以哦~",
                        group
                    );
                    break;
                case Bot.groupPermission.MEMBER:
                    // 普通群成员
                    const {
                        muteTimeRemaining
                    } = await bot.getMemberInfo({
                        group,
                        qq: targetData.target,
                    });
                    if (muteTimeRemaining > 0) {
                        sendMessageGroupText("狗群员已经被禁言~不能禁言咯");
                        return;
                    } else {
                        bot.mute({
                            group,
                            qq: targetData.target,
                            time: maxEstoppel
                        });
                    }
                    break;
            }
        }
        //解除禁言
        if (allText.includes("解除禁言")) {
            let targetData = messageList.find((item) => item.type == "At");
            if (!targetData) return;
            if (bot_permission == Bot.groupPermission.MEMBER) {
                sendMessageGroupText(
                    "鸡鸡人还不是管理哦 ~ 没有解除权限  快求群主给鸡鸡人一个管理吧~",
                    group
                );
                return;
            }
            const {
                muteTimeRemaining
            } = await bot.getMemberInfo({
                group,
                qq: targetData.target,
            });
            if (muteTimeRemaining > 0) {
                bot.unmute({
                    group,
                    qq: targetData.target
                });
            }
        }
        //全体禁言 最长5s自动解除
        if (allText.includes("The World")) {
            if (bot_permission == Bot.groupPermission.MEMBER) return;
            //有次数限制
            if (time_stop_number > max_time_stop) return;
            const time = (Math.floor(Math.random() * 5) + 1) * 1000;
            bot.muteAll({
                group
            });
            setTimeout(() => {
                bot.unmuteAll({
                    group
                });
                time_stop_number++;
            }, time);
            return;
        }
        getAnimeIMG(allText.trim(), group)
        getBeautyIMG(allText.trim(), group)
        getTopSearch(allText.trim(), group)
        // 关键字功能
        switch(allText.trim()){
            case "每日一句":
                getDailySentence(group)
                break
            case "舔狗日记":
                DogDiary(group)
                break
            case "笑话":
                getJoke(group)
                break
            case "今日新闻":
                getNews(group)
                break
        }
        //功能列表
        if (allText.trim().toLocaleLowerCase().startsWith("help")) {
            bot.sendMessage({
                group,
                message: new Message()
                    .addText("每日一句功能：可以发送’每日一句‘\n")
                    .addText("今日新闻功能：可以发送’今日新闻‘\n")
                    .addText("舔狗日记:发送如：’舔狗日记‘\n")
                    .addText("来点笑话:发送如：’笑话‘\n")
                    .addText("gpt功能访问gpt：发送以gpt开头如：’gpt 内容‘\n")
                    .addText(
                        "二次元图片:发送’/二次元|二刺螈|二次媛|二刺媛|学习|沙雕‘\n"
                    )
                    .addText(
                        "涩涩:发送’/涩图|涩涩|下头|郭楠‘\n"
                    )
                    .addText(
                        "可以艾特非管理员发送禁言+数字进行禁言哦~也可以解除禁言~只要艾特被禁言的人发送解除禁言\n"
                    )
                    .addText("发送’禁言列表‘查看本群禁言名单\n")
                    .addText("The World:发送’The World’ 随机时停1-5s\n")
                    .addText("不要艾特机器人哦\n")
                    .addText("热搜关键词：huPu(虎扑)、zhihuHot(知乎热点)、baiduRD(百度热点)、baiduRY(百度贴吧)、bili(B站)、history(历史今天)、wbHot(微博热点)、"),
            });
        }
    });
}

startBot();