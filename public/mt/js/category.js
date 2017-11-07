
$(function(){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        data:{},
        success:function(result){
            /*如果返回值是对象，就在模板方法中直接传入对象
             * 如果返回值是数组，就在模板方法中将数组包装为对象*/
            /*加载了一级分类数据*/
            var html = template("firstCat",result);
            $(".lt-cat-left ul").html(html);
            /*还要默认加载第一个一级分类的二级分类数据*/
            var id = result.rows[0].id;
            getSecondCategoryData({"id":id},function(data){
                var html = template("secondCat",data);
                $(".lt-cat-right").find(".mui-scroll").html(html);
            })
        }
    });

    /*为左侧一级分类超链接绑定单击事件*/
    $(".lt-cat-left").on("tap",".fc",function(){
        var _this = $(this);
        var id = $(this).data("id");
        getSecondCategoryData({"id":id},function(data){
            console.log(data);
            var html = template("secondCat",data);
            console.log(html);
            $(".lt-cat-right").find(".mui-scroll").html(html);

            _this.parent().siblings().removeClass("active");
            _this.parent().addClass("active");
        });
    });
});
/*
* pa:传递的参数
* callback:当获取数据之后，数据应该如何进行处理*/
var getSecondCategoryData = function(pa,callback){
    $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:pa,
        success:function(result){
            callback && callback(result);
        }
    });
}