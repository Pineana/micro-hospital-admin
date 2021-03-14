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
      tableData:[{
        patientID: 1,
        name: '王小虎',
        year: 11,
        phone: '15157276075',
        sex: 0,
        pastMedicalHistory: "有病",
      }]
    }
  }
}
</script>

<style scoped>

</style>