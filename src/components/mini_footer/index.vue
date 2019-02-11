<template>
  <div class="min_footer">
    <!--<img src="../../../static/layout/logo.png"/>-->
    <p>
      <span>groe</span><br/>
      <br/>
      Adam Deutschland GmbH<br/>
      Waldesruh 2<br/>
      15608 Zossen-DE<br/>
    </p>
  </div>
</template>

<script>
  export default {
    name: "mini_footer",
  }
</script>

<style lang="scss" scoped>
  .min_footer{
    color: #bbbbbb;

    img{
      display:block;
      width: 64px;
      margin: auto;
      opacity: 0.4;
      -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
      -o-filter: grayscale(100%);
      -ms-filter: grayscale(100%);
      filter: grayscale(100%);
    }

    p{
      text-align: center;

      span{
        font-size: 47px;
        font-weight: 700;
      }
    }
  }
</style>
