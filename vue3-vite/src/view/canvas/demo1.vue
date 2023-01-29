<template>
    <div style="height: 100%;">
        <canvas id="canvas" style="width: 100%;height:100%;"></canvas>
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup(props: any, { emit }: any) {
        onMounted(() => {
            int()
        })
        const int = () => {
            let canvas: any = document.getElementById('canvas');
            console.log(canvas,"canvas");
            
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
            console.log(ctx,"ctx");
            
            //@ts-ignore
            rectangle(ctx)
        }
        const rectangle = (ctx: CanvasRenderingContext2D) => {
            ctx.fillStyle = "aqua" // 定义填充颜色
            // 填充的矩形  fillrect (x, y, width, height) 左上角为起点 
            ctx.fillRect(10, 10, 10, 10)
            // 矩形的边框 strokeRect (x, y, width, height)
            ctx.strokeRect(30, 10, 10, 10)
            /**
             * fillRect()函数绘制了一个边长为 100px 的黑色正方形。
             * clearRect()函数从正方形的中心开始擦除了一个 60*60px 的正方形，
             * 接着strokeRect()在清除区域内生成一个 50*50 的正方形边框。
             */
            ctx.fillStyle = "#000"
            ctx.fillRect(50, 5, 21, 21);
            ctx.clearRect(53, 8, 15, 15);
            ctx.strokeRect(56, 11, 9, 9);


            // 使用路径绘制 三角形
            ctx.beginPath()
            ctx.moveTo(75, 10)
            ctx.lineTo(80, 15)
            ctx.lineTo(80, 5)
            ctx.fill()

            // 绘制 笑脸
            ctx.beginPath();
            ctx.arc(75, 125, 50, 0, Math.PI * 2, true); // 绘制
            ctx.moveTo(110, 125);
            ctx.arc(75, 125, 35, 0, Math.PI, false);   // 口 (顺时针)
            ctx.moveTo(65, 115);
            ctx.arc(60, 115, 5, 0, Math.PI * 2, true);  // 左眼
            ctx.moveTo(95, 115);
            ctx.arc(90, 115, 5, 0, Math.PI * 2, true);  // 右眼
            ctx.stroke();
        }
        return {}
    },
}
</script>
<style lang='scss' scoped>
</style>