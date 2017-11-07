mui('.mui-input-row input').input(); 

$(function(){
    // 1--登录操作
    $(".mui-btn-primary").on("tap",function(){
        /*判断用户是否输入了用户名\密码，如果没有输入则取消本次请求*/

        // 语法：$.trim( str )--jq去除空白符

        if($.trim($(".mui-input-clear").val()) == ""){
            mui.toast('请输入用户名');
            return false;
        }
        if($.trim($(".mui-input-password").val()) == ""){
            mui.toast('请输入密码');
            return false;
        }

        var data = {
            "username":$(".mui-input-clear").val(),
            "password":$(".mui-input-password").val()
        }
        console.log(data);
        $.ajax({
            type:"post",
            url:"/user/login",
            data:data,
            success:function(result){
                console.log(result);
                if (result.success) {
                    //http://localhost:3000/m/login.html?returnURL=http://localhost:3000/m/product-detail.html?id=1
                    // location.search ==>"?returnURL=http://localhost:3000/m/product-detail.html?id=1"
                    if(location.search && location.search.indexOf("?returnURL")==0){
                        location.href = location.search.replace("?returnURL=","");
                    }else{
                         /*如果不是从某个页跳转业登陆页，那么默认显示首页*/
                         location.href = "index.html";
                    }
                }else{
                    /* 登录失败 */
                    mui.toast(result.message);
                }
            }
        })
    })

})