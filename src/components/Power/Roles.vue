<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="roleList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="item1 in scope.row.children" :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环，嵌套渲染二级权限 -->
                <el-row v-for="item2 in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 通过for循环，嵌套渲染三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      >{{ item3.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <pre></pre>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-search" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-search" size="mini"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-search"
              size="mini"
              @click="showSetRightDialog"
              >分配角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
    >
      <el-tree :data="rightslist" :props="treeProps" show-checkbox default-expand-all=true></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有角色列表数据
      roleList: [
        {
          roleName: '主管',
          roleDesc: '技术负责人',
          children: [
            {
              id: 134,
              authName: '订单管理',
              path: null,
              children: [
                {
                  id: 105,
                  authName: '添加商品',
                  path: null,
                },
                {
                  id: 116,
                  authName: '商品修改',
                  path: null,
                },
              ],
            },
          ],
        },
        {
          roleName: '高级工程师',
          roleDesc: '工程师',
          children: [
            {
              id: 106,
              authName: '商品列表',
              path: null,
              children: [
                {
                  id: 107,
                  authName: '添加商品',
                  path: null,
                },
                {
                  id: 108,
                  authName: '修改',
                  path: null,
                },
              ],
            },
          ],
        },
        {
          roleName: '测试工程师',
          roleDesc: '测试负责人',
          children: [
            {
              id: 111,
              authName: '商品列表',
              path: null,
              children: [
                {
                  id: 112,
                  authName: '添加商品',
                  path: null,
                },
                {
                  id: 113,
                  authName: '修改',
                  path: null,
                },
              ],
            },
          ],
        },
        {
          roleName: '测试技术员',
          roleDesc: '测试及问题反馈',
          children: [
            {
              id: 124,
              authName: '商品列表',
              path: null,
              children: [
                {
                  id: 125,
                  authName: '添加商品',
                  path: null,
                },
                {
                  id: 126,
                  authName: '修改',
                  path: null,
                },
              ],
            },
          ],
        },
      ],
    //控制分配权限对话框的显示与隐藏
      setRightDialogVisible:false,
    //   所有权限的数据
    rightslist:[
        {
        authName: "商品管理",
        children: [
          {
            authName: "商品列表",
            children: [
              {
                authName: "添加商品",

              }
            ]
          }
        ]
        }
    ],
    treeProps:{
        label:'authName',
        children:'children'
    }
  }
  },
  // 生命周期函数获取所有角色列表数据
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取所有角色的列表
    async getRolesList() {
      const { data: res } = await this.$http.get(roles)
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.roleList = res.data
      console.log(this.roleList)
    },
     async showSetRightDialog() {
        //  获取所有权限的列表
        this.setRightDialogVisible = true
       const{data:res} = await this.$http.get('rights/tree')
       if(res.mata.status !== 200){
           return this.$message.error('获取权限失败')
       }
    //    把获取到的权限数据保存到Data中
       this.rightslist = res.data

  },
  },
  //   展示分配权限的对话框

}
</script>

<style scoped>
.box-card {
  margin-top: 10px;
}
</style>
