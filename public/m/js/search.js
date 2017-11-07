/**
 * Created by Administrator on 2017/11/2.
 */
/*数据的动态渲染*/
$(function(){
    /*获取当前本地存储的历史记录数据*/
    var arr = getHistoryData();
    // console.log(arr);["tyryry", "11", "22", "1", "篮球鞋", "鞋"]
    /*调用模板引擎生成最终渲染的、html代码*/
    /*1.如果数据是对象就直接传入对象
    * 2.如果数据是数组，就包装为对象再传入*/
    var html = template("lthsitory",{"items":arr});
    /*渲染*/
    $(".lt-search-history").html(html);

    /*添加搜索按钮的点击事件：*/
    $(".mui-btn-blue").on("tap",function(){
        /*1.获取用户输入*/
        var value = $("#userInput").val();
        /*2.将当前输入添加到本地存储*/
        /*2.1 获取原始的本地存储数据*/
        var arr = getHistoryData();
        /*2.2:在真正的添加数据之前，先判断 1.数据是否已经存在   2.数据数量是否超过10条*/
        for(var i=0;i<arr.length;i++){
            if(arr[i] == value){
                /*先删除*/
                arr.splice(i,1);
            }
        }
        if(arr.length >= 10){
            /*先删除最先存储的记录*/
            arr.splice(0,1);
        }
        arr.push(value);
        /*2.3将数组再次转换为字符串并存储*/
        /*console.log(JSON.stringify(arr));
        console.log(typeof JSON.stringify(arr));*/
        localStorage.setItem("ltHistoryData",JSON.stringify(arr));
        /*实现页面跳转*/
        location.href = "searchList.html?key="+value;
    });

    /*单击删除单条记录*/
    $(document).on("tap",".fa-close",function(){
        /*1.获取本条记录的索引*/
        var index = $(this).data("index");
        //$(this).index()
        /*获取数据*/
        arr.splice(index,1);
        /*存储删除数据之后的数组*/
        localStorage.setItem("ltHistoryData",JSON.stringify(arr));
        /*刷新*/
        var html = template("lthsitory",{"items":arr});
        /*渲染*/
        $(".lt-search-history").html(html);
    });
    /*$("[data-index]").on("tap",function(){
        /!*1.获取本条记录的索引*!/
        var index = $(this).data("index");
        /!*获取数据*!/
        arr.splice(index,1);
        /!*存储删除数据之后的数组*!/
        localStorage.setItem("ltHistoryData",JSON.stringify(arr));
        /!*刷新*!/
        var html = template("lthsitory",{"items":arr});
        /!*渲染*!/
        $(".lt-search-history").html(html);
    });*/

    /*删除所有记录*/
    $(document).on("tap",".mui-icon-trash",function(){
        /*将value重置发空字符串，就是删除的这个key对应的所有值*/
        localStorage.setItem("ltHistoryData","");
        /*重新取值*/
        var arr = getHistoryData();
        console.log(arr);
        var html = template("lthsitory",{"items":arr});
        $(".lt-search-history").html(html);
    });
});

/*返回数据数组*/
var getHistoryData = function(){
    /*约定当前乐淘历史记录key:ltHistoryData  localStorage.setItem("ltHistoryData",'["0":"aa","1":"bb","2":"cc"]');*/
    var data = localStorage.getItem("ltHistoryData");
    /*将获取的字符串转换为数组:因为不一样有数据，所以进行处理：意味着如果有数据，就进行转换之后并返回。如果没有数据则返回一个空值数组*/
    var arr = JSON.parse(data || "[]");
    return arr;
}