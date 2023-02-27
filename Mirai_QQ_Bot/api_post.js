const bot = require("./main");
const {
    Message
} = require("mirai-js");
const {
    sendMessageGroupText,
} = require("./js/utils");
const fetch = require("node-fetch");
const Anime_REG = new RegExp(/二次元|二刺螈|二次媛|二刺媛|学习|沙雕|涩涩/);
const Beauty_REG = new RegExp(/涩图|涩涩|下头|郭楠/);
const TOP_Search_REG = new RegExp(/热搜/);

async function getAnimeIMG(info, group) {
    //二刺螈图片
    if (Anime_REG.test(info.trim())) {
        const text = info.replace(Anime_REG, "").trim() || "白丝";
        const res = await fetch(
            "https://api.lolicon.app/setu/v2?tag=" + text
        ).then((res) => {
            return res.text();
        });
        console.log("https://api.lolicon.app/setu/v2?tag=" + text);
        if (res) {
            const msg = JSON.parse(res);
            if (msg.data.length == 0) {
                bot.sendMessage({
                    group,
                    message: new Message().addText("没找到" + text + "~~"),
                });
                return;
            }
            const imageUrl = msg.data[0].urls.original;
            if (imageUrl) {
                const imgID = await bot.sendMessage({
                    group,
                    message: new Message()
                        .addText(msg.data[0].title)
                        .addText(msg.data[0].tags.join())
                        .addImageUrl(imageUrl),
                });
                if (!imgID || imgID == -1) {
                    await bot.sendMessage({
                        group,
                        message: new Message().addText("图片太涩了 发不出来~~~"),
                    });

                    return;
                }
                return;
            }
        }
        return;
    }
}
async function getBeautyIMG(info, group) {
    if (
        Beauty_REG.test(info)
    ) {
        const res = await fetch(
            "https://tucdn.wpon.cn/api-girl/index.php?wpon=json"
        ).then((res) => {
            return res.json();
        });
        sendMessageGroupText(res.mp4, group);
        return;
    }
}
async function getTopSearch(info, group) {
    if (TOP_Search_REG.test(info.trim())) {
        const text = info.replace(TOP_Search_REG, "").trim() || "bili";
        const res = await fetch(
            "https://api.vvhan.com/api/hotlist?type=" + text
        ).then((res) => {
            return res.text();
        });
        if (res) {
            const msg = JSON.parse(res);
            console.log(msg, "length")
            if (!msg.success) {
                bot.sendMessage({
                    group,
                    message: new Message().addText("寄~~~~"),
                });
                return;
            } else {
                let arr = []
                for (let i = 0; i < 3; i++) {
                    arr.push(`${i + 1}: ${msg.data[i].title}, 热度值:${msg.data[i].hot}, 链接:${msg.data[i].mobilUrl}\n`)
                }
                await bot.sendMessage({
                    group,
                    message: new Message()
                        .addText(text + "热搜\r")
                        .addText(arr.join(""))
                });
                if (arr.length == 0) {
                    await bot.sendMessage({
                        group,
                        message: new Message().addText("寄~~~"),
                    });
                    return;
                }
                return;
            }
        }
        return;
    }
}

async function getDailySentence(group) {
    try {
        const res = await fetch(
            "https://api.vvhan.com/api/ian?cl=wx"
        ).then((res) => {
            return res.text();
        });
        bot.sendMessage({
            group,
            message: new Message()
                .addText(res)
        });
    } catch (error) {
        sendMessageGroupText("报错了 ~ 就叫人来修我");
    }

}

async function DogDiary(group) {
    const res = await fetch(
        "https://v.api.aa1.cn/api/tiangou/index.php"
    ).then((res) => {
        return res.text();
    });
    sendMessageGroupText(
        res
        .trim()
        .match(/(?<=<p>)(.*)(?=<\/p>)/g)
        .join(""),
        group
    );
}

async function getJoke(group) {
    const res = await fetch(
        "https://v.api.aa1.cn/api/api-wenan-gaoxiao/index.php?aa1=json"
    ).then((res) => {
        return res.json();
    });
    if (!res.length && !res[0].gaoxiao) return;
    sendMessageGroupText(res[0].gaoxiao, group);
}
async function getNews(group) {
    const res = await fetch(
        "https://api.vvhan.com/api/60s"
    ).then((res) => {
        return res.url;
    });
    bot.sendMessage({
        group,
        message: new Message()
            .addImageUrl(res)
    });

}

module.exports = {
    getAnimeIMG,
    getBeautyIMG,
    getTopSearch,
    getDailySentence,
    DogDiary,
    getJoke,
    getNews
};