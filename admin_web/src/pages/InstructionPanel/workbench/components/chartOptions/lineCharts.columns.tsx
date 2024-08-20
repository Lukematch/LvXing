export const lineData = {
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  data1: [820, 932, 901, 934, 1290, 1330, 1320, 1200, 1222, 1333, 1400, 1500]
}

export const lineOption = {
  grid: {
    bottom: '10%',
    left: '2%',  // 通过调整 left 的值来改变 yAxis 所占的宽度
    right: 0,
    containLabel: true
  },
  title: {
    text: '2024年销售趋势',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['销售额'],
    top: 'bottom'
  },
  xAxis: {
    type: 'category',
    data: lineData.xAxis
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value: number) => {
        if (value >= 1000) {
          return `${(value / 1000).toFixed(0)}k`;
        }
        return value;
      }
    }
  },
  series: [
    {
      name: '销售额',
      type: 'line',
      data: lineData.data1
    }
  ]
}