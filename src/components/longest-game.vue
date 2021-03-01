<template>
  <div id="longest">
    <div class="context">
      <transition-group name="fade" tag="div">
        <p v-if="show[0]" key="1">虽然任务执行十分艰难</p>
        <p v-if="show[1]" key="2">但感谢自己的不放弃！</p>
        <p v-if="show[2]" key="3">
          在经过<span> {{ gameLongAnime }} </span
          >分钟后你终于成功破解这个游戏的终极秘密！
        </p>
        <p v-if="show[3]" key="4">《{{ playLongGame.gameName }}》</p>
        <p v-if="show[4]" key="5">是你用时最久但也最难忘的游戏</p>
      </transition-group>
    </div>
    <transition name="fade" tag="div">
      <div class="cover" v-if="show[5]" key="6">
        <img :src="playLongGame.coverImage" alt="" />
      </div>
    </transition>
    <transition name="fade" tag="div">
      <img
        class="seal"
        v-if="show[6]"
        key="7"
        src="@/assets/seal_icon.png"
        alt=""
      />
    </transition>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  name: "LongestGame",
  props: ["playLongGame"],
  data() {
    return {
      showIndex: 0,
      show: [false, false, false, false, false, false, false],
      gameLongAnime: 0,
    };
  },
  async mounted() {
    while (this.showIndex < 7) {
      this.show.splice(this.showIndex, 1, true);
      if (this.showIndex === 2)
        anime({
          targets: this,
          gameLongAnime: this.playLongGame.gameLong,
          round: 1,
          easing: "linear",
        });
      this.showIndex += 1;
      await this.sleep(800);
    }
    this.sealShow = true;
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
#longest {
  width: 100vw;
  height: format-vw(1448);
  background-image: url("~@/assets/background.jpg");
  background-size: 100%;
  position: relative;

  .context {
    width: format-vw(552);
    height: format-vw(308);
    position: absolute;
    top: format-vw(376);
    left: format-vw(101);
    font-size: format-vw(28);
    font-weight: bold;
    color: #473a27;
    line-height: format-vw(56);
    letter-spacing: format-vw(5);

    p:nth-of-type(3) {
      span {
        font-size: format-vw(46);
        color: #954034;
        letter-spacing: format-vw(2);
      }
    }

    p:nth-of-type(4) {
      font-size: format-vw(30);
      color: #954034;
    }
  }

  .cover {
    width: format-vw(439);
    height: format-vw(396);
    position: absolute;
    top: format-vw(728);
    left: format-vw(142);
    background-image: url("~@/assets/cover_icon.png");
    background-size: 100%;

    img:nth-of-type(1) {
      position: absolute;
      width: format-vw(322);
      height: format-vw(322);
      top: format-vw(35);
      right: format-vw(38);
      transform: rotate(-1deg);
      transform-origin: center center;
    }
  }

  .seal {
    width: format-vw(147);
    height: format-vw(137);
    position: absolute;
    right: format-vw(120);
    bottom: format-vw(289);
    animation: scale 0.2s 1 linear;
  }
}

@keyframes scale {
  from {
    transform: scale(1.8);
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