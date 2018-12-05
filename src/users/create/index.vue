<template>
  <div class="">
    <input type="text" name="name">
    <input type="text" name="firstname">
    <input type="text" name="lastname">
    <input type="text" name="gender">
    <edit name="Username"
  </div>
</template>

<script>
import Request from "../../components/functions/request";
import Edit from "../../components/inputs/edit";
export default {
  name: "create_users",
  components: {Edit},
  data(){
    return{
      //request_token=1234&refresh=true&type=0&gender=7&name=chafoger&firstname=jack&lastname=schmidt&uid=1&user_id=2
      create_user: {
        params: {
          request_token: '',
          refresh: '',
          type: '',
          gender: '',
          name: '',
          firstname: '',
          lastname: '',
          uid: '',
          id: '',
        },
        url: 'http://newbackend.groe.me/users/create_user'+,
        data: {},
        request: false
    }
      //request_token=1234&refresh=true&type=0&gender=7&name=chafoger&firstname=jack&lastname=schmidt&uid=1&user_id=2
    //   create_user: {
    //     params: {
    //
    //     },
    //     url: 'http://newbackend.groe.me/users/create_user'+,
    //     data: {},
    //     request: false
    // }
  }
}
</script>

<style scoped>

</style>
