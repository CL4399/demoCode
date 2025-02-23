<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import SphereCollision from "sphere-collision";
import type { SphereCollisionC, GlobuleC } from "sphere-collision/types";

const canvasBgColor = "rgba(0, 0, 0, .2)"; // 动画时背景颜色
const playerRadius = 20; // 玩家小球半径
const bulletRadius = 5; // 子弹半径
const bulletV = 5; // 子弹速度
const planetInitV = 2.5; // 行星的初始速度
let planetV = planetInitV; // 行星的速度
let canvasWidth = 0; // 画布宽度
let canvasHeight = 0; // 画布高度
let boxOffetLeft = 0; // 该组件离窗口左边的距离
let boxOffetTop = 0; // 该组件离窗口上边的距离

enum GameStaus {
  "toPlay",
  "playing",
  "pause",
  "gameover",
}
enum Role {
  "player",
  "bullet",
  "planet",
  "particle",
}

const { t } = useI18n();
const boxRef = ref<HTMLDivElement>();
let sphereCollisionRef: SphereCollisionC | null = null;
let timer: number | null = null;
let incrementVTimer: number | null = null;

const gameStatus = ref<GameStaus>(GameStaus.toPlay); // 当前游戏状态
const score = ref<number>(0); // 当前得分

// 绘制整个画布的背景色
const drawBg = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = canvasBgColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

// 每一帧绘制所有球体之前执行的函数
const beforeDrawGlobules = (sphereCollision: SphereCollisionC) => {
  const { ctx } = sphereCollision;
  drawBg(ctx);
};

// 每一帧绘制所有球体之后执行的函数
const afterDrawGlobules = (sphereCollision: SphereCollisionC) => {
  const { globuleList } = sphereCollision;

  // 做清除工作
  const newGlobuleList = globuleList.filter((global: GlobuleC) => {
    const { id, alpha, x, y, radius } = global;

    // 清除透明度为0的粒子
    if (id.role === Role.particle && alpha === 0) {
      return false;
    }

    // 清除已出界的子弹
    if (id.role === Role.bullet) {
      if (
        x < -radius ||
        y < -radius ||
        x > canvasWidth + radius ||
        y > canvasHeight + radius
      ) {
        return false;
      }
    }
    return true;
  });

  sphereCollision.updateGlobuleList(newGlobuleList);
};

// 检查玩家的小球是否与行星发生碰撞
const checkoutPlayerCollision = (nextFrameGlobule: GlobuleC) => {
  const { inCollisionGlobule, inCollisionGlobuleList } = nextFrameGlobule;
  if (inCollisionGlobule) {
    for (let i = 0, l = inCollisionGlobuleList.length; i < l; i++) {
      const otherGlobule = inCollisionGlobuleList[i];
      if (otherGlobule.id.role === Role.planet) {
        sphereCollisionRef?.stop();
        gameStatus.value = GameStaus.gameover;
        return;
      }
    }
  }
};

// 检查子弹是否与行星发生碰撞
const checkoutBulletCollision = (nextFrameGlobule: GlobuleC) => {
  const { inCollisionGlobule, inCollisionGlobuleList } = nextFrameGlobule;
  if (sphereCollisionRef && inCollisionGlobule) {
    for (let i = 0, l = inCollisionGlobuleList.length; i < l; i++) {
      const otherGlobule = inCollisionGlobuleList[i];
      const { id, x, y, vx, vy, radius, color } = otherGlobule;
      if (id.role === Role.planet) {
        // 计算分数
        let shouldAddPlanet = false;
        if (radius - 16 > 10) {
          shouldAddPlanet = true;
          score.value += 100;
        } else {
          score.value += 250;
        }

        // 将子弹和行星清掉
        const newGlobuleList = sphereCollisionRef.globuleList.filter(
          (global: GlobuleC) => {
            if (global === nextFrameGlobule || global === otherGlobule) {
              return false;
            }
            return true;
          }
        );

        // 添加个新的更小的行星
        if (shouldAddPlanet) {
          const newPlanet = sphereCollisionRef.createGlobule({
            id: { role: Role.planet },
            initX: x,
            initY: y,
            radius: radius - 16,
            color,
            vx,
            vy,
            receiveOutForce: false,
            receiveWallForce: false,
          });
          newGlobuleList.unshift(newPlanet);
        }

        // 添加粒子实例
        for (let i = 0; i < radius * 8; i++) {
          const vx = (Math.random() - 0.5) * (Math.random() * 8);
          const vy = (Math.random() - 0.5) * (Math.random() * 8);
          const particle = sphereCollisionRef.createGlobule({
            id: { role: Role.particle },
            initX: x,
            initY: y,
            radius: Math.random() * 4,
            color,
            alphaChangeV: -0.02,
            vx,
            vy,
            moveLossV: 0.03,
            receiveOutForce: false,
            receiveWallForce: false,
          });
          newGlobuleList.unshift(particle);
        }

        sphereCollisionRef.updateGlobuleList(newGlobuleList);
        return;
      }
    }
  }
};

// 初始化游戏
const initGame = () => {
  canvasWidth = 0;
  canvasHeight = 0;
  boxOffetLeft = 0;
  boxOffetTop = 0;
  const canvas = document.getElementById("myCanvas2") as HTMLCanvasElement;
  if (canvas) {
    if (score.value !== 0) {
      score.value = 0;
    }
    planetV = planetInitV;
    if (boxRef.value) {
      const { offsetWidth, offsetHeight, offsetLeft, offsetTop } =
        boxRef.value;
      canvasWidth = offsetWidth;
      canvasHeight = offsetHeight;
      boxOffetLeft = offsetLeft;
      boxOffetTop = offsetTop;
    } else {
      return;
    }
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    drawBg(ctx);

    // 实例化SphereCollision对象，先添加一个玩家的球体
    sphereCollisionRef = new SphereCollision(
      ctx,
      canvas,
      [
        {
          id: { role: Role.player },
          initX: canvasWidth / 2,
          initY: canvasHeight / 2,
          radius: playerRadius,
          color: "#ffffff",
          fixedPos: true,
          receiveOutForce: false,
          onlyCheckCollision: true,
          afterCalculateNextFrameGlobule: checkoutPlayerCollision,
        },
      ],
      {
        beforeDrawGlobules,
        afterDrawGlobules,
      }
    );
  }
};


// 监听鼠标按下
const onMouseDown = (e: MouseEvent) => {
  if (gameStatus.value !== GameStaus.playing || !sphereCollisionRef) return;
  const angle = Math.atan2(
    e.clientY - boxOffetTop - canvasHeight / 2,
    e.clientX - boxOffetLeft - canvasWidth / 2
  );
  const vx = Math.cos(angle) * bulletV;
  const vy = Math.sin(angle) * bulletV;

  // 产生子弹实例并添加到列表中
  const bullet: GlobuleC = sphereCollisionRef.createGlobule({
    id: { role: Role.bullet },
    initX: canvasWidth / 2,
    initY: canvasHeight / 2,
    radius: bulletRadius,
    color: "#ffffff",
    vx,
    vy,
    receiveWallForce: false,
    receiveOutForce: false,
    onlyCheckCollision: true,
    afterCalculateNextFrameGlobule: checkoutBulletCollision,
  });
  sphereCollisionRef.globuleList.unshift(bullet);
};

// 点击开始游戏
const startGame = () => {
  gameStatus.value = GameStaus.playing;
  if (sphereCollisionRef) {
    sphereCollisionRef.start();

    // 产生行星
    if (timer) {
      clearInterval(timer);
      timer = 0;
    }
    timer = window.setInterval(() => {
      if (
        gameStatus.value !== GameStaus.playing ||
        !sphereCollisionRef
      )
        return;
      // 随机大小
      const radius = Math.random() * (35 - 15) + 15;
      // 随机颜色
      const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
      let initX, initY;
      // 随机位置
      if (Math.random() < 0.5) {
        initX = Math.random() < 0.5 ? 0 - radius : canvasWidth + radius;
        initY = Math.random() * canvasHeight + radius;
      } else {
        initX = Math.random() * canvasWidth + radius;
        initY = Math.random() < 0.5 ? 0 - radius : canvasHeight + radius;
      }
      const angle = Math.atan2(
        canvasHeight / 2 - initY,
        canvasWidth / 2 - initX
      );
      const vx = Math.cos(angle) * planetV;
      const vy = Math.sin(angle) * planetV;
      const planet = sphereCollisionRef.createGlobule({
        id: { role: Role.planet },
        initX,
        initY,
        radius,
        color,
        vx,
        vy,
        receiveOutForce: false,
        receiveWallForce: false,
      });
      sphereCollisionRef.globuleList.unshift(planet);
    }, 1500);

    // 每过20秒行星的速度增加1
    if (incrementVTimer) {
      clearInterval(incrementVTimer);
      incrementVTimer = 0;
    }
    incrementVTimer = window.setInterval(function () {
      planetV += 1;
    }, 1000 * 20);
  }
};

// 点击暂停
const pauseGame = () => {
  if (gameStatus.value !== GameStaus.playing) return;
  gameStatus.value = GameStaus.pause;
  sphereCollisionRef?.stop();
};

// 点击继续游戏
const continueGame = () => {
  gameStatus.value = GameStaus.playing;
  sphereCollisionRef?.start();
};

// 点击重新开始
const restartGame = () => {
  gameStatus.value = GameStaus.toPlay;
  initGame();
};

onMounted(() => {
  initGame();
})
onUnmounted(() => {
  sphereCollisionRef?.stop();
  if (timer) {
    clearInterval(timer);
  }
  if (incrementVTimer) {
    clearInterval(incrementVTimer);
  }
})
</script>

<template>
  <div class="container" ref="boxRef" @mousedown="onMouseDown" :style="{
    width: '100%',
    height: '100%',
    backgroundColor: [GameStaus.toPlay].includes(gameStatus)
      ? '#000'
      : 'transparent',
  }">
    <canvas id="myCanvas2">
      {{ t("common.browserTooLow") }}
    </canvas>
    <button class="startBtn" v-if="gameStatus === GameStaus.toPlay" @click="startGame">
      {{ t("page.canvasDynamicEffect.startGame") }}
    </button>
    <div class="scoreBox" v-else>
      <span>
        {{ t("page.canvasDynamicEffect.score") }}：
      </span>
      <span class="score">{{ score }}</span>
    </div>
    <div class="pauseBtn" v-if="[GameStaus.playing, GameStaus.pause].includes(gameStatus)" @click="pauseGame">
      {{ t("page.canvasDynamicEffect.pause") }}
    </div>
    <div class="gamepause" v-if="gameStatus === GameStaus.pause">
      <h1>
        {{ t("page.canvasDynamicEffect.gameHasPaused") }}
      </h1>
      <button class="continueBtn" @click="continueGame">
        {{ t("page.canvasDynamicEffect.continueTheGame") }}
      </button>
    </div>
    <div class="gameover" v-if="gameStatus === GameStaus.gameover">
      <h1>
        {{ t("page.canvasDynamicEffect.score") }}
        ：<span class="finallyScore">{{ score }}</span>
      </h1>
      <button class="restartBtn" @click="restartGame">
        {{ t("page.canvasDynamicEffect.restart") }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  position: relative;

  .startBtn,
  .continueBtn,
  .restartBtn {
    min-width: 200px;
    height: 60px;
    padding: 0 10px;
    background-color: black;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    outline: none;
    border: none;
    border-radius: 20px;
    color: white;
    font-size: 22px;
    cursor: pointer;
    transition: all 0.2s linear;
  }

  .startBtn {
    background-color: white;
    color: black;
  }

  .continueBtn,
  .restartBtn {
    margin-top: 50px;
    font-size: 22px;
  }

  .gamepause,
  .gameover {
    padding: 50px;
    width: 500px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    text-align: center;
    border-radius: 20px;

    h1 {
      color: black;
      font-size: 24px;
    }
  }

  .scoreBox {
    font-size: 30px;
    color: white;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .pauseBtn {
    font-size: 30px;
    color: white;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}
</style>
