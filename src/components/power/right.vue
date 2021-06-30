<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/welcome',component:Welcome}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-table :data="rightList" border stripe>
        <el-table-column type="index" label="序号" width="50px" style="text-align:center"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          
          <template slot-scope="take">
            <el-tag type="danger" v-if="take.row.level==='0'">一级</el-tag>
            <el-tag type="warning" v-if="take.row.level==='1'">二级</el-tag>
            <el-tag v-if="take.row.level==='2'">三级</el-tag>
          </template>

        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightList:[]
    }
  },
  //进入网页前启用的函数
  created(){
    this.getRightList()
  },
  methods: {
    //获取用户权限列表
    async getRightList(){
      const {data:res}=await this.$http.get('rights/list')
      if (res.meta.status!==200) {
        return this.$message.error('获取权限列表失败')
      }
      this.rightList=res.data
    }
  },
}
</script>

<style lang="less" scoped>
  
</style>