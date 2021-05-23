<template>
  <div>
    <el-container class="home-containter">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../assets/heima.png" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition = "false"
            :router="true"
            default-active='/user'
          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="item.id"
              v-for="item in menuList"
              :key="item.id"
            >
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{ item.authName }}</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/'+subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧区域 -->
        <el-main>
            <!-- 路由占位符 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconsObj: {
        '125': 'el-icon-user-solid',
        '104': 'el-icon-goods',
        '103': 'el-icon-s-platform',
        '107': 'el-icon-s-shop',
        '108': 'el-icon-menu',
      },
    //   是否折叠
      isCollapse: false,
      menuList: [
        {
          authName: '用户管理',
          path: 'users',
          id: 125,
          children: [
            {
              authName: '用户列表',
              path: 'user',
            },
          ],
        },
        {
          id: 104,
          authName: '权限管理',
          path: 'right',
          children: [
            {
              authName: '角色列表',
               path: 'right1',
              
            },
            {
              authName: '权限列表',
               path: 'right2',
            },
          ],
        },
        {
          id: 103,
          authName: '商品管理',
          path: 'goods',
          children: [
            {
              authName: '商品列表',
            },
            {
              authName: '分类参数',
            },
            {
              authName: '商品分类',
            },
          ],
        },
        {
          id: 107,
          authName: '订单管理',
          path: 'orders',
          children: [],
        },
        {
          id: 108,
          authName: '数据统计',
          path: 'reports',
          children: [],
        },
      ],
    }
  },
  created() {
    // this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('./Login.vue')
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status != 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    toggleCollapse(){
    this.isCollapse = ! this.isCollapse
  }
  },
  
}
</script>

<style>
html,
body {
  height: 100%;
}
.home-containter {
  height: 1000px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 25px;
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.el-menu {
  border-right: 0px;
}

.toggle-button {
  background-color: #4a5064;
  text-align: center;
  font-size: 10px;
  padding-bottom: 3px;
  color: white;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
