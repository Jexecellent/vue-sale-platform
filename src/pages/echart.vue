<template>
  <div>
    <!--为echarts准备一个具备大小的容器dom-->
    <div><button @click="ajaxClick">测试服务。。。</button></div>
    <div id="main" style="width: 600px;height: 400px;"></div>
    <div id="bar" style="width:600px;height:400px;"></div>
    <div id="line" style="width:600px;height:400px;"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
      data () {
        return {
          charts: '',
          opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
          opinionData:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ]
        }
      },
      methods:{
        initChart (id) {
          return echarts.init(document.getElementById(id));
        } ,
        drawPie(id){
          console.log(this.$route)
          this.initChart(id)
            .setOption({
              tooltip: { // 提示框组件
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c} ({d}%)'
              },
              legend: {  // 图例组件展现了不同系列的标记(symbol)，颜色和名字
                orient: 'horizontal', //图例列表的布局朝向 horizontal -->横向显示  vertical --> 竖向显示
                //x: 'left',
                data:this.opinion
              },
              series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
                {
                  name:'访问来源',
                  type:'pie',
                  radius:['50%','70%'], // 饼图内半径 和外半径
                  avoidLabelOverlap: false, // 是否启用防止标签重叠策略，默认开启
                  label: { // 饼图图形上的文本标签
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'blod'
                      }
                    }
                  },
                  labelLine: { // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线。
                    normal: {
                      show: true
                    }
                  },
                  data:this.opinionData  // 系列中的数据内容数组。数组项可以为单个数值
                }
              ]
           })
        },
        drawBar (id) {
          this.initChart(id)
          .setOption({
            color: ['green'],
            tooltip : {
              trigger: 'item'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis : [ // 直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠
              {
                type : 'category', // 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: { // 坐标轴刻度相关设置
                    alignWithLabel: true
                }
              }
            ],
            yAxis : [ // 直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。
              {
                type : 'value' // 数值轴，适用于连续数据。
              }
            ],
            series : [
              {
                name:'直接访问',
                type:'bar',
                barWidth: '50%', // 柱条的宽度，不设时自适应。支持设置成相对于类目宽度的百分比。
                data:[10, 52, 200, 334, 390, 330, 220] //系列中的数据内容数组。数组项通常为具体的数据项
              }
            ]
          })
        },
        drawLine (id) {
          this.initChart(id)
            .setOption({
              title: {
                text: '折线图堆叠'
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              toolbox: { // 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                feature: { // 各工具配置项。
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  name:'邮件营销',
                  type:'line',
                  stack: '总量',
                  data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                  name:'联盟广告',
                  type:'line',
                  stack: '总量',
                  data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                  name:'视频广告',
                  type:'line',
                  stack: '总量',
                  data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                  name:'直接访问',
                  type:'line',
                  stack: '总量',
                  data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                  name:'搜索引擎',
                  type:'line',
                  stack: '总量',
                  data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
              ]
            })
        },
        ajaxClick() {
          this.$http.get('/apd').then(res=>{
            console.log('res...',res)
          },err=>{
            console.log('err...',err)
          })
          
        }
      },
      //调用
      mounted(){
          //this.$nextTick(function() {
              this.drawPie('main');
              this.drawBar('bar');
              this.drawLine('line');
          //})
      }
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>