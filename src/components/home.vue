<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button @click="exit" class="exit">退出</el-button>
      </el-header>
    <!-- 页面主体 -->
    <el-container>

      <!-- 侧边栏 -->
      <el-aside :width="iscollapse ? '64px':'200px'">
        <el-menu background-color="rgb(228, 180, 188)" 
        text-color="#fff"
        active-text-color="rgb(222, 47, 245)" 
        unique-opened :collapse='iscollapse'
        router
        :default-active=actionPath>
        <!-- 子菜单区域,里面可嵌套多个子菜单 -->
          <el-submenu :index=" '/'+item.path " v-for="item in menuList" :key="item.id">
            <!-- 模板区域 -->
            <template slot="title">
              <!-- 图标区域 -->
              <i class="el-icon-location"></i>
              <!-- 文本区域 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 选项区域,可添加多个,里面不可添加子菜单 -->
            <el-menu-item :index="'/'+itemTwo.path "
             v-for="itemTwo in item.children" 
             :key="itemTwo.id"
             @click="savePath('/'+itemTwo.path)">
              <!-- 图标区域 -->
              <i class="el-icon-menu"></i>
              <!-- 文本区域 -->
              <span>{{itemTwo.authName}}</span>
            </el-menu-item>
            
          </el-submenu>

        </el-menu>
        
      </el-aside>
      <!-- <span class="menu-left">
      <el-button type="info" class="el-icon-caret-right" @click="loginReset"></el-button></span> -->
      <button class="test el-icon-right" id="exit" @click="toggleCollapse" ></button>
      


      <!-- 右侧主题 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less">
.el-header{
  background-color: pink;
  display: flex;
  justify-content: space-between;
  padding-left:0 ;
  align-items: center;
  color: rgb(215, 210, 216);
  font-size: 20px;
  > div{
    display: flex;
    align-items: center;
    span{
      margin-left: 50px;
      color: #FFF;
    }
  }
}
.el-aside{
  background-color: pink;
  .el-menu{
    border-right: none;
  }
  
}
.el-header{
  .exit{
    background-color: pink;
    border: #fde5f4 2px solid;
  }
  .exit:hover{
    background-color: rgb(238, 175, 185);
    border-color:  rgb(238, 175, 185);  
  }
  .exit:active{
    background-color: pink;
    border-color: pink;  
  }
}
// .menu-left{
//     .el-button{
//     height: 100%;
//     padding: 0px 0px 0px 0px;
//     // background-color: pink;
//     }
    
//   .el-button--info:hover{
//     background-color: rgb(238, 175, 185);
//     border-color:  rgb(238, 175, 185);  
//   }
//   .el-button--info.is-active, .el-button--info:active{
//     background-color: pink;
//     border-color: pink;  
//   }
//   .el-button--info,.el-button--info:focus{
//     background-color: pink;
//     border-color:pink;  
//   }
// }

.test{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    // cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 0;
    font-size: 14px;
    border-radius: 4px;
    background-color: pink;
    border-color: pink;  
    content: "el-icon-right";
}
.test:hover{
    background-color: rgb(238, 175, 185);
    border-color:  rgb(238, 175, 185);  
  }
  .test:active{
    background-color: pink;
    border-color: pink;  
  }

.el-main{
  background-color: rgb(250, 223, 227);
}
.home-container{
  height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      menuList:[

      ],
      iscollapse:false,
      actionPath:""
    }
  },
  created(){
    this.getMenuList()
    this.actionPath=window.sessionStorage.getItem('actionPath')
  },
  methods: {
    // 退出函数
    exit(){
      window.sessionStorage.removeItem("token")
      this.$router.push("/")
    },
    async getMenuList(){
      const {data:res}= await this.$http.get('menus') //将menu的data数据放到res中
      if(res.meta.status!==200) return this.$message.error(res.meta.msg)//如果返回的不是200,返回一个错误信息
      this.menuList=res.data//将data信息放到menuList中
    },
    // 折叠展开
    toggleCollapse(){
      this.iscollapse=!this.iscollapse
    },
    savePath(path){
      window.sessionStorage.setItem("actionPath",path)
    }
  }
}
</script>