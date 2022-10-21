<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow">
        <h2
          class="all"
          @mouseenter="enterShow"
        >全部商品分类</h2>
        <transition name="sort">
          <div
            class="sort"
            v-show="isShow"
          >
            <div class="all-sort-list2">
              <div
                class="item"
                @click="goSearch"
                v-for="(c1,index) in categoryListData"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="changeIndex(index)"
                  :class="{cur:index===currentIndex}"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category01Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                  <!-- 不要用声明式导航，消耗内存，性能不好 -->
                  <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{display:currentIndex === index?'block':'none'}"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category02Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em
                          v-for="c3 in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category03Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle from 'lodash/throttle';
export default {
  name: 'TypeNav',
  data () {
    return {
      currentIndex: -1,
      isShow: true
    }
  },
  computed: {
    // 两种方式获得state数据
    // ...mapState('homeOptions', ['categoryListData']),
    ...mapState({ categoryListData: state => state.homeOptions.categoryListData })
  },
  mounted () {
    if (this.$route.path != '/home') {
      this.isShow = false;
    }
  },
  methods: {
    //节流函数throttle返回一个函数给changeIndex属性
    //此处的函数注意用匿名函数,若用箭头函数则this为undefined，组件script标签的this为undefined
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    enterShow () {
      if (this.$route.path != '/home') {
        this.isShow = true;
      }
    },
    leaveShow () {
      this.currentIndex = -1;
      if (this.$route.path != '/home') {
        this.isShow = false;
      }
    },
    goSearch (event) {
      const { categoryname, category01id, category02id, category03id } = event.target.dataset;
      if (categoryname) {
        const locations = {
          name: 'search',
          query: { categoryName: categoryname }
        };
        if (category01id) {
          locations.query.category1Id = category01id;
        } else if (category02id) {
          locations.query.category2Id = category02id;
        } else {
          locations.query.category3Id = category03id;
        }
        if (this.$route.params.keyword) {
          locations.params = this.$route.params;
        }
        this.$router.push(locations);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 480px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .cur {
            background-color: skyblue;
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }

    /*过度动画设置*/
    .sort-enter,
    .sort-leave-to {
      opacity: 0;
    }
    .sort-enter-active,
    .sort-leave-active {
      transition: 0.3s linear;
    }

    .sort-enter-to,
    .sort-leave {
      opacity: 1;
    }
  }
}
</style>