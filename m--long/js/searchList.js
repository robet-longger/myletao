

$(function () {

    //1---- 上下拉的刷新加载效果
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    setTimeout(function () {
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    }, 1000);

                }
            },
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: false,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    setTimeout(function () {
                        mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                        //mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100)
                    }, 1000);
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // 2---获取url所带的参数，进行ajax请求，渲染数据
        // 2.1获取url所带的参数方法--并将其转换为对象
        //str= "?name=jack&age=20&gender=false"; 》》 {"name":"jack","age":20,"gender":false}
      
        var pa = lt.getUrlData(location.search);
        console.log(pa);//{key: "11"}
        // 加载数据
        var data ={
            "proName":pa["key"],
            "page":1,
            "pageSize":100
        }
        $.ajax({
            type:"GET",
            url:"/product/queryProduct",
            data:data,
            success:function (res) {
                console.log(res);
                var html = template("productList",res);
                $(".lt_playZone ul").html(html);
            }
        })




        // position: absolute;
        // /* top: 191px; */
        // bottom: 38px;


});