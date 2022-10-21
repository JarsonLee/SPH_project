<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <RankBoard />
    <LikeGuess />
    <FloorModule
      v-for="floor in floorListData"
      :key="floor.id"
      :floor="floor"
    />
    <BrandModule />
  </div>
</template>

<script>
import ListContainer from './ListContainer/ListContainer';
import TodayRecommend from './TodayRecommend/TodayRecommend';
import RankBoard from './RankBoard/RankBoard';
import LikeGuess from './LikeGuess/LikeGuess';
import FloorModule from './FloorModule/FloorModule';
import BrandModule from './BrandModule/BrandModule';
import { mapState } from 'vuex';



export default {
  name: 'HomeRoute',
  computed: {
    ...mapState('homeOptions', ['floorListData'])
  },
  mounted () {
    this.$store.dispatch('homeOptions/floorList');
  },
  components: {
    ListContainer,
    TodayRecommend,
    RankBoard,
    LikeGuess,
    FloorModule,
    BrandModule
  }

}
</script>

<style scoped>
</style>