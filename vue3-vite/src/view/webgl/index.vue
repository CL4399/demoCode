<template>
  <div class="webgl-wrap">
    <canvas id="glcanvas" width="640" height="480"> 你的浏览器似乎不支持或者禁用了 HTML5 <code>&lt;canvas&gt;</code> 元素。 </canvas>
    <canvas id="glcanvas3D" width="640" height="480"> 你的浏览器似乎不支持或者禁用了 HTML5 <code>&lt;canvas&gt;</code> 元素。 </canvas>
  </div>
</template>
<script>
import { ref, reactive, defineComponent, onMounted, computed } from 'vue';
import { Button } from 'ant-design-vue';
import { initBuffers } from './init-buffers.js';
import { drawScene } from './draw-scene.js';
import { initBuffers as initBuffers3D } from './init-buffers3D.js';
import { drawScene as drawScene3D } from './draw-scene3D.js';

export default defineComponent({
  components: { Button },
  setup() {
    const canvas2D = () => {
      //  初始化着色器程序，让 WebGL 知道如何绘制我们的数据
      function initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
        // 创建着色器程序
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        // 如果创建失败，alert
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
          return null;
        }
        return shaderProgram;
      }

      // 创建指定类型的着色器，上传 source 源码并编译
      function loadShader(gl, type, source) {
        const shader = gl.createShader(type); // 创建一个新的着色器
        gl.shaderSource(shader, source); // 将源代码发送到着色器
        gl.compileShader(shader); // 进行编译
        // See if it compiled successfully
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      }
      const canvas = document.querySelector('#glcanvas');
      // 初始化 WebGL 上下文
      //@ts-ignore
      const gl = canvas.getContext('webgl');

      // 确认 WebGL 支持性
      if (!gl) {
        alert('无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。');
        return;
      }

      // 使用完全不透明的黑色清除所有图像
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // 用上面指定的颜色清除缓冲区
      gl.clear(gl.COLOR_BUFFER_BIT);

      //顶点着色器
      const vsSource = `
                attribute vec4 aVertexPosition;
                attribute vec4 aVertexColor;

                uniform mat4 uModelViewMatrix;
                uniform mat4 uProjectionMatrix;

                varying lowp vec4 vColor;

                void main(void) {
                gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
                vColor = aVertexColor;
                }
            `;
      //片段着色器
      const fsSource = `
                varying lowp vec4 vColor;

                void main(void) {
                gl_FragColor = vColor;
                }
            `;

      const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
      };

      // Here's where we call the routine that builds all the
      // objects we'll be drawing.
      const buffers = initBuffers(gl);
      // Draw the scene
      //   drawScene(gl, programInfo, buffers);
      let squareRotation = 0.0;
      let deltaTime = 0;
      let then = 0;
      // Draw the scene repeatedly
      function render(now) {
        now *= 0.001; // convert to seconds
        deltaTime = now - then;
        then = now;

        drawScene(gl, programInfo, buffers, squareRotation);
        squareRotation += deltaTime;

        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    };

    const canvas3D = () => {
      //
      // Initialize a shader program, so WebGL knows how to draw our data
      //
      function initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

        // Create the shader program

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
          return null;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesNormalBuffer);
        gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
        return shaderProgram;
      }

      //
      // creates a shader of the given type, uploads the source and
      // compiles it.
      //
      function loadShader(gl, type, source) {
        const shader = gl.createShader(type);

        // Send the source to the shader object

        gl.shaderSource(shader, source);

        // Compile the shader program

        gl.compileShader(shader);

        // See if it compiled successfully

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
          gl.deleteShader(shader);
          return null;
        }

        return shader;
      }

      //
      // Initialize a texture and load an image.
      // When the image finished loading copy it into the texture.
      //
      function loadTexture(gl, url) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Because images have to be downloaded over the internet
        // they might take a moment until they are ready.
        // Until then put a single pixel in the texture so we can
        // use it immediately. When the image has finished downloading
        // we'll update the texture with the contents of the image.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

        const image = new Image();
        image.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

          // WebGL1 has different requirements for power of 2 images
          // vs non power of 2 images so check if the image is a
          // power of 2 in both dimensions.
          if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
          } else {
            // No, it's not a power of 2. Turn off mips and set
            // wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          }
        };
        image.src = url;

        return texture;
      }

      function isPowerOf2(value) {
        return (value & (value - 1)) === 0;
      }
      const canvas = document.querySelector('#glcanvas3D');
      // Initialize the GL context
      const gl = canvas.getContext('webgl');

      // Only continue if WebGL is available and working
      if (gl === null) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
      }

      // Set clear color to black, fully opaque
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Clear the color buffer with specified clear color
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Vertex shader program

      const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying highp vec2 vTextureCoord;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;
  }
`;

      // Fragment shader program

      const fsSource = `
  varying highp vec2 vTextureCoord;

  uniform sampler2D uSampler;

  void main(void) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
  }
`;

      // Initialize a shader program; this is where all the lighting
      // for the vertices and so forth is established.
      const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

      // Collect all the info needed to use the shader program.
      // Look up which attributes our shader program is using
      // for aVertexPosition, aVertexColor and also
      // look up uniform locations.
      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
          uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        },
      };

      // Here's where we call the routine that builds all the
      // objects we'll be drawing.
      const buffers = initBuffers3D(gl);

      // Load texture
      // vite 中引入静态资源需要使用 ESM的原生功能
      const texture = loadTexture(gl, new URL('./2.jpg', import.meta.url).href);
      // Flip image pixels into the bottom-to-top order that WebGL expects.
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

      let then = 0;
      let deltaTime = 0;
      let cubeRotation = 0;
      // Draw the scene repeatedly
      function render(now) {
        now *= 0.001; // convert to seconds
        deltaTime = now - then;
        then = now;

        drawScene3D(gl, programInfo, buffers, texture, cubeRotation);
        cubeRotation += deltaTime;

        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    };

    onMounted(() => {
      canvas2D();
      // canvas3D();
    });

    return {};
  },
});
</script>
<style lang="less" scoped>
.webgl-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
}
</style>
