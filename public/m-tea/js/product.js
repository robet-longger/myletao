/**
 * Created by Administrator on 2017/11/3.
 */
$(function(){
    /*1.页面加载，根据用户所传递的产品ID获取商品详情，并且动态渲染*/
    /*1.1 获取用户传入的产品id。我们使用了公共的js文件中的方法*/
    var id = lt.getParameter(location.search)["id"];
    /*1.2 发送异步请求，获取数据，并渲染*/
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{"id":id},
        success:function(result){
            var html = template("productDetail",result);
            $(".lt-content .mui-scroll").html(html);

            /*3.选择数量*/
            /*手动重新初始化数字输入框：因为动态生成的数字输入框需要重新初始化*/
            mui(".mui-numbox").numbox();
            /*图片轮播也重新初始化*/
            mui('.mui-slider').slider({
                interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    });

    /*2.选择尺码：1.添加事件  2.在事件设置span的样式*/
    $(".mui-scroll").on("tap",".psize",function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });

    /*4.加入到购物车*/
    $(".mui-btn-warning").on("tap",function(){
        var data = {
            productId:id,
            num:$(".mui-input-numbox").val(),
            //size:$(".mui-input-numbox").numbox().getValue()
            size:$(".psize.active").text()
        };
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:data,
            success:function(result){
                /*说明添加失败：原因是未登陆*/
                if(result.error && result.error == 400){
                    /*如果实现：从哪 里跳转，回到哪 里？
                    * 解决方式：使用前台ajax过滤未登陆的操作*/
                    location.href = "login.html?returnURL="+location.href;
                }else{
                    /*说明添加成功*/
                    /*确认提示对话框*/
                    mui.confirm('添加购物车成功，是否进入购物车查看', '操作提示', ["是","否"], function(e) {
                        if (e.index == 0) {
                            location.href = "cart.html";
                        } else {

                        }
                    })
                }
            }
        });
    });
});