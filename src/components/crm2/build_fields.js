import store from '../../../store/index'
import helper from '../../prototypes/helper'

export default function (fields, baseColumns) {
  let columns = []

  for(let index in baseColumns){
    columns.push(baseColumns[index])
  }

  for(let index in fields){
    let field = fields[index]
    let relation_type = helper.search_key_by_value(store.getters.list_relations, field.relation_type)

    let fieldObject = {
      active: true,
      fieldId: field.id,
      id: field.value + '.value',
      name: field.name,
      type: field.field_type,
      create_url: 'https://newbackend.groe.me/user_crm/custom_field_value/create',
      update_url: 'https://newbackend.groe.me/user_crm/custom_field_value/update',
      params:{
        id: 'get_' + field.value + '.id',
        relation_id: 'get_' + relation_type + '.id',
        table: relation_type,
        name: field.value
      },
      rows: []
    }

    columns.push(fieldObject)
  }

  return columns
}
