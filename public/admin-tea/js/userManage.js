$(function(){
    /*定义全局的页码*/
    var currentPage = 1;
    /*数据的动态渲染*/
   var render = function(ps=2){
       $.ajax({
           type:'get',
           url:'/user/queryUser',
           data:{
               page:currentPage,
               pageSize:ps
           },
           dataType:'json',
           success:function(result){
               console.log(result);
               /*渲染用户数据*/
               $("table tbody").html(template("userList",result));
               /*渲染分页区域*/
               setPagintor(Math.ceil(result.total/result.size),render);
           }
       });
   }
    render();

    /*实现分页功能*/
    var setPagintor = function(total,callback){
        $("#pagintor").bootstrapPaginator({
            /*说明bootstrap的版本号是3.0*/
            bootstrapMajorVersion:3,
            /*分页按钮显示文本*/
            size:'small',
            /*当前页，可以为这页添加相应的样式*/
            "currentPage":currentPage,
            /*总页数*/
            totalPages:total,
            /*单击分页显示按钮后的回调操作*/
            /*page:当前单击的按钮所代表的页码*/
            onPageClicked:function(event, originalEvent, type,page){
                /*重置全局的页码值*/
                currentPage = page;
                /*重新渲染*/
                render();
            }
        });
    }


    /*用户的启用和禁用*/
    $("tbody").on("click",".btn",function(){
        var id = $(this).data("id");
        var isDelete = $(this).html()=='禁用'?1:0;
       var _this = this;

        /*发送ajax请求，修改用户的状态*/
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            dataType:'json',
            success:function(result){
                if(result.success){
                    alert('你要的Alert回来了');
                    /*设置页面的显示内容*/
                    isDelete ==1 ? $(_this).html("启用").toggleClass("btn-danger btn-success"):$(_this).html("禁用").toggleClass("btn-danger btn-success");
                    /*改变兄弟元素的内容显示*/
                    isDelete ==1 ? $(_this).parent().siblings(".state").html("已禁用") : $(_this).parent().siblings(".state").html("已启用");
                }
            }
        });
    });
});