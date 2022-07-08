<template>
    <Form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <FormItem label="Activity name">
            <Input v-model:value="formState.name" />
        </FormItem>
        <FormItem label="Activity zone">
            <Select v-model:value="formState.region" placeholder="please select your zone">
                <SelectOption value="shanghai">Zone one</SelectOption>
                <SelectOption value="beijing">Zone two</SelectOption>
            </Select>
        </FormItem>
        <FormItem label="Activity time">
            <DatePicker v-model:value="formState.date1" show-time type="date" placeholder="Pick a date"
                style="width: 100%" />
        </FormItem>
        <FormItem label="Instant delivery">
            <Switch v-model:checked="formState.delivery" />
        </FormItem>
        <FormItem label="Activity type">
            <CheckboxGroup v-model:value="formState.type">
                <Checkbox value="1" name="type">Online</Checkbox>
                <Checkbox value="2" name="type">Promotion</Checkbox>
                <Checkbox value="3" name="type">Offline</Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="Resources">
            <RadioGroup v-model:value="formState.resource">
                <Radio value="1">Sponsor</Radio>
                <Radio value="2">Venue</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="Activity form">
            <Input v-model:value="formState.desc" type="textarea" />
        </FormItem>
        <FormItem :wrapper-col="{ span: 14, offset: 4 }">
            <Button type="primary" @click="onSubmit">Create</Button>
            <Button style="margin-left: 10px">Cancel</Button>
        </FormItem>
    </Form>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, provide, defineComponent, UnwrapRef, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { Form, FormItem, Switch, Radio, RadioGroup, Input, Button, Select, SelectOption, DatePicker, Checkbox, CheckboxGroup } from "ant-design-vue"
interface FormState {
    name: string;
    region: string | undefined;
    date1: undefined | any;
    delivery: boolean;
    type: string[];
    resource: string;
    desc: string;
}
export default defineComponent({
    components: { Form, FormItem, Switch, Radio, RadioGroup, Input, Button, Select, SelectOption, DatePicker, Checkbox, CheckboxGroup },
    setup(props: any, { emit }: any) {
        const formState: UnwrapRef<FormState> = reactive({
            name: '',
            region: undefined,
            date1: undefined,
            delivery: false,
            type: [],
            resource: '',
            desc: '',
        });
        const onSubmit = () => {
            console.log('submit!', toRaw(formState));
        };
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            formState,
            onSubmit,
        };
    },
})
</script>
<style lang='scss' scoped>
</style>