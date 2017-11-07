/*1.进度条 ---要配合ajax使用--*/
// ajaxStart() 方法规定 AJAX 请求开始时运行的函数。
// ajaxStop() 方法规定所有的 AJAX 请求完成时运行的函数。

$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    NProgress.done();
});

/*2.点击实现左侧面板内容的显示和隐藏*/
$(".ad-opt a:first-of-type").on("click", function () {
    /*控制显示和隐藏*/
    // toggle() 方法切换元素的可见状态。
    // 如果被选元素可见，则隐藏这些元素，如果被选元素隐藏，则显示这些元素。
    // $(selector).toggle(speed,callback,switch)
    $(".ad-aside").toggle();

    // toggleClass() 对设置或移除被选元素的一个或多个类进行切换。
    // 该方法检查每个元素中指定的类。如果不存在则添加类，如果已设置则删除之。这就是所谓的切换效果。
    $(".ad-content").toggleClass("ac");
})

/* 3--登录和退出 */
$(".ad-opt a:last-of-type").on("click", function () {

    // 将模态框（弹出框）通过模板引擎template添加到div--myExitModel中
    // 而bootstrap组件---模态框做成共用样式放到js文件中
    var myModel = `<div class="modal fade" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">退出提示</h4>
                            </div>
                            <div class="modal-body">
                            <p>是否确认退出&hellip;</p>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary">确认</button>
                            </div>
                        </div>
                        </div>
                    </div>`;
    $(".myExitModel").html(myModel);
    // 开启模态框--弹出框
    $('.modal').modal('show');

    /*单击确定，实现退出操作*/
    /*重大细节：为了防止重复的绑定模态框的点击事件，在每一次绑定之前应该先清除之前绑定的事件*/
    $('.modal .btn-primary').on("click", function () {
        // 退出依旧ajax处理
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            data: {},
            success: function (res) {
                // console.log(res);
                if (res.success) {
                    location.href = "index.html";
                    // 关闭模态框--弹出框
                    $('.modal').modal('hide');
                }
            }
        })
    })
})


/*4--侧边栏分类菜单的展示和隐藏*/
$(".li_navigator a:first-child").on("click",function(){
    // slideToggle() 方法在被选元素上进行 slideUp() 和 slideDown() 之间的切换。
    // 该方法检查被选元素的可见状态。如果一个元素是隐藏的，则运行 slideDown()，如果一个元素是可见的，则运行 slideUp() - 这会造成一种切换的效果。
    // $(selector).slideToggle(speed,easing,callback)
    $(".cate"). slideToggle();
    $(this).parent().addClass("active");
});



