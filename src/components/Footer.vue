<template>
  <div>
    <!-- 底部导航栏 -->
    <footer class="footer">
      <router-link to="/home" class="nav-item" active-class="active">
        <i class="icon icon-home">🏠</i>
        <span>首页</span>
      </router-link>
      <router-link to="/wealth" class="nav-item" active-class="active">
        <i class="icon icon-finance">💹</i>
        <span>理财</span>
      </router-link>
      <router-link to="/life" class="nav-item" active-class="active">
        <i class="icon icon-pay">👄</i>
        <span>生活</span> <!-- Updated text based on image -->
      </router-link>
      <router-link to="/message" class="nav-item" active-class="active">
        <i class="icon icon-message">💬</i>
        <span>消息</span>
      </router-link>
      <router-link to="/my" class="nav-item" active-class="active">
        <i class="icon icon-my">👤</i>
        <span>我的</span>
      </router-link>
    </footer>

    <!-- 底部安全区域 -->
    <div class="safe-area"></div>
  </div>
</template>

<script setup>
// No specific script needed for basic router-link usage
</script>

<style scoped>
/* 底部导航栏 */
.footer {
  display: flex;
  justify-content: space-around;
  background-color: white;
  padding: 10px 0;
  border-top: 1px solid #f0f0f0;
  width: 100%;
  max-width: 100vw; /* 确保不超过视口宽度 */
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #999;
  text-decoration: none; /* Remove underline from links */
  flex: 1; /* Ensure items take equal space */
}

.nav-item.active {
  color: #1677ff;
}

/* 底部安全区域 - 移除高度让导航栏直接贴合底部 */
.safe-area {
  height: 0;
  background-color: white; /* 与底部导航栏保持一致 */
}

/* 图标样式 */
.icon {
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>