'use strict'

module.exports = {
  Chain: require('./dist/lib/Chain'),
  Time: require('./dist/lib/Time'),
  Disk: require('o.disk'),
  i18n: require('o.i18n'),
  toArray: require('nesne').toArray
}

Object.assign(global.String.prototype, {
  vars(vars) {
    vars = typeof vars == 'object' ? vars : arguments
    return Object.keys(vars).reduce((m, v) => {
      return m.replace(new RegExp('(' + v + '[₺|$|₸|₼])+'), vars[v])
    }, this)
  },
  replaceAll(f, r) {
    let s = this
    for(var i in f) {
      while(s.indexOf(f[i]) > -1) {
        s = s.replace(f[i], r[i])
      }
    }
    return s
  },
  of(obj) {
    return this == '*' ? obj : this.split(',').reduce((o, i) => { o[i] = obj[i] || null; return o }, {})
  },
  from(obj) {
    let r = (this == '*' ? Object.keys(obj) : this.split(',')).map(i => obj[i])
    return (this.indexOf(',') == -1 && this != '*') ? r[0] : r
  },
  obj(arr, def) {
    return this.split(',').reduce(
      def instanceof Array
        ? (n, i, j) => {
          n[i] = arr[j] || def[j]
          return n
        }
        : (n, i, j) => {
          n[i] = arr[j] || def
          return n
        }
      , {})
  }
})