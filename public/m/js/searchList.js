/**
 * Created by Administrator on 2017/11/2.
 */
$(function () {
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    loadData();
                    setTimeout(function () {
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    }, 1000);
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
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


    var pa = lt.getParameter(location.search);
    /*加载数据*/
    var loadData = function (data) {
        /*发送ajax请求*/
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: data,
            success: function (result) {
                // console.log(result);
                var html = template("productList", result);
                $(".lt-product ul").html(html);
            }
        });
    }
    /*默认加载一次*/
    loadData({
        "proName": pa["key"],
        "page": 1,
        "pageSize": 100
    });



    /*排序操作*/
    // //  console.log($("[data-type]"));//[a.active, a, a, a, selector: "[data-type]"]
    $("[data-type]").on("tap",function(){
        /*添加样式：将其它的a标签的样式变换到默认值fa-angle-down,为当前a标签添加fa-angle-down,同时去除之前a标签的active*/
        /*1.第一个单击只是添加active样式，如果已经有active样式了，那么就切换剪头的方向*/
        /*如果当前a标签取消选择，如果剪头方向是向上，那么需要将剪头的方向重置为向下*/
        if($("[data-type].active").find("span:last-of-type").hasClass("fa-angle-up")){
            //$("[data-type].active").find("span:last-of-type").className = "fa fa-angle-down";
            ($("[data-type].active").find("span:last-of-type"))[0].className="fa fa-angle-down";
        }
        if($(this).hasClass("active")){
            /*切换span的剪头的样式*/
            $(this).find("span:last-of-type").toggleClass("fa-angle-down fa-angle-up");
        }
        $(this).siblings().removeClass("active");
        $(this).addClass("active");


        // 获取排序的顺序
        var type = $(this).data("type");//price num discount time
       
        // 获取排序方式
        var orderType = $(this).find("span:last-of-type").hasClass("fa-angle-down")?2:1;
    //    发送请求
    //    生成对象
    var pa1 = {};
    pa1[type] = orderType;
    loadData(pa1);
    })

});