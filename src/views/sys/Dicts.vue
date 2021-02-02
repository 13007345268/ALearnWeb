<template>
  <!-- 基础数据 -->
  <div style="text-align: left;">
    <!-- 搜索框-->
    <el-form :inline="true" :model="dicts"  class="user-search">
      <el-form-item>
        <el-input v-model="dicts.dictName"   placeholder="根据字典名称查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-zoom-in" @click="doSearch(),openFullScreen2()"  >搜索</el-button>
        <el-button  type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableDate"  style="width: 100%;" height="500">
      <el-table-column label="字典ID" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.dictId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="字典名称" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.dictName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="字典文本" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.dictText}}</span>
        </template>
      </el-table-column>
      <el-table-column label="字典取值" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.dictValue}}</span>
        </template>
      </el-table-column>
      <el-table-column label="能否编辑(1可 0不可)" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.editable}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button  @click="doedit(scope.row)">编辑</el-button>
          <el-button  type="danger" @click="dodel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--&lt;!&ndash;分页&ndash;&gt;-->
    <div class="block" style="padding-top: 20px;text-align: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        background :total="dicts.total">
      </el-pagination>
    </div>


    <!-- //新增 -->
    <el-dialog :title="dialogFormFormTitel"  :visible.sync="dialogFormVisible" @close="doialogFormFormTitelClose"   width="40%" style=" height: 800px">
      <el-form :model="queryForm" ref="queryForm" status-icon   :inline="true" label-width="90px" class="demo-mergeForm"  style="text-align: center; padding-top: 1px; ">
        <el-form-item label="字典名称:"  >
          <el-input v-model="queryForm.dictName" autocomplete="off" style="width:170px; "></el-input>
        </el-form-item>
        <el-form-item label="字典文本:"   >
          <el-input v-model="queryForm.dictText" autocomplete="off" style="width:170px; "></el-input>
        </el-form-item>
        <el-form-item label="字典取值:"   >
          <el-input v-model="queryForm.dictValue" autocomplete="off" style="width:170px; "></el-input>
        </el-form-item>
        <el-form-item label="能否编辑:"   >
          <el-input v-model="queryForm.editable" autocomplete="off" style="width:170px; "></el-input>
        </el-form-item><br/>
        <el-input v-model="queryForm.dictId"  type="hidden"  autocomplete="off" style="width:170px; "></el-input>
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
        dicts: {
          pageNum: 1,
          rows: 5,
          total: 0,
          dictName: null,
        },
        tableDate: [],
        dialogFormVisible: false,
        dialogFormFormTitel: "信息增加",
        formLabelWidth: '100px',
        queryForm: {
          dictId: null,
          dictName: null,
          dictText: null,
          dictValue: null,
          editable: null
        }

      }
    },
    methods: {
      doSearch: function() { //查询分页
        var url = this.axios.urls['SYS_DICT_LIST'];
        this.axios.post(url, this.dicts).then((response) => {
          console.log(response.data.result);
          console.log(response);
          this.tableDate = response.data.result;
          this.dicts.page = response.data.page;
          this.dicts.rows = response.data.rows;
          this.dicts.total = response.data.total;
        }).catch(function(error) {
          // console.log('222222222222');
          console.log(error);
        });
      },
      dodel: function(row) {
        this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          var url = this.axios.urls['SYS_DICT_DEL'];
          this.axios.post(url, {
            dictId: row.dictId
          }).then((response) => {
            if (0 === response.data.code) {
              this.$message({
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
          var url = this.axios.urls['SYS_DICT_SAVEANDUPDATE'];
          console.log('***************************');
          console.log(this.queryForm.dictId);
          console.log(this.queryForm.dictName);
          console.log(this.queryForm.dictText);
          console.log(this.queryForm.dictValue);
          console.log(this.queryForm.editable);
          console.log('***************************');
          this.axios.post(url, this.queryForm).then((response) => {
            if (0 === response.data.code) {
              console.log(response.data.code);
              this.$message({ //成功消息
                message: response.data.message,
                type: 'success'
              });
            }
            if (this.queryForm.dictId==null) {
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
        this.queryForm.dictId = row.dictId;
        this.queryForm.dictName = row.dictName;
        this.queryForm.dictText = row.dictText;
        this.queryForm.dictValue = row.dictValue;
        this.queryForm.editable = row.editable;
        this.dialogFormFormTitel = "信息修改";
        this.dialogFormVisible = true
      },

      doClose: function() {
        this.queryForm.dictId = null;
        this.queryForm.dictName = null;
        this.queryForm.dictText = null;
        this.queryForm.dictValue = null;
        this.queryForm.editable = null;
        this.dialogFormFormTitel = "信息增加";
      },
      handleSizeChange(val) {
        this.dicts.rows = val;
        this.dicts.pageNum = 1;
        this.doSearch();
      },
      handleCurrentChange(val) {
        this.dicts.pageNum = val;
        this.doSearch();
      },
      doialogFormFormTitelClose: function() {
        //清空
        this.$refs["From1"].resetFields();
        this.doClose();
      },
      openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: '玩命加载中....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      }
    },
    created: function() {
      this.doSearch();
    }

  }
</script>

<style>

</style>
