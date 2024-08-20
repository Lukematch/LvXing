const weeks = [
  '20周', '21周', '22周', '23周', '24周', '25周', '26周','27周','28周','29周','30周','31周','32周','33周'
];
const days = [
  '周六', '周五', '周四',
  '周三', '周二', '周一', '周日'
];
export const scatterData = {
  data: [
    [0,0,1],[0,1,5],[0,2,3],[0,3,1],[0,4,1],[0,5,1],[0,6,0],
    [1,0,0],[1,1,1],[1,2,2],[1,3,1],[1,4,1],[1,5,4],[1,6,0],
    [2,0,0],[2,1,2],[2,2,1],[2,3,0],[2,4,1],[2,5,2],[2,6,0],
    [3,0,0],[3,1,1],[3,2,0],[3,3,1],[3,4,1],[3,5,1],[3,6,0],
    [4,0,0],[4,1,2],[4,2,2],[4,3,0],[4,4,1],[4,5,5],[4,6,0],
    [5,0,0],[5,1,1],[5,2,1],[5,3,1],[5,4,1],[5,5,1],[5,6,0],
    [6,0,0],[6,1,1],[6,2,4],[6,3,1],[6,4,1],[6,5,1],[6,6,2],
    [7,0,1],[7,1,1],[7,2,1],[7,3,4],[7,4,1],[7,5,1],[7,6,0],
    [8,0,0],[8,1,1],[8,2,0],[8,3,1],[8,4,1],[8,5,1],[8,6,0],
    [9,0,0],[9,1,1],[9,2,6],[9,3,1],[9,4,1],[9,5,1],[9,6,0],
    [10,0,0],[10,1,0],[10,2,0],[10,3,1],[10,4,1],[10,5,1],[10,6,0],
    [11,0,0],[11,1,0],[11,2,2],[11,3,2],[11,4,3],[11,5,1],[11,6,1],
    [12,0,2],[12,1,0],[12,2,0],[12,3,0],[12,4,0],[12,5,5],[12,6,0],
    [13,0,0],[13,1,2],[13,2,1],[13,3,0],[13,4,1],[13,5,1],[13,6,3],
  ].map((item) => {
    return [item[0], item[1], item[2]];
  })
}

export const scatterOption = {
  title: {
    text: 'Punch of Github',
    left: 'center'
  },
  legend: {
    data: ['Punch Card'],
    bottom: 'bottom'
  },
  tooltip: {
    position: 'top',
    formatter: (params: any) => {
      return (
        params.value[2] +
        ' commits on ' +'第'+
        weeks[params.value[0]] +
        ' ' +
        days[params.value[1]]
      );
    }
  },
  grid: {
    left: 0,
    bottom: '10%',
    right: 10,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: weeks,
    boundaryGap: false,
    splitLine: {
      show: true
    },
    axisLine: {
      show: false
    }
  },
  yAxis: {
    type: 'category',
    data: days,
    axisLine: {
      show: false
    }
  },
  series: [
    {
      name: 'Punch Card',
      type: 'scatter',
      symbolSize: function (val: any) {
        return val[2] * 2;
      },
      data: scatterData.data,
      animationDelay: function (idx: any) {
        return idx * 5;
      }
    }
  ]
};