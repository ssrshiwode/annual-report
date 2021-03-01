<template>
  <div>
    <img v-if="!!url" :src="url" alt="">
  </div>
</template>

<script>
import getParams from "@/utils/params";
export default {
  name: 'ShowImg',
  data() {
    return {
      userId: '',
      url: null
    }
  },
  created() {
    this.userId = getParams('userId')
    this.url = `https://resource.itaotuo.com/puzzle/images/community_activity_images/userid_${this.userId}/annual-report.jpg`;
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100vw;
  display: block;
}
</style>