<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout" id="btn">退出</el-button>
    </el-header>

    <el-container>
        <!-- 宽度是动态修改的  当折叠时宽度变小  所以宽度可是否折叠要联系使用 -->
      <el-aside :width="isCollapse? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
        <!-- 当我menu 开启路由模式的时候  menu会把index属性的值作为我跳转的地址 -->
          <!-- 
                key  规定唯一标识符   这里要通过接口里面的内容来获取数据 
                避免点击一个其他也被点击  这里的index要动态唯一          
            -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级列表  通过接口来获取一级列表的内容-->
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级列表    通过一级列表来获取二级列表的内容-->
            <el-menu-item
              :index="'/'+subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subitem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
          <router-view></router-view>        
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      menulist: [],
      // 凡是能从接口当中读取的数据  一般都用数组进行定义和承接
      // 一般能从页面上获取的数据，都用{}对象来承接

      // 一级列表的图标  每一个不一样 要动态获取图标
      // 手动将图标编写成key和value的形式   id为key值  value值为图标名
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      //控制菜单是折叠还是展开的选项
      isCollapse: false,

    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    logout() {
      // 登录时是通过把token保存在session中 验证是否登录
      // 退出登录就是讲token删除，再通过路由跳转的方式调回登录组件
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 向服务器请求左侧列表的函数
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      this.menulist = res.data;
      // console.log(res);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped="scoped">
.home-container {
  height: 100%;
}
// 特性 就是标签的名字  就是你class的名字
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }

  img {
    width: 13%;
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  color: #fff;
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  // 让三个||| 彼此之间不要那么近 有一定距离 0.3em
  letter-spacing: 0.3em;
  // 变成小手的样式
  cursor: pointer;
}
</style>