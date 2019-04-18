<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    GOOGLE ANMELDUNG
  </g-signin-button>
</template>

<script>

// 717306892749-pel84o480pt0o38hfedmq4rc1pqmtosb.apps.googleusercontent.com
// MLRv89Wp5JIDoPE_osBnprQi

export default {
  data () {
    return {
      googleSignInParams: {
        client_id: '717306892749-pel84o480pt0o38hfedmq4rc1pqmtosb.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile()
      let obj = {
          name: profile.ofa,
          lastname: profile.wea,
          login_type: 'g',
          login_token: profile.Eea,
          email: profile.U3
      }
      console.log('login success!');
      this.$emit('input', obj)
    },
    onSignInError (error) {
      console.warn('login failed!', error);
    }
  }
}
</script>

<style lang="scss" scoped>
.g-signin-button {
  width: 100%;
  display: inline-block;
  text-align: center;
  padding: 10px 5px;
  border-radius: 2px;
  background-color: #dd4b39;
  color: #fff;
  font-size: 14px;

  &:hover{
    cursor: pointer;
  }
}
</style>
