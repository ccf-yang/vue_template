<template>
    <div class="app-container">
      <el-form ref="bmc" :model="form" label-width="120px">
  
        <el-form-item label="区域">
          <el-input v-model="bmc.location" />
        </el-form-item>
  
        <el-form-item label="serverID">
          <el-input v-model="bmc.serverid" />
        </el-form-item>

        <el-form-item label="owner">
          <el-input v-model="bmc.owner" />
        </el-form-item>
        
        <el-form-item label="电源状态">
          <el-input v-model="bmc.powerstatus" />
        </el-form-item>
        
        <el-form-item label="页数">
          <el-input v-model="bmc.pagenum" />
        </el-form-item>

        <el-form-item label="页大小">
          <el-input v-model="bmc.pagesize" />
        </el-form-item>

        <el-form-item label="结果">
          <el-input type="textarea" v-model="bmc.textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getbmc">查询</el-button>
          <el-button @click="onCancel">取消</el-button>
          <el-button @click="gettests">test</el-button>
        </el-form-item>
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
        // 使用 axios 发送 HTTP GET 请求
        axios.get('/bmcapi/v1/bmc/armcards', {
            params: {
                owner: '103079215138'
            },
            headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjkzLCJleHAiOjE2ODc4NDAzMDV9.z5p9uvTwu2rrpSgUDu_OCFwcCMO1UBBscWP_tpB5dyYZKSUk0-wx0W-uFu30nQ6RXtLzq-aSdf7l_PwtfV3C08veeIgX14t2TBuzFSkiQUQo35gXSc6QWckjZthrfIDBDBHIXJWjq_C7aJUaa-lacK2oIGChHNUcZhly45mtPNN_aDK7IUVi6oTw8d75iSfPCazQdgBmQMMvD98TilzhS6Tn4M63jDC4616CKGkukKBIqZ8yifdrhOZ2cpQFeWI2PRXfAICUHbpbbz8xrndXiiFzjRbvfB7HYbx6k_M9f2jhqNojbGaOvNQmimWaAMuXLGZUPpbSY3g5DwE2c60Qhhkw19sXDzSMwdfiYMrewSblhPfegGV_55NFEICx9Pe6Aze8j8hFQI0Xteb-CG8hyV0KNyRp8P99vKGuu1ANghHODfPwxSBmKLv1qJHUBalLpJr3QQlR683Z6xMMJV5hwDkZDijkZG5ainq77UmzhAWEpEzn-gF2V6uppcTgnpzOoAa1xw7Voy2AylKlxy2jwNejQaJwmF4G1cP0lBVf5D8LZftmjIPX-4tqe9jeXITl5F5Xm3zAjNW5p9jEVAPVrY0i1sn-f8SEcbU57ww3btWqUfVjpVmDirn1ai5IJaEoWoKWvCaHASmT2HKxY2wg37k5rIunrfbNryRQjN7a4N8'
            },
            secure: true
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
        gettests(){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEwMzA3OTIxNTEzOCwiZXhwIjoxNjg3NzQ5NjE5fQ.h4atZWTmnsiHw_AsD6muHVouM50_q8ySZX3WcZrEAVbI7Oo0NpUuhmu-NqU_hZaq6sIhEI7ABeTid2awOtELkEwrUq7MAtWN3qPvrc_Ztoju4E8YTdmScMLRtsb49KP1J_z5Phb2BVaI4mCynRQDvRQ-cg0TmjLxCx87KNZwdWRuoNx6dLfY-54iOOAX8N9-JUJyZEsdhUVadt40AjNNZToh3hCvMO0bfAad2EcPYYR9-o6dO27uNHv3ueZxbz3hm6X1MHkpjHQ_7iumOMp89nTN9rH8n9WywX0UWqo2EoSvBrVb1-yTkIdRcNqX_EMfH5wANWMPH-O-r_jhjFIJBZb1lwSadBFZleuxwIWMEmWLpsFwjIvccxnxgEl90pmsM8Hp9NyROQ6sGEW4pFAbaxWkIXxp-Wr9Art2nfmE7zZwwWzNzXwwX0clmTcHYOKAvXDU5SkShHnr7B9BzwOsojtRjQ0Udp5_gJZzDCLyNQHEIhOLk0jOKhhFc6aUkrQGxl_paSk8rVh4sxWClJu-OCmEY4wJH6rkqpiyqZuQ1UpzY-GMK9QGxVY3xO7EjmGlaIoyBf5Qwa1gp9vjYmsSspz8aB8FEj1YJjM0lRkcE1aql2wBONcu8fmcpG9WSdQ2K1iviKO1YRku_7ERmu-wJKCEmYuuvOJhVrOp8CdeH1M");

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch("https://test-cg.ppio.cloud/bmcapi/v1/bmc/armcards?owner=103079215138", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }
    }
  }
  </script>
  
  <style scoped>
 
  </style>
  
  