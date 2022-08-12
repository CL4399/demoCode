<template>
    <div style="width: 100%;height: 100%;">
        <!-- <ElButton type="warning">123</ElButton> -->
        <canvas id="canvas-demo2" style="width: 100%;height: 100%;"></canvas>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElContainer, ElHeader, ElAside, ElMain, } from "element-plus"
export default {
    components: { ElButton, ElContainer, ElHeader, ElAside, ElMain, },
    setup(props: any, { emit }: any) {
        onMounted(() => {
            init()
        })
        const init = () => {
            let canvas: any = document.getElementById('canvas-demo2');
            // 获取到屏幕倒是是几倍屏。
            let getPixelRatio = (context: any) => {
                var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
                return (window.devicePixelRatio || 1) / backingStore;
            };
            // iphone6下得到是2 
            const pixelRatio = getPixelRatio(canvas);
            // 设置canvas的真实宽高
            canvas.width = pixelRatio * canvas.offsetWidth; // 想当于 2 * 375 = 750 
            canvas.height = pixelRatio * canvas.offsetHeight;
            /** @type {HTMLCanvasElement} */
            const ctx = canvas.getContext('2d')
            //@ts-ignore
            rectangle(ctx)
        }
        const rectangle = (ctx: CanvasRenderingContext2D) => {
            ctx.beginPath();
            ctx.moveTo(10, 10);
            ctx.lineTo(50, 10);
            ctx.lineTo(10, 50);
            ctx.fill()// 填充颜色

            ctx.beginPath();
            ctx.moveTo(51, 51);
            ctx.lineTo(11, 51);
            ctx.lineTo(51, 11);
            ctx.closePath()
            ctx.stroke() // stroke() 方法会实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色


            console.log(ctx, "rectangle");

            // // 画大圆
            // ctx.beginPath()
            // // 画圆线使用arc(中心点X,中心点Y,半径,起始角度,结束角度)
            // ctx.arc(60, 100, 30, 0, 2 * Math.PI)
            // ctx.stroke() // 执行画线段的操作
            // ctx.closePath()

            // //三次贝塞尔曲线
            // ctx.beginPath();
            // ctx.moveTo(75, 40);
            // ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
            // ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
            // ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
            // ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
            // ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
            // ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
            // ctx.fill();

            // // 绘制文字
            // ctx.font = "48px serif";
            // // 实线文字
            // ctx.fillText("Hello world", 10, 50);
            // ctx.font = "48px serif";
            // // 边框文字
            // ctx.strokeText("Hello world", 10, 100);
            // ctx.font = "48px serif";
            // ctx.textBaseline = "hanging";
            // ctx.strokeText("Hello world", 10, 150);
            // var img = new Image();
            // img.onload = function () {
            //     ctx.drawImage(img, 50, 38, 100, 100);
            // };
            // img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
        }
        return {}
    },
}
</script>
<style lang='scss' scoped>
</style>