<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div style="display: flex;flex-direction: row;justify-content: start;margin-bottom: 10px">
      <div style="display:flex;flex-direction:row;width: 92%">
        <div style="min-width: 250px">
          <el-input
              placeholder="支持患者姓名搜索"
              prefix-icon="el-icon-search"
              v-model="patientName">
          </el-input>
        </div>
        <div style="margin-left: 20px;min-width: 200px">
          <el-button-group>
            <el-button type="primary" @click="searchPatientByName">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="refreshPatientList"></el-button>
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
              <el-input type="number" v-model="ruleForm.year" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="患者性别" label-width="80px" prop="sex">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="患者电话" label-width="80px" prop="phone">
              <el-input v-model="ruleForm.phone" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="过往病史" label-width="80px" prop="pastMedicalHistory">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="ruleForm.pastMedicalHistory"></el-input>
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
          <el-table-column label="患者ID" prop="id" width="100">
          </el-table-column>
          <el-table-column label="患者姓名" prop="name" width="100">
          </el-table-column>
          <el-table-column align="center" label="患者年龄" prop="year" width="100">
          </el-table-column>
          <el-table-column align="center" label="患者电话" prop="phone" width="300">
          </el-table-column>
          <el-table-column align="center" label="患者性别" prop="sex" width="100">
          </el-table-column>
          <el-table-column align="center" label="过往病史" prop="pastMedicalHistory" width="600">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-popover placement="top" :width="160" v-model="DeleteDialogVisible">
                <p>确定删除记录？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="DeleteDialogVisible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deletePatient(scope.$index, scope.row)">确定</el-button>
                </div>
                <template #reference>
                  <el-button @click="DeleteDialogVisible = true" type="danger" size="mini">删除</el-button>
                </template>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog title="编辑患者" v-model="editDialogFormVisible" center width="500px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="患者姓名" label-width="80px" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="患者年龄" label-width="80px" prop="year">
          <el-input type="number" v-model="ruleForm.year" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="患者性别" label-width="80px" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="患者电话" label-width="80px" prop="phone">
          <el-input v-model="ruleForm.phone" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="过往病史" label-width="80px" prop="pastMedicalHistory">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="ruleForm.pastMedicalHistory"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="editDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editPatient">确 定</el-button>
            </span>
      </template>
    </el-dialog>
    <div style="margin-top: 20px;display: flex;flex-direction: row;justify-content: flex-end">
      <el-pagination @current-change="current" @prev-click="prevClick" @next-click="nextClick" :current-page="pageIndex"
                     background
                     layout="prev, pager, next"
                     :total="totalPage" :page-size=10>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {Get,Post,Put,Delete} from "@/utils/requests";
import { ElMessage } from 'element-plus';
export default {
  name: 'patientList',
  props: {

  },
  data(){
    return {
      patientName:"",
      fullscreenLoading:false,
      dialogFormVisible:false,
      editDialogFormVisible:false,
      DeleteDialogVisible:false,
      totalPage:0,
      pageIndex:1,
      tableData:[],
      ruleForm: {
      },
      rules:{
        name: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' },
        ],
        year: [
          { required: true, message: '请输入患者年龄', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请输入患者性别', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入患者年龄', trigger: 'blur' },
        ],
        pastMedicalHistory: [
          { required: true, message: '请输入过往病史', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
    this.getPatientList(1,10)
  },
  methods:{
    getPatientList(page,size){
      Get("/base/get-patient-list",{"page":page,"size":size}).then(
          res=>{
            console.log(res.data.data)
            this.tableData = res.data.data.patientList
            this.totalPage = res.data.data.totalNum
          }
      )
    },
    searchPatientByName(){
      Get("/base/query-patient",{
        "name":this.patientName
      }).then(
          res=>{
            console.log(res.data)
            this.tableData=res.data.data
          }
      )
    },
    addPatient(){
      console.log(this.ruleForm)
      Post("/base/add-patient",this.ruleForm).then(
            res=>{
              if (res.status == 200){
                ElMessage.success({
                  message:"添加患者成功",
                  type:"success"
                })
                this.getPatientList(this.pageIndex,10)
              }
            }
        )
        this.dialogFormVisible=!this.dialogFormVisible
    },
    editPatient(){
      Put("/base/edit-patient",this.ruleForm).then(
          res=>{
            if (res.status==200){
              ElMessage.success({
                message:"编辑患者成功",
                type:"success"
              })
              this.getPatientList(this.pageIndex,10)
            }
          }
      )
      this.editDialogFormVisible=!this.editDialogFormVisible
    },
    deletePatient(index,row){
      Delete("/base/delete-patient",{"id":row.id}).then(
          res=>{
            if (res.status==200){
              ElMessage.success({
                message:"删除患者成功",
                type:"success"
              })
              this.getPatientList(this.pageIndex,10)
            }
          }
      )
    },
    handleEdit(index, row){
      this.ruleForm = row
      this.editDialogFormVisible = !this.editDialogFormVisible
    },
    refreshPatientList(){
      this.getPatientList(1,10)
    },
    current(index){
      console.log(index)
      this.getPatientList(index,10)
    },
    prevClick(index){
      this.getPatientList(index,10)
    },
    nextClick(index){
      this.getPatientList(index,10)
    }
  }
}
</script>

<style scoped>

</style>