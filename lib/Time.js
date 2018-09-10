let Time = new Proxy({
  interval() {
    let interval, args = arguments
    return {
      start() {
        this.stop()
        interval = setInterval.apply(null, args)
        return this
      },
      stop() {
        clearInterval(interval)
        return this
      }
    }
  },
  rules: {
    yesterday: 864e5,
    today: 0,
    now: 0,
    tomorrow: -864e5
  }
}, {
  get(o, k) {
    if(k == 'interval') { return o[k] }
    let t = new Date(+new Date() - o.rules[k])
    if(k != 'now') {
      ['Hours', 'Minutes', 'Seconds'].map(i => t['set' + i](0))
    }
    return Math.floor(t.getTime() / 1000)
  }
})
export default Time