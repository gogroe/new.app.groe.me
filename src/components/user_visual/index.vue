<template>
  <div>
    <user_initials v-if="active.initals"
                   :name="name"
                   :size="size"
                   :initials_class="visual_class"/>
    <user_image v-else
                :path="path"
                :size="size"
                :image_class="visual_class"/>
  </div>
</template>

<script>
  import User_image from "../user_image/index";
  import User_initials from "../user_initals/index";
  export default {
    name: "user_visual",
    components: {User_initials, User_image},
    props:{
      name:{
        required: true
      },
      path:{
        required: true
      },
      size:{
        type: String,
        required: true
      },
      visual_class:{
        type: String,
        required: false
      }
    },
    data(){
      return{
        active:{
          initals: true
        }
      }
    },
    watch:{
      path: function () {
        this.set_active()
      }
    },
    mounted(){
      this.set_active()
    },
    methods:{
      set_active(){
        if(this.path !== null){
          this.active.initals = false
        }
      }
    }
  }
</script>

