// 动态渲染数据
$(function () {

    // 1-----获取当前储存在本地的历史数据
    var arr = getHistoryData();
    var res = template("lthsitory", { "items": arr });
    $(".searchHistory").html(res);



    // 2---/*添加搜索按钮的点击事件：*/
    $(".mui-btn-blue").on("tap",function () {
        // 获取用户输入
        var value = $("#lt_searchInput").val();
        // console.log(value);
        //.将当前输入添加到本地存储*/
        //获取原始的本地存储数据
        var arr = getHistoryData();
        // 在真正的添加数据之前，先判断 1.数据是否已经存在(重复)   2.数据数量是否超过10条
        //1---判断是否有重复数据
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == value) {
                // 删除
                arr.splice(i,1);
            }
        }
        if (arr.length>=10) {
            // 先删除最先存储的记录
            arr.splice(0,1);
        }

        arr.push(value);
        // console.log(arr);(3) ["bb", "cc", "erer"]
        // **** 由于localStorage只能存储字符串，所以需要将数组arr转换为字符窜格式进行数据存储
    
        localStorage.setItem("ltHistoryData",JSON.stringify(arr));

    })


    // 3--单击删除单条数据-通过自定义索引获取id----由于不知道数据需要用到事件委托
    // 注意：动态生成的数据用on方式只能执行一次代码
    $(".lt_searchList").on("tap",".fa-close",function(){
        var index = $(this).data("index");
        // console.log(index);
        // 删除数据
        arr.splice(index,1);
        localStorage.setItem("ltHistoryData",JSON.stringify(arr));
        // 刷新
        var res = template("lthsitory",{"items":arr});
        // 渲染
        $("searchHistory").html(res);
    })

    // 3---删除所有数据
    $(".fa-trash").on("tap",function(){
       /*将value重置发空字符串，就是删除的这个key对应的所有值*/
       localStorage.setItem("ltHistoryData","");
        //  重新取值渲染数据
        var arr = getHistoryData();
        // console.log( arr);//得到[]
        var res = template("lthsitory",{"items":arr});
        $(".searchHistory").html(res);

    })

   




})
 //封装数据返还数组--返还第一步
var getHistoryData = function () {
    // 1使用localStorage储存的只能是字符串
    // 2数组以字符串的形式进行存储
    // 3历史数据存储在本地
    // 4--ltHistoryData一开始不确定他有值
    var data = localStorage.getItem("ltHistoryData");
    /*将获取的字符串转换为数组:因为不一样有数据，所以进行处理：意味着如果有数据，就进行转换之后并返回。如果没有数据则返回一个空值数组*/

    var arr = JSON.parse(data || "[]");//[]为空的数组

    return arr;
}