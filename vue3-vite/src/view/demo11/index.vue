<template>
    <div>
        <button type="button" class="bg-indigo-500 animate-wiggle" disabled>
            <svg class="h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
        </button>
    </div>
    <span>312</span>
    <span class="spacing-48">123</span>
    <span>312</span>
    <div id="btnWrapper">
        <div class="btn active">开灯</div>
        <div class="btn">关灯</div>
    </div>
    <br />
    <div class="box-content">
        <div class="box">box</div>
        <ButtonCom style="width: 100px" @click="change">change</ButtonCom>
        <ButtonCom style="width: 100px" @click="changeNum">change</ButtonCom>
        <comVue ref="comRef"></comVue>
        <demo1Vue ref="demo1ref"></demo1Vue>
    </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent, onMounted, watch } from "vue"
import cssVars from "css-vars-ponyfill"
import { Button, Input } from "ant-design-vue"
import { https } from "../../serve/https"
import comVue from "./com.vue"
import ButtonCom from "../demo4/Button/Button"
import demo1Vue from "./demo1.vue"
export default defineComponent({
    components: { Button, comVue, ButtonCom, Input, demo1Vue },
    setup(props: any, { emit }: any) {
        let dataInfo = reactive({
            show: false,
        })
        let demo1ref = ref()
        onMounted(() => {
            console.log(demo1ref.value, "demo1ref")
            let wrapper = document.getElementById("btnWrapper") as any
            cssVars({
                onlyLegacy: true,
                variables: {
                    "--groove-left": "12px",
                    "--c-wrap-shadow1": " #f5f9fd",
                    "--c-wrap-shadow2": " #d8dbe5",
                    "--c-wrap-bg": " #e2e6eb",
                    "--c-btn-shadow1": " #d9dbe6",
                    "--c-btn-shadow2": " #f5f9fd",
                    "--c-txt1": "#aaa;",
                    "--c-txt2": "#111;",
                },
            })
            let btns = document.getElementsByClassName("btn")
            for (let i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", function (e) {
                    ThemeChange(i === 1)
                    resetBtn(btns)
                    cssVars({
                        onlyLegacy: true,
                        variables: {
                            "--groove-left": `calc(12px + ${i * 50}%)`,
                            "--wraper-origin": `${i === 0 ? "75% top" : "25% top"}`,
                            "--wraper-rotate": `${i === 0 ? -8 : 8}deg`,
                            "--c-wrap-shadow1": `${i === 0 ? "#f5f9fd" : "#292929"}`,
                            "--c-wrap-shadow2": `${i === 0 ? "#ccc" : "#202020"}`,
                            "--c-wrap-bg": `${i === 0 ? "e2e6eb" : "#505050"}`,
                            "--c-btn-shadow1": `${i === 0 ? "#d9dbe6" : "#323232"}`,
                            "--c-btn-shadow2": `${i === 0 ? "#f5f9fd" : "#444"}`,
                            "--c-txt1": `${i === 0 ? "#aaa" : "#888"}`,
                            "--c-txt2": `${i === 0 ? "#111" : "#fff"}`,
                        },
                    })
                    wrapper.className = "rotateWrap"
                    setTimeout(() => {
                        btns[i].className = "btn active"
                    }, 500)
                    setTimeout(() => {
                        wrapper.className = ""
                    }, 550)
                })
            }
            // 重置按钮类名
            function resetBtn(btns: any) {
                for (let i = 0; i < btns.length; i++) {
                    setTimeout(() => {
                        btns[i].className = "btn"
                    }, 100)
                }
            }
            // 改变主题
            function ThemeChange(bol: any) {
                let body = document.body
                // body.className = bol ? 'dark' : ''
            }
            https({
                baseUrl: "/api/v1/search",
                method: "GET",
                data: { query: "1" },
            }).then((res) => {
                console.log(res.hits, "https")
            })
        })
        cssVars({
            onlyLegacy: true,
            variables: {
                "--width": "40px",
            },
        })
        const comRef = ref()
        const change = () => {
            dataInfo.show = !dataInfo.show
            cssVars({
                onlyLegacy: true,
                variables: {
                    "--width": dataInfo.show ? "120px" : "40px",
                },
            })
        }
        const changeNum = () => {
            console.log(comRef.value, "comRef")
            dataInfo.show = !dataInfo.show
            localStorage.setItem("text", JSON.stringify(dataInfo.show))
            comRef.value.getItem()
        }
        return { change, changeNum, comRef, demo1ref }
    },
})
</script>
<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #edf1f4;
    perspective: 500px;
    --c-wrap-shadow1: #f5f9fd;
    --c-wrap-shadow2: #d8dbe5;
    --c-wrap-bg: #e2e6eb;
    --c-btn-shadow1: #d9dbe6;
    --c-btn-shadow2: #f5f9fd;
    --c-txt1: #aaa;
    --c-txt2: #111;
    transition: background-color 0.4s linear;
}

.dark {
    background-color: #333;
    --c-wrap-shadow1: #292929;
    --c-wrap-shadow2: #202020;
    --c-wrap-bg: #505050;
    --c-btn-shadow1: #323232;
    --c-btn-shadow2: #444;
    --c-txt1: #888;
    --c-txt2: #fff;
}

.write {
    --c-wrap-shadow1: #f5f9fd;
    --c-wrap-shadow2: #d8dbe5;
    --c-wrap-bg: #e2e6eb;
    --c-btn-shadow1: #d9dbe6;
    --c-btn-shadow2: #f5f9fd;
    --c-txt1: #aaa;
    --c-txt2: #111;
}

#btnWrapper {
    position: relative;
    width: 380px;
    height: 80px;
    padding: 12px 16px;
    margin: 300px auto 0;
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--c-wrap-bg);
    box-shadow: 5px 5px 10px var(--c-wrap-shadow1), 5px 5px 5px var(--c-wrap-shadow2);
    transform-origin: var(--wraper-origin);
    transition: transform 0.4s cubic-bezier(0, 0, 0.48, 1), box-shadow 0.4s linear, background-color 0.4s linear;
}

.rotateWrap {
    transform: rotateY(var(--wraper-rotate));
}

#btnWrapper::before {
    content: "";
    position: absolute;
    left: var(--groove-left);
    top: 12px;
    width: calc(50% - 16px - 8px);
    height: calc(100% - 24px);
    border-radius: 12px;
    box-shadow: inset 8px 8px 6px var(--c-btn-shadow1), inset -5px -5px 15px var(--c-btn-shadow2), inset -5px -5px 15px var(--c-btn-shadow2), inset 7px 7px 6px var(--c-btn-shadow1);
    transition: left 1s cubic-bezier(0.82, 0.12, 0.18, 0.88), box-shadow 0.4s linear;
}

.btn {
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    padding: inherit;
    color: var(--c-txt1);
    transition: color 0.4s linear;
    animation: txtOutScale 0.6s linear;
    cursor: pointer;
}

.active {
    color: var(--c-txt2);
    transform: scale(1.1);
    animation: txtEnterScale 0.4s linear;
}

@keyframes txtEnterScale {
    0% {
        transform: scale(1);
    }

    80% {
        transform: scale(1.15);
    }

    100% {
        transform: scale(1.1);
    }
}

@keyframes txtOutScale {
    0% {
        transform: scale(1.1);
    }

    80% {
        transform: scale(0.95);
    }

    100% {
        transform: scale(1);
    }
}

.box-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .box {
        width: var(--width);
        background-color: red;
    }
}
</style>
