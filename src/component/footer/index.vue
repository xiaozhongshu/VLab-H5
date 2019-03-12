<style src="./index.css" scoped></style>
<template src="./index.html"></template>

<script>
  export default {
    components: {

    },
    mixins: [],
    data: () => ({
      isShowCode: false
    }),
    created() {

    },
    mounted() {

    },
    methods: {
      handleFounder: function () {
        if(this.$route.path == '/about'){
          window.scrollTo(0, 1138);
        } else {
          this.$router.push({path: '/about'});
        }
      },
      handleHistory: function () {
        if(this.$route.path == '/about'){
          window.scrollTo(0, 1748);
        } else {
          this.$router.push({path: '/about'});
        }
      },
      handleShowMask: function () {
        this.isShowCode = !this.isShowCode;
      },
      handleHideMask: function () {
        this.isShowCode = !this.isShowCode;
      }
    }
  }
</script>
