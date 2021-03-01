<template>
  <div id="length">
    <img class="clock" src="@/assets/clock.png" alt="" />
    <div class="context">
      <transition-group name="fade" tag="div">
        <p v-if="show[0]" key="1">有了 <span>你</span> 的协力支持，</p>
        <p v-if="show[1]" key="2">
          我们一起走过了 <span>{{ endAnime }}</span> 天惊险而刺激
        </p>
        <p v-if="show[2]" key="3">的旅程</p>
      </transition-group>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  name: "GameLength",
  props: ["end"],
  data() {
    return {
      showIndex: 0,
      show: [false, false, false],
      endAnime: 0,
    };
  },
  async mounted() {
    while (this.showIndex < 3) {
      this.show.splice(this.showIndex, 1, true);
      if (this.showIndex === 1)
        anime({
          targets: this,
          endAnime: this.end,
          round: 1,
          easing: "linear",
        });
      this.showIndex += 1;
      await this.sleep(800);
    }
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
#length {
  width: 100vw;
  height: format-vw(1448);
  background-image: url("~@/assets/background.jpg");
  background-size: 100%;
  position: relative;

  .clock {
    width: format-vw(561);
    height: format-vw(363);
    position: absolute;
    top: format-vw(385);
    left: format-vw(92);
  }

  .context {
    width: format-vw(563);
    position: absolute;
    top: format-vw(824);
    left: format-vw(91);
    font-size: format-vw(28);
    font-weight: bold;
    color: #473a27;
    line-height: format-vw(57);
    letter-spacing: format-vw(5);

    p:nth-of-type(1) {
      span {
        font-size: format-vw(36);
        color: #97473b;
        letter-spacing: format-vw(10);
      }
    }

    p:nth-of-type(2) {
      span {
        font-size: format-vw(46);
        color: #964236;
        letter-spacing: format-vw(2);
      }
    }
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