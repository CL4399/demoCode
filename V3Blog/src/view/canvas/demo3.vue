<template>
    <canvas id="canvas-demo3"></canvas>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup(props: any, { emit }: any) {
        var sun = new Image();
        var moon = new Image();
        var earth = new Image();
        const init = () => {
            sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
            moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
            earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
            window.requestAnimationFrame(draw);
        }
        const draw = () => {
            //@ts-ignore
            var ctx = document.getElementById('canvas-demo3').getContext('2d');
            ctx.globalCompositeOperation = 'destination-over';
            ctx.clearRect(0, 0, 300, 300); // clear canvas
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.strokeStyle = 'rgba(0,153,255,0.4)';
            ctx.save();
            ctx.translate(150, 150);

            // Earth
            var time = new Date();
            ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
            ctx.translate(105, 0);
            ctx.fillRect(0, -12, 50, 24); // Shadow
            ctx.drawImage(earth, -12, -12);

            // Moon
            ctx.save();
            ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
            ctx.translate(0, 28.5);
            ctx.drawImage(moon, -3.5, -3.5);
            ctx.restore();

            ctx.restore();

            ctx.beginPath();
            ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
            ctx.stroke();

            ctx.drawImage(sun, 0, 0, 300, 300);

            window.requestAnimationFrame(draw);
        }

        onMounted(() => {
            init();

        })

        return {}
    },
}
</script>
<style lang='scss' scoped>
</style>