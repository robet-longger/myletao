/*1.进度条*/
NProgress.configure({ showSpinner: false });
$(window).ajaxStart(function(){
    NProgress.start();
});
$(window).ajaxStop(function(){
    NProgress.done();
});


/*2.点击实现左侧面板内容的显示和隐藏*/
$(".ad-opt a:first-of-type").on("click",function(){
    /*控制显示和隐藏*/
    $(".ad-aside").toggle();
    /*让右侧面板占据整个屏幕*/
    $(".ad-content").toggleClass("ac");
});

/*单击退出*/
$(".ad-opt a:last-of-type").on("click",function(){
    var myModel = `<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">退出提示</h4>
        </div>
        <div class="modal-body">
        <p>请问你是否真的需要退出</p>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary">确定</button>
        </div>
        </div>
        </div>
        </div>`;
    /*将模态框添加到页面*/
    $(".myExitModel").html(myModel);
    /*我想编出模态框，提示用户是否需要退出*/
    $(".modal").modal('show');
    /*单击确定，实现退出操作*/
    /*重大细节：为了防止重复的绑定模态框的点击事件，在每一次绑定之前应该先清除之前绑定的事件*/
    $(".modal .btn-primary").off("click",".modal .btn-primary").on("click",function(){
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            data:{},
            dataType:'json',
            success:function(result){
                /**/
                console.log(typeof result);
                if(result.success){
                    location.href = "login.html";
                    $(".modal").modal('hide');
                }
            }
        });
    });

    /*读取退出提示模态框的内容，并返回*/
    var getModel = function(){
        var html = template("exitModel",{});
        return html;
    }
});


/*分类菜单的展示和隐藏*/
$('a[href="javascript:;"]').on("click",function(){
    $(this).parent().addClass("active");
    $(".cate").slideToggle();
});