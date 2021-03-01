<template>
  <div id="home" @touchmove.prevent>
    <div class="CD" @click="CDHandler()">
      <img
        src="@/assets/music_icon.png"
        :style="{ 'animation-play-state': CD.state }"
        alt=""
      />
      <img :src="CD.icon" :style="{ transform: CD.rotate }" alt="" />
    </div>
    <div
      ref="content"
      class="content"
      :class="{'content-background': contentBackground}"
      :style="{ transform: contentFit }"
      @touchstart="touchStartHandler($event)"
      @touchmove="touchMoveHandler($event)"
      @touchend="touchEndHandler($event)"
    >
      <transition name="fade" tag="div" mode="out-in">
        <component
          v-if="!!annualReport"
          :is="contentArray[contentIndex]"
          v-bind="annualReport"
        />
      </transition>
    </div>
    <div class="point" v-if="pointShow">
      <img src="@/assets/up_icon.png" alt="" />
      <img src="@/assets/Slide up_icon.png" alt="" />
    </div>
    <audio ref="audio" src="@/assets/audio.mp3" preload loop></audio>
    <preload :annualReport="annualReport"></preload>
  </div>
</template>

<script>
import {
  firstGame,
  gameEnd,
  gameLength,
  gameList,
  longestGame,
  meet,
  preload,
  reportStart,
} from "@/components";
import getParams from "@/utils/params";
import { getUserAnnualReport } from "@/api/index";

export default {
  name: "Home",
  data() {
    return {
      userId: "",
      contentIndex: 0,
      contentArray: [
        "reportStart",
        "meet",
        "firstGame",
        "longestGame",
        "gameList",
        "gameLength",
        "gameEnd",
      ],
      contentFit: "translateY(0)",
      touchStart: 0,
      touchEnd: 0,
      CD: {
        switch: false,
        icon: require("@/assets/close_icon.png"),
        state: "paused",
        rotate: "rotate(0deg)",
      },
      annualReport: null,
      contentBackground: false,
      pointShow: true
    };
  },
  created() {
    this.userId = getParams("userId");
    getUserAnnualReport(this.userId)
      .then((data) => {
        if (!data) return;
        // console.log(data);
        this.annualReport = data;
      })
      .catch((error) => console.log(error));
  },
  mounted() {
    let content = document.getElementsByClassName("content")[0];
    if (content.offsetHeight > window.screen.availHeight) {
      let fit = (content.offsetHeight - window.screen.availHeight) / 2;
      this.contentFit = `translateY(-${fit}px)`;
    }
  },
  methods: {
    CDHandler() {
      this.CD.switch = !this.CD.switch;
      if (this.CD.switch) {
        this.CD.state = "running";
        this.CD.rotate = "rotate(22deg)";
        this.$refs.audio.play()
      } else {
        this.CD.state = "paused";
        this.CD.rotate = "rotate(0deg)";
        this.$refs.audio.pause()
      }
    },
    touchStartHandler(e) {
      this.touchStart = e.touches[0].pageY;
    },
    touchMoveHandler(e) {
      this.touchEnd = e.touches[0].pageY;
    },
    touchEndHandler() {
      if (this.touchEnd - this.touchStart < 0 && this.contentIndex < 6)
        this.contentIndex++;
      if (this.touchEnd - this.touchStart > 0 && this.contentIndex > 0)
        this.contentIndex--;
      this.contentBackground = this.contentIndex === 0 ? false : true
      this.pointShow = this.contentIndex === 6 ? false : true
    },
  },
  components: {
    firstGame,
    gameEnd,
    gameLength,
    gameList,
    longestGame,
    meet,
    preload,
    reportStart,
  },
};
</script>

<style lang="scss" scoped>
$width: 750;
@function format-vw($px) {
  @return $px / $width * 100vw;
}
#home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: black;

  .CD {
    width: format-vw(120);
    height: format-vw(96);
    position: fixed;
    top: format-vw(31);
    right: format-vw(9);
    z-index: 999;

    img:first-of-type {
      width: format-vw(97);
      height: format-vw(96);
      position: fixed;
      top: format-vw(31);
      right: format-vw(32);
      animation: rotate 2s infinite linear;
    }

    img:last-of-type {
      width: format-vw(30);
      height: format-vw(90);
      position: fixed;
      top: format-vw(29);
      right: format-vw(9);
      transform-origin: format-vw(30) 0;
    }
  }

  .content {
    width: 100vw;
    height: format-vw(1448);
  }

  .content.content-background {
    background-image: url("~@/assets/background.jpg");
    background-size: 100%;
  }

  .point {
    img {
      position: fixed;
      bottom: format-vw(81);
      z-index: 999;
    }

    img:first-of-type {
      width: format-vw(41);
      height: format-vw(42);
      left: format-vw(260);
      animation: translateY 1.3s infinite linear;
    }

    img:last-of-type {
      width: format-vw(152);
      height: format-vw(38);
      left: format-vw(313);
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes translateY {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(3px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
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
