export const barData = {
  xAxis: ["北京", "上海", "广州", "深圳", "成都", "武汉", "长沙"],
  data1: [1000, 852, 620, 734, 490, 210, 190]
}

export const barOption = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '25%',
    containLabel: true
  },
  legend:{
    data: barData.xAxis,
    top: 'bottom',
  },
  title: {
    text: '各地区销售量',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function(params: any) {
      // 自定义tooltip显示内容
      // console.log(params);
      return `<span style="font-weight: bold;text-align: center;">销售量</span><br>
                <div style="
                width:100px;
                display: flex;
                justify-content: space-between;
                align-items: center;">
                  <span>${params.marker}${params.name}</span>
                  <span>${params.value}</span>
                </div>
              </span>`
    }
  },
  xAxis: [
    {
      type: 'category',
      data: barData.xAxis,
    }
  ],
  yAxis: [
    {
      type: 'value',
      data: barData.data1,
    }
  ],
  series: barData.xAxis.map((city, index) => ({
    name: city,
    type: 'bar',
    stack: '总量', // 使用stack属性将所有柱状图叠加在一起
    barWidth: '60%',
    data: barData.xAxis.map((_, i) => i === index ? barData.data1[index] : 0)
  }))

}