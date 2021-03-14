<template>
  <div id = "layout">
    <el-container>
      <el-aside width="250px">
        <div class="tilte">
          <img alt class="logoimg" src="../assets/logo.png" />
          <h2 class="tit-text">微型诊所系统</h2>
        </div>
        <div class="menu">
          <el-menu default-active="2" class="el-menu">
            <el-menu-item index="1">
              <i class="el-icon-s-custom"></i>
              <template #title>患者管理</template>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-s-grid"></i>
              <template #title>员工管理</template>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-s-cooperation"></i>
              <template #title>药品管理</template>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-s-platform"></i>
              <template #title>挂号管理</template>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header height="60px">Header</el-header>
        <el-main>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="患者管理" name="first"><patient-list></patient-list></el-tab-pane>
            <el-tab-pane label="员工管理" name="second"><doctor-list></doctor-list></el-tab-pane>
            <el-tab-pane label="药品管理" name="third"><drug-list></drug-list></el-tab-pane>
            <el-tab-pane label="挂号管理" name="fourth"><register-list></register-list></el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import patientList from "@/components/patientList";
import doctorList from "@/components/doctorList";
import registerList from "@/components/registerList";
import drugList from "@/components/drugList";
export default {
name: "layout",
  components: {
    patientList,
    doctorList,
    drugList,
    registerList,
  }
}
</script>

<style>
#layout{
  width: 100%;
  height: 100%;
}
.logoimg {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  border-radius: 50%;
  padding: 3px;
}
.tit-text{
  display: inline-block;
  color: #000;
  font-weight: 600;
  font-size: 20px;
  vertical-align: middle;
}
.aside{
  height: 100%;
}
</style>