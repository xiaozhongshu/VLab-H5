<style src="./index.css" scoped></style>
<template src="./index.html"></template>

<script>

import storage from '../../common/storage'

export default {
  components: {},
  props: {
    index: {
      type: Number,
      required: true
    },
    isShowCategoryLeft: {
      type: Boolean,
      required: true
    }
  },
  mixins: [],
  data: () => ({
    categoryId: '',
    isShowCategoryRight: false,
    categoryListChildren: [],
    token: '',
    memberNickName: '',
    storage: storage,
    windowHeight: 0,
    isShowSidebar: false
  }),
  created () {

  },
  mounted () {
    this.token = storage.getToken()
    this.memberNickName = storage.getMemberNickName()
    this.headerHeight()

    this.$root.$on('onLoadProduct', () => {})
  },
  methods: {
    headerHeight: function () {
      this.windowHeight = document.body.offsetHeight
    },
    handleToMember: function () {
      this.$router.push({path: '/member'})
    },
    handleClose: function () {
      this.isShowSidebar = false
    },
    handleTab: function () {
      this.isShowSidebar = true
    },
    handleTabHidden: function (productId) {
      this.isShowSidebar = false
      if (productId != '' || productId != null || typeof (productId) !== 'undefined') {
        this.$root.$emit('onLoadProduct', productId)
      }
    }
  }
}
</script>
