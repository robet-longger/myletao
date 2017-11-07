// 动态生成的元素需要初始化
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


$(function () {
    // 1--渲染数据
    function render() {
        $.ajax({
            type: "GET",
            url: "/cart/queryCart",
            data: {},
            success: function (result) {
                console.log(result);
                var html = template("cartList", { "items": result });
                $("#OA_task_2").html(html);
            }
        });
    }
    render();

    // 2-编辑，添加事件---事件委托
    $(document).on("tap", ".mui-btn-blue", function () {
        // 得到li -- 为下面的 success: function函数通过li 获取值
        var li = $(this).parent().parent();
        console.log(li);
        // 获取a标签上自定义的数据
        var data = $(this)[0].dataset;
        // console.log(data);
        var html = template("editCart", data);
        // console.log(html);
        //把html放到mui-confirm中
        mui.confirm(html.replace(/\n/g, ''), '修改操作', ["是", "否"], function (e) {
            if (e.index == 0) {
                // 点击是--》0
                $.ajax({
                    type: "POST",
                    url: "/cart/updateCart",
                    data: {
                        id: data.id,
                        size: $(".psize.active").text(),
                        num: $(".mui-input-numbox").val()
                    },
                    success: function (result) {
                        mui.toast("修改成功");
                        /*修改页面中对应元素的显示内容*/
                        /*不需要将数据全部重新刷新渲染--因为要保留用户之前的选择*/
                        /*重新计算总金额*/
                        /*render();--不需要重新渲染刷新*/
                        /*修改鞋子数量的显示*/
                        // console.log(li.find(".number"));
                        li.find(".number").html("x" + ($(".mui-input-numbox").val()) + "双")
                        li.find(".size").html("鞋码:" + ($(".psize.active").text()));
                        /*下面---因为后期是使用复选框的属性进行总金额的计算，所以还要动态的修改复选框的属性值*/
                        li.find(".check").attr("data-num", $(".mui-input-numbox").val());//动态修改数量为计算价格方法priceTotal()做准备
                        li.find(".mui-btn-blue").attr("data-num", $(".mui-input-numbox").val());
                        li.find(".mui-btn-blue").attr("data-size", $(".psize.active").text());



                        mui.swipeoutClose(li[0]);

                        priceTotal();
                    }
                })
            } else {
                mui.swipeoutClose(li[0]);
            }

        })
        mui(".mui-numbox").numbox();
    });

    // 3--删除--添加事件---事件委托
    $(document).on("tap", ".mui-btn-yellow", function () {
        var li = $(this).parent().parent();
        console.log(li);

        var id = $(this).data("id");
        var _this = this;
        mui.confirm("你确定要删除这件商品吗", '温馨提示', ["确定", "取消"], function (e) {
            if (e.index == 0) {
                $.ajax({
                    type: "get",
                    url: "/cart/deleteCart",
                    data: { "id": id },
                    dataType: "json",
                    success: function (result) {
                        // console.log(result);
                        if (result.success) {
                            // 删除该选项--li
                            li.remove(li);
                            priceTotal();
                        } else {
                            mui.toast(result.message);
                        }


                    }
                })
            } else {
                mui.swipeoutClose(li[0]);
            }
        });

    });

    // 4-尺码选择
    $(document).on("tap", ".psize", function () {
        $(this).addClass("active").siblings().removeClass("active");

    });



    /* 5--点击复选框生成总金额:永远记住：动态渲染的元素不能直接绑定事件*/
    /*tap事件有一个bug,在zepto中，如果使用事件委托来绑定事件，在tap事件的时候有可能无法正确的绑定事件*/
    $(document).on("change", ".check", function () {
        priceTotal();
    });
    // 因为后期的编辑改动，删除等用到这个方法，所以封装
    var priceTotal = function () {
        /*获取所有被选择的复选框，遍历，计算总金额*/

        var chks = $(".check:checked");
        //  console.log(chks);
        // 遍历
        var total = 0;
        for (var i = 0; i < chks.length; i++) {
            var element = chks[i];
            total = total + element.dataset["num"] * element.dataset["price"];

            $("#cartAmount").text(Math.round(total));
        }

    }






})