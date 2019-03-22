import store from '../../../../store'
import helper from '../../../prototypes/helper'

export default function (fields) {
  let columns = {}

  for(let index in fields){
    let field = fields[index]
    let relation_type = helper.search_key_by_value(store.getters.list_relations, field.relation_type)

    columns[field.name + '.value'] = {
      id: field.name + '.value',
      name: helper.capitalize(field.name),
      type: field.field_type,
      create_url: 'https://newbackend.groe.me/custom_field/create',
      update_url: 'https://newbackend.groe.me/custom_field/update',
      params:{
          id: 'get_' + field.name + '.id',
          relation_id: 'get_' + relation_type + '.id',
          table: relation_type,
          name: field.name
      },
      rows: []
    }
  }

  return columns
}
