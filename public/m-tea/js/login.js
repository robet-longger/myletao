/**
 * Created by Administrator on 2017/11/3.
 */

/*1.实现密码框内容的加密显示*/
$(".mui-icon-eye").on("tap",function(){
    $(this).toggleClass('mui-active');
    $(".mui-input-password").attr("type")=="text"?$(".mui-input-password").attr("type","password"):$(".mui-input-password").attr("type","text");
});

/*2.登陆*/
$(".mui-btn-primary").on("tap",function(){
    /*判断用户是否输入了用户名，如果没有输入则取消本次请求*/
    if($.trim($(".mui-input-clear").val()) == ""){
        mui.toast('请输入用户名');
        return false;
    }
    if($.trim($(".mui-input-password").val()) == ""){
        mui.toast('请输入密码');
        return false;
    }
    var data = {
        'username':$(".mui-input-clear").val(),
        'password':$(".mui-input-password").val()
    }
    $.ajax({
        type:'post',
        url:'/user/login',
        data:data,
        success:function(result){
            /*说明登陆成功*/
            if(result.success){
                /*跳转回去：如果是从某个页进入登陆页*/
                /*http://localhost:3000/m/login.html?returnURL=http://localhost:3000/m/product-detail.html?id=1*/
                if(location.search && location.search.indexOf("?returnURL") ==0){
                    location.href = location.search.replace("?returnURL=",'');
                }
                /*如果不是从某个页跳转业登陆页，那么默认显示首页*/
                else{
                    location.href = "index.html";
                }
            }else{
                /*登陆失败*/
                mui.toast(result.message);
            }
        }
    });
});