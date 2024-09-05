import { getOrangizationList } from "../orangization/server"

export const graphOrgData = async () => {
  const res = await getOrangizationList();
  console.log(res.data);
  return [
    {
      name: '组织架构',
      children: res.data
    }
  ]
};

export const graphOrgOption = async () => {
  const data = await graphOrgData();
  return {
    grid: {
      // left: '5%',
      // right: '5%',
      bottom: '30%',
      containLabel: true
    },
    tooltip: {
      trigger: 'item',  // 在节点上显示提示
      triggerOn: 'mousemove',
      formatter: function (params: any) {
        return params.name;  // 只显示名称
      }
    },
    // animationDurationUpdate: 1200,
    expandAndCollapse: true,  // 支持节点折叠展开
    animationDuration: 750,  // 动画时长
    // animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'tree',
        layout: 'orthogonal',
        // symbolSize: 50,
        // symbol: 'roundRect',
        symbol: 'rect',
        symbolSize: [60, 40],
        roam: true,
        orient: 'TB',  // 'TB'表示从上到下，'LR'表示从左到右
        edgeShape: 'polyline',
        edgeSymbol: ['none', 'none'],
        // edgeSymbolSize: [0, 10],
        label: {
          verticalAlign: 'middle',
          align: 'middle',
        },
        edgeLabel: {
          fontSize: 12
        },
        lineStyle: {
          curveness: 0,  // 使连接线为直线
          width: 2
        },
        // symbolSize: 7,
        edgeForkPosition: '30%',
        // initialTreeDepth: 3,
        emphasis: {
          focus: 'descendant'
        },
        data: data
      }
    ]
  }
}