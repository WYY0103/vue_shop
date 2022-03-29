<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 添加角色单独一行   所以用布局来做 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>

      <!-- 列表区域 -->
      <el-table :data="rolelist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <!-- 按钮  需要将当前数据的某些信息作为参数传递  用模板插槽来获取当前数据 -->
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="RoleDelete(scope.row.id)" >删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="30%">
      <span>
        <el-form ref="addFormRef" :rules="addFormRules" :model="addForm" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="addForm.roleName" prop="roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="addForm.roleDesc" prop="roleDesc"></el-input>
          </el-form-item>
        </el-form>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改对话框 -->
    <el-dialog title="修改角色信息" :visible.sync="editDialogVisible" width="30%">
      <span>
          <el-form :model="editForm" label-width="80px">
			  	<el-form-item label="角色名称">
			  		<el-input v-model="editForm.roleName"></el-input>
			  	</el-form-item>
			  	<el-form-item label="角色描述">
			  		<el-input v-model="editForm.roleDesc"></el-input>
			  	</el-form-item>
			  </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditRolesInfo">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="30%">
      <span>
          11111
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    
  </div>
</template>


<script>
export default {
  data() {
    return {
      addDialogVisible: false,
      rolelist: [],
      addFormRules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
        ],
        roleDesc: [
          {
            required: true,
            message: "请输入角色描述",
            trigger: "blur",
          },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      addForm: {
        roleName: "",
        roleDesc: "",
      },
      editDialogVisible:false,
      editForm:{},
      setRightDialogVisible:false,
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200)
        return this.$message.error("获取列表数据失败");
      this.rolelist = res.data;
    },
    async addUser() {
      const { data: res } = await this.$http.post("roles", this.addForm);
      if (res.meta.status != 201) return this.$message.error("添加角色失败");
      this.$message.success("添加角色成功");
      this.getRoleList();
      this.addDialogVisible = false;
    },
    async showEditDialog(id) {
        const {data:res} = await this.$http.get(`roles/${id}`);
        if(res.meta.status !== 200) return this.$message.error('获取失败');
        this.editForm = res.data;
        this.editDialogVisible = true;
    },
    async EditRolesInfo(){
        const {data:res} = await this.$http.put(`roles/${this.editForm.roleId}`,{roleName:this.editForm.roleName,roleDesc:this.editForm.roleDesc});
        if(res.meta.status !==200)  return this.$message.error('修改失败');
        this.$message.success('修改成功');
        this.getRoleList();
        this.editDialogVisible = false;
    },
    async RoleDelete(id){
        const {data:res} = await this.$http.delete(`roles/${id}`);
        if(res.meta.status !==200) return this.$message.error('删除失败');
        this.$message.success('删除成功');
        this.getRoleList();
    },
    showSetRightDialog(id){
        this.setRightDialogVisible = true;

    }
  },
};
</script>

<style lang="less" scoped>
</style>