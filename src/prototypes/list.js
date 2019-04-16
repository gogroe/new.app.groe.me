import request from './request'
import store from '../../store'

export default {
  items: async function (name) {

    let list = []

    //get list
    if(name in store.getters.lists)
    {
      list = store.getters.lists[name]
      let count = 0

      while (list.length === 0 && count < 50){
        await Sleep(100)
        list = store.getters.lists[name]
        count++
      }
    }
    else
    {
      //set placeholder
      store.commit('update_lists', {list_group: name, list: []})

      //get request
      await request.post.data('https://newbackend.groe.me/list/get_one',{ list_group: name })
        .then(function (response) {
          store.commit('update_lists', {list_group: name, list: response})
          list = response
        })
    }

    return list
  },
  item: async function (name, value) {
    let cname = null
    let counter = 0

    await this.items(name)
      .then((response) => get_name(response, value)
      )

    function get_name (list, value) {
      for(let key in list){
        if(list[key].value === value){
          cname = list[key].name
          counter++
        }
      }
    }

    if(counter > 1){
      //console.warn('List: ' + name + ' duplicate value ' + cname)
    }

    return cname
  }
}


function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}


