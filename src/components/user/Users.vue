<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索区域 -->
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
        clearable
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="uesrname" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="type" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <el-switch v-model="mg_state"></el-switch>
        </el-table-column>
        <el-table-column prop="rule_name" label="操作" width="180px">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
          <!-- 分配角色按钮 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="分配角色"
            placement="top"
            :enterable="false"
          >
            <el-button type="warning" icon="el-icon-setting" size="mini">
            </el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="200"
      >
      </el-pagination>
    </el-card>
        <!-- 添加用户的对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
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
    type1: false,
      userlist: [
        {
          userlist: '2016-05-02',
          uesrname: '王小虎',
          email: '上海市普陀区金沙江路 1518 弄',
          mg_state:true
        },
        {
          userlist: '2016-05-04',
          uesrname: '王小虎',
          email: '上海市普陀区金沙江路 1517 弄',
          mg_state:false
        },
        {
          userlist: '2016-05-01',
          uesrname: '王小虎',
          email: '上海市普陀区金沙江路 1519 弄',
        },
        {
          userlist: '2016-05-03',
          uesrname: '王小虎',
          email: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      mg_state:true
    }

  },
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}

.input-with-select {
  width: 500px;
  margin-right: 20px;
}

.el-button {
  size: 10px;
}
</style>
