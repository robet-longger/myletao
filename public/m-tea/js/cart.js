/*初始化区域滚动*/
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
/*1，获取数据，实现动态渲染*/
$(function(){
    var render = function(){
        $.ajax({
            type:'get',
            url:'/cart/queryCart',
            data:{},
            success:function(result){
                console.log(result);
                var html = template("cartList",{"items":result});
                $("#OA_task_2").html(html);
            }
        });
    }
    render();
    /*编辑操作：添加事件*/
    $(".mui-table-view").on("tap",".mui-btn-blue",function(){
        var li = this.parentNode.parentNode;
        console.log(li);
        /*1。获取之前存储好的数据*/
        /*可以通过dataset来获取存储在当前元素中的自定义属性-它是一个dom属性*/
        var data = $(this)[0].dataset;
        var html = template("editCart",data);
        mui.confirm(html.replace(/\n/g,''), '修改操作', ["是","否"], function(e) {
            if (e.index == 0) {
                /*实现修改*/
                $.ajax({
                    type:'post',
                    url:'/cart/updateCart',
                    data:{
                        id:data.id,
                        size:$(".psize.active").text(),
                        num:$(".mui-input-numbox").val()
                    },
                    success:function(result){
                        if(result.success){
                            mui.toast('修改成功');
                            /*修改页面中对应元素的显示内容*/
                            /*不需要将数据全部重新刷新渲染--因为要保留用户之前的选择*/
                            /*重新计算总金额*/
                            /*render();*/
                            /*修改数量的显示*/
                            console.log($(li).find(".number"));
                            $(li).find(".number").html("x"+($(".mui-input-numbox").val())+"双");
                            $(li).find(".size").html("鞋码:"+($(".psize.active").text()));

                            /*因为后期是使用复选框的属性进行总金额的计算，所以还要动态的修改复选框的属性值*/

                            /*关闭当前的滑动:swipeoutClose可以关闭当前的滑动效果*/
                            console.log(data.num);
                            $(li).find(".check").attr("data-num",$(".mui-input-numbox").val());
                            $(li).find(".mui-btn-blue").attr("data-num",$(".mui-input-numbox").val());
                            $(li).find(".mui-btn-blue").attr("data-size",$(".psize.active").text());
                            mui.swipeoutClose(li);
                            /*修改尺码的显示*/
                            calcuTotal();
                        }
                    }
                });
            } else {
                mui.swipeoutClose(li);
            }
        })
        /*得让这个结构在页面中生成之后再进行初始化操作*/
        mui(".mui-numbox").numbox();
    });

    $(document).on("tap",".psize",function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });

    /*点击复选框生成总金额:永远记住：动态渲染的元素不能直接绑定事件*/
    /*tap事件有一个特性,在zepto中，如果使用事件委托来绑定事件，在tap事件的时候有可能无法正确的绑定事件*/
    $(document).on("change",'.check',function(){
        calcuTotal();
    });

    /*计算总金额*/
    var calcuTotal = function(){
        /*获取所有被选择的复选框，遍历，计算总金额*/
        var chks = $(".check:checked");
        var total = 0;
        for(var i=0;i<chks.length;i++){
            total = total + (chks[i].dataset['num'] * chks[i].dataset['price']);
        }
        $("#cartAmount").text(Math.ceil(total*100)/100);
    }

});