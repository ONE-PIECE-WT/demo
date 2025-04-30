<template>
  <div class="member-card">
    <div class="member-info">
      <i class="icon icon-vip blue">🛡️</i>
      <span>支付宝会员</span>
    </div>
    <div class="member-action">
      <span>6积分待领取</span>
      <i class="icon icon-arrow">›</i>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑可以在这里添加
</script>

<style scoped>
/* 会员卡片 */
.member-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  width: 100%;
}

.member-info {
  display: flex;
  align-items: center;
  gap: 5px;
}

.member-action {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 14px;
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
</style>