<template>
  <el-dialog width="500px" title="员工数据导入" :visible="showExcelDialog" @close="closeDialog" :close-on-click-modal="false">
    <el-row type="flex" justify="center">
      <div class="upload-excel">
        <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="uploadChange" />
        <div class="drop">
          <i class="el-icon-upload" />
          <el-button type="text" @click="getExportTemplate">下载导入模板</el-button>
          <span>
            <span>将文件拖到此处或</span>
            <el-button type="text" @click="handleUpload">点击上传</el-button>
          </span>
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="end">
      <!-- update:props属性名，值 直接修改 .sync修饰符的属性值 -->
      <el-button style="width: 100px" size="mini" @click="closeDialog">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import FileSaver from 'file-saver'
import { getExportTemplate, uploadExcel } from '@/api/employee'

export default {
  name: 'ImportExcel',
  props: {
    showExcelDialog: { type: Boolean, default: false },
  },
  data() {
    return {}
  },
  methods: {
    closeDialog() {
      this.$emit('update:showExcelDialog', false)
    },

    /** 下载导入员工模板 Excel */
    async getExportTemplate() {
      const loading = this.$loading({ lock: true, text: '正在下载，请稍候......', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.8)' })
      const data = await getExportTemplate()
      FileSaver.saveAs(data, '员工导入模版.xlsx')
      setTimeout(() => loading.close(), 200)
    },

    /** */
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },

    async uploadChange(event) {
      const files = event.target.files
      if (!files.length) return void 0
      const formData = new FormData()
      formData.append('file', files[0])
      try {
        await uploadExcel(formData)
        this.$emit('uploadSuccess') // 通知父组件 我上传成功
        this.$message.success(`批量导入员工成功`)
        this.closeDialog()
      } catch (error) {
        console.log('error: ', error)
      } finally {
        // 这里为什么不管成功或者失败都要清空文件选择器中的内容呢？
        // 因为不论成功或者失败，再点击上传都会去选择一个新的 excel，所以这里使用 finally 等到最后，将内容清空。
        this.$refs['excel-upload-input'].value = ''
      }
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin: 20px;
  width: 360px;
  height: 180px;
  align-items: center;
  color: #697086;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  /* prettier-ignore */
  .btn-upload, .drop {
    border: 1px dashed #dcdfe6;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 160px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .drop {
    line-height: 40px;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
      color: #c0c4cc;
    }
  }
}
</style>
