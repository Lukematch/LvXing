import * as echarts from 'echarts'
import styles from './index.module.less'
import { useEffect, useRef, useState } from 'react';
import { pieOption, pieData } from '../chartOptions/pieCharts.columns';
import { lineOption, lineData } from '../chartOptions/lineCharts.columns';
import { barData, barOption } from '../chartOptions/barCharts.columns';
import { scatterData, scatterOption } from '../chartOptions/scatterCharts.columns';
import { graphOrgData, graphOrgOption } from '@/pages/SmartAdministration/organizationalStructure/columns';
import { Spin } from 'antd';
import {
  LoadingOutlined
} from '@ant-design/icons';

const CustomCharts = (props: { type: string, width: any, height: any}) => {
  const [data, setData]: any = useState([])
  const [option, setOption] = useState({})

  const chartRef = useRef<HTMLDivElement>(null)
  const customChart = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    // 拿取对应charts 数据 配置
    switch (props.type) {
      case 'bar':
        // 设置柱状图数据和配置
        setData(barData)
        setOption(barOption)
        break;
      case 'line':
        // 设置折线图数据和配置
        setData(lineData)
        setOption(lineOption)
        break;
        // 饼图
      case 'pie':
        setData(pieData);
        setOption(pieOption);
        break;
        // 散点图
      case 'scatter':
        setData(scatterData)
        setOption(scatterOption)
        break;
      case 'graph_org':
        graphOrgOption().then(option => {
          setOption(option)
        })
        // setData(graphOrgData)
        break;
      default:
        break;
    }
  }, [props.type]); // 当 props.type 变化时更新图表配置

  useEffect(() => {
    if (chartRef.current && option) {
      customChart.current = echarts.init(chartRef?.current)
      option && customChart.current?.setOption(option)
      // console.log(customChart.current);
    }
    return () => {
      // 组件卸载时销毁图表实例
      if (customChart.current) {
        customChart.current.dispose();
      }
    }

  }, [option]); // 当 option 变化时重新渲染图表


  return <>
    {option? <div ref={chartRef} style={{ width: props.width, height: props.height, display: 'flex', justifyContent: 'center'}} className={styles.customChart} ></div>:
    <Spin indicator={<LoadingOutlined spin />} />
    }
  </>
}

export default CustomCharts;
