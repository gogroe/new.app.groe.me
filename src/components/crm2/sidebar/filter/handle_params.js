export default {
  name: 'handle_params',
  methods:{
    remove_params (object) {
      if( object.tableName in this.params){
        if(
          object.condition === null &&
          'conditions' in this.params[object.tableName] &&
          'search->' + object.fieldName in this.params[object.tableName].conditions
        ){
          this.$delete(this.params[object.tableName].conditions, 'search->' + object.fieldName)
          if(this.$$helper.length(this.params[object.tableName].conditions) === 0) {
            this.$delete(this.params[object.tableName], 'conditions')
          }
        }
        if(object.asc === false){
          this.delete_asc(object)
        }
        if(object.desc === false){
          this.delete_desc(object)
        }
        if(this.$$helper.length(this.params[object.tableName]) === 0) {
          this.$delete(this.params, object.tableName)
        }
      }
    },
    add_params (object) {
      if((object.tableName in this.params) === false){
        this.params[object.tableName] = {}
      }
      if(object.condition !== null){
        this.add_conditions(object)
      }
      if(object.asc || object.desc){
        this.add_sortings(object)
      }
    },
    add_conditions (object) {
      let conKey = 'search->' + object.fieldName
      let conVal = object.condition
      let parObj = this.params[object.tableName]

      if(('conditions' in this.params[object.tableName]) === false){
        parObj.conditions = {}
      }

      parObj.conditions[conKey] = conVal
    },
    add_sortings (object) {
      let parObj =  this.params[object.tableName]
      this.delete_asc(object)
      this.delete_desc(object)

      if(object.asc){
        parObj.asc = [object.fieldName]
      }
      if(object.desc){
        parObj.desc = [object.fieldName]
      }
    },
    delete_asc (object) {
      if ('asc' in this.params[object.tableName]) {
        this.$delete(this.params[object.tableName], 'asc')
      }
    },
    delete_desc (object) {
      if('desc' in this.params[object.tableName]){
        this.$delete(this.params[object.tableName], 'desc')
      }
    }
  }
}
