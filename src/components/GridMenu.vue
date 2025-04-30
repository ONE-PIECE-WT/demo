<template>
  <div class="grid-menu">
    <div class="grid-item" v-for="item in menuItems" :key="item.name">
      <i :class="['icon', item.icon]">{{ item.emoji }}</i>
      <span>{{ item.name }}</span>
    </div>
    <div class="grid-item">
      <i class="icon icon-more">➕</i>
      <span>更多</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const menuItems = ref([
  { name: '饿了么', icon: 'icon-eleme', emoji: '🍔' },
  { name: '健康码', icon: 'icon-health', emoji: '💚' },
  { name: '蚂蚁森林', icon: 'icon-antforest', emoji: '🌳' },
  { name: '芝麻信用', icon: 'icon-sesame', emoji: '💯' },
  { name: '蚂蚁庄园', icon: 'icon-antfarm', emoji: '🐔' },
  { name: '汇率换算', icon: 'icon-exchange', emoji: '💱' },
  { name: '生活缴费', icon: 'icon-bill', emoji: '💡' },
  { name: '市民中心', icon: 'icon-city', emoji: '🏛️' },
  { name: '充值中心', icon: 'icon-recharge', emoji: '📱' },
  { name: '消费券', icon: 'icon-coupon', emoji: '🎟️' },
  { name: '铁路12306', icon: 'icon-train', emoji: '🚄' },
  { name: '国家政务', icon: 'icon-gov', emoji: '🇨🇳' },
  { name: '飞猪旅行', icon: 'icon-fliggy', emoji: '🐷' },
  { name: '我的小程序', icon: 'icon-miniapp', emoji: '🧩' },
  // '更多' is handled separately
]);
</script>

<style scoped>
.grid-menu {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columns */
  gap: 15px;
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden; /* 防止水平滚动 */
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 12px;
  color: #333;
}

.icon {
  font-size: 28px; /* Adjust icon size */
  margin-bottom: 5px;
  width: 40px; /* Ensure consistent width/height if needed */
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Optional: Add background/border if icons are images/sprites */
}
</style>