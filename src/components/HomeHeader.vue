<template>
  <header class="home-header">
    <div class="top-bar">
      <div class="location-weather">
        <span class="location">杭州</span>
        <span class="weather">多云 30℃</span>
      </div>
      <div class="search-container">
        <i class="icon icon-search">🔍</i>
        <input type="text" placeholder="蚂蚁森林" class="search-input" />
        <span class="search-text">搜索</span>
      </div>
      <div class="add-icon">
        <i class="icon icon-add">➕</i>
      </div>
    </div>
  </header>
</template>

<script setup>
// No script needed for this static component
</script>

<style scoped>
.home-header {
  background-color: #1677ff; /* Blue background */
  color: white;
  padding: 10px 15px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden; /* 防止水平滚动 */
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.location-weather {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 1.2;
  text-align: center;
  margin-right: 10px; /* Add some space */
}

.search-container {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  padding: 5px 10px;
  color: #666;
  max-width: calc(100% - 80px); /* 确保搜索框不会太宽 */
  overflow: hidden; /* 防止内容溢出 */
}

.icon-search {
  font-size: 16px;
  margin-right: 5px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  width: 100%;
  min-width: 0; /* 允许输入框在flex容器中缩小 */
}

.search-text {
  font-size: 14px;
  color: #1677ff; /* Blue text */
  margin-left: 5px;
}

.add-icon {
  margin-left: 10px; /* Add some space */
}

.icon-add {
  font-size: 20px;
}
</style>