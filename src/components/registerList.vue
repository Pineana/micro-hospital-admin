<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div style="display: flex;flex-direction: row;justify-content: start;margin-bottom: 10px">
      <div style="display:flex;flex-direction:row;width: 92%">
        <div style="min-width: 250px">
          <el-input
              placeholder="支持挂号id搜索"
              prefix-icon="el-icon-search"
              v-model="registerId">
          </el-input>
        </div>
        <div style="margin-left: 20px;min-width: 200px">
          <el-button-group>
            <el-button type="primary" @click="searchRegisterByName(0,10)">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="refreshRegisterList"></el-button>
          </el-button-group>
        </div>
      </div>
      <div style="width: 8%;justify-content: center">
        <el-button type="primary" @click="dialogFormVisible=true">添加挂号</el-button>
        <el-dialog title="添加挂号" v-model="dialogFormVisible" center width="500px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="患者id" label-width="80px" prop="patientId">
              <el-input v-model="ruleForm.patientId" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="挂号金额" label-width="80px" prop="price">
              <el-input type="number" v-model="ruleForm.price" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="挂号医生" label-width="80px" prop="doctorId">
              <el-select v-model="ruleForm.doctorId" clearable filterable remote placeholder="请输入挂号医生" :remote-method="remoteMethod" :loading="loading">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addRegister">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="挂号ID" prop="id" width="200"></el-table-column>
          <el-table-column label="患者姓名" prop="patientName" width="250"></el-table-column>
          <el-table-column align="center" label="患者年龄" prop="patientYear" width="80"></el-table-column>
          <el-table-column align="center" label="患者电话" prop="patientPhone" width="250"></el-table-column>
          <el-table-column align="center" label="患者性别" prop="patientSex" width="250"></el-table-column>
          <el-table-column align="center" label="挂号金额" prop="price" width="200"></el-table-column>
          <el-table-column align="center" label="挂号医生-科室" prop="doctorName" width="200"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-popover placement="top" :width="160" v-model="DeleteDialogVisible">
                <p>确定删除记录？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="DeleteDialogVisible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteRegister(scope.$index, scope.row)">确定</el-button>
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
  name: 'RegisterList',
  props: {

  },
  data(){
    return {
      registerId:"",
      loading:"",
      options:"",
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
        patientId: [
          { required: true, message: '请输入患者id', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入挂号价格', trigger: 'blur' },
        ],
        doctorId: [
          { required: true, message: '请输入挂号医生', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
    this.getRegisterList(1,10)
  },
  methods:{
    getRegisterList(page,size){
      Get("/base/get-register-list",{"page":page,"size":size}).then(
          res=>{
            console.log(res.data.data.registerList)
            this.tableData = res.data.data.registerList
            this.totalPage = res.data.data.totalNum
          }
      )
    },
    searchRegisterByName(page,size){
      Get("/base/query-register",{
        "name":this.registerId,
        "page":page,
        "size":size,
      }).then(
          res=>{
            console.log(res.data)
            this.tableData=res.data.data.registerList
            this.totalPage = res.data.data.totalNum
          }
      )
    },
    addRegister(){
      this.ruleForm.patientId = parseInt(this.ruleForm.patientId)
      console.log(this.ruleForm)
      Post("/base/add-register",this.ruleForm).then(
          res=>{
            if (res.status == 200){
              ElMessage.success({
                message:"添加挂号成功",
                type:"success"
              })
              this.ruleForm = {}
              this.getRegisterList(this.pageIndex,10)
            }
          }
      )
      this.dialogFormVisible=!this.dialogFormVisible
    },
    editRegister(){
      Put("/base/edit-register",this.ruleForm).then(
          res=>{
            if (res.status==200){
              ElMessage.success({
                message:"编辑挂号成功",
                type:"success"
              })
              this.ruleForm = {}
              this.getRegisterList(this.pageIndex,10)
            }
          }
      )
      this.editDialogFormVisible=!this.editDialogFormVisible
    },
    deleteRegister(index,row){
      Delete("/base/delete-register",{"id":row.id}).then(
          res=>{
            if (res.status==200){
              ElMessage.success({
                message:"删除挂号成功",
                type:"success"
              })
              this.getRegisterList(this.pageIndex,10)
            }
          }
      )
    },
    handleEdit(index, row){
      this.ruleForm = row
      this.editDialogFormVisible = !this.editDialogFormVisible
    },
    refreshRegisterList(){
      this.getRegisterList(1,10)
    },
    current(index){
      console.log(index)
      if (this.registerId==""){
        console.log("no search")
        this.getRegisterList(index,10)
      }else{
        this.searchRegisterByName(index,10)
      }
    },
    prevClick(index){
      if (this.registerId==""){
        this.getRegisterList(index,10)
      }else{
        this.searchRegisterByName(index,10)
      }
    },
    nextClick(index){
      if (this.registerId==""){
        this.getRegisterList(index,10)
      }else{
        this.searchRegisterByName(index,10)
      }
    },
    remoteMethod(query){
      this.loading = true
      Get("/base/query-doctor",{"name":query,"page":1,"size":100}).then(
          res=>{
            this.options = res.data.data.doctorList.map(function (item){
              return {
                "label":item.name+"--"+item.department,
                "value":item.id,
                "key":item.id
              }
            })
            this.loading=false
          }
      )
    }
  }
}
</script>

<style scoped>

</style>