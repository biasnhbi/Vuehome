<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/welcome',component:Welcome}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>

      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">

        <el-col :span="4">
          <el-input placeholder="请输入内容">
            <el-button slot="append"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary"
                     @click="addUser=true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="userList"
                border
                stripe>
        <!-- 表格列表， prop为变量、lable为列表名，显示在表格第一行-->
        <el-table-column type="index"
                         label="序号"
                         width="50px"
                         style="text-align:center"></el-table-column>

        <el-table-column prop="username"
                         label="姓名"
                         width=""></el-table-column>

        <el-table-column prop="email"
                         label="邮箱"
                         width=""></el-table-column>

        <el-table-column prop="mobile"
                         label="电话"
                         width=""></el-table-column>

        <el-table-column prop="role_name"
                         label="角色"
                         width=""></el-table-column>

        <el-table-column label="状态"
                         width="">
          <!-- 开关区域 -->
          <template slot-scope="wsitch">
            <el-switch v-model="wsitch.row.mg_state"
                       @change="userStateChange(wsitch.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="230px">

          <template slot-scope="take">
            <!-- tooltip弹窗通知 -->
            <el-tooltip content="修改"
                        placement="left">
              <el-button type="primary"
                         icon="el-icon-edit"
                         size="mini"
                         @click="editUsers(take.row.id)"></el-button>
            </el-tooltip>

            <el-tooltip content="删除"
                        placement="top">
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="deleteUser(take.row.id)"></el-button>
            </el-tooltip>

            <el-tooltip content="分配角色"
                        placement="right-end">
              <el-button type="warning"
                         icon="el-icon-setting"
                         size="mini"
                         @click="setRole(take.row)"></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->

      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleurrentChange"
                     :total="total"
                     :current-page="userInfo.pagenum"
                     :page-sizes="[1,2,50,100,150,200]"
                     :page-size="userInfo.pagesize"
                     layout="total,sizes,prev,pager,next,jumper">

      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户"
               :visible.sync="addUser"
               width="50%"
               @close="addUserClose">
      <!-- 内容主体区 -->
      <el-form :model="addForm"
               :rules="addFormRules"
               ref="addFormRef"
               label-width="75px">

        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="addForm.userName" clearable prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>

        <el-form-item label="密码"
                      prop="password">
          <el-input 
          v-model="addForm.password"
          show-password
          clearable
          prefix-icon="el-icon-s-cooperation"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机"
                      prop="mobile" >
          <el-input v-model="addForm.mobile" 
          clearable
          prefix-icon="el-icon-phone"></el-input>
        </el-form-item>

        <el-form-item label="邮箱"
                      prop="email"
                      clearable>
          <el-input v-model="addForm.email" clearable prefix-icon="el-icon-s-promotion"></el-input>
        </el-form-item>

      </el-form>
      <!-- 按钮区 -->
      <span slot="footer"
            class="dialog-footer">
        <el-button type=""
                   @click="addUser=false">取消</el-button>
        <el-button type="primary" @click="addUsers">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户"
               :visible.sync="editUser"
               width="50%"
               @close="addUserClose">
      <!-- 内容主体区 -->
      <el-form :model="editForm"
               :rules="addFormRules"
               ref="editFormRef"
               label-width="75px">

        <el-form-item label="用户名"
                      prop="username"
                      >
          <el-input v-model="editForm.username" clearable prefix-icon="el-icon-s-custom"
          :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="手机"
                      prop="mobile" >
          <el-input v-model="editForm.mobile" 
          clearable
          prefix-icon="el-icon-phone"></el-input>
        </el-form-item>

        <el-form-item label="邮箱"
                      prop="email"
                      clearable>
          <el-input v-model="editForm.email" clearable prefix-icon="el-icon-s-promotion"></el-input>
        </el-form-item>

      </el-form>
      <!-- 按钮区 -->
      <span slot="footer"
            class="dialog-footer">
        <el-button type=""
                   @click="editUser=false">取消</el-button>
        <el-button type="primary" @click="editUsersData()">确定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色"
    :visible.sync="rightUser"
    width="50%"
    @close="addUserClose">
    <div>
      <p>当前的用户角色是{{user.username}}</p>
      <p>当前的用户是{{user.role_name}}</p>
      <p>分配新角色
        <el-select v-model="selectRoleId" placeholder="快选择!!!">
          <el-option v-for="item in userRoleName" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
        </el-select>
      </p>
    </div>
    <span slot="footer"
          class="dialog-footer">
        <el-button type="" 
        @click="rightUser=false">取消</el-button>
        <el-button type="primary" @click="saveRole()"
       >确定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
export default {
  created(){
    this.getUserData()
  },
  data(){
    return{
      userInfo:{
        query:'',
        //当前页数
        pagenum:1,
        //当前页面大小
        pagesize:2
      },
      userList:[],
      total:0,
      //控制对话框显示
      addUser:false,//添加
      editUser:false,//编辑
      rightUser:false,//分配角色
      //表单输入验证规则
      addFormRules:{
        userName:[
          {required:true, message:"请输入用户名", trigger:"blur"},
          {min:3, max:8, message:"长度应在3到8个字符之间", trigger:"blur"},
        ],

        password:[
          {required:true, message:"请输入密码", trigger:"blur"},
          {min:6, max:12, message:"长度应在6到12个字符之间", trigger:"blur"}
        ],

        mobile:[          
          {required:true, message:"请输入手机号", trigger:"blur"},
          {pattern:/[0-9]/, message: '手机号必须为数字值', trigger:"blur"},
          {min:10, max:12, message:"长度应为11位", trigger:"blur"},
          {pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,message:"请输入正确的手机号", trigger:"blur"}
        ],

        email:[
          {required:true, message:"请输入邮箱", trigger:"blur"},
          {pattern:/^[a-z0-9]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/,message:"请输入正确的邮箱", trigger:"blur"}
        ]

      },
      // 表单数据
      addForm:{
        username:'',
        password:'',
        email:'',
        mobile:''
      },
      //用户查询
      editForm:{},
      //分配权限的用户
      user:{},
      //角色列表
      userRoleName:[],
      //分配角色绑定
      selectRoleId:''
    }
  },
  methods: {
    //获取用户列表事件
    async getUserData(){
      const {data:res}= await this.$http.get('users',{params:this.userInfo})
      console.log(res)
      if(res.meta.status!=200) return this.$message.error("获取用户列表失败")
      this.userList=res.data.users
      this.total=res.data.total
      console.log(this.userList);
    },
    // 监听pagesize改变事件(200调每页改成100条每页)
    handleSizeChange(newSize){
      this.userInfo.pagesize=newSize
      this.getUserData()
    },
    // 监听页码值改变事件
    handleurrentChange(newPage){
      this.userInfo.pagenum=newPage
      this.getUserData()
    },
    // 用户状态更新事件
    async userStateChange(userState){
      const {data:res}= await this.$http.put(`users/${userState.id}/state/${userState.mg_state}`)
      // console.log(res)
      // console.log(userState.id)
      if(res.meta.status!=200) {
        userState.mg_state=!userState.mg_state
        return this.$message.error("用户状态更新失败")
      }
    },
    // 监听关闭提示框事件(该事件内容为重置表单)
    addUserClose(){
      this.selectRoleId=''
      this.user={}
      this.$refs.addFormRef.resetFields()
    },
    //添加用户信息上传数据库事件
    addUsers(){
      this.$refs.addFormRef.validate(async value=>{
        if (!value) {
          this.$message.error('请输入信息')
          return
        }
        const {data:res}=await this.$http.post('users',this.addForm)
        console.log(res);
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败')
          return
        }
        this.$message.success('添加用户成功')
        this.addUser=false
        this.getUserData()
      })
    },
    // 查询用户
    async editUsers(id){
      const {data:res}=await this.$http.get("users/"+id)
      console.log(res);
      console.log(id);
      if(res.meta.status!=200) return this.$message.error("查询用户信息失败")
      this.editForm=res.data
      // console.log(this.editForm);
      this.editUser=true
    },
    //修改用户
    editUsersData(){
      this.$refs.editFormRef.validate(async value=>{
        if (!value) {
          this.$message.error('请输入信息')
          return
        }
        const {data:res}=await this.$http.put("users/"+this.editForm.id,{email:this.editForm.email,mobile:this.editForm.mobile})
        console.log(res);
        if (res.meta.status !== 200) {
          this.$message.error('修改用户失败')
          return
        }
        this.$message.success('修改用户成功')
        this.editUser=false
        this.getUserData()
      })
    },
    //删除用户
    async deleteUser(id){
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        const {data:res}=await this.$http.delete("users/"+id)
        console.log(res);
        if (res.meta.status !== 200) {
          this.$message.error('删除用户失败')
          return
        }
        this.$message.success('删除用户成功')
        this.getUserData()
    },
    //展示分配角色对话框
    async setRole(user){
      this.rightUser=true
      const {data:res}=await this.$http.get("roles")
      if (res.meta.status!==200) {
        return this.$message.error('获取角色列表失败')
      }
      this.userRoleName=res.data
      this.user=user
    },
    async saveRole(){
      if (!this.selectRoleId) {
        return this.$message.error("请选择角色再确定")
      }
      const{data:res}=await this.$http.put(`users/${this.user.id}/role`,{
        rid:this.selectRoleId
      })
      if (res.meta.status!==200) {
        return this.$message.error("修改用户角色失败")
      }
      this.getUserData()
      this.rightUser=false
      return this.$message.success("修改用户角色角色")
    }
  },
}
</script>
