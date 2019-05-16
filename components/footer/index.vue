<template>
  <div class="footer">
    <audio src=""></audio>
    <div class="content">
      <div class="copy fl clear">
        <p class="link">
          <a v-for="(item, index) in link" :key="index" href="" class="item">{{
            item.name
          }}</a>
        </p>
        <p class="right">
          <span class="left">网易公司版权所有©1997-2019</span>
          <span class="center">杭州乐读科技有限公司运营：</span>
          <span class="right">浙网文[2018]3506-263号</span>
        </p>
        <p class="contact">
          <span class="left">违法和不良信息举报电话：0571-89853516</span>
          <span class="center">举报邮箱：</span>
          <span class="right">ncm5990@163.com</span>
        </p>
      </div>
      <div class="fr enter clear">
        <div v-for="(item, index) in unit" :key="index" class="unit">
          <a class="enter__pic"></a>
          <span class="enter__word"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mfooter',
  data() {
    return {
      link: [
        { name: '关于网易' },
        { name: '服务条款' },
        { name: '隐私政策' },
        { name: '版权投诉指引' },
        { name: '意见反馈' }
      ],
      unit: [
        { name: '用户认证' },
        { name: '独立音乐人' },
        { name: '赞赏' },
        { name: '视屏奖励' }
      ]
    }
  },
  created() {
    console.log('test')
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.footer {
  position: relative;
  height: 148px;
  overflow: hidden;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
  font-size: 12px;
  .content {
    width: 980px;
    margin: 0 auto;
    .copy {
      width: 520px;
      padding-top: 15px;
      line-height: 24px;
      .link {
        .item {
          color: #999;
          position: relative;
          padding: 0 10px;
          &::after {
            position: absolute;
            right: 0;
            content: '|';
          }
          &:first-child {
            padding-left: 0;
          }
          &:last-of-type {
            &::after {
              content: '';
            }
          }
        }
      }
      .right,
      .contact {
        span {
          &:first-child {
            margin-right: 14px;
          }
        }
      }
    }
    .enter {
      width: 330px;
      margin-top: 21px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      .unit {
        width: 60px;
        height: 70px;
        text-align: center;
        color: #666;
        .enter__pic {
          display: block;
          width: 50px;
          height: 45px;
          margin: 0 auto;
          background: url('~assets/img/spirte/foot_enter_new.png') no-repeat;
          background-size: 110px 450px;
        }
        .enter__word {
          display: inline-block;
          margin: 5px 5px 0;
          width: 52px;
          height: 14px;
          background: url('~assets/img/spirte/foot_enter_tt.png') no-repeat;
          background-size: 180px 100px;
        }
        &:nth-child(1) {
          .enter__pic {
            background-position: -63px -101px;
          }
          .enter__word {
            background-position: -1px -91px;
          }
        }
        &:nth-child(2) {
          .enter__pic {
            background-position: 0 0;
          }
          .enter__word {
            background-position: 0 0;
          }
        }
        &:nth-child(3) {
          .enter__pic {
            background-position: -60px -50px;
          }
          .enter__word {
            background-position: 0 -54px;
          }
        }
        &:nth-child(4) {
          .enter__pic {
            background-position: 0 -101px;
          }
          .enter__word {
            background-position: -1px -72px;
          }
        }
      }
    }
  }
}
</style>
