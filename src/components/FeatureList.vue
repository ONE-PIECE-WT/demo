<template>
  <div class="feature-list">
    <!-- 用户保护中心 -->
    <div class="list-item">
      <div class="item-left">
        <i class="icon icon-shield blue">🛡️</i>
        <span>用户保护中心</span>
      </div>
      <div class="item-right">
        <i class="icon icon-arrow">›</i>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="list-item">
      <div class="item-left">
        <i class="icon icon-bill orange">📃</i>
        <span>账单</span>
      </div>
      <div class="item-right">
        <i class="icon icon-arrow">›</i>
      </div>
    </div>

    <div class="list-item">
      <div class="item-left">
        <i class="icon icon-assets blue">📊</i>
        <span>总资产</span>
      </div>
      <div class="item-right">
        <span class="green-text">账户安全保障中</span>
        <i class="icon icon-arrow">›</i>
      </div>
    </div>

    <div class="list-item">
      <div class="item-left">
        <i class="icon icon-balance blue">💰</i>
        <span>余额</span>
      </div>
      <div class="item-right">
        <span>0.00</span>
        <i class="icon icon-arrow">›</i>
      </div>
    </div>

    <div class="list-item">
      <div class="item-left">
        <i class="icon icon-yuebao red">💰</i>
        <span>余额宝</span>
      </div>
      <div class="item-right">
        <i class="icon icon-arrow">›</i>
      </div>
    </div>

    <div class="list-item">
      <div class="item-left">
        <i class="icon icon-huabei blue">💳</i>
        <span>花呗</span>
      </div>
      <div class="item-right">
        <i class="icon icon-arrow">›</i>
      </div>
    </div>

    <div class="list-item">
      <div class="item-left">
        <i class="icon icon-fund blue">📈</i>
        <span>余利宝</span>
      </div>
      <div class="item-right">
        <i class="icon icon-arrow">›</i>
      </div>
    </div>

    <router-link to="/bankcard" class="list-item">
      <div class="item-left">
        <i class="icon icon-bank-card orange">💳</i>
        <span>银行卡</span>
      </div>
      <div class="item-right">
        <i class="icon icon-arrow">›</i>
      </div>
    </router-link>

    <div class="list-item">
      <div class="item-left">
        <i class="icon icon-credit blue">📊</i>
        <span>芝麻信用</span>
      </div>
      <div class="item-right">
        <i class="icon icon-arrow">›</i>
      </div>
    </div>

    <div class="list-item">
      <div class="item-left">
        <i class="icon icon-insurance blue">🔒</i>
        <span>蚂蚁保险</span>
      </div>
      <div class="item-right">
        <span class="red-dot">你有保单将过期</span>
        <i class="icon icon-arrow">›</i>
      </div>
    </div>

    <div class="list-item">
      <div class="item-left">
        <i class="icon icon-mutual orange">❤️</i>
        <span>相互宝</span>
      </div>
      <div class="item-right">
        <i class="icon icon-arrow">›</i>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑可以在这里添加
</script>

<style scoped>
/* 列表项 */
.feature-list {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden; /* 防止水平滚动 */
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-right {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 14px;
}

.green-text {
  color: #52c41a;
  margin-right: 5px;
}

.red-dot {
  color: #ff4d4f;
  margin-right: 5px;
  display: flex;
  align-items: center;
}

.red-dot::after {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #ff4d4f;
  border-radius: 50%;
  margin-left: 5px;
}

/* 图标样式 */
.icon {
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon.blue {
  color: #1677ff;
}

.icon.orange {
  color: #fa8c16;
}

.icon.red {
  color: #ff4d4f;
}
</style>