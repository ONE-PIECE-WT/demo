<template>
  <div class="app-container">
    <!-- 路由视图，用于显示当前匹配的组件 -->
    <router-view class="main-content"></router-view>
    <!-- 底部导航栏保持在所有页面，固定在底部 -->
    <Footer class="footer-fixed" />
  </div>
</template>

<script setup>
// Header, MemberCard, FeatureList are now part of My.vue view
// Only Footer is needed globally here
import Footer from './components/Footer.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden; /* 防止水平滚动 */
}

.app-container {
  width: 100%;
  max-width: 100vw; /* 确保不超过视口宽度 */
  height: 100vh;
  position: relative;
  background-color: #f5f5f5;
  overflow-x: hidden; /* 防止水平滚动 */
  display: flex;
  flex-direction: column;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* 防止水平滚动 */
  padding: 0;
  width: 100%;
  max-width: 100vw; /* 确保不超过视口宽度 */
  padding-bottom: 0; /* 移除底部内边距，让内容区域不会被底部导航遮挡 */
}

/* 固定底部导航 */
.footer-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
</style>
