import { defineComponent, render, renderSlot, PropType ,withModifiers } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import ButtonCom from "../../customButton/Button/Button";
import "./modal.css";
const ModalCom = defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    onClick: {
      type: MouseEvent,
      default: null,
    },
  },
  setup(props, { emit, slots }) {
    const cancel = () => {
      emit("update:visible", false);
    };
    const ok = () => {
      emit("update:visible", false);
    };
    const close = (e: MouseEvent) => {
      e.stopPropagation();
      emit("close", false);
      emit("update:visible", false);
    };
    return () => (
      <div class="modal-com" v-show={props.visible} onClick={close}>
        <div class="modal-com-body">
          <div class="modal-com-header">
            <div>{slots.title ? slots.title() : "默认标题"}</div>
            <div>
              <CloseOutlined onClick={close} />
            </div>
          </div>
          <div class="modal-com-content">
            {slots.content ? slots.content() : "默认内容"}
          </div>
          <div class="modal-com-footer">
            <div v-show={props.footer}>
              <ButtonCom size="middle" color="#ccc" onClick={cancel}>
                取消
              </ButtonCom>
              <ButtonCom size="middle" onClick={ok}>
                确定
              </ButtonCom>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
export default ModalCom;
