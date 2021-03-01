<template>
  <div id="end">
    <img src="@/assets/label.png" alt="" />
    <transition-group name="fade" tag="div">
      <img src="@/assets/text1.png" v-if="show[0]" key="1" alt="" />
      <img src="@/assets/text2.png" v-if="show[1]" key="2" alt="" />
      <img src="@/assets/text3.png" v-if="show[2]" key="3" alt="" />
      <img src="@/assets/text4.png" v-if="show[3]" key="4" alt="" />
      <img src="@/assets/text5.png" v-if="show[4]" key="5" alt="" />
      <img src="@/assets/text6.png" v-if="show[5]" key="6" alt="" />
      <img
        v-if="shareShow"
        key="7"
        @click="share()"
        src="@/assets/clue.png"
        alt=""
      />
      <img v-if="shareShow" key="8" src="@/assets/text.png" alt="" />
    </transition-group>
  </div>
</template>

<script>
import getParams from "@/utils/params"
export default {
  name: "GameEnd",
  data() {
    return {
      showIndex: 0,
      show: [false, false, false, false, false, false],
      shareShow: false,
    };
  },
  async mounted() {
    while (this.showIndex < 6) {
      this.show.splice(this.showIndex, 1, true);
      this.showIndex += 1;
      await this.sleep(800);
    }
    this.shareShow = true;
  },
  methods: {
    sleep(time) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), time);
      });
    },
    share() {
      // 判断webview参数
      if(getParams('webview') === 'webview') this.$router.push("share");
    },
  },
};
</script>

<style lang="scss" scoped>
$width: 750;
@function format-vw($px) {
  @return $px / $width * 100vw;
}
#end {
  width: 100vw;
  height: format-vw(1448);
  background-image: url("~@/assets/background.jpg");
  background-size: 100%;
  position: relative;

  img {
    position: absolute;
  }

  img:nth-of-type(1) {
    top: format-vw(320);
    left: format-vw(540);
    width: format-vw(118);
  }

  div {
    img:nth-of-type(1) {
      top: format-vw(428);
      left: format-vw(93);
      width: format-vw(97);
    }

    img:nth-of-type(2) {
      top: format-vw(487);
      left: format-vw(89);
      width: format-vw(570);
    }

    img:nth-of-type(3) {
      top: format-vw(543);
      left: format-vw(88);
      width: format-vw(560);
    }

    img:nth-of-type(4) {
      top: format-vw(604);
      left: format-vw(89);
      width: format-vw(83);
    }

    img:nth-of-type(5) {
      top: format-vw(672);
      left: format-vw(472);
      width: format-vw(180);
    }

    img:nth-of-type(6) {
      top: format-vw(729);
      left: format-vw(470);
      width: format-vw(128);
    }

    img:nth-of-type(7) {
      top: format-vw(759);
      left: format-vw(98);
      width: format-vw(341);
      animation: rotate 0.6s 1s 2 linear;
    }

    img:nth-of-type(8) {
      top: format-vw(1035);
      left: format-vw(270);
      width: format-vw(385);
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-6deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(6deg);
  }
  100% {
    transform: rotate(0deg);
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