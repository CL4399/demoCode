import type { ECharts, EChartsOption } from 'echarts';
import { init } from 'echarts';
import { onUnmounted } from 'vue';



export class ChartRenderer {
    chartDom: HTMLDivElement;
    chart: ECharts
    constructor(id: string) {
        const chartDom = document.getElementById(id) as HTMLDivElement
        this.chart = init(chartDom)
        this.chartDom = chartDom;
        const chartResize = () => this.chart.resize()
        window.addEventListener('resize', chartResize)
        onUnmounted(() => {
            window.removeEventListener('resize', chartResize)
            this.chart.dispose()
        })
    }
    draw(option: EChartsOption) {
        this.chart.setOption(option)
    }



}

export default ChartRenderer

