<template>
  <div
    v-if="is_active"
    class="snotes">
    <p
      class="note">
      {{note.note}}
    </p>
    <p
      class="details"
      v-if="note.details !== null">
      {{note.details}}
    </p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "snotes",
    data () {
      return {
        active: {
          note: false,
          details: false
        },

        note: {
          note: null,
          details: null
        }
      }
    },
    computed:{
      ...mapGetters([
        'errors',
        'list_states'
      ]),
      is_active () {
        return this.note.note !== null
      }
    },
    watch:{
      errors: {
        handler: function (array) {
          let last_item = array.length -1

          this.note.note = this.render_errors(array[last_item].errors)

          if(array.details !== null){
            this.note.details = array[last_item].details
          }

          this.timer()
        },deep: true
      },
    },
    methods:{
      timer () {
        let that = this;
        setTimeout(function(){
          that.active.details = false

          that.note = {
            note: null,
            details: null
          };
        }, 5000);
      },
      render_errors (number) {
        return number in this.list_states
          ? this.list_states[number]
          : number
      }
    }
  }
</script>

<style lang="scss" scoped>

  .snotes{
    z-index: 20;
    width: 300px;
    padding: 17px;
    background: #e3e3e3;
    border-radius: 2px;
    -webkit-animation: fadeinout 5s linear forwards;
    animation: fadeinout 5s linear forwards;

    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05);
    //-5px -5px 15px rgba(0, 0, 0, 0.05);

    .note{
      font-weight: 600;
    }
  }

</style>
