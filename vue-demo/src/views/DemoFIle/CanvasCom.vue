<template>
    <div style="height:80vh;width: 100%;">
        <canvas id="canvas" width="500" height="500"></canvas>
        <canvas id="canvasT" width="500" height="500"></canvas>
    </div>
</template>
<script>
export default {
    name: '',
    props: {},
    data() { return {} },
    computed: {},
    mounted() {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        setInterval(() => {
            ctx.save()
            ctx.clearRect(0, 0, 600, 600)
            ctx.translate(150, 150) // 设置中心点，此时300，300变成了坐标的0，0
            ctx.save()

            // 画大圆
            ctx.beginPath()
            // 画圆线使用arc(中心点X,中心点Y,半径,起始角度,结束角度)
            ctx.arc(0, 0, 100, 0, 2 * Math.PI)
            ctx.stroke() // 执行画线段的操作
            ctx.closePath()

            // 画小圆
            ctx.beginPath()
            ctx.arc(0, 0, 5, 0, 2 * Math.PI)
            ctx.stroke()
            ctx.closePath()

            // 获取当前 时，分，秒
            let time = new Date()
            let hour = time.getHours() % 12
            let min = time.getMinutes()
            let sec = time.getSeconds()

            // 时针
            ctx.rotate(2 * Math.PI / 12 * hour + 2 * Math.PI / 12 * (min / 60) - Math.PI / 2)
            ctx.beginPath()
            // moveTo设置画线起点
            ctx.moveTo(-10, 0)
            // lineTo设置画线经过点
            ctx.lineTo(40, 0)
            // 设置线宽
            ctx.lineWidth = 10
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
            ctx.save()

            // 分针
            ctx.rotate(2 * Math.PI / 60 * min + 2 * Math.PI / 60 * (sec / 60) - Math.PI / 2)
            ctx.beginPath()
            ctx.moveTo(-10, 0)
            ctx.lineTo(60, 0)
            ctx.lineWidth = 5
            ctx.strokeStyle = 'blue'
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
            ctx.save()

            //秒针
            ctx.rotate(2 * Math.PI / 60 * sec - Math.PI / 2)
            ctx.beginPath()
            ctx.moveTo(-10, 0)
            ctx.lineTo(80, 0)
            ctx.strokeStyle = 'red'
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
            ctx.save()

            // 绘制刻度，也是跟绘制时分秒针一样，只不过刻度是死的
            ctx.lineWidth = 1
            for (let i = 0; i < 60; i++) {
                ctx.rotate(2 * Math.PI / 60)
                ctx.beginPath()
                ctx.moveTo(90, 0)
                ctx.lineTo(100, 0)
                // ctx.strokeStyle = 'red'
                ctx.stroke()
                ctx.closePath()
            }
            ctx.restore()
            ctx.save()
            ctx.lineWidth = 5
            for (let i = 0; i < 12; i++) {
                ctx.rotate(2 * Math.PI / 12)
                ctx.beginPath()
                ctx.moveTo(85, 0)
                ctx.lineTo(100, 0)
                // ctx.strokeStyle = 'red'
                ctx.stroke()
                ctx.closePath()
            }

            ctx.restore()
            ctx.restore()
        }, 1000)

    },
    methods: {}
}
</script>
<style lang='less'>
</style>