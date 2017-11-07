// 获取url中的参数
var lt = {};
// 将url中的参数(字符串)转换为对象
 //str= "?name=jack&age=20&gender=false"; 》》 {"name":"jack","age":20,"gender":false}
lt.getUrlData = function (str) {
    var pa = {};
     /*去除参数字符串最前面的?*/
    str = decodeURI( str.substring(1));
    // 按&分割
    var arr = str.split("&");//["name=jack","age=20","gender=false"]
    //遍历获取每个key 对应的value
    for (var i = 0; i < arr.length; i++) {
       var item = arr[i].split("=");
    //    将得到的数组添加到对象中
        pa[item[0]]=item[1];//pa[name]=jack
        
    }
    return pa;

} 