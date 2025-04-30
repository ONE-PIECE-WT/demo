<template>
  <header class="header">
    <div class="status-bar">
      <span class="time">9:41</span>
      <div class="status-icons">
        <span class="signal"></span>
        <span class="wifi"></span>
        <span class="battery"></span>
      </div>
    </div>
    <div class="header-content">
      <h1 class="title">我的</h1>
      <div class="header-icons">
        <div class="icon-wrapper">
          <i class="icon icon-service">🔔</i>
        </div>
        <div class="icon-wrapper">
          <i class="icon icon-setting">⚙️</i>
        </div>
      </div>
    </div>
    <div class="user-info">
      <div class="avatar-container">
        <div class="avatar">
          <!-- 头像占位 -->
        </div>
      </div>
      <div class="user-details">
        <div class="username">支小宝</div>
        <div class="user-id">188******88</div>
      </div>
      <div class="user-status">
        <span>待完善</span>
        <i class="icon icon-arrow">›</i>
      </div>
    </div>
  </header>
</template>

<script setup>
// 组件逻辑可以在这里添加
</script>

<style scoped>
/* 顶部状态栏 */
.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  background-color: #1677ff;
  color: white;
}

.status-icons {
  display: flex;
  gap: 5px;
}

/* 顶部导航栏 */
.header {
  background-color: #1677ff;
  color: white;
  padding: 0 0 15px 0;
  width: 100%;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
}

.title {
  font-size: 18px;
  font-weight: 500;
}

.header-icons {
  display: flex;
  gap: 15px;
}

.icon-wrapper {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 用户信息 */
.user-info {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.avatar-container {
  margin-right: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.user-details {
  flex: 1;
}

.username {
  font-size: 16px;
  font-weight: 500;
}

.user-id {
  font-size: 12px;
  opacity: 0.8;
}

.user-status {
  display: flex;
  align-items: center;
  font-size: 14px;
}
</style>