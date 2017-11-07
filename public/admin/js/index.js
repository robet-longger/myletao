$(function () {
    // 表一
    /*1.准备容器*/
    // var table1 = document.querySelector('.ad-main:first-child');
    var table1 = document.querySelector(".ad-table:first-of-type");

    /*2.初始化*/
    var myChart1 = echarts.init(table1);
    /*3.配置*/
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [500, 20000, 36000, 10900, 10000, 205554]
        }]
    };
    /*4.使用刚指定的配置项和数据显示图表*/
    myChart1.setOption(option);



    // 表二：
    var table2 = document.querySelector(".ad-table:last-of-type");

    /*2.初始化*/
    var myChart2 = echarts.init(table2);

    /*3.配置*/
    option = {
        title : {
            text: '热门品牌销售',
            subtext: '2017-6',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪达斯','新百伦','安踏','李宁']
        },
        series : [
            {
                name: '数据来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪达斯'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'安踏'},
                    {value:1548, name:'李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    

    /*4.使用刚指定的配置项和数据显示图表*/
    myChart2.setOption(option);
})