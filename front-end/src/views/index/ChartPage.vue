<script setup>
import {onMounted, reactive} from "vue";
import {ArrowDownBold, ArrowUpBold, Clock} from "@element-plus/icons-vue";
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import router from "@/router/index.js";
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
])

function checkNewsDetail(id) {
  router.push({
    name: 'news-content',
    params: {
      id: id
    }
  })
}

const form = reactive({
  industries: [
      '商业', '高压临电', '房地产经营开发',
      '其他服务', '食品加工', '仓储物流',
      '集成电路', '设备制造', '材料加工',
      '办公', '城市基础设施', '汽车',
      '数据服务', '生物医药', '教育科研',
      '充换电服务业'
  ],
  companies: [
    {
      uid: 'hh',
      name: '上海张江高科技园区开发股份有限公司',
      industry: '商业'
    },
    {
      uid: 'hh',
      name: '中国银联股份有限公司',
      industry: '商业'
    },
    {
      uid: 'hh',
      name: '上海透景生命科技股份有限公司',
      industry: '高压临电'
    },
    {
      uid: 'hh',
      name: '上海上房物业服务股份有限公司',
      industry: '高压临电'
    },
    // ...
  ],
  companyInfo: {
    yearList: [ '2020', '2021', '2022', '2023', '2024' ],    // 年份顺序
    profits: [ 1.3, 1.44, 2.84, 3.23, 4.01 ],     // 归母净利润
    rate: [ 165.99, 11.54, 96.37, 13.91, 23.93 ],        // 同比
    money: [ 6.14, 9.56, 12.97, 17.97, 34.88 ],       // 总资产
    debt: [ 3.42, 5.04, 6.21, 7.99, 8.31 ],        // 总负债
    debt_rate: [ 55.79, 52.73, 47.88, 44.45, 23.82 ],   // 负债率
    relatedNews: [
      {
        id: '1',
        photo_url: 'data:image/jpeg;base64,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',
        title: 'US banks\' uninsured deposits continue to fall as regulators sharpen their focus',
        time: '3 hours ago',
        type: 'Top Article'
      },
      {
        id: '2',
        photo_url: 'data:image/jpeg;base64,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',
        title: 'TIAA\' bank sale boosts US life insurers\' residential mortgage investments',
        time: '2 hours ago',
        type: 'Top Article'
      },
      {
        id: '3',
        photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4WCsdOUVxlzoSB7-92whplkzvylx1d2rEzDdu2IoPn5upS6coV5ZibDBzb7t23A9CWvWezw&s',
        title: '2023 Big Picture: US Consumer Survey Result',
        time: '4 hours ago',
        type: 'Top Article'
      },
    ],        // 与该公司相关的新闻
    stackInfo: {
      dateList: ['5-1', '5-2', '5-3', '5-4', '5-5'],     // 日期列表
      value: [5, 5.5, 6.5, 6, 5.7]     // 市值
    }                      // 公司股票信息
  },
  openedIndustry: [ 0 ],
  openedCompany: [ ],
  industryIndex: 0,
  companyIndex: 0,
  loading:true,
  navLoading: true,
  showIndustry: true,
  industryInfo:{
    chart: {
      date: [
        '2023-01-01', '2023-01-02', '2023-01-03',
        '2023-01-04', '2023-01-05', '2023-01-06',
        '2023-01-07', '2023-01-08', '2023-01-09',
        '2023-01-10'
      ],
      volume: [120, 200, 150, 80, 70, 110, 130, 90, 180, 60]
    },
    table:[
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
      {
        date: '2021/11/1',        // 日期
        code: '801030.SI',        // 行业代码
        open: '5014.9',        // 开盘价
        close: '5023.04',       // 收盘价
        turnOver: '1.23259E+11',    // 成交量
        totalShare: '1256771311'   // 总股数
      },
    ]
  },
  option: {},
  option1: {},
  option2: {},
  option3: {}
})


function checkIndustryChart(index) {
  form.industryIndex = index
  form.showIndustry = true
  form.loading = true
  getIndustryInfo()
}

function getIndustryInfo() {
  setTimeout(()=>{
    form.option = {
      title: {
        text: '行业市值',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: form.industryInfo.chart.date,
        axisLabel: {
          rotate: 30,
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '市值',
          type: 'bar',
          data: form.industryInfo.chart.volume,
          itemStyle: {
            color: '#5470C6'
          },
          label: {
            show: true,
            position: 'top'
          }
        }
      ]
    }
    form.loading = false
  },1500)
}

function clickIndustry(index){
  const i = form.openedIndustry.indexOf(index)
  if(i !== -1) {
    form.openedIndustry.splice(i, 1)
  }
  else {
    form.openedIndustry.push(index)
  }
}

function openCompany(index) {
  const i = form.openedCompany.indexOf(index)
  if(i !== -1) {
    form.openedCompany.splice(i, 1)
  }
  else {
    form.openedCompany.push(index)
  }
}

function checkCompanyInfo(c_index){
  form.showIndustry = false
  form.companyIndex = c_index
  form.loading = true
  getCompanyInfo()
}

function getCompanyInfo() {
  setTimeout(()=>{
    form.option1 = {
      title: {
        text: '利润图',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          let result = `${params[0].axisValue}<br/>`
          params.forEach(item => {
            // 使用对应系列的颜色和形状
            const marker = `
        <span style="
          display:inline-block;
          margin-right:5px;
          border-radius:${item.seriesType === 'bar' ? '2px' : '50%'};
          width:10px;
          height:10px;
          background-color:${item.color};
        "></span>
      `
            const unit = item.seriesName === '归母净利润' ? '亿' : '%'
            result += `${marker} ${item.seriesName}: ${item.data}${unit}<br/>`
          })
          return result
        }
      },
      legend: {
        data: ['归母净利润', '同比'],
        top: 30
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: form.companyInfo.yearList,
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '归母净利润(亿)',
          min: 0,
          axisLine: {
            show: true
          },
          axisLabel: {
            formatter: '{value}'
          },
          axisPointer: {
            show: false  // 隐藏y轴值指示线
          }
        },
        {
          type: 'value',
          name: '同比(%)',
          min: 0,
          axisLine: {
            show: true
          },
          axisLabel: {
            formatter: '{value}%'
          },
          axisPointer: {
            show: false  // 隐藏y轴值指示线
          }
        }
      ],
      series: [
        {
          name: '归母净利润',
          type: 'bar',
          data: form.companyInfo.profits,
          itemStyle: {
            color: '#5470C6'
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}亿'
          }
        },
        {
          name: '同比',
          type: 'line',
          yAxisIndex: 1,
          data: form.companyInfo.rate,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#edbd0c'
          },
          label: {
            show: true,
            formatter: '{c}%'
          },
          lineStyle: {
            width: 3
          }
        }
      ]
    }

    form.option2 = {
      title: {
        text: '资产负债图',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          let result = `${params[0].axisValue}<br/>`
          params.forEach(item => {
            // 使用对应系列的颜色设置marker样式
            const marker = `
        <span style="
          display:inline-block;
          margin-right:5px;
          border-radius:${item.seriesType === 'bar' ? '2px' : '50%'};
          width:10px;
          height:10px;
          background-color:${item.color};
        "></span>
      `
            const unit = item.seriesName === '负债率' ? '%' : '亿'
            result += `${marker} ${item.seriesName}: ${item.data}${unit}<br/>`
          })
          return result
        }
      },
      legend: {
        data: ['总资产', '总负债', '负债率'],
        top: 30
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: form.companyInfo.yearList,
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '金额(亿)',
          min: 0,
          axisLine: {
            show: true
          },
          axisLabel: {
            formatter: '{value}'
          },
          axisPointer: {
            show: false
          }
        },
        {
          type: 'value',
          name: '负债率(%)',
          min: 0,
          max: 100,
          axisLine: {
            show: true
          },
          axisLabel: {
            formatter: '{value}%'
          },
          axisPointer: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '总资产',
          type: 'bar',
          barGap: 0,
          barWidth: '30%',
          data: form.companyInfo.money,
          itemStyle: {
            color: '#5470C6'
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}亿'
          }
        },
        {
          name: '总负债',
          type: 'bar',
          barWidth: '30%',
          data: form.companyInfo.debt,
          itemStyle: {
            color: '#EE6666'
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}亿'
          }
        },
        {
          name: '负债率',
          type: 'line',
          yAxisIndex: 1,
          data: form.companyInfo.debt_rate,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#edbd0c'
          },
          label: {
            show: true,
            formatter: '{c}%'
          },
          lineStyle: {
            width: 3
          }
        }
      ]
    }

    form.option3 = {
      title: {
        text: '股票市值',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          let result = `${params[0].axisValue}<br/>`
          params.forEach(item => {
            const marker = `
          <span style="
            display:inline-block;
            margin-right:5px;
            border-radius:50%;
            width:10px;
            height:10px;
            background-color:${item.color};
          "></span>
        `
            result += `${marker} ${item.seriesName}: ${item.data}亿<br/>`
          })
          return result
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        name: '日期',
        data: form.companyInfo.stackInfo.dateList,
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value',
        name: '市值(亿)',
        axisLine: {
          show: true
        },
        axisLabel: {
          formatter: '{value}'
        },
        axisPointer: {
          show: false
        }
      },
      series: [
        {
          name: '市值',
          type: 'line',
          data: form.companyInfo.stackInfo.value,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#5470C6'
          },
          label: {
            show: true,
            formatter: '{c}亿'
          },
          lineStyle: {
            width: 3
          }
        }
      ]
    }
    form.loading = false
  }, 1500)
}

function getNavInfo(){
  form.navLoading = true
  setTimeout(() => {
    form.navLoading=false
    getIndustryInfo()
  }, 1500)
}

// 初始化
onMounted(() => {
  getNavInfo()
})

</script>


<template>
  <div class="chart">
    <div class="nav">
      <div v-if="!form.navLoading" style="margin-top: 40px;margin-left: 40px;margin-bottom: 60px">
        <div style="margin-bottom: 20px" v-for="(industry, index) in form.industries">
          <div @click="clickIndustry(index)" class="industry" :class="{selected: form.openedIndustry.indexOf(index) !== -1}">
            <el-icon v-if="form.openedIndustry.indexOf(index) === -1" style="font-size: 20px"><ArrowDownBold /></el-icon>
            <el-icon v-if="form.openedIndustry.indexOf(index) !== -1" style="font-size: 20px;"><ArrowUpBold /></el-icon>
            <span style="font-size: 20px;margin-left: 5px">{{industry}}</span>
          </div>


          <div style="margin-left: 35px;margin-top: 5px;margin-bottom: 15px" v-if="form.openedIndustry.indexOf(index) !== -1">

            <div @click="checkIndustryChart(index)" class="chart-industry" :class="{selected: form.showIndustry && form.industryIndex === index}">
              <span>行业分析图表</span>
            </div>


            <div @click="openCompany(index)" class="company" :class="{selected: form.openedCompany.indexOf(index) !== -1}" style="margin-top: 5px">
              <el-icon v-if="form.openedCompany.indexOf(index) === -1" style="font-size: 16px"><ArrowDownBold /></el-icon>
              <el-icon v-if="form.openedCompany.indexOf(index) !== -1" style="font-size: 16px;"><ArrowUpBold /></el-icon>
              <span style="margin-left: 5px">公司股票分析</span>
            </div>

            <div class="allTheCompanies" v-if="form.openedCompany.indexOf(index) !== -1">
              <div v-for="(company,c_index) in form.companies" style="margin-left: 35px;margin-top: 5px">
                <div v-if="company.industry === industry">
                  <span @click="checkCompanyInfo(c_index)" class="companyName" :class="{selected:!form.showIndustry&&form.companyIndex===c_index}">{{company.name}}</span>
                </div>
              </div>
            </div>
          </div>

          <hr style="margin-top: 20px"/>
        </div>
      </div>

      <div style="margin-top: 40vh;margin-left: 100px" class="loading">
        <svg v-if="form.navLoading" class="loading rect" width="50" height="50" viewbox="0 0 50 50">
          <polygon points="0 0 0 50 50 50 50 0" class="polygon" />
        </svg>
      </div>
    </div>


    <div class="ctt">

      <div v-if="form.showIndustry" class="industryChart">
        <div v-if="!form.loading" style="padding: 10px 10px 10px 10px" class="industry-chart">
          <v-chart class="chart" :option="form.option" style="height: 100%;width: 100%"/>
        </div>
        <hr v-if="!form.loading" style="width: 100%;margin-bottom: 30px"/>
        <div v-if="!form.loading" class="industry-table">
          <el-table v-if="!form.loading" :data="form.industryInfo.table" style="width: 90%; flex: 1;margin-bottom: 10px">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="code" label="行业代码"></el-table-column>
            <el-table-column prop="open" label="开盘价"></el-table-column>
            <el-table-column prop="close" label="收盘价"></el-table-column>
            <el-table-column prop="turnOver" label="成交量"></el-table-column>
            <el-table-column prop="totalShare" label="总股价"></el-table-column>
          </el-table>
        </div>

        <div class="loading">
          <svg v-if="form.loading" class="loading rect" width="50" height="50" viewbox="0 0 50 50">
            <polygon points="0 0 0 50 50 50 50 0" class="polygon" />
          </svg>
        </div>
      </div>

      <div v-if="!form.showIndustry" class="companyChart">
        <div v-if="!form.loading" class="top">
          <div class="related-news">
            <div v-for="article in form.companyInfo.relatedNews">
              <div @click="checkNewsDetail(article.id)" class="article">
                <img v-if="article.photo_url !== ''" class="article-img" :src="article.photo_url" alt="photo"/>
                <div style="display: flex;flex-direction: column">
                  <h3>{{article.title}}</h3>
                  <div style="display: flex;flex-direction: row;color: grey;align-items: center">
                    <el-icon><Clock /></el-icon>
                    <span style="margin-left: 5px">{{article.time}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="stack-chart">
            <v-chart class="chart" :option="form.option3" style="height: 100%;width: 100%" />
          </div>
        </div>
        <hr v-if="!form.loading" style="width: 100%;margin-bottom: 30px"/>
        <div v-if="!form.loading" class="bottom">
          <div style="padding: 10px 10px 10px 10px" class="company-profit">
            <v-chart class="chart" :option="form.option1" style="height: 100%;width: 100%" />
          </div>

          <div class="company-debt">
            <v-chart class="chart" :option="form.option2" style="height: 100%;width: 100%" />
          </div>
        </div>
        <div class="loading">
          <svg v-if="form.loading" class="loading rect" width="50" height="50" viewbox="0 0 50 50">
            <polygon points="0 0 0 50 50 50 50 0" class="polygon" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.industry,
.companyName,
.chart-industry,
.company {
  transition: all 0.3s ease;
  color: grey;
}

.company.selected{
  color: #1976d2;
}

.companyName.selected{
  color: #1976d2;
  text-decoration: underline;
  text-decoration-color: #1976d2;
}

.industryChart,
.companyChart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.industry-chart,
.industry-table{
  flex: 1;
}

.industry-table{
  overflow-y: auto;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.company-debt,
.company-profit{
  flex: 1;
}


.stack-chart{
  flex: 1;
  height: 100%;
  width: 100%;
}

.related-news{
  overflow-y: auto;
  max-height: 400px;
  width: 400px;
}


.industry-chart{
  height: 100%;
  width: 100%;
}

.companyName:hover,
.industry:hover,
.chart-industry:hover,
.company:hover {
  color: black;
}

.industry.selected{
  color: #1976d2;
}

.top,
.bottom{
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}



.chart-industry.selected{
  color: #1976d2;
  text-decoration: underline;
  text-decoration-color: #1976d2;
}

.chart{
  height: 92vh;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.nav{
  width: 300px;
  overflow-y: auto;
  max-height: 100%;
  margin-right: 50px;
  cursor: pointer;
}

.ctt{
  flex: 1;
  margin-top: 30px;
}

.rect .polygon {
  fill: none;
  stroke-width: 8px;
  stroke: black;
  stroke-dasharray: 50;
  stroke-dashoffset: 50%;
  animation: rect 1.3s forwards infinite;
}

@keyframes rect {
  to {
    stroke-dashoffset: 250%;
  }
}

.article {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  transition: all 0.3s ease-in;
}

.article-img {
  width: 150px;
  height: 110px;
  margin-right: 20px;
  margin-left: 20px;
}

.article:hover{
  border-radius: 20px;
  background: #f5f5f5;
  box-shadow: inset 20px 20px 60px #d0d0d0,
  inset -20px -20px 60px #ffffff;
}

.article:hover h3{
  color: blue;
}

h3{
  transition: all 0.3s ease-in;
}
</style>