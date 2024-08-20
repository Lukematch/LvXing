export const pieData = [
  { value: 40, name: 'Steam' },
  { value: 30, name: 'WeGame' },
  { value: 20, name: 'PlayStation' },
  { value: 10, name: 'EpicGames' },
  // { value: 0, name: 'Xbox' }
]
export const pieOption = {
  gird: {
    left: '3%',
    right: '4%',
    bottom: '10%',
  },
  title: {
    text: '黑猴预购数量',
    // subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    // orient: 'vertical',
    top: 'bottom'
  },
  series: [
    {
      name: '预购数量(万份)',
      type: 'pie',
      radius: ['20%', '80%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 16,
        borderColor: '#fff',
        borderWidth: 5
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: pieData
    }
  ]
}
