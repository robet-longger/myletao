/**
 * Created by Administrator on 2017/11/2.
 */
/*获取url中的参数*/
var lt = {}

/*将url中的参数转换为对象*/
lt.getParameter = function(str){
 
    //str= "?name=jack&age=20&gender=false"; 》》 {"name":"jack","age":20,"gender":false}
    var pa = {};
    /*去除参数字符串最前面的?*/
    str = str.substring(1); //name=jack&age=20&gender=false"
    /*按&分隔*/
    var arr = str.split("&");//["name=jack","age=20","gender=false"]
    /*遍历获取每一个key对应的value*/
    for(var i=0;i<arr.length;i++){
        var item = arr[i].split("=");
        /*将参数添加到对象*/
        pa[item[0]] = item[1]; //pa[name]=jack
    }
    return pa;
}