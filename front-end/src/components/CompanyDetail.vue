<template>
  <div class="company">
    <div class="headLine">
      <div class="headImg">
        <img :src="logo" alt="logo" style="height: 85px; width: auto"/>
      </div>

      <div class="headTitle">
        <h1>企业详情</h1>
      </div>
    </div>
    <div class="company-detail">
      <div class="companyCard" v-if="!form.loading">
        <el-card class="card" shadow="hover">
          <div class="section-title">基础信息</div>
          <el-descriptions :column="3" border>
            <el-descriptions-item label="UID">{{ form.company.uid }}</el-descriptions-item>
            <el-descriptions-item label="户号">{{ form.company.account }}</el-descriptions-item>
            <el-descriptions-item label="企业名称">{{ form.company.name }}</el-descriptions-item>
            <el-descriptions-item label="统一社会信用代码">{{ form.company.credit }}</el-descriptions-item>
            <el-descriptions-item label="企业类型">{{ form.company.type }}</el-descriptions-item>
            <el-descriptions-item label="企业领域">{{ form.company.label }}</el-descriptions-item>
            <el-descriptions-item label="企业规模">{{ form.company.scale }}</el-descriptions-item>
            <el-descriptions-item label="登记状态">{{ form.company.state }}</el-descriptions-item>
            <el-descriptions-item label="企查分">{{ form.company.score }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card class="card" shadow="hover">
          <div class="section-title">注册信息</div>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="注册资本">{{ form.company.registerCapital }}</el-descriptions-item>
            <el-descriptions-item label="实缴资本">{{ form.company.realCapital }}</el-descriptions-item>
            <el-descriptions-item label="纳税人资质">{{ form.company.qualification }}</el-descriptions-item>
            <el-descriptions-item label="成立日期">{{ form.company.date }}</el-descriptions-item>
            <el-descriptions-item label="营业期限">{{ form.company.ddl }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card class="card" shadow="hover">
          <div class="section-title">经营信息</div>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="人员规模">{{ form.company.employeeScale }}</el-descriptions-item>
            <el-descriptions-item label="参保人数">{{ form.company.insuredEmployee }}</el-descriptions-item>
            <el-descriptions-item label="国标行业">{{ form.company.nationalStandard }}</el-descriptions-item>
            <el-descriptions-item label="经营范围">{{ form.company.businessScope }}</el-descriptions-item>
            <el-descriptions-item label="企业标签">
              <el-tag v-for="tag in form.company.tag" :key="tag" type="info" style="margin-right: 5px">{{ tag }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
      <div class="loading">
        <svg v-if="form.loading" class="loading rect" width="50" height="50" viewbox="0 0 50 50">
          <polygon points="0 0 0 50 50 50 50 0" class="polygon" />
        </svg>
      </div>
    </div>
  </div>

</template>

<script setup>
import {onMounted, reactive} from 'vue'
import {useRoute} from "vue-router";
import logo from '@/assets/logo.png'

const route = useRoute()

const form = reactive({
  company: {
    uid: route.params.uid,
    account: '',
    name: '',
    label: '',
    scale: '',
    state: '',
    score: '',
    credit: '',
    tag: [],
    date: '',
    ddl: '',
    qualification: '',
    registerCapital: '',
    realCapital: '',
    type: '',
    employeeScale: '',
    insuredEmployee: '',
    nationalStandard: '',
    businessScope: ''
  },
  loading: true
})

function getCompanyDetail() {
  setTimeout(() => {
    form.company = {
      uid: 'UID00003',
      account: '60328467',
      name: '西门子(上海)电气传动设备有限公司',
      label: '----',
      scale: '中型',
      state: '存续（在营、开业、在册）',
      score: '897',
      credit: '9131011574269999X9',
      tag: ['高新技术企业', '专精特新中小企业', '绿色制造'],
      date: '2002/9/12',
      ddl: '2042/9/11',
      qualification: '一般纳税人',
      registerCapital: '100万美元',
      realCapital: '100万美元',
      type: '有限责任公司（外国法人独资）',
      employeeScale: '300-399人',
      insuredEmployee: '326',
      nationalStandard: '（C3499）',
      businessScope: '研发、设计和制造变频器、提供相关系统集成的设计、安装、调试和维护，销售自产产品；电子元器件、电器元件、变频器配件和标准件的批发和进出口，并提供相关的技术咨询和技术服务（涉及配额许可证管理、专项规定管理的商品按照国家有关规定办理）（涉及行政许可的，凭许可证经营）。'
    }
    form.loading = false;
  }, 2000)
}

onMounted(() => {
  getCompanyDetail()
})
</script>

<style scoped>
.company {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.headLine {
  background-color: #191a1f;
  height: 120px;
  color: white;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}

.headImg {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.headTitle {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-detail {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.card {
  padding: 10px;
  margin-bottom: 15px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
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
</style>
