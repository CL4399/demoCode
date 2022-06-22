var data = { };
arr.forEach(item => {
var children = data[item.pid];
if (!children) {
data[item.pid] = [ item ];
} else {
data[item.pid].push( item );
}
if (!data[item.id]) {
item.children = data[item.id] = [];
}
});
console.log(data[0]);
  
