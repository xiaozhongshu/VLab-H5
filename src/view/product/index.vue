<template>
  <div>
    <!-- 头部 -->
    <Header :index="2"
            :isShowCategoryLeft="true"></Header>

    <div class="banner">
      <div class="header-title">
        <h2>购买 {{product.productTitle}}</h2>
      </div>
      <b-carousel id="carousel1"
                  indicators
                  background="#ffffff"
                  :interval="4000"
                  img-width="100%"
      >
        <b-carousel-slide class="carousel-slide"
                          v-for="(imagePath, index) in product.productImageList"
                          :key="index"
                          :style="{backgroundImage: 'url(' + imageHost + imagePath.imagePath + ')'}" >
        </b-carousel-slide>
      </b-carousel>
      <div class="product-desc">
        <h4>{{product.productSubtitle}}</h4>
        <p v-if="productId == '1002483230350774273'">纳米胶原蛋白。爆水丸通过食用的方式，提供肌肤深层需要的补水成分，从而改善肌肤品质。</p>
        <p v-if="productId == '1035421817968144386'">美白成分：富含珍贵美白因子，（卡曼惧提取物、维C、谷咣甘肽、针叶樱桃提取物、西红柿提取物）小分子透明质酸、纳米胶原蛋白等。</p>
      </div>
      <div class="configure">
        <h4>购买配置</h4>
      </div>
      <div class="buy-options">
        <div class="buy-options-item"
             v-bind:class="[item.productSkuId == seleSkuId && showSelectActive == true ?'buy-options-item-active' : 'buy-options-item']"
             v-for="(item,index) in product.productSkuPriceList"
             :key="index"
             @click="handleProductSelect(item.productSkuId)">
          <div class="buy-options-item-num">{{item.compositeAttributeKey}}</div>
          <div class="buy-options-item-box">
            <div class="buy-options-item-price">+RMB {{item.productSkuPrice}}</div>
          </div>
        </div>
      </div>
      <div class="custom-num-box">
        <div class="custom-num-box-buy">自定义购买数量：</div>
        <div class="all-price">RMB {{sumPrice ? sumPrice : 0}}</div>
      </div>
      <div class="buy-num-box">
        <div class="buy-num">
            <span class="buy-num-sub"
                  @click="handleProductPull">-</span>
            <input class="buy-num-input"
                   type="text"
                   @change="handleNumberInput"
                   id="quantity"
                   name="quantity"
                   v-model="number"
                   />
            <span class="buy-num-add"
                  @click="handleProductPush">+</span>
        </div>
        <div class="purchase-btn" @click="handleSublime">前往购买</div>
      </div>
      <div class="mask"
           @touchmove.prevent
           v-if="isMask">
        <div class="mask-bg" @click="handleIsMaskHidden"></div>
        <div class="mask-content">
          <b-img class="mask-img" src="../../../static/image/code.jpg"></b-img>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<style scoped>
  .banner {
    padding: 12px 40px 12px 40px;
  }
  .carousel-slide {
    width: 100%;
    height: 223px;
    margin-top: 10px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .header-title {
    text-align: center;
  }
  .header-title h2 {
    color: #000000;
    font-size: 21px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .product-img {
    margin-top: 10px;
  }
  .product-desc {
    padding: 12px 0px 14px 0px;
    border-bottom: 1px solid #d4d4d4;
  }
  .product-desc h4 {
    font-size: 14px;
    color: #000000;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .product-desc p {
    font-size: 12px;
    color: #000000;
    padding-top: 6px;
  }
  .configure {
    padding: 12px 0px;
  }
  .configure h4 {
    font-size: 12px;
    font-weight: bold;
    color: #000000;
  }
  .buy-options {
    padding-bottom: 12px;
  }
  .buy-options-item {
    width: 100%;
    height: 30px;
    border: 1px solid #ebecf0;
    padding: 4px 10px;
    margin-bottom: 10px;
    position: relative;
  }
  .buy-options-item-active {
    width: 100%;
    height: 30px;
    border: 1px solid #ef91aa;
    padding: 4px 10px;
    margin-bottom: 10px;
    position: relative;
  }
  .buy-options-item-num {
    font-size: 12px;
    color: #000000;
    display: inline-block;
  }
  .buy-options-item-box {
    display: inline-block;
    position: absolute;
    padding-top: 2px;
    right: 10px;
  }
  .buy-options-item-price {
    font-size: 12px;
    color: #000000;
    text-align: right;
  }
  .custom-num-box {
    position: relative;
  }
  .custom-num-box-buy {
    font-size: 12px;
    color: #000000;
    font-weight: bold;
    display: inline-block;
  }
  .all-price {
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    color: #000000;
    position: absolute;
    right: 0px;
    line-height: 24px;
  }
  .buy-num-box {
    position: relative;
    height: 48px;
    padding-top: 16px;
    margin-bottom: 26px;
  }
  .buy-num {
    padding-top: 8px;
    display: inline-block;
  }
  .buy-num-sub {
    width: 23px;
    height: 23px;
    background-color: #ebecf0;
    text-align: center;
    float: left;
  }
  .buy-num-input {
    width: 58px;
    height: 23px;
    border: 1px solid #ebecf0;
    text-align: center;
    float: left;
  }
  .buy-num-add {
    width: 23px;
    height: 23px;
    display: inline-block;
    background-color: #ebecf0;
    text-align: center;
  }
  .purchase-btn {
    width: 72px;
    line-height: 28px;
    height: 28px;
    background-color: #e994a9;
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
    color: #ffffff;
    display: inline-block;
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
  .mask-bg {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: #000000;
    opacity: 0.6;
    z-index: 1000;
  }
  .mask-content {
    width: 156px;
    height: 244px;
    position: fixed;
    background-color: #ffffff;
    top: 50%;
    right: 50%;
    bottom: 50%;
    left: 50%;
    margin-top: -122px;
    margin-left: -76px;
    z-index: 1001;
  }


</style>


<script>
  import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
  import bListGroup from 'bootstrap-vue/es/components/list-group/list-group';
  import bImg from 'bootstrap-vue/es/components/image/img';

  import mixins from '../../mixins/index';

  import storage from '../../common/storage';

  import Header from '../../component/header/index';
  import Footer from '../../component/footer/index';

  export default {
    components: {
      bCarousel,
      bListGroup,
      bImg,
      Header,
      Footer
    },
    mixins: [mixins],
    data: () => ({
      isMask: false,
      number: 0,
      seleSkuId: '',
      product: [],
      sumPrice: '',
      showSelectActive: true,
      productId: ''
    }),
    created() {

    },
    mounted() {
      if (this.$route.params.productId) {
        this.productId = this.$route.params.productId;
      }
      this.haneleLoad();

      this.$root.$on('onLoadProduct', (data)=>{
        this.productId = data;
        this.haneleLoad();
      });

    },
    methods: {
      haneleLoad() {
        this.request({
          url: '/xingxiao/product/desktop/v1/view',
          data: {
            productId: this.productId,
          },
          success: (data) => {
            if (data.productSkuPriceList && data.productSkuPriceList.length > 0) {
              this.number = 1;
              this.seleSkuId = data.productSkuPriceList[0].productSkuId;
              this.sumPrice = data.productSkuPriceList[0].productSkuPrice.toFixed(2);
            }
            this.product = data;
          },
          error: () => {}
        })
      },
      handleProductPull() {
        if (this.number > 1) {
          this.number--;
          this.handleSum();
        }
      },
      handleProductPush() {
        if(this.productId == "1002483230350774273"){
          if(this.number >= 600) {
            this.number = 600;
            this.handleSum();
            return
          }
          if(this.number <= 20) {
            ++this.number;
            this.handleSum();
            return
          }
          if(this.number >= 21 && this.number < 79) {
            this.number = parseInt(this.number) + parseInt(21);
            this.handleSum();
            return
          }
          if(this.number >= 79 && this.number < 100) {
            this.number = 100;
            this.handleSum();
            return
          }
          if(this.number >= 100) {
            if(this.number < 600) {
              this.number = parseInt(this.number) + parseInt(100);
              if(this.number >= 600){
                this.number = 600;
              }
              this.handleSum();
            } else {
              this.number = 600;
              this.handleSum();
            }
          }
        }else {
          if(this.number >= 50) {
            this.number = 50;
            this.handleSum();
            return
          }
          if(this.number <= 2) {
            ++this.number;
            this.handleSum();
            return
          }
          if(this.number >= 3 && this.number < 7) {
            this.number = parseInt(this.number) + parseInt(3);
            this.handleSum();
            return
          }
          if(this.number >= 7 && this.number < 10) {
            this.number = parseInt(10);
            this.handleSum();
            return
          }
          if(this.number >= 10) {
            if(this.number <= 50) {
              this.number = parseInt(this.number) + parseInt(10);
              if(this.number >= 50) {
                this.number = 50;
              }
              this.handleSum();
            } else {
              this.number = 50;
              this.handleSum();
            }
          }
        }
      },
      handleSum() {
        var number = this.number;
        if(this.productId == "1002483230350774273"){
          if (number >= 1 && number < 10) {
            this.showSelectActive = true;
            this.seleSkuId = this.product.productSkuPriceList[0].productSkuId;
            if(number != 1){
              this.showSelectActive = false;
            }
            this.sumPrice = (this.product.productSkuPriceList[0].productSkuPrice * number).toFixed(2);
          } else if (number >= 10 && number < 100) {
            this.showSelectActive = true;
            this.seleSkuId = this.product.productSkuPriceList[1].productSkuId;
            if(number != 21){
              this.showSelectActive = false;
            }
            var productSkuPrice = this.product.productSkuPriceList[1].productSkuPrice;
            this.sumPrice = ((productSkuPrice / 10) * number).toFixed(2);
          } else if (number >= 100) {
            this.showSelectActive = true;
            this.seleSkuId = this.product.productSkuPriceList[2].productSkuId;
            if(number != 100){
              this.showSelectActive = false;
            }
            var productSkuPrice = this.product.productSkuPriceList[2].productSkuPrice;
            this.sumPrice = ((productSkuPrice / 100) * number).toFixed(2);;
          }
        } else{
          if (number >= 1 && number < 3) {
            this.showSelectActive = true;
            this.seleSkuId = this.product.productSkuPriceList[0].productSkuId;
            if(number != 1){
              this.showSelectActive = false;
            }
            this.sumPrice = (this.product.productSkuPriceList[0].productSkuPrice * number).toFixed(2);
          } else if (number >= 3 && number < 10) {
            this.showSelectActive = true;
            this.seleSkuId = this.product.productSkuPriceList[1].productSkuId;
            if(number != 3){
              this.showSelectActive = false;
            }
            var productSkuPrice = this.product.productSkuPriceList[1].productSkuPrice;
            this.sumPrice = ((productSkuPrice / 3) * number).toFixed(2);
          } else if (number >= 10) {
            this.showSelectActive = true;
            this.seleSkuId = this.product.productSkuPriceList[2].productSkuId;
            if(number != 10){
              this.showSelectActive = false;
            }
            var productSkuPrice = this.product.productSkuPriceList[2].productSkuPrice;
            this.sumPrice = ((productSkuPrice / 10) * number).toFixed(2);
          }
        }
      },
      handleNumberInput(e) {
        var value = e.currentTarget.value;
        if(this.productId == "1002483230350774273"){
          if (!value || value === '' || value < 1) {
            this.number = 1;
          } else {
            this.number = value;
          }
        } else{
          if (!value || value === '' || value < 1) {
            this.number = 1;
          } else {
            this.number = value;
          }
        }
        this.handleSum();
      },
      handleSublime() {
        this.isMask = true
      },
      handleIsMaskHidden() {
        this.isMask = false
      },
      handleProductSelect(id) {
        this.showSelectActive = true;
        this.seleSkuId = id;
        var number = this.number;
        if(this.productId == '1002483230350774273') {
          for (var i = 0; i < this.product.productSkuPriceList.length; i++) {
            if (id == this.product.productSkuPriceList[i].productSkuId) {
              if (i === 0 && number >= 10) {
                this.number = 1;
              } else if (i === 1 && (number <= 10 || number === 100)) {
                this.number = 21;
              } else if (i === 2 && number < 100){
                this.number = 100;
              }
              this.sumPrice = this.product.productSkuPriceList[i].productSkuPrice.toFixed(2);
              return;
            }
          }
        } else{
          for (var i = 0; i < this.product.productSkuPriceList.length; i++) {
            if (id == this.product.productSkuPriceList[i].productSkuId) {
              if (i === 0) {
                this.number = 1;
              } else if (i === 1) {
                this.number = 3;
              } else if (i === 2){
                this.number = 10;
              }
              this.sumPrice = this.product.productSkuPriceList[i].productSkuPrice.toFixed(2);
              return;
            }
          }
        }
      }
    }
  }
</script>
