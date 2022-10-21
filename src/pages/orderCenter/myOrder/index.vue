<template>
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">
      <table
        class="order-item"
        v-for="record in records"
        :key="record.id"
      >
        <thead>
          <tr>
            <th colspan="5">
              <span
                class="ordertitle">{{ record.createTime }}&nbsp;订单编号：{{ record.outTradeNo }}
                <span class="pull-right delete"><img
                    src="../images/delete.png" /></span></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(orderDetail,index) in record.orderDetailList"
            :key="orderDetail.id"
          >
            <td width="60%">
              <div class="typographic">
                <img :src="orderDetail.imgUrl" />
                <a
                  href="#"
                  class="block-text"
                >{{orderDetail.skuName}}</a>
                <span>x{{orderDetail.skuNum}}</span>
                <a
                  href="#"
                  class="service"
                >售后申请</a>
              </div>
            </td>
            <td
              width="8%"
              class="center"
              :rowspan="record.orderDetailList.length"
              v-show="index==0"
            >{{ record.consignee }}</td>
            <td
              width="13%"
              class="center"
              :rowspan="record.orderDetailList.length"
              v-show="index==0"
            >
              <ul class="unstyled">
                <li>总金额¥{{ record.totalAmount }}.00</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td
              width="8%"
              class="center"
              :rowspan="record.orderDetailList.length"
              v-show="index==0"
            >
              <a
                href="#"
                class="btn"
              >{{ record.orderStatusName }}</a>
            </td>
            <td
              width="13%"
              class="center"
              :rowspan="record.orderDetailList.length"
              v-show="index==0"
            >
              <ul class="unstyled">
                <li>
                  <a
                    href="mycomment.html"
                    target="_blank"
                  >评价|晒单</a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--pagination-->
    <PaginationComponent
      :pageNo="page"
      :pageSize="limit"
      :total="total"
      :continues="5"
      @getCurrentPage="getCurrentPage"
    />
  </div>
</template>

<script>
export default {
  name: 'MyOrder',
  data () {
    return {
      page: 1,
      limit: 3,
      records: [],
      total: 0
    };
  },
  methods: {
    async getMyOrderList () {
      const { page, limit } = this;
      const result = await this.$http.getMyOrderListReq(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    getCurrentPage (index) {
      this.page = index;
      this.getMyOrderList();
    },
  },
  mounted () {
    this.getMyOrderList();
  },
};
</script>
