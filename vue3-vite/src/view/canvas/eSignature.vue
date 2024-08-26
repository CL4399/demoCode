<template>
  <div id="e_signature">
    <div class="canvas-container">
      <canvas id="signatureCanvas" width="600" height="500"></canvas>
    </div>
    <div class="controls">
      <Button id="clearButton">Clear</Button>
      <Button id="saveButton">Save</Button>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../../store/index';
import { Button } from 'ant-design-vue';
export default defineComponent({
  components: { Button },
  setup() {
    const route = useRouter();
    const store = useCounterStore();
    onMounted(() => {
      const canvas = document.getElementById('signatureCanvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const clearButton = document.getElementById('clearButton') as HTMLButtonElement;
      const saveButton = document.getElementById('saveButton') as HTMLButtonElement;

      let drawing = false;
      let lastX = 0;
      let lastY = 0;

      canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
      });

      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', () => (drawing = false));
      canvas.addEventListener('mouseout', () => (drawing = false));

      function draw(e: any) {
        if (!drawing) return;
        ctx.strokeStyle = '#000';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
      }

      clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });

      saveButton.addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
      });
    });
    return {};
  },
});
</script>
<style lang="less" scoped>
#e_signature {
  #signatureCanvas {
    border: 1px solid #000;
  }
}
</style>
