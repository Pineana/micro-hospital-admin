<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div style="display: flex;flex-direction: row;justify-content: start;margin-bottom: 10px">
      <div style="display:flex;flex-direction:row;width: 92%">
        <div style="min-width: 250px">
          <el-input
              placeholder="支持药品名称搜索"
              prefix-icon="el-icon-search"
              v-model="drugName">
          </el-input>
        </div>
        <div style="margin-left: 20px;min-width: 200px">
          <el-button-group>
            <el-button type="primary" @click="searchDrugByName(0,10)">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="refreshDrugList"></el-button>
          </el-button-group>
        </div>
      </div>
      <div style="width: 8%;justify-content: center">
        <el-button type="primary" @click="dialogFormVisible=true">添加药品</el-button>
        <el-dialog title="添加药品" v-model="dialogFormVisible" center width="500px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="药品名称" label-width="80px" prop="name">
              <el-input v-model="ruleForm.name" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="药品库存" label-width="80px" prop="stock">
              <el-input type="number" v-model="ruleForm.stock" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="药品价格" label-width="80px" prop="price">
              <el-input type="number" v-model="ruleForm.price" autocomplete="off" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="药品类型" label-width="80px" prop="type">
              <el-radio-group v-model="ruleForm.type">
                <el-radio label="处方药">处方药</el-radio>
                <el-radio label="非处方药">非处方药</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="药品说明" label-width="80px" prop="description">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="ruleForm.description"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addDrug">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="药品ID" prop="id" width="200"></el-table-column>
          <el-table-column label="药品名称" prop="name" width="250"></el-table-column>
          <el-table-column align="center" label="药品库存" prop="stock" width="80"></el-table-column>
          <el-table-column align="center" label="药品价格" prop="price" width="250"></el-table-column>
          <el-table-column align="center" label="药品类型" prop="type" width="250"></el-table-column>
          <el-table-column align="center" label="药品说明" prop="description" width="200"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-popover placement="top" :width="160" v-model="DeleteDialogVisible">
                <p>确定删除记录？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="DeleteDialogVisible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteDrug(scope.$index, scope.row)">确定</el-button>
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

    <el-dialog title="添加药品" v-model="editDialogFormVisible" center width="500px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="药品名称" label-width="80px" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="药品库存" label-width="80px" prop="stock">
          <el-input type="number" v-model="ruleForm.stock" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="药品价格" label-width="80px" prop="price">
          <el-input type="number" v-model="ruleForm.price" autocomplete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="药品类型" label-width="80px" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="处方药">处方药</el-radio>
            <el-radio label="非处方药">非处方药</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="药品说明" label-width="80px" prop="description">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="ruleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="editDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editDrug">确 定</el-button>
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
  name: 'DrugList',
  props: {

  },
  data(){
    return {
      drugName:"",
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
          { required: true, message: '请输入药品姓名', trigger: 'blur' },
        ],
        stock: [
          { required: true, message: '请输入药品库存', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入药品价格', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请输入药品类型', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入药品说明', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
    this.getDrugList(1,10)
  },
  methods:{
    getDrugList(page,size){
      Get("/base/get-drug-list",{"page":page,"size":size}).then(
          res=>{
            console.log(res.data.data)
            this.tableData = res.data.data.drugList
            this.totalPage = res.data.data.totalNum
          }
      )
    },
    searchDrugByName(page,size){
      Get("/base/query-drug",{
        "name":this.drugName,
        "page":page,
        "size":size,
      }).then(
          res=>{
            console.log(res.data)
            this.tableData=res.data.data.drugList
            this.totalPage = res.data.data.totalNum
          }
      )
    },
    addDrug(){
      console.log(this.ruleForm)
      Post("/base/add-drug",this.ruleForm).then(
          res=>{
            if (res.status == 200){
              ElMessage.success({
                message:"添加药品成功",
                type:"success"
              })
              this.ruleForm = {}
              this.getDrugList(this.pageIndex,10)
            }
          }
      )
      this.dialogFormVisible=!this.dialogFormVisible
    },
    editDrug(){
      Put("/base/edit-drug",this.ruleForm).then(
          res=>{
            if (res.status==200){
              ElMessage.success({
                message:"编辑药品成功",
                type:"success"
              })
              this.ruleForm = {}
              this.getDrugList(this.pageIndex,10)
            }
          }
      )
      this.editDialogFormVisible=!this.editDialogFormVisible
    },
    deleteDrug(index,row){
      Delete("/base/delete-drug",{"id":row.id}).then(
          res=>{
            if (res.status==200){
              ElMessage.success({
                message:"删除药品成功",
                type:"success"
              })
              this.getDrugList(this.pageIndex,10)
            }
          }
      )
    },
    handleEdit(index, row){
      this.ruleForm = row
      this.editDialogFormVisible = !this.editDialogFormVisible
    },
    refreshDrugList(){
      this.getDrugList(1,10)
      this.drugName = ""
    },
    current(index){
      console.log(index)
      if (this.drugName==""){
        console.log("no search")
        this.getDrugList(index,10)
      }else{
        this.searchDrugByName(index,10)
      }
    },
    prevClick(index){
      if (this.drugName==""){
        this.getDrugList(index,10)
      }else{
        this.searchDrugByName(index,10)
      }
    },
    nextClick(index){
      if (this.drugName==""){
        this.getDrugList(index,10)
      }else{
        this.searchDrugByName(index,10)
      }
    }
  }
}
</script>

<style scoped>

</style>