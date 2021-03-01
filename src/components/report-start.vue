<template>
  <div id="start">
    <img class="secret" v-if="secretShow" src="@/assets/secret_file.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "ReportStart",
  props: [],
  data() {
    return {
      secretShow: false
    }
  },
  async mounted() {
    await this.sleep(600);
    this.secretShow = true
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
#start {
  width: 100vw;
  height: format-vw(1448);
  background-image: url("~@/assets/report-start.jpg");
  background-size: 100%;
  position: relative;

  .secret {
    width: format-vw(526);
    height: format-vw(281);
    position: absolute;
    top: format-vw(706);
    left: format-vw(107);
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
</style>