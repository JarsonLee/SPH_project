<template>
  <div>
    <HeaderSection />
    <router-view></router-view>
    <FooterSection v-show="$route.meta.isShowFooter" />
  </div>

</template>

<script>
import HeaderSection from './components/header/HeaderSection';
import FooterSection from './components/footer/FooterSection';
export default {
  name: 'App',
  components: {
    HeaderSection,
    FooterSection
  },
  mounted () {
    //性能优化，先把要用到的数据一次性在store中存好
    this.$store.dispatch('homeOptions/categoryList');
  }
}
</script>

<style scoped>
</style>
