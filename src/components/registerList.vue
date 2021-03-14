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
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              label="挂号ID"
              prop="registerID" width="200">
          </el-table-column>
          <el-table-column
              label="患者姓名"
              prop="name" width="250">
          </el-table-column>
          <el-table-column
              align="center"
              label="患者年龄"
              prop="year" width="80">
          </el-table-column>
          <el-table-column
              align="center"
              label="患者电话"
              prop="phone" width="250">
          </el-table-column>
          <el-table-column
              align="center"
              label="患者性别"
              prop="sex" width="250">
          </el-table-column>
          <el-table-column
              align="center"
              label="挂号金额"
              prop="price" width="200">
          </el-table-column>
          <el-table-column
              align="center"
              label="挂号科室-医生"
              prop="doctor" width="200">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template>
              <el-button type="text" size="small">编辑</el-button>
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
name: "registerList"
}
</script>

<style scoped>

</style>