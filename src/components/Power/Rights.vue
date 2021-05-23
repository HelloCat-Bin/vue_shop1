<template>
  <div>
      <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
<!-- 卡片视图 -->
    <el-card class="box-card">
      <el-table :data="rightsList" border stripe>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="权限名称" prop="authName"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column>
          <el-table-column label="权限等级" prop="level">
          </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            rightsList:[
                 {
            "id": 101,
            "authName": "商品管理",
            "level": 2,
            "pid": 0,
            "path": 'goods'
        },
           {
            "id": 101,
            "authName": "金额管理",
            "level": 3,
            "pid": 0,
            "path": 'goods'
        },
        {
            "id": 102,
            "authName": "订单管理",
            "level": 1,
            "pid": 0,
            "path": 'orders'
        }
            ]
        }
    },
    created(){
        // 获取所有的权限
        this.getRightsList()
    },
    methods:{
        // 获取权限列表
        async getRightsList(){
            const {data:res} = await this.$http.get('rights/list');
            if(res.meta.status !=200){
                return this.$message.error('获取权限列表失败！');
            }
            this.rightsList = res.data
            console.log(this.rightsList)
        }
    }

}
</script>

<style scoped>
.box-card{
    margin-top: 10px;
}

</style>
