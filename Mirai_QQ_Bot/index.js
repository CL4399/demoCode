const {
    Bot,
    Message
} = require('mirai-js');
const bot = new Bot();

// console.log(bot, "bot", new Message().addText('hello world!').addImageUrl('http://exapmle/image.jpg'));


// 连接到一个 mirai-api-http 服务
bot.open({
    baseUrl: 'http://localhost:8023',
    verifyKey: 123456,
    // 要绑定的 qq，须确保该用户已在 mirai-console 登录
    qq: 2381557206,
});
// bot.sendMessage({
//     // 好友 qq 号
//     friend: '439621652',
//     // Message 实例，表示一条消息
//     message: new Message().addText('hello world!').addImageUrl('http://exapmle/image.jpg')
// });
// bot.sendMessage({
//     friend: '439621652',
//     message: new Message().addText('发送的1!'),
// });
bot.on('FriendMessage', async data => {
    const {
        id: messageId
    } = data.messageChain[0];
    await bot.sendMessage({
        friend: data.sender.id,
        quote: messageId,
        message: new Message().addText('hello world!'),
    });
});
bot.on('GroupMessage', async data => {
    console.log(data, "GroupMessage");

    if (data.messageChain[1].target == 2381557206) {
        if (!data.messageChain[2]) {
            return await bot.sendMessage({
                group: data.sender.group.id,
                message: new Message().addText('@我干嘛！'),
            });
        } else {
            switch (data.messageChain[2].text.replace(/\ +/g, "")) {
                case '1':
                    return await bot.sendMessage({
                        group: data.sender.group.id,
                        message: new Message().addText('发送的1!'),
                    });
                case '傻逼':
                    return await bot.sendMessage({
                        group: data.sender.group.id,
                        message: new Message().addText('你才是傻逼！'),
                    });
                case '小飞机是傻逼':
                    return await bot.sendMessage({
                        group: data.sender.group.id,
                        message: new Message().addText('对头！'),
                    });
            }
        }
    }
    if (data.messageChain[1].type == 'Plain') {
        function intervalTime(startTime, endTime) {
            // var timestamp=new Date().getTime(); //计算当前时间戳
            var timestamp = (Date.parse(new Date())) / 1000; //计算当前时间戳 (毫秒级)
            var date1 = ""; //开始时间
            if (timestamp < startTime) {
                date1 = startTime;
            } else {
                date1 = timestamp; //开始时间
            }
            var date2 = endTime; //结束时间
            // var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
            var date3 = (date2 - date1) * 1000; //时间差的毫秒数
            //计算出相差天数
            var days = Math.floor(date3 / (24 * 3600 * 1000));
            //计算出小时数

            var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / (3600 * 1000));
            //计算相差分钟数
            var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / (60 * 1000));

            //计算相差秒数

            var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
            var seconds = Math.round(leave3 / 1000);
            console.log(days + "天 " + hours + "小时 ")
            // return   days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
            return seconds
        }

        intervalTime(1675069302636, new Date().getTime())


        switch (data.messageChain[1].text.replace(/\ +/g, "")) {
            case '6':
                return await bot.sendMessage({
                    group: data.sender.group.id,
                    message: new Message().addText('6'),
                });
        }
    }
});