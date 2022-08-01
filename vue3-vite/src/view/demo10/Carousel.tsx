import { defineComponent, render, renderSlot, PropType, ref, reactive, defineExpose, onMounted, onBeforeMount } from "vue"
import img1 from "../../assets/image/1.png"
import img2 from "../../assets/image/3.png"
import "./Carousel.less"
const Carousel = defineComponent({
    props: {
        slides: {
            type: Array,
            default: [],
        },
        autoplay: {
            type: Boolean,
            default: false,
        },
        duration: {
            type: Number,
            default: 3000,
        },
    },
    setup(props, { emit, slots, expose }) {
        let dataInfo = reactive({
            activeInfo: {
                id: 1,
                imgUrl: img1,
            } as any,
            active: 1,
        })

        // 左侧箭头
        const hleft = () => {
            dataInfo.activeInfo = props.slides[dataInfo.active--]
            if (dataInfo.active < 0) {
                dataInfo.active = props.slides.length - 1
                dataInfo.activeInfo = props.slides[1]
            }
        }
        // 右侧箭头
        const hright = () => {
            dataInfo.activeInfo = props.slides[dataInfo.active++]
            if (dataInfo.active > props.slides.length - 1) {
                dataInfo.active = 0
                dataInfo.activeInfo = props.slides[1]
            }
        }

        let timer = -1
        // 鼠标离开开启自动播放
        const start = () => {
            if (props.autoplay) {
                // 在ts中，使用定时器，注意:window.setInterval
                timer = window.setInterval(() => {
                    hright()
                }, props.duration)
            }
        }
        // 鼠标进入停止自动播放
        const stop = () => {
            clearInterval(timer)
        }

        // 点击小圆点跳转
        const ind = (id: number): any => {
            dataInfo.activeInfo.id = id
        }
        //在页面加载时 自动播放
        onMounted(() => {
            // start()
        })
        // 在页面关闭时,销毁组件 停止播放
        onBeforeMount(() => {
            stop()
        })
        const indicatorItem = () => {
            let slidesItem: JSX.Element[] = []
            console.log(props.slides, "?")
            props.slides.forEach((item: any) => {
                console.log(item.id)
                slidesItem.push(<span key={item.id} class={{ active: dataInfo.activeInfo.id == item.id }}></span>)
            })
            return slidesItem
        }

        const Item = () => {
            return (
                <div class="xtx-carousel">
                    <ul class="carousel-body">
                        <li class="carousel-item fade" key={dataInfo.activeInfo.id}>
                            <img src={dataInfo.activeInfo.imgUrl} alt="" />
                        </li>
                    </ul>
                    <a href="javascript:;" class="carousel-btn prev" onClick={hleft}>
                        <i class="iconfont icon-angle-left"></i>
                    </a>
                    <a href="javascript:;" class="carousel-btn next" onClick={hright}>
                        <i class="iconfont icon-angle-right"></i>
                    </a>
                    <div class="carousel-indicator">{indicatorItem()}</div>
                </div>
            )
        }
        return () => Item()
    },
})
export default Carousel
