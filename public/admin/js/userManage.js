$(function () {
    // 定义全局的页码
    var currentPage = 1;

    /* 1--表格数据渲染 */
    // ps====》每一页显示的数据条数
    function render(ps=4) {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            dataType: "json",
            data: {
                page: currentPage,
                pageSize: ps
            },
            success: function (result) {
                // console.log(result);
                var html = template("tableList", result);
                $("#tbody").html(html);
                /*总页数 = 总的数据条数(result.total)/每页显多少条(result.size)*/
                // 要记得向上取整---比如：11条数据，每页显示5条数据，则需要3页
                setPagintor(Math.ceil(result.total/result.size),render);
            }
        })
    }
    render();
    /* 2--实现分页功能---分页插件 */
    var setPagintor = function (total) {
        var options = {
            /*说明bootstrap的版本号是3.0*/
            bootstrapMajorVersion: 3,
           
            /*分页按钮显示文本*/
            size: 'small',
            /*当前页，可以为这页添加相应的样式*/
            currentPage: currentPage,
             /*总页数*/
            totalPages:total,
             /*单击分页显示按钮后的回调操作*/
            /*page:当前单击的按钮所代表的页码*/
            onPageClicked:function (event, originalEvent, type,page) {
                /*重置全局的页码值*/
                currentPage = page;
                // 重新渲染
                render();
            }

        }
        $("#pagintor").bootstrapPaginator(options);// $("#pagintor")
      
    }

    /* 3--用户的启用和禁用 */
    $("#tbody").on("click",".btn",function(){
        // alert(123);
        // 获取id
        var id = $(this).data("id");
        var isDelete = $(this).html()=="禁用"?1:0;
        var _this = this;
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            dataType:"json",
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function (result) {
                // console.log(result);success: true
                if (result.success) {
                    // 注意html()与text
                    isDelete==1? $(_this).html("启用").toggleClass("btn-success btn-danger"):$(_this).text("禁用").toggleClass("btn-success btn-danger");
                    
                    // isDelete==1? $(".state").html("已禁用"): $(".state").html("已启用");--不起效果--动态生成
                    isDelete==1? $(_this).parent().siblings(".status").html("已禁用"): $(_this).parent().siblings(".status").html("已启用");
                    
                }
               
               
            }
        })
    })
    
})