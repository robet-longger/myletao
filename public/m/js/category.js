mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});  


$(function () {
    // 一级目录
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        data: {},
        success: function (data) {
            //    console.log(data);
            var res = template("firstCat", data);
            $(".lt_cat_left .mui-scroll").html(res);
            /*还要默认加载第一个一级分类的二级分类数据--id*/
            var id = data.rows[0].id;
            getSecondCategory({ "id": id }, function (data) {
                var res = template("secondCat", data);
                // console.log(res);   
                $(".lt_cat_right ul").html(res);
            })

        }
    })



    //为一级目录单击做绑定事件-----事件委托
    $(".lt_cat_left").on("tap", ".fc", function () {
        var _this = $(this);
        var id = $(this).data("id");
        getSecondCategory({ "id": id }, function (data) {
            console.log(_this);
            var res = template("secondCat", data);
            $(".lt_cat_right").find("ul").html(res);
            _this.addClass("active").siblings().removeClass("active")
        })

    })



})
// pa 就是一级目录的id
var getSecondCategory = function (pa, callback) {
    $.ajax({
        type: "get",
        url: "/category/querySecondCategory",
        data: pa,
        success: function (res) {
            callback && callback(res);
        }
    })
}








