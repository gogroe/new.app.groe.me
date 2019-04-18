 <template>
  <fb-signin-button
    :params="fbSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    FACEBOOK ANMELDUNG
  </fb-signin-button>
</template>

<script>

export default {
  data () {
    return {
      fbSignInParams: {
        scope: 'email',
        return_scopes: true
      }
    }
  },
  created: function() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '373660976756322',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.8'
      });
    };
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
  methods: {
    onSignInSuccess (response) { //todo renameing variables
      let obj = {}
      FB.api('/me', dude => {
        obj.name = dude.name.substring(0, dude.name.indexOf(' ')),
        obj.lastname = dude.name.substring(dude.name.indexOf(' '), dude.name.length),
        obj.login_type = 'f',
        obj.login_token = dude.id
      })
      FB.api('/me', {fields: 'email'}, function(response) {
        obj.email = response.email
      });
      this.$emit('input', obj)
    },
    onSignInError (error) {
      console.warn('login failed!');
    }
  }
}
</script>

<style lang="scss" scoped>
.fb-signin-button {
  width: 100%;
  display: inline-block;
  text-align: center;
  padding: 10px 5px;
  border-radius: 2px;
  background-color: #446DB0;
  color: #fff;
  font-size: 14px;

  &:hover{
    cursor: pointer;
  }
}
</style>
