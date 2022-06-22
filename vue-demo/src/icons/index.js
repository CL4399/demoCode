import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 注册到全局
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', true, /\.svg$/)
// function getStrsum(str, a) {
//   let b = str.indexOf(a)
//   var num = 0
//   while (b !== -1) {
//     num++;
//     b = str.indexOf(a, b + 1)
//   }
//   return num
// }
// const allComponents = require.context("./svg", true, /\.svg$/);
// let res_components = [];

// function getSlashValue(url) {
//   return url.substr(url.lastIndexOf('/', url.lastIndexOf('/') - 1) + 1).substring(0, url.substr(url.lastIndexOf('/', url.lastIndexOf('/') - 1) + 1).lastIndexOf('/'));
// }
// allComponents.keys().forEach((item) => {
//   let comp = allComponents(item);
//   let str = getStrsum(item, '/')
//   let name = comp.default.id
//   if (str >= 2) {
//     const s = new RegExp("dir", 'g')
//     name = name.replace(s, getSlashValue(item))
//   } else {
//     const s = new RegExp("dir", 'g')
//     name = name.replace(s, "svg")
//   }
//   comp.default.id = name
//   res_components.push(comp)
// });
requireAll(req)
console.log(requireAll(req),"?????????????????????????")
