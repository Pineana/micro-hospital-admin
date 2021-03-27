<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div style="display: flex;flex-direction: row;justify-content: start;margin-bottom: 10px">
      <div style="display:flex;flex-direction:row;width: 92%">
        <div style="min-width: 250px">
          <el-input
              placeholder="支持医生姓名搜索"
              prefix-icon="el-icon-search"
              v-model="doctorName">
          </el-input>
        </div>
        <div style="margin-left: 20px;min-width: 200px">
          <el-button-group>
            <el-button type="primary" @click="searchDoctorByName(0,10)">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="refreshDoctorList"></el-button>
          </el-button-group>
        </div>
      </div>
      <div style="width: 8%;justify-content: center">
        <el-button type="primary" @click="dialogFormVisible=true">添加医生</el-button>
        <el-dialog title="添加医生" v-model="dialogFormVisible" center width="500px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="医生姓名" label-width="80px" prop="name">
              <el-input v-model="ruleForm.name" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="医生年龄" label-width="80px" prop="year">
              <el-input type="number" v-model="ruleForm.year" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="医生性别" label-width="80px" prop="sex">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="医生电话" label-width="80px" prop="phone">
              <el-input v-model="ruleForm.phone" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" label-width="80px" prop="department">
              <el-input v-model="ruleForm.department" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addDoctor">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="医生ID" prop="id" width="100">
          </el-table-column>
          <el-table-column label="医生姓名" prop="name" width="100">
          </el-table-column>
          <el-table-column align="center" label="医生年龄" prop="year" width="100">
          </el-table-column>
          <el-table-column align="center" label="医生电话" prop="phone" width="300">
          </el-table-column>
          <el-table-column align="center" label="医生性别" prop="sex" width="100">
          </el-table-column>
          <el-table-column align="center" label="所属部门" prop="department" width="200">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-popover placement="top" :width="160" v-model="DeleteDialogVisible">
                <p>确定删除记录？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="DeleteDialogVisible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteDoctor(scope.$index, scope.row)">确定</el-button>
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

    <el-dialog title="编辑医生" v-model="editDialogFormVisible" center width="500px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="医生姓名" label-width="80px" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="医生年龄" label-width="80px" prop="year">
          <el-input type="number" v-model="ruleForm.year" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="医生性别" label-width="80px" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="医生电话" label-width="80px" prop="phone">
          <el-input v-model="ruleForm.phone" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" label-width="80px" prop="department">
          <el-input v-model="ruleForm.department" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="editDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editDoctor">确 定</el-button>
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
  name: 'DoctorList',
  props: {

  },
  data(){
    return {
      doctorName:"",
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
          { required: true, message: '请输入医生姓名', trigger: 'blur' },
        ],
        year: [
          { required: true, message: '请输入医生年龄', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请输入医生性别', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入医生年龄', trigger: 'blur' },
        ],
        department: [
          { required: true, message: '请输入所属部门', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
    this.getDoctorList(1,10)
  },
  methods:{
    getDoctorList(page,size){
      Get("/base/get-doctor-list",{"page":page,"size":size}).then(
          res=>{
            console.log(res.data.data)
            this.tableData = res.data.data.doctorList
            this.totalPage = res.data.data.totalNum
          }
      )
    },
    searchDoctorByName(page,size){
      Get("/base/query-doctor",{
        "name":this.doctorName,
        "page":page,
        "size":size,
      }).then(
          res=>{
            console.log(res.data)
            this.tableData=res.data.data.doctorList
            this.totalPage = res.data.data.totalNum
          }
      )
    },
    addDoctor(){
      console.log(this.ruleForm)
      Post("/base/add-doctor",this.ruleForm).then(
          res=>{
            if (res.status == 200){
              ElMessage.success({
                message:"添加医生成功",
                type:"success"
              })
              this.getDoctorList(this.pageIndex,10)
            }
          }
      )
      this.dialogFormVisible=!this.dialogFormVisible
    },
    editDoctor(){
      Put("/base/edit-doctor",this.ruleForm).then(
          res=>{
            if (res.status==200){
              ElMessage.success({
                message:"编辑医生成功",
                type:"success"
              })
              this.getDoctorList(this.pageIndex,10)
            }
          }
      )
      this.editDialogFormVisible=!this.editDialogFormVisible
    },
    deleteDoctor(index,row){
      Delete("/base/delete-doctor",{"id":row.id}).then(
          res=>{
            if (res.status==200){
              ElMessage.success({
                message:"删除医生成功",
                type:"success"
              })
              this.getDoctorList(this.pageIndex,10)
            }
          }
      )
    },
    handleEdit(index, row){
      this.ruleForm = row
      this.editDialogFormVisible = !this.editDialogFormVisible
    },
    refreshDoctorList(){
      this.getDoctorList(1,10)
    },
    current(index){
      console.log(index)
      if (this.doctorName==""){
        console.log("no search")
        this.getDoctorList(index,10)
      }else{
        this.searchDoctorByName(index,10)
      }
    },
    prevClick(index){
      if (this.doctorName==""){
        this.getDoctorList(index,10)
      }else{
        this.searchDoctorByName(index,10)
      }
    },
    nextClick(index){
      if (this.doctorName==""){
        this.getDoctorList(index,10)
      }else{
        this.searchDoctorByName(index,10)
      }
    }
  }
}
</script>

<style scoped>

</style>