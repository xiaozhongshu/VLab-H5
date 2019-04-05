<template>
  <div>
    <!-- 头部 -->
    <Header :index="2"
            :isShowCategoryLeft="true"></Header>
    <!--内容-->
    <div class="banner">
      <div class="header-title">
        购买 {{product.productTitle}}
      </div>
      <div class="banner-img">
        <img v-for="item in product.productImageList" :src="imageHost + item.imagePath" alt="">
      </div>
      <div class="product-desc">
        <h4>{{product.productSubtitle}}</h4>
        <p>纳米胶原蛋白。{{product.productTitle}}通过食用的方式，提供肌肤深层需要的补水成分，从而改善肌肤品质。</p>
      </div>
      <div class="configure">
        <h4>购买配置</h4>
      </div>
      <div class="buy-options"
           @click="handleProductSelect(item.productSkuId)"
           v-for="(item,index) in product.productSkuPriceList"
           :key="index">
        <div class="buy-options-item"
             v-bind:class="[item.productSkuId == seleSkuId && showSelectActive == true ?'buy-options-item-active' : 'buy-options-item']">
          <div class="buy-options-item-num">
            {{item.compositeAttributeKey}}（初次尝试，甜甜哒）
          </div>
          <div class="buy-options-item-box">
            <div class="buy-options-item-price">
              +RMB {{item.productSkuPrice}}
            </div>
          </div>
        </div>
      </div>

      <div class="custom-num-box">
        <div class="custom-num-box-buy">
          自定义购买数量：
        </div>
        <div class="all-price">
          RMB {{sumPrice}}
        </div>
      </div>

      <div class="buy-num-box">
        <div class="buy-num">
          <span class="buy-num-sub" @click="handleProductPull">-</span>
          <input type="text"
                 v-model="number"
                 class="buy-num-input"
                 name="12">
          <span class="buy-num-add" @click="handleProductPush">+</span>
        </div>
        <div class="purchase-btn" @click="handleIsMaskHidden">
          前往购买
        </div>
        <div class="mask"
             v-if="isMask"
             @click="handleIsMaskHidden">
          <div class="mask-bg">
          </div>
          <div class="mask-content">

            <img src="../../../static/image/code.jpg" class="mask-img" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<style src="./index.css" scoped>


</style>


<script>
  import bCarousel from 'bootstrap-vue/es/components/carousel/carousel'
  import bListGroup from 'bootstrap-vue/es/components/list-group/list-group'
  import bImg from 'bootstrap-vue/es/components/image/img'

  import mixins from '../../mixins/index'

  import storage from '../../common/storage'

  import Header from '../../component/header/index'
  import Footer from '../../component/footer/index'

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
    created () {

    },
    mounted () {
      this.productId = this.$route.query.productId;
      this.haneleLoad();

      // this.$root.$on('onLoadProduct', (data) => {
      //   this.productId = data
      //   this.haneleLoad()
      // })

    },
    methods: {
      handleIsMaskHidden () {
        this.isMask = !this.isMask
      },
      haneleLoad () {
        this.request({
          url: '/xingxiao/product/desktop/v1/view',
          data: {
            productId: this.productId == '1035421817968144400' ? '1035421817968144386' : '1002483230350774273',
          },
          success: (data) => {
            if (data.productSkuPriceList && data.productSkuPriceList.length > 0) {
              this.number = 1
              this.seleSkuId = data.productSkuPriceList[0].productSkuId
              this.sumPrice = data.productSkuPriceList[0].productSkuPrice.toFixed(2)
            }
            this.product = data;
          },
          error: () => {
          }
        })
      },
      handleProductPull () {
        if (this.number > 1) {
          this.number--
          this.handleSum()
        }
      },
      handleProductPush () {
        if (this.productId == '1002483230350774273') {
          if (this.number >= 600) {
            this.number = 600
            this.handleSum()
            return
          }
          if (this.number <= 20) {
            ++this.number
            this.handleSum()
            return
          }
          if (this.number >= 21 && this.number < 79) {
            this.number = parseInt(this.number) + parseInt(21)
            this.handleSum()
            return
          }
          if (this.number >= 79 && this.number < 100) {
            this.number = 100
            this.handleSum()
            return
          }
          if (this.number >= 100) {
            if (this.number < 600) {
              this.number = parseInt(this.number) + parseInt(100)
              if (this.number >= 600) {
                this.number = 600
              }
              this.handleSum()
            } else {
              this.number = 600
              this.handleSum()
            }
          }
        } else {
          if (this.number >= 50) {
            this.number = 50
            this.handleSum()
            return
          }
          if (this.number <= 2) {
            ++this.number
            this.handleSum()
            return
          }
          if (this.number >= 3 && this.number < 7) {
            this.number = parseInt(this.number) + parseInt(3)
            this.handleSum()
            return
          }
          if (this.number >= 7 && this.number < 10) {
            this.number = parseInt(10)
            this.handleSum()
            return
          }
          if (this.number >= 10) {
            if (this.number <= 50) {
              this.number = parseInt(this.number) + parseInt(10)
              if (this.number >= 50) {
                this.number = 50
              }
              this.handleSum()
            } else {
              this.number = 50
              this.handleSum()
            }
          }
        }
      },
      handleSum () {
        var number = this.number
        if (this.productId == '1002483230350774273') {
          if (number >= 1 && number < 10) {
            this.showSelectActive = true
            this.seleSkuId = this.product.productSkuPriceList[0].productSkuId
            if (number != 1) {
              this.showSelectActive = false
            }
            this.sumPrice = (this.product.productSkuPriceList[0].productSkuPrice * number).toFixed(2)
          } else if (number >= 10 && number < 100) {
            this.showSelectActive = true
            this.seleSkuId = this.product.productSkuPriceList[1].productSkuId
            if (number != 21) {
              this.showSelectActive = false
            }
            var productSkuPrice = this.product.productSkuPriceList[1].productSkuPrice
            this.sumPrice = ((productSkuPrice / 10) * number).toFixed(2)
          } else if (number >= 100) {
            this.showSelectActive = true
            this.seleSkuId = this.product.productSkuPriceList[2].productSkuId
            if (number != 100) {
              this.showSelectActive = false
            }
            var productSkuPrice = this.product.productSkuPriceList[2].productSkuPrice
            this.sumPrice = ((productSkuPrice / 100) * number).toFixed(2)

          }
        } else {
          if (number >= 1 && number < 3) {
            this.showSelectActive = true
            this.seleSkuId = this.product.productSkuPriceList[0].productSkuId
            if (number != 1) {
              this.showSelectActive = false
            }
            this.sumPrice = (this.product.productSkuPriceList[0].productSkuPrice * number).toFixed(2)
          } else if (number >= 3 && number < 10) {
            this.showSelectActive = true
            this.seleSkuId = this.product.productSkuPriceList[1].productSkuId
            if (number != 3) {
              this.showSelectActive = false
            }
            var productSkuPrice = this.product.productSkuPriceList[1].productSkuPrice
            this.sumPrice = ((productSkuPrice / 3) * number).toFixed(2)
          } else if (number >= 10) {
            this.showSelectActive = true
            this.seleSkuId = this.product.productSkuPriceList[2].productSkuId
            if (number != 10) {
              this.showSelectActive = false
            }
            var productSkuPrice = this.product.productSkuPriceList[2].productSkuPrice
            this.sumPrice = ((productSkuPrice / 10) * number).toFixed(2)
          }
        }
      },
      handleNumberInput (e) {
        var value = e.currentTarget.value
        if (this.productId == '1002483230350774273') {
          if (!value || value === '' || value < 1) {
            this.number = 1
          } else {
            this.number = value
          }
        } else {
          if (!value || value === '' || value < 1) {
            this.number = 1
          } else {
            this.number = value
          }
        }
        this.handleSum()
      },
      handleSublime () {
        this.isMask = true
      },
      handleProductSelect (id) {
        this.showSelectActive = true
        this.seleSkuId = id
        var number = this.number
        if (this.productId == '1002483230350774273') {
          for (var i = 0; i < this.product.productSkuPriceList.length; i++) {
            if (id == this.product.productSkuPriceList[i].productSkuId) {
              if (i === 0 && number >= 10) {
                this.number = 1
              } else if (i === 1 && (number <= 10 || number === 100)) {
                this.number = 21
              } else if (i === 2 && number < 100) {
                this.number = 100
              }
              this.sumPrice = this.product.productSkuPriceList[i].productSkuPrice.toFixed(2)
              return
            }
          }
        } else {
          for (var i = 0; i < this.product.productSkuPriceList.length; i++) {
            if (id == this.product.productSkuPriceList[i].productSkuId) {
              if (i === 0) {
                this.number = 1
              } else if (i === 1) {
                this.number = 3
              } else if (i === 2) {
                this.number = 10
              }
              this.sumPrice = this.product.productSkuPriceList[i].productSkuPrice.toFixed(2)
              return
            }
          }
        }
      }
    }
  }
</script>
