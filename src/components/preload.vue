<template>
  <div id="preload">
    <img v-for="(img, index) in imgs" :src="img" :key="index" alt="" />
  </div>
</template>

<script>
export default {
  name: "Preload",
  props: ["annualReport"],
  data() {
    return {
      imgs: [
        require("@/assets/audio.mp3"),
        require("@/assets/report-start.jpg"),
        require("@/assets/light.png"),
        require("@/assets/shareImage.jpg"),
        require("@/assets/share.png"),
        require("@/assets/meet-background.jpg"),
        require("@/assets/background.jpg"),
        require("@/assets/chart.png"),
        require("@/assets/clue.png"),
        require("@/assets/avatar.png"),
        require("@/assets/Slide up_icon.png"),
        require("@/assets/cover_icon.png"),
        require("@/assets/clock.png"),
        require("@/assets/detective.png"),
        require("@/assets/seal.png"),
        require("@/assets/close_icon.png"),
        require("@/assets/frame.png"),
        require("@/assets/music_icon.png"),
        require("@/assets/seal_icon.png"),
        require("@/assets/label.png"),
        require("@/assets/pin.png"),
        require("@/assets/share-pin.png"),
        require("@/assets/task.png"),
        require("@/assets/up_icon.png"),
        require("@/assets/text.png"),
        require("@/assets/text1.png"),
        require("@/assets/text2.png"),
        require("@/assets/text3.png"),
        require("@/assets/text4.png"),
        require("@/assets/text5.png"),
        require("@/assets/text6.png"),
        require("@/assets/share_button.png"),
        require("@/assets/storage_button.png"),
        require("@/assets/secret_file.png"),
        require("@/assets/halo.png"),
        require("@/assets/goods.png"),
        require("@/assets/share_text.png"),
      ],
    };
  },
  watch: {
    annualReport(data) {
      if (data) {
        if (data.headimgurl) this.imgs.push(data.headimgurl);
        if (data.firstGame && data.firstGame.coverImage)
          this.imgs.push(data.firstGame.coverImage);
        if (data.playLongGame && data.playLongGame.coverImage)
          this.imgs.push(data.playLongGame.coverImage);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#preload {
  display: none;
}
</style>