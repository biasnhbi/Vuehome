<template>
  <div class="login_container">
    <div class="login_box">

      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 头像 -->

      <!-- 表单区域 -->
      <!-- PS: model为绑定自定义属性model,ref为给元素设置一个引用对象,rules为元素设置规则-->
      <el-form :model="loginForm" ref="loginRef" :rules="loginRules" label-width="0px" class="login_form"> 
        <!-- 用户名输入 -->
        <el-form-item prop="username"> <!--lable=左侧提示文本-->
          <el-input  v-model="loginForm.username" prefix-icon="iconfont icon-user">
            <!--prefix-icon设置左侧图标-->
            <!--model设置双向绑定-->
          </el-input>
        </el-form-item>
        <!-- 用户名输入 -->

        <!-- 密码输入 -->
        <el-form-item prop="password"> 
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password">
            <!--prefix-icon设置左侧图标-->
            <!--model设置双向绑定-->
          </el-input>
        </el-form-item>
        <!-- 密码输入 -->

        <!-- 按钮区 -->
        <el-form-item class="btns"> 
          <el-button type="primary">登录</el-button><!--primary=蓝色按钮-->
          <el-button type="info" @click="loginReset">重置</el-button><!--info=灰色-->
        </el-form-item>
        <!-- 按钮区 -->
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //数据绑定对象
      loginForm:{
        username:'',//具体数据
        password:''
      },
      loginRules:{
        username:[
          {required:true, message:"请输入用户名", trigger:"blur"},
          {min:3, max:8, message:"长度应在3到8个字符之间", trigger:"blur"}
          ],
          password:[
            {required:true, message:"请输入密码", trigger:"blur"},
            {min:6, max:12, message:"长度应在6到12个字符之间", trigger:"blur"}
            ]
       
      }
    }
  },
  //函数区域
  methods: {
    //重置按钮函数
    loginReset(){
      this.$refs.loginRef.resetFields();
    },
    login(){
      this.$refs.loginRef.validate(bool=>{
        
      });
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #072935;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  //   语法嵌套
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee; //边线
    border-radius: 50%; //圆角
    padding: 10px; //向四周填充
    box-shadow: 0 0 10px #ddd; //阴影
    position: absolute; //按父元素进行定位
    left: 50%; //按父元素的左边缘,反方向移动父元素宽的50%
    transform: translate(-50%, -50%); //向左向上移动自身长和宽的50%像素
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;//设置改元素在父元素底部0像素搞的地方
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;//实际元素的宽高= 设置元素的宽高- （ border + padding ）
}

.btns {
  display: flex;//浏览器页面定位
  justify-content: flex-end;
}
</style>