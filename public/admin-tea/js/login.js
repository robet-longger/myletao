$(function(){
    $(".btn-primary").on("click",function(){
        /*收集用户数据*/
        var userName = $("#inputUserName3").val();
        var password = $("#inputPassword3").val();
        /*实现登陆*/
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:{
                username:userName,
                password:password
            },
            dataType:'json',
            success:function(result){
                if(result.success){
                    location.href = "index.html";
                }else if(result.error == 1000 || result.error == 1001){
                    alert(result.message);
                }
            }
        });
    });
});