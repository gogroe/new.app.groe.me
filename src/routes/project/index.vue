<template>
  <div>
    <button @click="send_inquiry">Send Data</button>
    <pre>{{send.data}}</pre>
  </div>
</template>

<script>
  export default {
    name: "projects",
    data () {
      return {
        send: {
          url: "https://www.kaeuferportal.de/inquiries",
          params: {
            apikey: "1601007011430134e48764006a72bca7",
            "product": {
              "id": 30
            },
            questions: {
              question_uuid: [
                "79d10e00b8af012d38b238ac6f7d89ab ",
                "79d10e00b8af012d38b238ac6f7d89ab "
              ]
            },

            data: {}
          }
        }
      }
    },
    methods:{
      send_inquiry () {
        this.$$request.post.data(this.send.url, this.send.params)
          .then((response) => this.send.data = response)
      }
    }
  }
</script>
