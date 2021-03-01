<template>
  <div id="list">
    <img class="chart" src="@/assets/chart.png" alt="" />
    <div class="context">
      <transition-group name="fade" tag="div">
        <p v-if="show[0]" key="1">这一年</p>
        <p v-if="show[1]" key="2">
          你攻克了 <span>{{ total }}</span> 个解谜游戏！
        </p>
        <p v-if="show[2]" key="3">
          包含 <span>{{ entity }}</span> 本解谜书
        </p>
        <p v-if="show[3]" key="4">
          <span>{{ penetralium }}</span> 个密室逃脱
          <span>{{ novel }}</span> 个互动阅读
        </p>
        <p v-if="show[4]" key="5">逐渐完成了解谜新手到大侦探的蜕变。</p>
      </transition-group>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  name: "GameList",
  props: ["gameList"],
  data() {
    return {
      showIndex: 0,
      show: [false, false, false, false, false],
      total: 0,
      entity: 0,
      penetralium: 0,
      novel: 0,
    };
  },
  async mounted() {
    while (this.showIndex < 5) {
      this.show.splice(this.showIndex, 1, true);
      if (this.showIndex === 1)
        anime({
          targets: this,
          total: this.gameList.total,
          round: 1,
          easing: "linear",
        });
      if (this.showIndex === 2)
        anime({
          targets: this,
          entity: this.gameList.entity,
          round: 1,
          easing: "linear",
        });
      if (this.showIndex === 3)
        anime({
          targets: this,
          penetralium: this.gameList.penetralium,
          novel: this.gameList.novel,
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
#list {
  width: 100vw;
  height: format-vw(1448);
  background-image: url("~@/assets/background.jpg");
  background-size: 100%;
  position: relative;

  .chart {
    width: format-vw(603);
    height: format-vw(465);
    position: absolute;
    top: format-vw(307);
    left: format-vw(66);
  }

  .context {
    width: format-vw(508);
    position: absolute;
    top: format-vw(770);
    left: format-vw(106);
    font-size: format-vw(28);
    font-weight: bold;
    color: #473a27;
    line-height: format-vw(58);
    letter-spacing: format-vw(5);

    p:nth-of-type(2) {
      span {
        font-size: format-vw(36);
        color: #97473b;
        letter-spacing: format-vw(10);
      }
    }

    p:nth-of-type(3) {
      span {
        font-size: format-vw(36);
        color: #964236;
        letter-spacing: format-vw(10);
      }
    }

    p:nth-of-type(4) {
      span {
        font-size: format-vw(36);
        color: #964236;
        letter-spacing: format-vw(10);
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