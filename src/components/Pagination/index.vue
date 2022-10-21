<template>
  <div class="pagination">
    <button
      @click="sendCurrentPage(pageNo-1)"
      :disabled="pageNo===1"
    >上一页</button>
    <button
      v-show="startNumAndEndNum.startNum>1"
      @click="sendCurrentPage(1)"
    >1</button>
    <button v-show="startNumAndEndNum.startNum>2">···</button>
    <template v-for="page in startNumAndEndNum.endNum">
      <button
        :key="page"
        v-if="page >= startNumAndEndNum.startNum"
        @click="sendCurrentPage(page)"
        :class="{active:pageNo==page}"
      >{{page}}</button>
    </template>
    <button v-show="startNumAndEndNum.endNum<totalPages-1">···</button>
    <button
      v-show="startNumAndEndNum.endNum<totalPages"
      @click="sendCurrentPage(totalPages)"
    >{{totalPages}}</button>
    <button
      @click="sendCurrentPage(pageNo+1)"
      :disabled="pageNo===totalPages"
    >下一页</button>
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: ['pageNo', 'pageSize', 'continues', 'total'],
  computed: {
    totalPages () {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum () {
      const { continues, pageNo, totalPages } = this;
      let startNum, endNum;
      if (continues > totalPages) {
        startNum = 1;
        endNum = totalPages;
      } else {
        startNum = pageNo - parseInt(continues / 2);
        endNum = pageNo + parseInt(continues / 2);
        if (startNum < 1) {
          startNum = 1;
          endNum = continues;
        }
        if (endNum > totalPages) {
          startNum = totalPages - continues + 1;
          endNum = totalPages;
        }
      }
      return { startNum, endNum };
    }
  },
  methods: {
    sendCurrentPage (index) {
      this.$emit('getCurrentPage', index);
    }
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  margin-bottom: 18px;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>