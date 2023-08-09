<template>
  
    <div id="app">
      <div id="top">
        <div style="display: inline-block;">
          <div style="display: inline-block"><span style="font-size: 14px; color: #7d8089!important;">任务：</span></div>
          <el-select v-model="data.inventoryTaskObject" @change="(value)=>{getInventoryTableData(value)}">
            <el-option
              v-for="item in data.inventoryTask"
              :key="item.id"
              :label="item.task_name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div style="display: inline-block;width:60%">
          <el-menu
            :default-active="1"
            class="el-menu-demo"
            mode="horizontal"
            @select="menuleSelect"
          >
            <el-menu-item index="1">未匹配</el-menu-item>
            <el-menu-item index="2">已匹配</el-menu-item>
          </el-menu>
        </div>
        <div style="display: inline-block;">
          <el-button type="success" round>完成盘点</el-button>
        </div>
  
  
        
        <br>
        <br>
      </div>
  
      <div id="middle">
        <div class="null" style="display: inline-block;width:1%"></div>
        <div id="middle-left" style="display: inline-block;width:48%">
          <div id="middle-left-top" style="width:100%">
            <div style="display: inline-block"><span style="font-size: 14px; color: #7d8089!important;">筛选条件：{{ data.inventoryFilterText }}</span></div>
            <div style="display: inline-block;float:right;margin-bottom: 5px;">
              <el-button type="primary" @click="data.inventoryDialogVisible = true"><el-icon><Search /></el-icon></el-button>
              <el-dialog v-model="data.inventoryDialogVisible" title="筛选">
                <el-form :model="data.inventoryFilterObject">
                  <el-form-item label="采集码">
                    <el-input v-model="data.inventoryFilterObject.gu_Id" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="资产名称">
                    <el-input v-model="data.inventoryFilterObject.assets_name" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="资产分类" >
                    <el-select v-model="data.inventoryFilterObject.type_name">
                      <el-option
                        v-for="item in data.inventoryFilter.type_name"
                        :key="item.key"
                        :label="item.name"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="品牌">
                    <el-input v-model="data.inventoryFilterObject.brand" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="型号">
                    <el-input v-model="data.inventoryFilterObject.sku" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="使用人">
                    <el-input v-model="data.inventoryFilterObject.user_id" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="使用部门">
                    <el-input v-model="data.inventoryFilterObject.dept_id" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="存放地点">
                    <el-input v-model="data.inventoryFilterObject.place_id" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="data.inventoryFilterObject.remarks" autocomplete="off" />
                  </el-form-item>
  
                  <el-form-item>
                    <el-button type="primary" @click="queryInventory">查询</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </div>
          </div>
          <div id="middle-left-middle">
            <el-table 
              :data="data.inventoryTableData" 
              border 
              height="700"
              style="width: 100%;"
              highlight-current-row
              @row-click="clickInventory"
              >
              <el-table-column type="index" label="序号" width="60" ></el-table-column>
              <el-table-column prop="gu_Id" label="采集码" width="110" ></el-table-column>
              <el-table-column prop="assets_name" label="资产名称" width="180" ></el-table-column>
              <el-table-column prop="type_name" label="资产分类" width="180" ></el-table-column>
              <el-table-column prop="brand" label="品牌" width="180" ></el-table-column>
              <el-table-column prop="sku" label="型号" width="180" ></el-table-column>
              <el-table-column prop="user_name" label="使用人" width="180" ></el-table-column>
              <el-table-column prop="dept" label="使用部门" width="180" ></el-table-column>
              <el-table-column prop="plac" label="存放地点" width="180" ></el-table-column>
              <el-table-column prop="remarks" label="备注" width="180" ></el-table-column>
              <!-- <el-table-column fixed="right" label="操作" width="60">
                <template v-slot="scope">
                  <el-button link type="success" circle  @click="clickInventory(scope.row)"><el-icon><Search /></el-icon></el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
          <div id="middle-left-bottom"></div>
        </div>
        <div class="null" style="display: inline-block;width:2%"></div>
        <div id="middle-right" style="display: inline-block;width:48%">
          <div id="middle-right-top">
            <div style="display: inline-block"><span style="font-size: 14px; color: #7d8089!important;">筛选条件：{{ data.cardFilterText }}</span></div>
            <div style="display: inline-block;float:right;margin-bottom: 5px;"><el-button type="primary"><el-icon><Search /></el-icon></el-button></div>
          </div>
          <div id="middle-right-middle">
            <el-table 
              :data="data.cardTableData" 
              border 
              height="700"
              style="width: 100%;"
              >
  
              <el-table-column fixed="left" label="操作" width="55">
                <template v-slot="scope">
                  <el-button link type="success" circle  @click="clickCard(scope.row)"><el-icon><Link /></el-icon></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="score_text" label="匹配度" width="80" ></el-table-column>
              <el-table-column prop="zichanbh" label="资产编号" width="140" ></el-table-column>
              <el-table-column prop="zichanmc" label="资产名称" width="150" ></el-table-column>
              <el-table-column prop="guobiaodalei" label="大类" width="120" ></el-table-column>
              <el-table-column prop="zichanflbm" label="分类编码" width="90" ></el-table-column>
              <el-table-column prop="zichanflmc" label="分类名称" width="150" ></el-table-column>
              <el-table-column prop="shiyongrid" label="使用人" width="110" ></el-table-column>
              <el-table-column prop="shiyongglbmid" label="使用部门" width="120" ></el-table-column>
              <el-table-column prop="price" label="原值" width="90" ></el-table-column>
              <el-table-column prop="quderq" label="取得日期" width="110" ></el-table-column>
              <el-table-column prop="shuliang" label="数量" width="90" ></el-table-column>
              <el-table-column prop="jiliangdw" label="计量单位" width="90" ></el-table-column>
              <el-table-column prop="pinpai" label="品牌" width="90" ></el-table-column>
              <el-table-column prop="guigexh" label="规格型号" width="90" ></el-table-column>
              <el-table-column prop="kuaijiCode" label="会计凭证" width="90" ></el-table-column>
              <el-table-column prop="beizhu" label="备注" width="90" ></el-table-column>
            </el-table>
          </div>
          <div id="middle-right-bottom"></div>
        </div>
      </div>
  
      <div id="bottom"><h5>没用，但是留着</h5></div>
    </div>
  </template>
  <script setup>
  import { reactive, ref,onMounted } from 'vue'
  import { alertProps } from 'element-plus';
  import xh from "./Utils/xh.js"; 
  var tenant_code = '744948633a344aa6acd333af51139e78';
  
  //所有数据集合
  var data = reactive({
    //任务数据
    "inventoryTask":[],
    //采集码的筛选条件
    "inventoryFilterObject":{},
    //当前选择任务
    "inventoryTaskObject":null,
    //采集任务的明细
    "inventoryTableData":[],
    //控制显示和隐藏采集码的筛选窗口
    inventoryDialogVisible:false,
    //采集码的ID
    inventoryId:null,
    //采集码的筛选条件文本
    inventoryFilterText:"",
    //采集码的筛选项
    inventoryFilter:{
      "type_name":[
        {"name":"测试1","key":"1"},
        {"name":"测试2","key":"2"},
        {"name":"测试3","key":"3"}
      ]
    },
    //卡片的筛选条件
    cardFilterText:"",
    // 获取卡片信息
    cardTableData:[]
  })
  
  
  //获取任务数据
  onMounted(async ()=>{
    data.inventoryTask = await xh.getInventoryTask(tenant_code);
  })
  
  
  // var cardTableData = xh.getCardTableData();
  
  // 获取未匹配采集码信息
  var getInventoryTableData = async (value) => {
    console.log(value)
    data.inventoryTableData = await xh.getIenuleSelect(tenant_code,value,1);
   }
  
  
  var clickInventory = async (row) => {
    console.log(row)
    //要把当前行的数据存下来
    data.inventoryId = row.id
  
    //并查询相关的卡片，用 莱文斯坦距离（Levenshtein）来计算匹配度
    var result = await xh.getCardTableData(tenant_code,row);
    result = sortKey(result,"score")
    data.cardTableData = result;
  
   
    
  }
  var clickCard = (row) => {
    if(data.inventoryId){
      alert(data.inventoryId)
    }else{
      alert("先点左边")
    }
    //和采集码建立关系
    //改变采集码的状态
    //把当前menuleSelect=()=>{}中对应的采集码删掉
  }
  var menuleSelect=()=>{}
  
  var queryInventory = () => {
    Object.keys(data.inventoryFilterObject).forEach(item => {
      data.inventoryFilterText = data.inventoryFilterText + item + ":" + data.inventoryFilterObject[item] + ";"
      console.log(data.inventoryFilterObject[item]);
      
    });
    
    // data.inventoryFilterText
    data.inventoryDialogVisible = false;
  
  }
  
  //对象数组排序
  var sortKey=(array,key)=>{
    return array.sort(function(a,b){
        var x = a[key];
        var y = b[key];
        //倒序
        return ((x>y)?-1:(x<y)?1:0)
        //正序
        //return ((x<y)?-1:(x>y)?1:0)
    })
  }
  
  
  </script>
  <style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
    box-shadow:"Basic Shadow";
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  </style>
  