import Vue from 'vue'

export default function (cLoad, cColumns) {

  let columns = []

  for(let cIndex in cColumns) {
    columns[cIndex] = cColumns[cIndex]

    if(columns[cIndex].type === 'indicator'){
      columns[cIndex].rows = build_indicator_rows(cLoad.rows, columns[cIndex])
    }
    else {
      //build value build && get_params
      columns[cIndex].rows = build_rows(cLoad.rows, columns[cIndex])
    }

    //delete row params
    // columns[cIndex].params = delete_column_row_params(columns[cIndex])
  }

  return columns
}



function build_indicator_rows (rows, column) {
  let indicator_rows = []

  for(let rKey in rows) {
    let row = rows[rKey]
    indicator_rows.push(build_row_params(row, column))

  }

  return indicator_rows
}



function build_rows(rows, column) {
  let column_rows = []

  for(let rKey in rows) {
    let row = rows[rKey]

    if(column.id in row){
      let rowObject = {}

      //set value
      rowObject.value =  row[column.id]

      //set param
      rowObject.params = build_row_params(row, column)

      column_rows.push(rowObject)
    }
  }

  return column_rows
}



function build_row_params(row, column) {
  let params = {}

  for(let key in column.params){
    let param = column.params[key]
    let getter = param.indexOf('get_')

    if(getter !== -1){
      params[key] = row[param.substring(4)]
    }
  }

  return params
}



function delete_column_row_params (column) {
  let colParams = column.params

  for(let key in column.rows[0].params){
    if(column.type !== 'indicator' && key in column.params){
      Vue.delete( colParams, key )
    }
  }
}

