<template>
  <div id="meet">
    <img class="pin" src="@/assets/pin.png" alt="" />
    <img class="avatar" :src="headimgurl" alt="" />
    <img class="seal" src="@/assets/seal.png" v-if="sealShow" alt="" />
    <img class="detective" src="@/assets/detective.png" alt="" />
    <div class="context">
      <transition-group name="fade" tag="div">
        <p v-if="show[0]" key="1">{{ nickname }}</p>
        <p v-if="show[1]" key="2">经过多方取证，</p>
        <p v-if="show[2]" key="3">
          你与谜案馆在<span> {{ startAnime }} </span>年开始联合解谜任务。
        </p>
      </transition-group>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  name: "Meet",
  props: ["start", "nickname", "headimgurl"],
  data() {
    return {
      showIndex: 0,
      show: [false, false, false],
      sealShow: false,
      startAnime: 0,
    };
  },
  async mounted() {
    await this.sleep(1000);
    while (this.showIndex < 3) {
      this.show.splice(this.showIndex, 1, true);
      if (this.showIndex === 2)
        anime({
          targets: this,
          startAnime: this.start,
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
#meet {
  width: 100vw;
  height: format-vw(1448);
  background-image: url("~@/assets/meet-background.jpg");
  background-size: 100%;
  position: relative;

  .pin {
    width: format-vw(61);
    height: format-vw(50);
    position: absolute;
    top: format-vw(329);
    left: format-vw(125);
    z-index: 999;
  }

  .avatar {
    width: format-vw(312);
    height: format-vw(312);
    position: absolute;
    top: format-vw(345);
    left: format-vw(109);
    transform: rotate(-2deg);
  }

  .seal {
    width: format-vw(147);
    height: format-vw(257);
    position: absolute;
    top: format-vw(400);
    right: format-vw(116);
    animation: scale 0.2s 1 linear;
  }

  .detective {
    width: format-vw(169);
    height: format-vw(41);
    position: absolute;
    top: format-vw(801);
    left: format-vw(90);
  }

  .context {
    width: format-vw(560);
    position: absolute;
    top: format-vw(852);
    left: format-vw(90);
    font-size: format-vw(30);
    font-weight: bold;
    color: #473a27;
    letter-spacing: format-vw(8);

    p:nth-of-type(1) {
      font-size: format-vw(32);
      color: #473a27;
      padding-bottom: format-vw(20);
      line-height: format-vw(64);
    }

    p:nth-of-type(2),
    p:nth-of-type(3) {
      line-height: format-vw(60);
    }

    p:nth-of-type(3) {
      span {
        font-size: format-vw(46);
        color: #984538;
        letter-spacing: format-vw(2);
      }
    }
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