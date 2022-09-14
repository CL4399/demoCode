<template>
    <div class="home-page">
        <Row style="height: 100%">
            <Col :span="17" class="pt-2 pr-2 pl-2 scroll" style="height: 100%; overflow: auto">
                <template v-for="item of list" :key="item.id">
                    <CardComVue :info="item"></CardComVue>
                </template>
            </Col>
            <Col :span="1"></Col>
            <Col :span="6" class="pt-2 pr-2 pl-2" style="height: 100%">
                <div :style="{ border: '1px solid #d9d9d9', borderRadius: '4px' }">
                    <Calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" />
                </div>
            </Col>
        </Row>
    </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, defineComponent } from "vue"
import { useRouter } from "vue-router"
import { Calendar, Row, Col, Card } from "ant-design-vue"
import CardComVue from "./components/CardCom.vue"
export default defineComponent({
    components: { Calendar, Row, Col, Card, CardComVue },
    setup(props: any, { emit }: any) {
        let dataInfo = reactive({
            value: "",
            list: [
                { title: "标题1", content: "未知内容", id: 1 },
                { title: "标题1", content: "未知内容", id: 2 },
                { title: "标题1", content: "未知内容", id: 3 },
                { title: "标题1", content: "未知内容", id: 4 },
                { title: "标题1", content: "未知内容", id: 5 },
                { title: "标题1", content: "未知内容", id: 6 },
                { title: "标题1", content: "未知内容", id: 7 },
                { title: "标题1", content: "未知内容", id: 8 },
            ],
        })
        const onPanelChange = (e: any) => {
            console.log(e, "onPanelChange")
        }
        return { ...toRefs(dataInfo), onPanelChange }
    },
})
</script>
<style lang="less" scoped>
.home-page {
    height: 100%;
    // background-color: #fff;
    /*滚动条整体样式,高宽分别对应横竖滚动条的尺寸*/
    .scroll::-webkit-scrollbar {
        width: 5px;
        height: 2px;
        border-radius: 5px;
        background-color: rgba(110, 107, 107, 0);
    }

    /*滚动条里面小方块*/
    .scroll::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #fff;
    }

    /*滚动条里面轨道*/
    .scroll::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
    }
}
</style>
