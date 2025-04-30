<template>
  <div class="recent-messages">
    <div class="messages-header">
      <span>最近消息</span>
      <span class="unread-count">16条未读 ›</span>
    </div>
    <div class="message-item">
      <div class="message-icon">💰</div>
      <div class="message-content">
        <div class="message-title">支付助手</div>
        <div class="message-detail">付款成功 ¥826.00</div>
      </div>
      <div class="message-time">1分钟前</div>
    </div>
    <!-- Add more message items if needed -->
  </div>
</template>

<script setup>
// No script needed for this static component
</script>

<style scoped>
.recent-messages {
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  width: 100%;
}

.messages-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.unread-count {
  color: #999;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0; /* Optional separator */
}

.message-item:last-child {
  border-bottom: none;
}

.message-icon {
  font-size: 24px;
  margin-right: 10px;
  /* Add background/styling for icon if needed */
}

.message-content {
  flex: 1;
}

.message-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 3px;
}

.message-detail {
  font-size: 12px;
  color: #999;
}

.message-time {
  font-size: 12px;
  color: #999;
}
</style>