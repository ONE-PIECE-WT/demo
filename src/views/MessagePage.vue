<template>
  <div class="message-page">
    <!-- 顶部状态栏 -->
    <div class="status-bar">
      <span class="time">01:18</span>
      <div class="status-icons">
        <span class="signal"></span>
        <span class="wifi"></span>
        <span class="battery"></span>
      </div>
    </div>
    
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="header-title">
        <span>消息(8)</span>
        <div class="header-icons">
          <i class="icon icon-search">🔍</i>
          <i class="icon icon-contacts">👥</i>
          <i class="icon icon-add">➕</i>
        </div>
      </div>
    </div>
    
    <!-- 消息列表 -->
    <div class="message-list">
      <!-- 消息盒子 -->
      <div class="message-item">
        <div class="avatar-container">
          <div class="avatar notification-icon">
            <span>🔔</span>
          </div>
          <div class="badge">2</div>
        </div>
        <div class="message-content">
          <div class="message-title">消息盒子</div>
          <div class="message-detail">支付助手：支付成功 ¥25.50</div>
        </div>
        <div class="message-time">5分钟前</div>
      </div>
      
      <!-- 奈雪的茶杭州粉丝群 -->
      <div class="message-item">
        <div class="avatar-container">
          <div class="avatar group-avatar">
            <!-- 群组头像 -->
          </div>
          <div class="badge">1</div>
        </div>
        <div class="message-content">
          <div class="message-title">奈雪的茶杭州粉丝群</div>
          <div class="message-detail">奈小雪：快来领店铺优惠券，100减10</div>
        </div>
        <div class="message-time">
          <span class="live-tag">直播中</span>
        </div>
      </div>
      
      <!-- 王警官 -->
      <div class="message-item">
        <div class="avatar-container">
          <div class="avatar">
            <!-- 头像 -->
          </div>
          <div class="badge">5</div>
        </div>
        <div class="message-content">
          <div class="message-title">王警官</div>
          <div class="message-detail red-packet">[红包] 你有一个红包待查收</div>
        </div>
        <div class="message-time">15:00</div>
      </div>
      
      <!-- 你的小保保 -->
      <div class="message-item">
        <div class="avatar-container">
          <div class="avatar">
            <!-- 头像 -->
          </div>
        </div>
        <div class="message-content">
          <div class="message-title">你的小保保</div>
          <div class="message-detail transfer">[转账] 向你转账300元</div>
        </div>
        <div class="message-time">15:00</div>
      </div>
      
      <!-- Arale -->
      <div class="message-item">
        <div class="avatar-container">
          <div class="avatar">
            <!-- 头像 -->
          </div>
        </div>
        <div class="message-content">
          <div class="message-title">Arale</div>
          <div class="message-detail">[绿色能量] 送你10g，快来收取</div>
        </div>
        <div class="message-time">13:52</div>
      </div>
      
      <!-- A空间5栋10楼小卖部 -->
      <div class="message-item">
        <div class="avatar-container">
          <div class="avatar group-avatar">
            <!-- 群组头像 -->
          </div>
        </div>
        <div class="message-content">
          <div class="message-title">A空间5栋10楼小卖部</div>
          <div class="message-detail">[上新] 胡老板：今日小店新品上架</div>
        </div>
        <div class="message-time">
          <span class="group-tag">拼团中</span>
        </div>
      </div>
      
      <!-- 新希望杭州订奶1群 -->
      <div class="message-item">
        <div class="avatar-container">
          <div class="avatar group-avatar">
            <!-- 群组头像 -->
          </div>
        </div>
        <div class="message-content">
          <div class="message-title">新希望杭州订奶1群</div>
          <div class="message-detail">小皮皮触发了群彩蛋</div>
        </div>
        <div class="message-time">
          <span class="lottery-tag">抽奖中</span>
        </div>
      </div>
      
      <!-- 小奈 -->
      <div class="message-item">
        <div class="avatar-container">
          <div class="avatar">
            <!-- 头像 -->
          </div>
        </div>
        <div class="message-content">
          <div class="message-title">小奈 @奈雪的茶客服</div>
          <div class="message-detail">奈，有什么需要帮助的?</div>
        </div>
        <div class="message-time">星期日</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 消息页面组件逻辑
</script>

<style scoped>
.message-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
}

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
  padding: 10px 15px 15px;
}

.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

.header-icons {
  display: flex;
  gap: 15px;
}

.icon {
  font-size: 20px;
}

/* 消息列表 */
.message-list {
  flex: 1;
  overflow-y: auto;
  background-color: white;
}

.message-item {
  display: flex;
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.avatar-container {
  position: relative;
  margin-right: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  overflow: hidden;
}

.notification-icon {
  background-color: #1677ff;
  color: white;
}

.group-avatar {
  background-color: #f0f0f0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px;
}

.group-avatar::before,
.group-avatar::after {
  content: '';
  background-color: #ddd;
  border-radius: 2px;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff5252;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-content {
  flex: 1;
}

.message-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
}

.message-detail {
  font-size: 14px;
  color: #999;
}

.red-packet {
  color: #ff5252;
}

.transfer {
  color: #1677ff;
}

.message-time {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
  white-space: nowrap;
}

.live-tag,
.group-tag,
.lottery-tag {
  background-color: #ff9800;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  white-space: nowrap;
}

.group-tag {
  background-color: #ff5722;
}

.lottery-tag {
  background-color: #ff4081;
}
</style>