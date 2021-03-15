<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div style="display: flex;flex-direction: row;justify-content: start;margin-bottom: 10px">
      <div style="display:flex;flex-direction:row;width: 92%">
        <div style="width: 250px">
          <el-input
              placeholder="支持患者姓名搜索"
              prefix-icon="el-icon-search"
              v-model="inputid" style="max-width: 250px">
          </el-input>
        </div>
        <div style="margin-left: 20px">
          <el-button-group>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="refresh"></el-button>
          </el-button-group>
        </div>
      </div>
      <div style="width: 8%;justify-content: center">
        <el-button type="primary" @click="dialogFormVisible=true">添加患者</el-button>
        <el-dialog title="添加医生" v-model="dialogFormVisible" center width="500px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addPatient">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="医生ID" prop="patientID" width="200">
          </el-table-column>
          <el-table-column label="医生姓名" prop="name" width="250">
          </el-table-column>
          <el-table-column align="center" label="医生年龄" prop="year" width="80">
          </el-table-column>
          <el-table-column align="center" label="医生电话" prop="phone" width="250">
          </el-table-column>
          <el-table-column align="center" label="医生性别" prop="sex" width="250">
          </el-table-column>
          <el-table-column align="center" label="所属部门" prop="department" width="200">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-popover placement="top" :width="160" v-model:visible="visible">
                <p>确定删除记录？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                </div>
                <template #reference>
                  <el-button @click="visible = true">删除</el-button>
                </template>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div style="margin-top: 20px;display: flex;flex-direction: row;justify-content: flex-end">
      <el-pagination @current-change="current" @prev-click="prevclick" @next-click="nextclick" :current-page="pageindex" background layout="prev, pager, next" :total="total" :page-size=10>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "doctorList",
  data(){
    return {
      dialogFormVisible:false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择活动区域', trigger: 'change'}
        ],
      }
    }
  }
}
</script>

<style scoped>

</style>