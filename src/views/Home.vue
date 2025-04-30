<template>
  <div class="home-page-container">
    <HomeHeader />
    <QuickActions />
    <main class="home-main-content">
      <GridMenu />
      <RecentMessages />
      <PromotionCards />
    </main>
  </div>
</template>

<script setup>
import HomeHeader from '../components/HomeHeader.vue';
import QuickActions from '../components/QuickActions.vue';
import GridMenu from '../components/GridMenu.vue';
import RecentMessages from '../components/RecentMessages.vue';
import PromotionCards from '../components/PromotionCards.vue';
</script>

<style scoped>
.home-page-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensure it takes full height within router-view */
  background-color: #f5f5f5;
  max-width: 100%;
  overflow-x: hidden; /* 防止水平滚动 */
}

.home-main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* 防止水平滚动 */
  width: 100%;
  max-width: 100%;
  /* Padding is handled by individual components or PromotionCards */
}
</style>