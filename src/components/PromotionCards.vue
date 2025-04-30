<template>
  <div class="promotion-cards">
    <div class="card subway-card">
      <div class="card-content">
        <h3>刷码乘地铁免费啦</h3>
        <p>4元到12元红包任性送</p>
      </div>
      <button class="card-button">去体验</button>
    </div>
    <div class="card travel-card">
      <div class="card-header">
        <span>飞猪</span>
        <span>百亿补贴 限量抢购中</span>
      </div>
      <div class="card-body">
        <div class="item">
          <h4>春节旅行</h4>
          <img src="/placeholder_travel.png" alt="Travel Image" class="item-image">
        </div>
        <div class="item">
          <h4>酒店套餐</h4>
          <img src="/placeholder_hotel.png" alt="Hotel Image" class="item-image">
          <p>以达瑞士酒店</p>
          <p class="price">¥299<span class="unit">起</span></p>
        </div>
      </div>
    </div>
    <!-- Add more cards if needed -->
  </div>
</template>

<script setup>
// No script needed for this static component
</script>

<style scoped>
.promotion-cards {
  padding: 0 10px; /* Match main content padding */
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden; /* 防止水平滚动 */
}

.card {
  background-color: white;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
  padding: 15px;
}

.subway-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #ffefd6, #ffe4bb);
  color: #ca893b;
}

.subway-card h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.subway-card p {
  font-size: 12px;
}

.card-button {
  background-color: #ff5a4f;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 5px 15px;
  font-size: 12px;
  cursor: pointer;
}

.travel-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}

.travel-card .card-header span:first-child {
  font-weight: bold;
  color: #333;
}

.travel-card .card-body {
  display: flex;
  gap: 10px;
}

.travel-card .item {
  flex: 1;
}

.travel-card h4 {
  font-size: 14px;
  margin-bottom: 5px;
}

.item-image {
  width: 100%;
  height: 80px; /* Adjust height as needed */
  object-fit: cover;
  border-radius: 4px;
  background-color: #eee; /* Placeholder background */
  margin-bottom: 5px;
}

.travel-card .price {
  font-size: 16px;
  color: #ff5a4f;
  font-weight: bold;
}

.travel-card .unit {
  font-size: 12px;
  color: #ff5a4f;
  font-weight: normal;
  margin-left: 2px;
}

.travel-card p {
    font-size: 12px;
    color: #666;
}

</style>