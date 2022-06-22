<template>
  <div class="three-demo">
    <div id="webgl-js" style="width: 500px; height: 500px"></div>
    <div id="three-js" style="width: 1500px; height: 500px"></div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      renderer: null, // 创建 renderer 变量用于存储渲染器对象
      camera: null, // 创建 camera 变量用于存储相机对象
      scene: null, // 创建 scene 变量用于存储场景对象
      cube: null, // 创建一个 cube 变量用于存放几何立方体
      sphereGeometryBox: null, // 创建一个 sphereGeometry 变量用于存放球形立方体
      createGroupBox: null, // 储存平面图形
      width: null,
      height: null,
    };
  },
  computed: {},
  mounted() {
    let scene = new THREE.Scene();
    console.log(scene, 'THREE');
    this.createWebgl('webgl-js');
    this.threeStart('three-js');
  },
  methods: {
    createWebgl(id) {
      const gl = this.webglInit(id);
      // 创建顶点着色器 语法 gl.createShader(type) 此处 type 为枚举型值为 gl.VERTEX_SHADER 或 gl.FRAGMENT_SHADER 两者中的一个
      const vShader = gl.createShader(gl.VERTEX_SHADER);
      // 编写顶点着色器的 GLSL 代码 语法 gl.shaderSource(shader, source); shader - 用于设置程序代码的 webglShader（着色器对象) source - 包含 GLSL 程序代码的字符串
      gl.shaderSource(
        vShader,
        `
        attribute vec4 v_position;
        void main() {
            gl_Position = v_position; // 设置顶点位置
        }
      `
      );
      gl.compileShader(vShader); // 编译着色器代码
      const fShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(
        fShader,
        `
        precision mediump float;
        uniform vec4 f_color;
        void main() {
            gl_FragColor = f_color; // 设置片元颜色
        }
      `
      ); // 编写片元着色器代码
      gl.compileShader(fShader); // 编译着色器代码

      // 创建一个程序用于连接顶点着色器和片元着色器
      const program = gl.createProgram();
      gl.attachShader(program, vShader); // 添加顶点着色器
      gl.attachShader(program, fShader); // 添加片元着色器
      gl.linkProgram(program); // 连接 program 中的着色器

      gl.useProgram(program); // 告诉 WebGL 用这个 program 进行渲染

      const color = gl.getUniformLocation(program, 'f_color');
      // 获取 f_color 变量位置
      gl.uniform4f(color, 0.93, 0, 0.56, 1); // 设置它的值

      const position = gl.getAttribLocation(program, 'v_position');
      // 获取 v_position 位置
      const pBuffer = gl.createBuffer();
      // 创建一个顶点缓冲对象，返回其 id，用来放三角形顶点数据，
      gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
      // 将这个顶点缓冲对象绑定到 gl.ARRAY_BUFFER
      // 后续对 gl.ARRAY_BUFFER 的操作都会映射到这个缓存
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([0, 0.5, 0.5, 0, -0.5, -0.5]), // 三角形的三个顶点
        // 因为会将数据发送到 GPU，为了省去数据解析，这里使用 Float32Array 直接传送数据
        gl.STATIC_DRAW // 表示缓冲区的内容不会经常更改
      );
      // 将顶点数据加入的刚刚创建的缓存对象

      gl.vertexAttribPointer(
        // 告诉 OpenGL 如何从 Buffer 中获取数据
        position, // 顶点属性的索引
        2, // 组成数量，必须是 1，2，3 或 4。我们只提供了 x 和 y
        gl.FLOAT, // 每个元素的数据类型
        false, // 是否归一化到特定的范围，对 FLOAT 类型数据设置无效
        0, // stride 步长 数组中一行长度，0 表示数据是紧密的没有空隙，让 OpenGL 决定具体步长
        0 // offset 字节偏移量，必须是类型的字节长度的倍数。
      );
      gl.enableVertexAttribArray(position);
      // 开启 attribute 变量额，使顶点着色器能够访问缓冲区数据

      gl.clearColor(0, 1, 1, 1); // 设置清空颜色缓冲时的颜色值
      gl.clear(gl.COLOR_BUFFER_BIT); // 清空颜色缓冲区，也就是清空画布
      // 语法 gl.drawArrays(mode, first, count); mode - 指定绘制图元的方式 first - 指定从哪个点开始绘制 count - 指定绘制需要使用到多少个点
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    webglInit(id) {
      const dom = document.getElementById(id);
      const canvasEl = document.createElement('canvas'); // canvas 元素创建
      canvasEl.width = dom.clientWidth; // 设置 canvas 画布的宽度
      canvasEl.height = dom.clientHeight; // 设置 canvas 画布的高度
      dom.append(canvasEl); // 将创建好的 canvas 画布添加至页面中的 body 元素下
      // 接下来我们需要判断浏览器对于 WebGL 的兼容性，如果浏览器不支持 WebGL 那么我们就不需要再进行下去了
      if (!canvasEl.getContext('webgl') && !canvasEl.getContext('experimental-webgl ')) {
        alert("Your Browser Doesn't Support WebGL");
        return;
      }
      // 如果浏览器支持 WebGL，那么我们就获取 WebGL 的上下文对象并复制给变量 gl
      const context = canvasEl.getContext('webgl') ? canvasEl.getContext('webgl') : getContext('experimental-webgl');
      /* 
        设置视口 context.viewport(x, y, width, height);
        x: 用来设定视口的左下角水平坐标。默认值：0
        y: 用来设定视口的左下角垂直坐标。默认值：0
        width: 用来设定视口的宽度。默认值：canvas 的宽度
        height: 用来设定视口的高度。默认值：canvas 的高度
        当你第一次创建 WebGL 上下文的时候，视口的大小和 canvas 的大小是匹配的。然而，如果你重新改变了canvas的大小，你需要告诉 WebGL 上下文设定新的视口，因此这里作为初次创建这行代码可以省略
      */
      context.viewport(0, 0, context.canvas.width, context.canvas.height);
      return context;
    },
    initThree(id) {
      // 同原生 WebGL 环境搭建过程一样，Three.js 也需要先设置画布 canvas 元素的大小
      this.width = document.getElementById(id).clientWidth; // 设置宽度属性为浏览器窗口宽度
      this.height = document.getElementById(id).clientHeight; // 设置高度属性为浏览器窗口高度
      // 新建一个 WebGL 渲染器并赋值给 renderer 变量
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      // 设置画布大小为盒子窗口大小
      this.renderer.setSize(this.width, this.height);
      // 将画布元素挂载到页面
      document.getElementById(id).appendChild(this.renderer.domElement);
      // 设置清空画布的颜色为白色
      this.renderer.setClearColor(0xffffff, 1.0);
    },
    initCamera() {
      /* 
        创建透一个视相机的实例语法 PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number ) 
        fov - 视角
        aspect - 物体的长宽比
        near - 相机近点截图
        far - 相机远点截图
    */
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
      this.camera.position.x = 0; // 设置相机在三维空间坐标中 x 轴的位置
      this.camera.position.y = 10; // 设置相机在三维空间坐标中 y 轴的位置
      this.camera.position.z = 5; // 设置相机在三维空间坐标中 z 轴的位置
      this.camera.up.x = 0;
      this.camera.up.y = 0;
      this.camera.up.z = 1;
      this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // 设置相机的观察点
    },
    initScene() {
      this.scene = new THREE.Scene();
    },
    initObject() {
      // 首先创建一个一个几何类的实例并赋值给 geometry 变量
      var geometry = new THREE.BoxGeometry(1, 1, 1);
      // 然后创建一种材质的实例 MeshBasicMaterial 材质的构造函数能够创建一种简单的不受场景灯光效果影响的材质
      var material = new THREE.MeshBasicMaterial({ color: 'yellowgreen' });
      // Mesh 是一种三角形网格基本单元的构造函数，类似于我们原生 WebGL 中的片元着色器它用于连接几何体和材质
      this.cube = new THREE.Mesh(geometry, material);
      // 最后将创建好的几何立方体添加到场景中
      this.scene.add(this.cube);
    },
    createSphereGeometry(radius, widthSegments, heightSegments) {
      // SphereGeometry 接受三个参数第一个参数是球体半径  参数2和参数3设置的球体经纬度两个方向的细分数
      let geometry2 = new THREE.SphereGeometry(4, 35, 35);
      let textureLoader = new THREE.TextureLoader();
      // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
      textureLoader.load('/2.PNG', (texture) => {
        let material = new THREE.MeshBasicMaterial({
          map: texture, //设置颜色贴图属性值
        }); //材质对象Material
        this.sphereGeometryBox = new THREE.Mesh(geometry2, material); //网格模型对象Mesh
        this.scene.add(this.sphereGeometryBox);
      });
    },
    // render 函数提供了浏览器的循环渲染功能
    render() {
      //   this.cube.rotation.x += 0.01;
      //   this.cube.rotation.y += 0.01;

      setTimeout(() => {
        this.sphereGeometryBox.rotation.x += 0.01;
        this.sphereGeometryBox.rotation.y += 0.01;
        this.createGroupBox.rotation.z += 0.01;
      }, 1000);
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    createGroup() {
      // 纹理贴图映射到一个矩形平面上
      var geometry = new THREE.PlaneGeometry(15, 15); //矩形平面
      // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
      var textureLoader = new THREE.TextureLoader();
      // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
      textureLoader.load('/2.PNG', (texture) => {
        console.log(texture, '????????????????');
        var material = new THREE.MeshBasicMaterial({
          // color: 0x0000ff,
          // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
          map: texture, //设置颜色贴图属性值
        }); //材质对象Material
        this.createGroupBox = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        this.scene.add(this.createGroupBox); //网格模型添加到场景中
      });
    },
    // 最后将 Threee.js 环境初始化，场景创建，相机创建渲染器创建以及渲染初始化等函数合成到一起执行我们就完成了一个旋转立方体的绘制
    threeStart(id) {
      this.initThree(id); // three实例
      this.initCamera(); // 创建相机
      this.initScene(); // 场景对象
      this.createSphereGeometry();
      //   this.initObject();
      this.createGroup();
      this.render();
    },
  },
};
</script>
<style lang='less'>
.three-demo {
  display: flex;
}
</style>