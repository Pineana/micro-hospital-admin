<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div style="display: flex;flex-direction: row;justify-content: start;margin-bottom: 10px">
      <div style="display:flex;flex-direction:row;width: 92%">
        <div style="min-width: 250px">
          <el-input
              placeholder="支持患者姓名搜索"
              prefix-icon="el-icon-search"
              v-model="inputid">
          </el-input>
        </div>
        <div style="margin-left: 20px;min-width: 200px">
          <el-button-group>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="refresh"></el-button>
          </el-button-group>
        </div>
      </div>
      <div style="width: 8%;justify-content: center">
        <el-button type="primary" @click="dialogFormVisible=true">添加患者</el-button>
        <el-dialog title="添加患者" v-model="dialogFormVisible" center width="500px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="患者姓名" label-width="80px" prop="name">
              <el-input v-model="ruleForm.name" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="患者年龄" label-width="80px" prop="year">
              <el-input v-model="ruleForm.year" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="患者性别" label-width="80px">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="患者电话" label-width="80px" >
              <el-input v-model="ruleForm.phone" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="患者电话" label-width="80px">
              <el-input type="textarea" autosize v-model="ruleForm.desc"></el-input>
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
          <el-table-column label="患者ID" prop="patientID" width="100">
          </el-table-column>
          <el-table-column label="患者姓名" prop="name" width="100">
          </el-table-column>
          <el-table-column align="center" label="患者年龄" prop="year" width="100">
          </el-table-column>
          <el-table-column align="center" label="患者电话" prop="phone" width="300">
          </el-table-column>
          <el-table-column align="center" label="患者性别" prop="sex" width="100">
          </el-table-column>
          <el-table-column align="center" label="过往病史" prop="pastMedicalHistory" width="400">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-popover placement="top" :width="160" v-model:visible="visible">
                <p>确定删除记录？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                </div>
                <template #reference>
                  <el-button @click="visible = true" type="danger" size="mini">删除</el-button>
                </template>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div style="margin-top: 20px;display: flex;flex-direction: row;justify-content: flex-end">
      <el-pagination @current-change="current" @prev-click="prevclick" @next-click="nextclick" :current-page="pageindex"
                     background
                     layout="prev, pager, next"
                     :total="total" :page-size=10>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'patientList',
  props: {

  },
  data(){
    return {
      fullscreenLoading:false,
      dialogFormVisible:false,
      tableData:[{
        patientID: 1,
        name: '王小虎',
        year: 11,
        phone: '15157276075',
        sex: 0,
        pastMedicalHistory: "有病",
      }],
      ruleForm: {
        name: '',
        year: '',
      },
      rules:{
        name: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' },
        ],
        year: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    addPatient(){
        this.dialogFormVisible=!this.dialogFormVisible
        console.log(this.dialogFormVisible)
    },
  }
}
</script>

<style scoped>

</style>