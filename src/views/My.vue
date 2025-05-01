<template>
  <div class="my-page-container">
    <Header />
    <main class="my-content">
      <MemberCard />
      <FeatureList />
    </main>
    <!-- Footer is now in App.vue -->
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import MemberCard from '../components/MemberCard.vue';
import FeatureList from '../components/FeatureList.vue';
</script>

<style scoped>
.my-page-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensure it takes full height within router-view */
  background-color: #f5f5f5;
  max-width: 100%;
  overflow-x: hidden; /* 防止水平滚动 */
}

.my-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* 防止水平滚动 */
  padding: 10px;
  padding-bottom: 80px; /* 导航栏高度(约50px) + 30px */
  width: 100%;
  max-width: 100%;
}
</style>