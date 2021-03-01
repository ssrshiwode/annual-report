<template>
  <div id="share" @touchmove.prevent>
    <div ref="content" class="content" :style="{ transform: contentFit }">
      <img src="@/assets/halo.png" alt="" />
      <img src="@/assets/goods.png" alt="" />
      <img src="@/assets/share_text.png" alt="" />
      <img
        @click="share()"
        :style="{ transform: shareScale }"
        src="@/assets/share_button.png"
        alt=""
      />
      <img
        @click="shareImg()"
        :style="{ transform: storageScale }"
        src="@/assets/storage_button.png"
        alt=""
      />
    </div>
    <div class="mask" v-if="mask">
      <div class="shadow"></div>
      <img src="@/assets/loading.png" alt="" />
    </div>
    <div id="shareImage" v-if="!!annualReport">
      <p>{{ annualReport.nickname }}</p>
      <p>{{ annualReport.start }}</p>
      <p>《{{ annualReport.firstGame.gameName }}》</p>
      <p>{{ annualReport.playLongGame.gameLong }}</p>
      <p>《{{ annualReport.playLongGame.gameName }}》</p>
      <p>{{ annualReport.gameList.total }}</p>
      <p>{{ annualReport.gameList.entity }}</p>
      <p>{{ annualReport.gameList.penetralium }}</p>
      <p>{{ annualReport.gameList.novel }}</p>
      <p>{{ annualReport.end }}</p>
      <img :src="annualReport.headimgurl" alt="" />
      <img src="@/assets/share-pin.png" alt="" />
      <img :src="annualReport.firstGame.coverImage" alt="" />
      <img :src="annualReport.playLongGame.coverImage" alt="" />
      <img src="@/assets/seal_icon.png" alt="" />
    </div>
    <a ref="openUrl" :href="openUrl"></a>
  </div>
</template>

<script>
let OSS = require("ali-oss");
import getParams from "@/utils/params";
import { getUserAnnualReport, getSTSToken, getAvatar } from "@/api/index";
import html2canvas from "html2canvas";

export default {
  name: "Share",
  data() {
    return {
      contentFit: "translateY(0)",
      shareScale: "scale(1.0)",
      storageScale: "scale(1.0)",
      userId: "",
      annualReport: null,
      openUrl: "",
      mask: false,
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
    share() {
      getAvatar(this.userId).then()
      let url =
        location.host + location.pathname + "?userId=" + getParams("userId");
      if (getParams("env")) url += `&env=${getParams("env")}`;
      this.openUrl = `uniwebview://share?type=weburl&title=你的2020专属侦探报告&content=不要畏惧谜团，也不要放弃寻找人生的线索！&coverImg=resource.itaotuo.com/puzzle/images/annual-report.png&url=${url}`;
      this.$nextTick(() => {
        this.$refs.openUrl.click();
      });
    },
    async shareImg() {
      getAvatar(this.userId).then()
      this.mask = true;
      const canvas = await html2canvas(document.getElementById("shareImage"), {
        useCORS: true,
        width: 750,
        height: 4159,
        windowWidth: 750,
        windowHeight: 4159,
        x: 0,
        y: 4159 / 2 + 750 + 133 / 2,
        scale: 1,
      });
      canvas.toBlob(
        async (blob) => {
          const credentials = await getSTSToken();
          const client = new OSS({
            region: "oss-cn-beijing",
            accessKeyId: credentials.AccessKeyId,
            accessKeySecret: credentials.AccessKeySecret,
            stsToken: credentials.SecurityToken,
            bucket: "om-resources",
            endpoint: "resource.itaotuo.com",
            cname: true,
          });
          const result = await client.put(
            `puzzle/images/community_activity_images/userid_${this.userId}/annual-report.jpg`,
            blob
          );
          this.mask = false;
          if (result.res.status === 200) {
            const value = `resource.itaotuo.com/puzzle/images/community_activity_images/userid_${this.userId}/annual-report.jpg`;
            this.openUrl = `uniwebview://share?type=img&value=${value}`;
            this.$nextTick(() => {
              this.$refs.openUrl.click();
              this.$router.push("show-img");
            });
          } else console.log("put img fail:", result);
        },
        "image/jpeg",
        0.9
      );
    },
  },
};
</script>

<style lang="scss" scoped>
$width: 750;
@function format-vw($px) {
  @return $px / $width * 100vw;
}
#share {
  width: 100vw;
  height: 100vh;
  background: black;

  .content {
    width: 100vw;
    height: format-vw(1448);
    background-image: url("~@/assets/share.png");
    background-size: 100%;
    position: relative;

    img {
      position: absolute;
    }

    img:nth-of-type(1) {
      width: 100vw;
      height: format-vw(785);
      top: format-vw(29);
      left: 0;
      animation: rotate 10s infinite linear;
    }

    img:nth-of-type(2) {
      width: format-vw(551);
      height: format-vw(464);
      top: format-vw(207);
      left: format-vw(113);
    }

    img:nth-of-type(3) {
      width: format-vw(478);
      height: format-vw(139);
      top: format-vw(717);
      left: format-vw(142);
    }

    img:nth-of-type(4) {
      width: format-vw(303);
      height: format-vw(114);
      top: format-vw(1090);
      left: format-vw(57);
    }

    img:nth-of-type(5) {
      width: format-vw(303);
      height: format-vw(114);
      top: format-vw(1090);
      left: format-vw(384);
    }
  }

  .mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 999;

    .shadow {
      height: 100vh;
      background-color: black;
      opacity: 0.8;
    }

    img {
      position: absolute;
      width: 50vw;
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }

  #shareImage {
    position: fixed;
    top: format-vw(2896);
    width: 100vw;
    height: format-vw(4159);
    background-image: url("~@/assets/shareImage.jpg");
    background-size: 100%;

    img {
      position: absolute;
    }

    img:nth-of-type(1) {
      width: format-vw(234);
      height: format-vw(234);
      top: format-vw(380);
      left: format-vw(94);
      transform: rotate(-2deg);
    }

    img:nth-of-type(2) {
      width: format-vw(82);
      height: format-vw(135);
      top: format-vw(311);
      left: format-vw(124);
    }

    img:nth-of-type(3) {
      width: format-vw(216);
      height: format-vw(216);
      top: format-vw(772);
      left: format-vw(422);
      transform: rotate(11deg);
    }

    img:nth-of-type(4) {
      width: format-vw(328);
      height: format-vw(328);
      top: format-vw(1482);
      left: format-vw(202);
      transform: rotate(-1.5deg);
    }

    img:nth-of-type(5) {
      width: format-vw(147);
      height: format-vw(137);
      top: format-vw(1747);
      left: format-vw(465);
    }

    p {
      position: absolute;
      font-weight: bold;
      color: #954034;
      line-height: format-vw(46);
      letter-spacing: 0;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
    }

    p:nth-of-type(1) {
      width: format-vw(280);
      top: format-vw(459);
      left: format-vw(376);
      font-size: format-vw(30);
      color: #473a27;
      text-overflow: ellipsis;
    }

    p:nth-of-type(2) {
      width: format-vw(75);
      top: format-vw(583);
      left: format-vw(555);
      font-size: format-vw(26);
    }

    p:nth-of-type(3) {
      width: format-vw(217);
      height: format-vw(92);
      top: format-vw(820);
      left: format-vw(92);
      font-size: format-vw(30);
      white-space: pre-line;
    }

    p:nth-of-type(4) {
      width: format-vw(80);
      top: format-vw(1215);
      left: format-vw(226);
      font-size: format-vw(36);
    }

    p:nth-of-type(5) {
      width: format-vw(525);
      top: format-vw(1335);
      left: format-vw(110);
      font-size: format-vw(30);
      text-overflow: ellipsis;
    }

    p:nth-of-type(6) {
      width: format-vw(85);
      top: format-vw(2510);
      left: format-vw(285);
      font-size: format-vw(36);
    }

    p:nth-of-type(7) {
      width: format-vw(47);
      left: format-vw(207);
      bottom: format-vw(1548);
      font-size: format-vw(36);
    }

    p:nth-of-type(8) {
      width: format-vw(47);
      left: format-vw(131);
      bottom: format-vw(1490);
      font-size: format-vw(36);
    }

    p:nth-of-type(9) {
      width: format-vw(47);
      left: format-vw(400);
      bottom: format-vw(1490);
      font-size: format-vw(36);
    }

    p:nth-of-type(10) {
      width: format-vw(67);
      left: format-vw(361);
      bottom: format-vw(842);
      font-size: format-vw(36);
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>