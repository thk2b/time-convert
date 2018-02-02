const { h,m,s,ms } = require('./index')

console.log(
    ms.from(h,m,s)(...ms.to(h,m,s)(44625000))
)