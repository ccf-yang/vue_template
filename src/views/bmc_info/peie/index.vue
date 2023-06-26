<template>
    <div class="app-container">
      <!-- :model的作用是，当用户在input框或者input框数据有变化时，自动将值赋值给变量，变量值自动更新,表单默认是字典类型 -->
      <el-form  :model="bmc" label-width="120px">
        <el-row>
          <el-col v-for="item in formItems" :key="item.prop" span=3>
            <!-- key的取值是通过item.prop变量，span取值是取赋值的变量3 -->
            <el-form-item :label="item.label">
              <el-input v-model="bmc[item.prop]" /> 
              <!-- v-model 就是 vue 的双向绑定的指令，能将页面上控件输入的值同步更新到相关绑定的data属性，也会在更新data绑定属性时候，更新页面上输入控件的值，双向自更新与赋值，可以通过v-model取值 -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span=3>
            <el-form-item label="是否显示结果">
              <el-switch v-model="showResult" active-color="#13ce66" inactive-color="#D3D3D3" @change="getbmc"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="showResult">
          <el-col span=500>
            <el-form-item label="结果">
              <el-input type="textarea" v-model="bmc.textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span=24>
            <el-form-item>
              <el-button type="primary" @click="getbmc">配置</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  
      <el-table :data="tableData">
        <!-- data取自data()中的变量，:就是取自变量 -->
        <el-table-column v-for="column in tableColumns" :prop="column.prop" :label="column.label"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data() {
      return {
        tableData: [],
        bmc: {
            location: 'shanghai', //设置的默认值
            CPUCoresQuota:"16",
            memoryQuota:"24",
            storageQuota:"360",
            userID:"98"
        },
        formItems: [
          // 请求参数
          { label: '区域', prop: 'location' },
          { label: 'cpu核心数配额', prop: 'CPUCoresQuota' },
          { label: '内存配额', prop: 'memoryQuota' },
          { label: '硬盘配额', prop: 'storageQuota' },
          { label: '用户id', prop: 'userID' }
        ],
  
        tableColumns: [
          // 要展示的响应参数
          { label: '区域', prop: 'location' },
          { label: 'cpu配额', prop: 'CPUCoresQuota' },
          { label: '内存配额', prop: 'memoryQuota' },
          { label: '硬盘配额', prop: 'storageQuota' },
          { label: 'cpu使用情况', prop: 'CPUCoresUsage' },
          { label: '内存使用情况', prop: 'memoryUsage' },
          { label: '硬盘使用情况', prop: 'storageUsage' },
          { label: '用户id', prop: 'userID' }
        ],
        showResult: false
      }
    },
    methods: {
      async getbmc() {
        try {
          let quotas = {}  //定义请求参数
          for (let item of this.formItems) {
            let propkey=item.prop
            if (this.bmc[propkey]) {
                quotas[propkey] = this.bmc[propkey]  //如果请求参数有值，就拼接到请求中
            }
          }
          quotas = {"quotas": [quotas]} ; //将请求参数转换成真实请求的参数
          const res = await axios.post('http://localhost:9999/testapi/bmcapi/v1/bmc/quota', quotas )
          this.bmc.textarea=JSON.stringify(res.data.quotas)
          const tableData = res.data.quotas.map(item => {
            const tableItem = {}
            for (let column of this.tableColumns) { //按照设定的响应参数，将结果数据映射到表格中
              tableItem[column.prop] = item[column.prop]
            }
            return tableItem
          })
          this.tableData = tableData
        } catch (error) {
          console.error(error)
        }
      },
      onCancel() {
        this.bmc={}
        this.tableData = []
      }
    }
  }
  </script>
  
  <style scoped>
  .app-container {
    margin: 20px;
  }
  </style>