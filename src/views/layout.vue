<template>
  <div id = "layout">
    <el-container>
      <el-aside width="250px">
        <div class="tilte">
          <img alt class="logoimg" src="../assets/logo.png" />
          <h2 class="tit-text">微型诊所系统</h2>
        </div>
        <div class="menu">
          <el-menu :default-active="activePage" class="el-menu" @select="selectMenu">
            <el-menu-item index="1">
              <i class="el-icon-s-custom"></i>
              <template #title>患者管理</template>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-s-grid"></i>
              <template #title>医务人员管理</template>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-s-cooperation"></i>
              <template #title>药品管理</template>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-s-platform"></i>
              <template #title>挂号管理</template>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-document"></i>
              <template #title>电子处方</template>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-files"></i>
              <template #title>病历</template>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-news"></i>
              <template #title>诊所联网</template>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header height="60px">
              <div style="display: flex;flex-direction: row;justify-content: flex-end;">
                <el-avatar style="margin-right: 20px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <el-link type="primary" @click="logout">退出</el-link>
              </div>
        </el-header>
        <el-main>
          <el-tabs v-model="activeName" type="card" @tab-click="selectTab">
            <el-tab-pane label="患者管理" name="one"><patient-list></patient-list></el-tab-pane>
            <el-tab-pane label="医务人员管理" name="two"><doctor-list></doctor-list></el-tab-pane>
            <el-tab-pane label="药品管理" name="three"><drug-list></drug-list></el-tab-pane>
            <el-tab-pane label="挂号管理" name="four"><register-list></register-list></el-tab-pane>
            <el-tab-pane label="电子处方" name="five"></el-tab-pane>
            <el-tab-pane label="病历" name="six"></el-tab-pane>
            <el-tab-pane label="诊所联网" name="seven"><patient-list></patient-list></el-tab-pane>
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
import router from "@/router";
export default {
name: "layout",
  components: {
    patientList,
    doctorList,
    drugList,
    registerList,
  },
  data(){
  return {
    activeName:"one",
    activePage:"1"
  }
  },
  methods:{
    logout(){
      router.push({name:"login"})
    },
    selectMenu(index){
      switch (index){
        case "1":
          this.activeName = "one";
          console.log(this.activeName)
          break;
        case "2":
          this.activeName = "two";
          console.log(this.activeName)
          break;
        case "3":
          this.activeName = "three";
          console.log(this.activeName)
          break;
        case "4":
          this.activeName = "four";
          console.log(this.activeName)
          break;
        case "5":
          this.activeName = "five";
          console.log(this.activeName)
          break;
        case "6":
          this.activeName = "six";
          console.log(this.activeName)
          break;
        case "7":
          this.activeName = "seven";
          console.log(this.activeName)
          break;
      }
    },
    selectTab(tab){
      switch (tab.props.name){
        case "one":
          this.activePage = "1";
          break;
        case "two":
          this.activePage = "2";
          break;
        case "three":
          this.activePage = "3";
          break;
        case "four":
          this.activePage = "4";
          break;
        case "five":
          this.activePage = "5";
          break;
        case "six":
          this.activePage = "6";
          break;
        case "seven":
          this.activePage = "7";
          break;
      }
    },
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