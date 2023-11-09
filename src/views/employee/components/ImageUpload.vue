<template>
  <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload" :accept="accept" :http-request="uploadImage">
    <!-- (自动上传)action是上传地址 人资项目不需要 人资项目(手动上传)  -->
    <!-- show-file-list 不展示列表 -->
    <img v-if="value" :src="value" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import COS from 'cos-js-sdk-v5'

export default {
  name: 'ImageUpload',
  props: {
    value: { type: String, default: '' },
  },
  data() {
    return {
      accept: '.jpg, .png, .gif', // 接受上传的文件类型
    }
  },
  methods: {
    /** 上传文件之前的钩子，参数为上传的文件 return true(继续上传)/false(停止上传) */
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5 // 5M
      if (!isLt2M) this.$message.error('上传头像图片大小不能超过 5MB!')
      return isLt2M
    },

    /** 选择图片上传 */
    uploadImage(params) {
      console.log('params: ', params)
      // 完成 cos 对象的初始化
      const cos = new COS({ SecretId: 'AKIDDSdjgnjT1NZ3a7VjkfVIwOdfv9IH2b8e', SecretKey: 'WEwe9WJ9vLeq1BHNLLKF5Up10ndUDk24' })
      cos.putObject(
        {
          Bucket: 'heimachengxuyuan-1302806742', // 存储桶名称
          Region: 'ap-nanjing', // 地域名称
          Key: params.file.name, // 文件名称
          StorageClass: 'STANDARD', // 固定值
          Body: params.file, // 文件对象
        },
        (err, data) => {
          if (data.statusCode === 200 && data.Location) {
            // 拿到了腾讯云返回的地址 通过input自定义事件将地址传出去
            this.$emit('input', 'http://' + data.Location) // 将地址返回了
          } else {
            this.$message.error(err.Message) // 上传失败提示消息
          }
        },
      )
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
$avatar-width: 128px;

::v-deep .el-upload {
  position: relative;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  border: 1px dashed #d9d9d9;

  &:hover {
    border-color: #409eff;
  }
}

.avatar-uploader-icon {
  font-size: 32px;
  color: #8c939d;
  width: $avatar-width;
  height: $avatar-width;
  line-height: $avatar-width;
  text-align: center;
}

.avatar {
  display: block;
  width: $avatar-width;
  height: $avatar-width;
}
</style>
