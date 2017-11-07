

$(function () {
    // 获取searchList.html页面传过来的id
    var id = lt.getParameter(location.search).id;
    // console.log(id);{id: "2"}
    // 1--获取后台数据渲染页面
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: { "id": id },
        success: function (res) {
            console.log(res);
            var html = template("productDetail", res);
            $(".mui-scroll").html(html);
            mui('.mui-slider').slider({
                interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            mui(".mui-numbox").numbox();
        }
    })
    // 2--选尺码 添加样式---动态生成事件委托
    $(document).on("tap",".psize",function(){
        
        $(this).addClass("active").siblings().removeClass("active");
    })

    // 3--加入到购物车
    $(".mui-btn-warning").on("tap",function(){
        // 根据前台数据展示，需要数据有
        // productId 产品id 、 num  产品数量  size  产品尺码
        var num = $(".mui-input-numbox").val();
        var size = $(".lt-item .active").text();
        var data = {
            productId:id,
            num:num,
            size:size
        };
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:data,
            success:function(result){
                // console.log(result);{error: 400, message: "未登录！"}
                /*说明添加失败：原因是未登陆*/
                if (result.error && result.error == 400) {
                    /* Location.href --返回完整的URL（当前页) 
                    returnURL--- 作用就是可以在完成登陆后跳转回到用户开始请求的那个页面(就是returnUrl的那个地址的页面);
                    思考：js页面跳转的几种方式
                    a标签
                    Windows.location.href
                    windows.open
                    */
                     /*如果实现：从哪 里跳转，回到哪 里？
                    * 解决方式：使用前台ajax过滤未登陆的操作*/
                    location.href = "login.html?returnURL="+location.href;
                }else{
                    /* 说明添加成功 */
                    /* 确认提示对话框 */
                    mui.confirm('添加购物车成功，是否进入购物车查看？', '操作提示', ["是","否"], function(e) {
                        if (e.index == 0) {
                            location.href = "cart.html" ; 
                        } else {
                            
                        }
                    })
                    
                }


            }
        })
    })





			 //mui初始化
            //  mui.init({
			// 	swipeBack: true //启用右滑关闭功能
			// });
			// var info = document.getElementById("info");
			// document.getElementById("alertBtn").addEventListener('tap', function() {
			// 	mui.alert('欢迎使用Hello MUI', 'Hello MUI', function() {
			// 		info.innerText = '你刚关闭了警告框';
			// 	});
			// });
			// document.getElementById("confirmBtn").addEventListener('tap', function() {
			// 	var btnArray = ['是', '否'];
			// 	mui.confirm('MUI是个好框架，确认？', 'Hello MUI', btnArray, function(e) {
			// 		if (e.index == 0) {
			// 			info.innerText = '你刚确认MUI是个好框架';
			// 		} else {
			// 			info.innerText = 'MUI没有得到你的认可，继续加油'
			// 		}
			// 	})
			// });
			// document.getElementById("promptBtn").addEventListener('tap', function(e) {
			// 	e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
			// 	var btnArray = ['确定', '取消'];
			// 	mui.prompt('请输入你对MUI的评语：', '性能好', 'Hello MUI', btnArray, function(e) {
			// 		if (e.index == 0) {
			// 			info.innerText = '谢谢你的评语：' + e.value;
			// 		} else {
			// 			info.innerText = '你点了取消按钮';
			// 		}
			// 	})
			// });
			// document.getElementById("toastBtn").addEventListener('tap', function() {
			// 	mui.toast('欢迎体验Hello MUI');
			// });
		



})