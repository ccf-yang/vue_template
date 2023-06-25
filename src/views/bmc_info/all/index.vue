<template>
  <div class="app-container">
    <el-form ref="bmc" :model="form" label-width="120px">
      <el-row>
        <el-col :span="3">
          <el-form-item label="区域">
            <el-input v-model="bmc.location" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="armserverId">
            <el-input v-model="bmc.serverid" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="owner">
            <el-input v-model="bmc.owner" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="电源状态">
            <el-input v-model="bmc.powerstatus" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="页数">
            <el-input v-model="bmc.pagenum" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="页大小">
            <el-input v-model="bmc.pagesize" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否显示结果">
            <!-- 通过开关控件来控制，是否展示结果json -->
            <el-switch v-model="showResult" active-color="#13ce66" inactive-color="#D3D3D3" @change="getbmc"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showResult">
        <el-col :span="500">
          <el-form-item label="结果">
            <el-input type="textarea" v-model="bmc.textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="getbmc">查询</el-button>
            <el-button @click="onCancel">取消</el-button>
            <el-button @click="getbmc2">test</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="mac" label="mac地址"></el-table-column>
      <el-table-column prop="position" label="位置"></el-table-column>
      <el-table-column prop="location" label="区域"></el-table-column>
      <el-table-column prop="powerStatus" label="电源状况"></el-table-column>
      <el-table-column prop="sysStatus" label="系统状况"></el-table-column>
      <el-table-column prop="ip" label="IP"></el-table-column>
      <el-table-column prop="netmask" label="子网掩码"></el-table-column>
      <el-table-column prop="gateway" label="网关"></el-table-column>
      <el-table-column prop="vlan" label="VLAN"></el-table-column>
      <el-table-column prop="CPU" label="CPU型号"></el-table-column>
      <el-table-column prop="memory" label="内存"></el-table-column>
      <el-table-column prop="storage" label="存储"></el-table-column>
      <el-table-column prop="CPUCores" label="CPU核心数"></el-table-column>
      <el-table-column prop="freeCPUCores" label="空闲CPU核心数"></el-table-column>
      <el-table-column prop="freeMemory" label="空闲内存"></el-table-column>
      <el-table-column prop="freeStorage" label="空闲存储"></el-table-column>
      <el-table-column prop="owner" label="负责人"></el-table-column>
      <el-table-column prop="armserverId" label="所属ARM服务器"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    //定义组件的各个默认值
    return {
      tableData: [],
      bmc: {
          id: '',
          mac: '',
          position: '',
          location: '',
          powerStatus: '',
          sysStatus: '',
          ip: '',
          netmask: '',
          gateway: '',
          vlan: '',
          CPU: '',
          memory: '',
          storage: '',
          CPUCores: 0,
          freeCPUCores: 0,
          freeMemory: '',
          freeStorage: '',
          owner: '',
          armserverId: ''
      },
      form:{}
    }
  },
  methods: {
    getbmc(){
      // 使用 axios 发送 HTTP GET 请求，如果是跨域的，可以用nginx来替换免跨域，如下localhost:9999就是nginx本机的配置端口
      axios.get('http://localhost:9999/testapi/bmcapi/v1/bmc/armcards', {
          params: {
              owner: this.bmc.owner,
              armserverId: this.bmc.serverid,
              pageNum: this.bmc.pagenum,
              pageSize: this.bmc.pagesize,
              powerStatus: this.bmc.powerstatus,
              location: this.bmc.location,
          },
          headers: {//反向代理不能有header,认证要放到nginx反向代理里面
            },
          // secure: false
          })
      .then(response => {
          // 请求成功，将响应结果 JSON 化
          this.bmc.textarea = JSON.stringify(response.data)
          
          // 将 JSON 数据解析成多行数据
          const data = response.data.armcards
          const tableData = data.map(item => {
              return {
              id: item.id,
              mac: item.mac,
              position: item.position,
              location: item.location,
              powerStatus: item.powerStatus,
              sysStatus: item.sysStatus,
              ip: item.ip,
              netmask: item.netmask,
              gateway: item.gateway,
              vlan: item.vlan,
              CPU: item.CPU,
              memory: item.memory,
              storage: item.storage,
              CPUCores: item.CPUCores,
              freeCPUCores: item.freeCPUCores,
              freeMemory: item.freeMemory,
              freeStorage: item.freeStorage,
              owner: item.owner,
              armserverId: item.armserverId
              }
          })
          this.tableData = tableData

      })
      .catch(error => {
          console.log(error)
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    getbmc2(){
      // 使用 axios 发送 HTTP GET 请求
      axios.get('http://localhost:9999/bmcapi/v1/bmc/armcards', {
        params: {
              owner: '103079215138'
          },
          })
      .then(response => {
          // 请求成功，将响应结果 JSON 化
          this.bmc.textarea = JSON.stringify(response.data)
          console.log(response)
      })
      .catch(error => {
          console.log(error)
      })
    },
  }
}
</script>
<style scoped> 
</style>
  
  