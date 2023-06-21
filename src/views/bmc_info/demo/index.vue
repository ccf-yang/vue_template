<template>
    <div class="app-container">
      <el-form ref="bmc" :model="form" label-width="120px">
  
        <el-form-item label="demo name">
          <el-input v-model="bmc.serverid" />
        </el-form-item>

        <el-form-item label="owner">
          <el-input v-model="bmc.owner" />
        </el-form-item>
  
        <el-form-item label="结果">
          <el-input type="textarea" v-model="bmc.textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="gettest">查询</el-button>
          <el-button @click="onCancel">取消</el-button>
          <el-button @click="getAddress">https跨域示例</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名字"></el-table-column>
            <el-table-column prop="picurl" label="图片地址"></el-table-column>
            <el-table-column prop="alias" label="别名"></el-table-column>
            <el-table-column prop="albumsize" label="相册大小"></el-table-column>
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
          serverid: '跨域请求demo,拿访问网易云音乐为例',
          owner: '103079215138',
          textarea:""
        }
      }
    },
    methods: {
      gettest(){
        // 使用 axios 发送 HTTP GET 请求
        axios.get('/demo/api/search/get/web', {
            params: {
            s: '林俊杰',
            type: 100
            }
        })
        .then(response => {
            // 请求成功，将响应结果 JSON 化
            this.bmc.textarea = JSON.stringify(response.data)
            
            // 将 JSON 数据解析成多行数据
            const data = response.data.result.artists
            const tableData = data.map(item => {
                return {
                id: item.id,
                name: item.name,
                picurl: item.picUrl,
                alias: item.alias,
                albumsize: item.albumSize
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
      getAddress() {
        //请求可以通过浏览器赋值curl，然后放到postman里面，可以直接转换为axios请求
        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/resolv?host=www.zhihu.com&os_type=web',
        headers: { 
            'authority': '118.89.204.198', 
            'accept': '*/*', 
            'accept-language': 'zh-CN,zh;q=0.9', 
            'cache-control': 'no-cache', 
            'origin': 'https://zhuanlan.zhihu.com', 
            'pragma': 'no-cache', 
            'referer': 'https://zhuanlan.zhihu.com/p/61901608', 
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"', 
            'sec-ch-ua-mobile': '?0', 
            'sec-ch-ua-platform': '"Windows"', 
            'sec-fetch-dest': 'empty', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-site': 'cross-site', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', 
            'Cookie': 'tgw_l7_route=7b3bea133e6b230d3304b0c8dbf7cf14'
        }
        };
        axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        this.bmc.textarea = JSON.stringify(response.data)
        })
        .catch((error) => {
        console.log(error);
        });
        },
    }
  }
  </script>
  
  <style scoped>
 
  </style>
  
  