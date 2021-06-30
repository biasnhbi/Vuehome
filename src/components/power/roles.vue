<template>
  <div>    
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/welcome',component:Welcome}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>

      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col >
          <el-button type="primary" @click="newRolesDialogVisible=true">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column label="" type="expand">
          <template slot-scope="scope">
            <el-row>
              <!-- 权限列表 -->
              <el-row v-for="(item1,i1) in scope.row.children" 
              :key="item1.id"
              class="vcentent" style="padding:12px">
                <!-- 一级权限 -->
                <el-col :span="6">
                  <el-tag closable @close="closeRoleDelete(scope.row.id,item1.id)">{{item1.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 二级和嵌套里面的三级权限 -->
                <el-col :span="16">

                  <el-row v-for="(item2,i2) in item1.children" :key="item2.id" class="vcentent">
                    <!-- 二级权限 -->
                    <el-col :span="8">
                      <el-tag 
                      closable 
                      @close="closeRoleDelete(scope.row.id,item2.id)">{{item2.authName}}</el-tag>
                      <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="16">
                      <!-- 三级权限 -->
                          <el-tag type="success" v-for="(item3,i3) in item2.children" :key="item3.id" closable @close="closeRoleDelete(scope.row.id,item3.id)">{{item3.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-row>
          </template>
        </el-table-column>
<!-- 角色列表区域展示 -->
        <el-table-column type="index" label="序号" width="50px" style="text-align:center">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <!-- 操作按钮区域 -->
         <el-table-column label="操作" width="400px">
            <template slot-scope="take">
            <!-- tooltip弹窗通知 -->
            <el-tooltip content="编辑"
                        placement="left">
              <el-button type="primary"
                         icon="el-icon-edit"
                         size="mini"
                         @click="editRolequery(take.row.id)">编辑角色</el-button>
            </el-tooltip>

            <el-tooltip content="删除"
                        placement="top">
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="deleteUser(take.row.id)">删除角色</el-button>
            </el-tooltip>

            <el-tooltip content="分配权限"
                        placement="right-end">
              <el-button type="warning"
                         icon="el-icon-setting"
                         size="mini"
                         @click="showRolesDialog(take.row)"
                         >分配角色</el-button>
            </el-tooltip>

          </template>
         </el-table-column>

      </el-table>
    </el-card>
    <!-- 分配权限对话框 visible.sync用来显示和隐藏一个弹框-->
    <el-dialog title="分配权限" :visible.sync="setRolesDialogVisible" width="50%" @close="closeShowRolesDialog">
      <el-tree :data="setRolesList" 
      :props="treeProps" 
      show-checkbox 
      node-key="id"
       default-expand-all="false" 
       :default-checked-keys="defaultsRolesId"
       ref="treeRef"
       ></el-tree>
      <span slot="footer"
            class="dialog-footer">
        <el-button type=""
                   @click="setRolesDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="setRoles(setRolesList)">确定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="newRolesDialogVisible" width="50%" @close="closeShowRolesDialog">
       <!-- 内容主体区 -->
      <el-form :model="addRole"
               :rules="addFormRules"
               ref="addRoleRef"
               label-width="75px">

        <el-form-item label="角色名称"
                      prop="roleName">
          <el-input v-model="addRole.roleName" 
          clearable prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>

        <el-form-item label="角色描述"
                      prop="roleDesc">
          <el-input 
          v-model="addRole.roleDesc"
          clearable
          prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>

      </el-form>
      <!-- 按钮区 -->
      <span slot="footer"
            class="dialog-footer">
        <el-button type=""
                   @click="addUser=false">取消</el-button>
        <el-button type="primary" @click="addRoles">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色对话框 -->
    <el-dialog title="修改角色" :visible.sync="editRolesDialogVisible" width="50%" @close="closeShowRolesDialog">
       <!-- 内容主体区 -->
      <el-form :model="editRole"
               :rules="editFormRules"
               ref="editRoleRef"
               label-width="75px">

        <el-form-item label="角色名称"
                      prop="roleName">
          <el-input v-model="editRole.roleName" 
          clearable prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>

        <el-form-item label="角色描述"
                      prop="roleDesc">
          <el-input 
          v-model="editRole.roleDesc"
          clearable
          prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>

      </el-form>
      <!-- 按钮区 -->
      <span slot="footer"
            class="dialog-footer">
        <el-button type=""
                   @click="editRolesDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="editRoles">确定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      //角色列表
      rolesList:[],
      //分配权限对话框开启关闭属性
      setRolesDialogVisible:false,
      newRolesDialogVisible:false,
      editRolesDialogVisible:false,
      // 所有权限数据
      setRolesList:[],
      // 属性控件绑定对象
      treeProps:{
        // 
        children:'children',
        // 显示名称
        label:'authName',
    },
    //默认选中权限id
    defaultsRolesId:[],
    // 当前分配角色Id
    RolesIdUserId:'',
    addRole:{
      roleName:'',
      roleDesc:''
    },
    editRole:{}
    }
  },
  created(){
    this.getRolesList()
  },
  methods: {
    //添加角色
    async addRoles(){
      this.$refs.addRoleRef.validate(async value=>{
        if (!value) {
          this.$message.error('请输入信息')
          return
        }
        const {data:res}=await this.$http.post('roles',this.addRole)
        console.log(res);
        if (res.meta.status !== 201) {
          this.$message.error('添加角色失败')
          return
        }
        this.$message.success('添加角色成功')
        this.newRolesDialogVisible=false
        this.getRolesList()
      })
    },
    //获取角色列表
    async getRolesList(){
      const {data:res}=await this.$http.get('roles')
      if (res.meta.status!==200) {
        return this.$message.error('获取角色列表失败')
      }
      this.rolesList=res.data
      console.log(this.rolesList);
    },
    // 删除角色指定权限
    async closeRoleDelete(roleDesc,roleId){
          const result= await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(() => {
          return this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        if(result=='confirm'){
      const {data:res}=await this.$http.delete(`roles/${roleDesc}/rights/${roleId}`)
      console.log(res);
      console.log(roleDesc);
      console.log(roleId);
      if (res.meta.status!==200) {
        return this.$message.error('删除权限失败')
        
      }
      this.getRolesList()
      return this.$message.success('删除权限成功')}
    },
    //打开分配角色提示框
    async showRolesDialog(id){
      const {data:res}=await this.$http.get('rights/tree')
      if (res.meta.status!=200) {
        return this.$message.error("获取权限树失败")
      }
      this.RolesIdUserId=id.id
      this.setRolesList=res.data
      this.getRolesKey(id,this.defaultsRolesId)
      this.setRolesDialogVisible=true
    },
    // 循环遍历
    getRolesKey(node,arr){
      // 没有children属性,则是三级节点,
      if (!node.children) {
        return arr.push(node.id)
      }
      // 如果没到三级权限,就把所有children节点遍历一次
      node.children.forEach(item=>this.getRolesKey(item,arr))
    },
    //删除角色
    async deleteUser(id){
      await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         const {data:res}=this.$http.delete(`roles/${id}`)
          if (res.meta.status!=200) {
            return this.$message.error("删除角色失败")
          }
          this.getRolesList()
          return this.$message.seccess("删除角色成功")
        }).catch(() => {
          return this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    //关闭对话框后清空默认选中
    closeShowRolesDialog(){
      this.defaultsRolesId=[]
      this.$refs.addRoleRef.resetFields()
      this.$refs.editRoleRef.resetFields()
    },
    //授权
    async setRoles(setRolesList){
      const key=[
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr=key.join(',')
      const {data:res}=await this.$http.post(`roles/${this.RolesIdUserId}/rights`,{rids:idStr})
      console.log(res);
      if (res.meta.status!=200) {
        return this.$message.error("分配权限失败")
      }
      this.getRolesList()
      this.setRolesDialogVisible=false
    },
    //查询角色
    async editRolequery(id){
      const {data:res}=await this.$http.get("roles/"+id)
      // console.log(res);
      // console.log(id);
      if(res.meta.status!=200) return this.$message.error("查询角色信息失败")
      this.editRole=res.data
      // console.log(this.editForm);
      this.editRolesDialogVisible=true
    },
    //修改角色
    editRoles(){
      this.$refs.editRoleRef.validate(async value=>{
        if (!value) {
          this.$message.error('请输入信息')
          return
        }
        const {data:res}=await this.$http.put("roles/"+this.editRole.roleId,{roleName:this.editRole.roleName,roleDesc:this.editRole.roleDesc})
        console.log(res);
        if (res.meta.status !== 200) {
          this.$message.error('修改角色失败')
          return
        }
        this.$message.success('修改角色成功')
        this.editRolesDialogVisible=false
        this.getRolesList()
      })
    },
  },
}
</script>

<style lang="less">
  .el-tag{
    margin: 5px;
  }
  .row{
    border: 1px solid rgb(230, 58, 58);
  }
  .vcentent{
    display: flex;
    align-items: center;
    // padding: 12px;
  }
  
</style>