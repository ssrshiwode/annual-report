<template>
  <div id="first">
    <div class="context">
      <transition-group name="fade" tag="div">
        <p v-if="show[0]" key="1">经历重重关卡</p>
        <p v-if="show[1]" key="2">《{{ firstGame.gameName }}》</p>
        <p v-if="show[2]" key="3">成为你当时开启的第一个目标！</p>
      </transition-group>
    </div>
    <transition name="fade">
      <div v-if="show[3]" key="4" class="frame">
        <img src="@/assets/frame.png" alt="" />
        <img :src="firstGame.coverImage" alt="" />
      </div>
    </transition>
    <img class="task" src="@/assets/task.png" v-if="taskShow" alt="" />
  </div>
</template>

<script>
export default {
  name: "FirstGame",
  props: ["firstGame"],
  data() {
    return {
      showIndex: 0,
      show: [false, false, false],
      taskShow: false,
    };
  },
  async mounted() {
    // await this.sleep(1000);
    while (this.showIndex < 4) {
      this.show.splice(this.showIndex, 1, true);
      this.showIndex += 1;
      await this.sleep(800);
    }
    this.taskShow = true;
  },
  methods: {
    sleep(time) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), time);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$width: 750;
@function format-vw($px) {
  @return $px / $width * 100vw;
}
#first {
  width: 100vw;
  height: format-vw(1448);
  background-image: url("~@/assets/background.jpg");
  background-size: 100%;
  position: relative;

  .context {
    width: format-vw(500);
    position: absolute;
    top: format-vw(390);
    left: format-vw(105);
    font-size: format-vw(30);
    font-weight: bold;
    color: #473a27;
    line-height: format-vw(54);

    p:nth-of-type(2) {
      font-size: format-vw(32);
      color: #954034;
    }
  }

  .frame {
    width: format-vw(432);
    height: format-vw(430);
    position: absolute;
    top: format-vw(583);
    left: format-vw(156);

    img:nth-of-type(1) {
      display: block;
      width: format-vw(432);
      height: format-vw(430);
    }

    img:nth-of-type(2) {
      display: block;
      width: format-vw(386);
      height: format-vw(386);
      position: absolute;
      top: format-vw(20);
      left: format-vw(25);
      transform: rotate(0.5deg);
    }
  }

  .task {
    width: format-vw(264);
    height: format-vw(74);
    position: absolute;
    top: format-vw(1038);
    left: format-vw(235);
    animation: scale 0.2s 1 linear;
  }
}

@keyframes scale {
  from {
    transform: scale(1.5);
  }
  to {
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>