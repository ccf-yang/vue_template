<template>
  <div class="dashboard-container">
    <el-form ref="dashboard"  label-width="120px">
      <el-form-item label="TOKEN设置">
            <!-- <el-input type="textarea" v-model="dashboard.testtext" style="min-height: 330px;"></el-input> -->
            <el-input type="textarea" v-model="dashboard.testtext" style="min-height: 330px;"></el-input>
      </el-form-item>

      <el-form-item>
          <el-button type="primary" @click="cleartext">清空默认token</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
      //定义组件的各个默认值
      return {
        dashboard:{
          testtext: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjkzLCJleHAiOjE2ODc4NDAzMDV9.z5p9uvTwu2rrpSgUDu_OCFwcCMO1UBBscWP_tpB5dyYZKSUk0-wx0W-uFu30nQ6RXtLzq-aSdf7l_PwtfV3C08veeIgX14t2TBuzFSkiQUQo35gXSc6QWckjZthrfIDBDBHIXJWjq_C7aJUaa-lacK2oIGChHNUcZhly45mtPNN_aDK7IUVi6oTw8d75iSfPCazQdgBmQMMvD98TilzhS6Tn4M63jDC4616CKGkukKBIqZ8yifdrhOZ2cpQFeWI2PRXfAICUHbpbbz8xrndXiiFzjRbvfB7HYbx6k_M9f2jhqNojbGaOvNQmimWaAMuXLGZUPpbSY3g5DwE2c60Qhhkw19sXDzSMwdfiYMrewSblhPfegGV_55NFEICx9Pe6Aze8j8hFQI0Xteb-CG8hyV0KNyRp8P99vKGuu1ANghHODfPwxSBmKLv1qJHUBalLpJr3QQlR683Z6xMMJV5hwDkZDijkZG5ainq77UmzhAWEpEzn-gF2V6uppcTgnpzOoAa1xw7Voy2AylKlxy2jwNejQaJwmF4G1cP0lBVf5D8LZftmjIPX-4tqe9jeXITl5F5Xm3zAjNW5p9jEVAPVrY0i1sn-f8SEcbU57ww3btWqUfVjpVmDirn1ai5IJaEoWoKWvCaHASmT2HKxY2wg37k5rIunrfbNryRQjN7a4N8',
      }
    }
  },
  methods: {
  cleartext() {
    this.dashboard.testtext= ""
  },

  }
}

</script>

<style>
.el-textarea__inner{
  /* 浏览器看class，然后可以这是该文本框的高度 */
  height: 120px ;
}
</style>
