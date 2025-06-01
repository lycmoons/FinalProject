<template>
  <el-icon v-for="n in 3" :key="n" class="star-icon">
    <StarFilled />
  </el-icon>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import {StarFilled} from "@element-plus/icons-vue";

// 定义箱线图数据和样本值
const boxData = [10, 25, 50, 75, 100] // [最小值, Q1, 中位数, Q3, 最大值]
const sampleValue = 90          // 直接使用已知的样本值

// 计算样本值的大致位置（仅用于显示）
const calculateApproxPosition = (value) => {
  if (value <= boxData[0]) return '≤最小值'
  if (value <= boxData[1]) return '0-25%'
  if (value <= boxData[2]) return '25-50%'
  if (value <= boxData[3]) return '50-75%'
  if (value <= boxData[4]) return '75-100%'
  return '>最大值'
}

const positionLabel = calculateApproxPosition(sampleValue) // 计算大致位置标签

// 图表容器引用
const chartContainer = ref(null)

// 初始化图表
onMounted(() => {
  const chart = echarts.init(chartContainer.value)

  const option = {
    title: {
      text: '样本值在分布中的位置',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.seriesName === '样本点') {
          return `样本值: ${params.value[1].toFixed(1)}<br/>位置: ${positionLabel}`
        }
        return `
          最小值: ${boxData[0]}<br/>
          Q1: ${boxData[1]}<br/>
          中位数: ${boxData[2]}<br/>
          Q3: ${boxData[3]}<br/>
          最大值: ${boxData[4]}
        `
      }
    },
    xAxis: {
      type: 'category',
      data: [''],
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      name: '值',
      min: boxData[0], // 留出一些空间
      max: boxData[4]
    },
    series: [
      {
        name: '箱线图',
        type: 'boxplot',
        data: [boxData],
        itemStyle: {
          color: '#5470C6',
          borderColor: '#5470C6'
        }
      },
      {
        name: '样本点',
        type: 'scatter',
        data: [[0, sampleValue]], // 直接使用已知的sampleValue
        symbolSize: 12,
        itemStyle: {
          color: '#EE6666'
        },
        label: {
          show: true,
          formatter: `${sampleValue.toFixed(1)}`,
          position: 'top',
          color: '#EE6666'
        }
      }
    ]
  }

  chart.setOption(option)

  // 响应式调整
  const resizeChart = () => chart.resize()
  window.addEventListener('resize', resizeChart)

  // 组件卸载时清理
  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    chart.dispose()
  })
})
</script>

<style scoped>
.boxplot-container {
  width: 100%;
  height: 400px;
}

.star-icon {
  color: gold;
  font-size: 24px; /* 可选，改变大小 */
  margin-right: 4px; /* 可选，调整星星间距 */
}
</style>