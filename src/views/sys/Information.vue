<template>
  <!-- 基础数据 -->
  <div style="text-align: left;">
    <!-- 搜索框-->
    <el-form :inline="true" :model="informations"  class="user-search">
      <el-form-item>
        <el-input v-model="informations.informationTitile"   placeholder="根据资讯标题查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="doSearch(),openFullScreen2()"  >搜索</el-button>
        <el-button  type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button  type="success" icon="el-icon-refresh"  @click="doSearch()" >刷新</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableDate" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand" >
            <el-form-item label="资讯编号">
              <span style="font-size: 20px">2020041500{{ scope.row.informationId}}</span>
            </el-form-item><br/>
            <el-form-item label="资讯标题">
              <el-tag type="info" style="font-size: 20px;"  class="exp">{{ scope.row.informationTitile}}</el-tag>
              <!--<span style="font-size: 20px;" class="exp">{{ scope.row.informationTitile}}</span>-->
            </el-form-item>
            <el-form-item label="资讯标签">
              <span style="font-size: 20px">{{ scope.row.informationLabel}}</span>
            </el-form-item>
            <el-form-item label="资讯作者">
              <span style="font-size: 20px">{{ scope.row.informationAuthor}}</span>
            </el-form-item>
            <el-form-item label="审批人">
              <span style="font-size: 20px">{{ scope.row.informationApprover}}</span>
            </el-form-item>
            <el-form-item label="资讯状态">
              <span style="font-size: 20px">{{ scope.row.informationState}}</span>
            </el-form-item><br/>
            <el-form-item label="资讯内容" style="text-align: left">
              <span style="font-size: 20px"> &nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.informationContent}}</span>
            </el-form-item><br/><br/><br/>
            <el-form-item label="发布时间" style="text-align: right">
              <span style="font-size: 20px">{{ scope.row.informationDatatime}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="资讯标题"
        prop="informationTitile">
      </el-table-column>
      <el-table-column
        label="资讯标签"
        prop="informationLabel"
        :filters="[{ text: '政治资讯', value: '政治资讯' }, { text: '经济资讯', value: '经济资讯' }, { text: '法律资讯', value: '法律资讯' }
        , { text: '军事资讯', value: '军事资讯' } , { text: '科技资讯', value: '科技资讯' }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        :type="informationLabel === '政治新闻' ? 'primary' : 'success'"
        disable-transitions>
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.informationLabel === '政治资讯' ? 'danger' : 'success'"
            disable-transitions>{{scope.row.informationLabel}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="资讯审批人"
        prop="informationApprover">
      </el-table-column>
      <el-table-column
        label="相关操作"
        prop="informationId">
        <template slot-scope="scope">
          <el-button  type="danger" @click="dodel(scope.row)">删除资讯</el-button>
          <el-button  type="primary" icon="el-icon-edit-outline" @click="doedit(scope.row),dialogFormVisible = true">修改资讯</el-button>
        </template>
      </el-table-column>

    </el-table>


    <!--分页-->
    <div class="block" style="padding-top: 20px;text-align: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        background :total="informations.total">
      </el-pagination>
    </div>

    <!-- //新增修改 -->
    <el-dialog :title="dialogFormFormTitel"  :visible.sync="dialogFormVisible" @close="doialogFormFormTitelClose"   width="50%" style=" height: 980px">
      <el-form :model="queryForm" ref="queryForm" status-icon   :inline="true" label-width="90px" class="demo-mergeForm"  style="text-align: center; padding-top: 1px; ">
        <el-form-item label="资讯标题:"  >
          <el-input v-model="queryForm.informationTitile" autocomplete="off" style="width:270px; "></el-input>
        </el-form-item>
        <el-form-item label="资讯标签:"   >
          <el-select v-model="queryForm.informationLabel" clearable placeholder="请选择" style="width: 180px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯作者:"   >
          <el-input v-model="queryForm.informationAuthor" autocomplete="off" style="width:100px; "></el-input>
        </el-form-item>
        <el-form-item  >
          <el-input
            type="textarea"
            :rows="12"
            style="width: 850px"
            placeholder="请输入资讯内容信息（需自行排版）"
            v-model="queryForm.informationContent"
            maxlength="2000字"
            show-word-limit>
          </el-input>
        </el-form-item><br/>
        <el-form-item label="资讯状态:"   >
          <el-input v-model="queryForm.informationState" autocomplete="off" style="width:170px; "></el-input>
        </el-form-item>
        <el-form-item label="审批人:"   >
          <el-input v-model="queryForm.informationApprover" autocomplete="off" style="width:170px; "></el-input>
        </el-form-item>
        <el-form-item label="发布时间:"   >
          <!--<el-input v-model="queryForm.informationDatatime" autocomplete="off" style="width:170px; "></el-input>-->
          <el-date-picker
            v-model="queryForm.informationDatatime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item><br/>
        <el-input v-model="queryForm.informationId"  type="hidden"  autocomplete="off" style="width:170px; "></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button type="success"  style="width: 75px;  height: 50px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">重置</el-button>
        <el-button type="primary"  style="width: 75px;  height: 50px; " @click="doAddDict(),dialogFormVisible = false">提交</el-button>
        <el-button @click="dialogFormVisible = false;doClose()"  type="danger" style="width: 75px;  height: 50px; ">取消</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  export default {
    data: function() {
      return {
        ts: new Date().getTime(),
        options: [{
          value: '政治资讯',
          label: '政治资讯'
        }, {
          value: '经济资讯',
          label: '经济资讯'
        }, {
          value: '法律资讯',
          label: '法律资讯'
        }, {
          value: '军事资讯',
          label: '军事资讯'
        }, {
          value: '科技资讯',
          label: '科技资讯'
        }],
        informations: {
          pageNum: 1,
          rows: 8,
          total: 0,
          informationTitile: null,//标题
        },
        tableDate: [],
        dialogFormVisible: false,
        dialogFormFormTitel: "增加资讯信息",
        formLabelWidth: '100px',
        queryForm: {
          informationId:null,
          informationTitile: null,
          informationLabel: null,
          informationAuthor: null,
          informationApprover: null,
          informationContent: null,
          informationState: null,
          informationDatatime: null,
        }

      }
    },
    methods: {
      doSearch: function() { //查询分页
        var url = this.axios.urls['SYS_INFORMATION_LIST'];
        this.axios.post(url, this.informations).then((response) => {
          console.log(response.data.result);
          console.log(response);
          this.tableDate = response.data.result;
          this.dicts.page = response.data.page;
          this.dicts.rows = response.data.rows;
          this.dicts.total = response.data.total;
        }).catch(function(error) {
          console.log(error);
        });
      },
      dodel: function(row) {
        this.$confirm('此操作将永久删除该资讯信息, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          var url = this.axios.urls['SYS_INFORMATION_DEL'];
          this.axios.post(url, {
            informationId: row.informationId
          }).then((response) => {
            if (0 === response.data.code) {
              this.$message({
                showClose: true,
                type: 'success',
                message: '删除成功!'
              });
            }
            this.doSearch();
          }).catch(function(error) {
            console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // //修改/添加
      doAddDict: function() {
        this.$refs["queryForm"].validate((valid) => {
          if (false === valid) {
            return false;
          }
          var url = this.axios.urls['SYS_INFORMATION_SAVEANDUPDATE'];
          console.log('***************************');
          this.axios.post(url, this.queryForm).then((response) => {
            if (0 === response.data.code) {
              console.log(response.data.code);
              this.$message({ //成功消息
                showClose: true,
                message: response.data.message,
                type: 'success'
              });
            }
            if (this.queryForm.informationId==null) {
              this.dialogFormVisible=false;
              this.doClose();
            }else{
              this.dialogFormVisible=true;
            }
            this.doSearch();
          }).catch(function(error) {
            console.log(error);
          });
        });
      },

      // //修改绑定信息
      doedit: function(row) {
        this.queryForm.informationId = row.informationId;
        this.queryForm.informationTitile = row.informationTitile;
        this.queryForm.informationLabel = row.informationLabel;
        this.queryForm.informationAuthor = row.informationAuthor;
        this.queryForm.informationApprover = row.informationApprover;
        this.queryForm.informationContent = row.informationContent;
        this.queryForm.informationState = row.informationState;
        this.queryForm.informationDatatime = row.informationDatatime;
        this.dialogFormFormTitel = "修改资讯信息";
        this.dialogFormVisible = true
      },

      doClose: function() {
        this.queryForm.informationId =null;
        this.queryForm.informationTitile = null;
        this.queryForm.informationLabel = null;
        this.queryForm.informationAuthor = null;
        this.queryForm.informationApprover = null;
        this.queryForm.informationContent = null;
        this.queryForm.informationState = null;
        this.queryForm.informationDatatime = null;
        this.dialogFormFormTitel = "增加资讯信息";
      },
      handleSizeChange(val) {
        this.informations.rows = val;
        this.informations.pageNum = 1;
        this.doSearch();
      },
      handleCurrentChange(val) {
        this.informations.pageNum = val;
        this.doSearch();
      },
      doialogFormFormTitelClose: function() {
        //清空
        this.$refs["From1"].resetFields();
        this.doClose();
      },
      filterTag(value, row) {
        return row.informationLabel === value;
      },
      openFullScreen2() {
      //   const loading = this.$loading({
      //     lock: true,
      //     text: '拼命加载中....',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   });
      //   setTimeout(() => {
      //     loading.close();
      //   }, 2000);
      }
    },
    //钩子函数
    created: function() {
      this.doSearch();
    }

  }
</script>

<style>
  .exp{ font-weight:bold}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
