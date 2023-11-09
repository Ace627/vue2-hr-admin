<template>
  <!-- 部门的级联选择框 -->
  <el-cascader :options="treeData" :props="props" placeholder="请选择所属部门" separator="-" :value="value" @change="onChange" />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'

export default {
  name: 'SelectTree',
  props: {
    /** 存储的部门 id */
    value: { type: Number, default: null },
  },
  data() {
    return {
      treeData: [], // 树状图的可选项数据源
      props: {
        label: 'name', // 指定节点标签为节点对象的某个属性值 默认 'label'
        value: 'id', // 指定选项的值为选项对象的某个属性值 默认 'value'
      },
    }
  },
  methods: {
    async getDepartment() {
      const { data } = await getDepartment()
      this.treeData = transListToTreeData(data, 0)
    },

    /** 当选中节点变化时触发 */
    onChange(value_list) {
      const value = value_list.length ? value_list.at(-1) : null
      this.$emit('input', value)
    },
  },
  created() {
    this.getDepartment()
  },
}
</script>

<style lang="scss" scoped></style>
