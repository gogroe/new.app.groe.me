import request from './request'
import permission from './permission'
import translation from './translation'
import helper from './helper'
import list from './list'
import date from './date'
import Vue from 'vue'

const prototypes = {
  '$$request': request,
  '$$permission' : permission,
  '$$translation': translation,
  '$$helper': helper,
  '$$list': list,
  '$$date': date
}

function prototype (prototypes) {
  for(let prototype_key in prototypes){
    Vue.prototype[prototype_key] = prototypes[prototype_key]
  }
}

export default prototype(prototypes)


