<template>
  <div class="app-container">
    <!-- :model的作用是，当用户在input框或者input框数据有变化时，自动将值赋值给变量，变量值自动更新,表单默认是字典类型 -->
    <el-form  :model="bmc" label-width="120px">
      <el-row>
        <el-col v-for="item in formItems" :key="item.prop" span="3">
          <!-- key的取值是通过item.prop变量，span取值是取赋值的变量3 -->
          <el-form-item :label="item.label">
            <el-input v-model="bmc[item.prop]" /> 
            <!-- v-model 就是 vue 的双向绑定的指令，能将页面上控件输入的值同步更新到相关绑定的data属性，也会在更新data绑定属性时候，更新页面上输入控件的值，双向自更新与赋值，可以通过v-model取值 -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="3">
          <el-form-item label="是否显示结果">
            <el-switch v-model="showResult" active-color="#13ce66" inactive-color="#D3D3D3" @change="getbmc"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showResult">
        <el-col span="500">
          <el-form-item label="结果">
            <el-input type="textarea" v-model="bmc.textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item>
            <el-button type="primary" @click="getbmc">查询</el-button>
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
      bmc: {},
      formItems: [
        // 请求参数
        { label: '区域', prop: 'location' },
        { label: 'armserverId', prop: 'armserverId' },
        { label: 'owner', prop: 'owner' },
        { label: '电源状态', prop: 'powerStatus' },
        { label: '页数', prop: 'pageNum' },
        { label: '页大小', prop: 'pageSize' }
      ],

      tableColumns: [
        // 要展示的响应参数
        { label: 'ID', prop: 'id' },
        { label: 'mac地址', prop: 'mac' },
        { label: '位置', prop: 'position' },
        { label: '区域', prop: 'location' },
        { label: '电源状况', prop: 'powerStatus' },
        { label: '系统状况', prop: 'sysStatus' },
        { label: 'IP', prop: 'ip' },
        { label: '子网掩码', prop: 'netmask' },
        { label: '网关', prop: 'gateway' },
        { label: 'VLAN', prop: 'vlan' },
        { label: 'CPU型号', prop: 'CPU' },
        { label: '内存', prop: 'memory' },
        { label: '存储', prop: 'storage' },
        { label: 'CPU核心数', prop: 'CPUCores' },
        { label: '空闲CPU核心数', prop: 'freeCPUCores' },
        { label: '空闲内存', prop: 'freeMemory' },
        { label: '空闲存储', prop: 'freeStorage' },
        { label: '负责人', prop: 'owner' },
        { label: 'armserverId', prop: 'armserverId' }
      ],
      showResult: false
    }
  },
  methods: {
    getbmc() {
      let params = {}  //定义请求参数
      for (let item of this.formItems) {
        let propkey=item.prop
        if (this.bmc[propkey]) {
          params[propkey] = this.bmc[propkey]  //如果请求参数有值，就拼接到请求中
        }
      }
      axios.get('http://localhost:9999/testapi/bmcapi/v1/bmc/armcards', { params }).then(res => {
        this.bmc.textarea=JSON.stringify(res.data.armcards)
        const tableData = res.data.armcards.map(item => {
          const tableItem = {}
          for (let column of this.tableColumns) { //按照设定的响应参数，将结果数据映射到表格中
            tableItem[column.prop] = item[column.prop]
          }
          return tableItem
        })
        this.tableData = tableData
      })
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