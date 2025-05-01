<template>
  <div class="bank-card-page">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="back-button">&#8592; 银行卡</div>
    </div>
    
    <!-- 我的卡片区域 -->
    <div class="my-cards-section">
      <div class="section-header">
        <span class="my-cards-title">我的卡</span>
        <div class="security-tag">安全保障中</div>
        <div class="all-cards">全部银行卡(3张) &#8250;</div>
      </div>
      
      <!-- 银行卡列表 -->
      <div class="card-list">
        <!-- 光大银行卡 -->
        <div class="bank-card orange-card">
          <div class="card-header">
            <div class="bank-logo">E</div>
            <div class="bank-info">
              <div class="bank-name">光大银行(1102)</div>
              <div class="card-type">储蓄卡</div>
            </div>
            <div class="card-arrow">&#8250;</div>
          </div>
          <div class="card-actions">
            <div class="action">查账单</div>
            <div class="action">查卡号</div>
            <div class="action">转入</div>
          </div>
        </div>
        
        <!-- 建设银行卡 -->
        <div class="bank-card blue-card">
          <div class="card-header">
            <div class="bank-logo ccb-logo">建</div>
            <div class="bank-info">
              <div class="bank-name">建设银行(1103)</div>
              <div class="card-type">储蓄卡</div>
            </div>
            <div class="card-arrow">&#8250;</div>
          </div>
          <div class="card-actions">
            <div class="action">查账单</div>
            <div class="action">查卡号</div>
            <div class="action">转入</div>
          </div>
        </div>
      </div>
      
      <!-- 添加银行卡按钮 -->
      <div class="add-card-button" @click="goToAddBankCard">
        <div class="add-icon">+</div>
        <div class="add-text">添加银行卡</div>
        <div class="share-button">分享给亲友</div>
      </div>
      
      <!-- 快速添加区域 -->
      <div class="quick-add-section">
        <div class="section-title">快速添加</div>
        <div class="quick-add-options">
          <div class="quick-option">
            <div class="option-icon">&#9998;</div>
            <div class="option-text">输入卡号添加</div>
          </div>
          <div class="quick-option">
            <div class="option-icon">&#128247;</div>
            <div class="option-text">拍照添加</div>
          </div>
        </div>
        <div class="free-input-option">免输卡号添加</div>
        
        <!-- 推荐银行 -->
        <div class="recommended-banks">
          <div class="bank-item">
            <div class="bank-icon abc">农</div>
            <div class="bank-name">农业银行</div>
            <div class="bank-promo">信用卡5元红包</div>
          </div>
          <div class="bank-item">
            <div class="bank-icon icbc">工</div>
            <div class="bank-name">工商银行</div>
          </div>
          <div class="bank-item">
            <div class="bank-icon ccb">建</div>
            <div class="bank-name">建设银行</div>
            <div class="bank-promo">信用卡8元红包</div>
          </div>
        </div>
      </div>
      
      <!-- 常用工具 -->
      <div class="common-tools">
        <div class="section-title">常用工具</div>
        <div class="tools-grid">
          <div class="tool-item">
            <div class="tool-icon new-tag">&#128196;</div>
            <div class="tool-name">银行卡账单</div>
          </div>
          <div class="tool-item">
            <div class="tool-icon">&#128176;</div>
            <div class="tool-name">添加卡</div>
          </div>
          <div class="tool-item">
            <div class="tool-icon">&#128178;</div>
            <div class="tool-name">额度查询</div>
          </div>
          <div class="tool-item">
            <div class="tool-icon">&#10067;</div>
            <div class="tool-name">常见问题</div>
          </div>
          <div class="tool-item">
            <div class="tool-icon">&#128218;</div>
            <div class="tool-name">用卡小课堂</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToAddBankCard = () => {
  router.push('/addbankcard');
};
</script>

<style scoped>
.bank-card-page {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 60px;
}

/* 顶部导航栏 */
.header {
  background-color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #eee;
}

.back-button {
  font-size: 16px;
  font-weight: 500;
}

/* 我的卡片区域 */
.my-cards-section {
  padding: 15px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
}

.my-cards-title {
  font-size: 16px;
  font-weight: 500;
}

.security-tag {
  background-color: #f0f0f0;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  margin-left: 10px;
}

.all-cards {
  position: absolute;
  right: 0;
  font-size: 14px;
  color: #666;
}

/* 银行卡样式 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.bank-card {
  border-radius: 10px;
  padding: 15px;
  color: white;
}

.orange-card {
  background-color: #ff8c00;
}

.blue-card {
  background-color: #1e90ff;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.bank-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
}

.ccb-logo {
  color: #1e90ff;
}

.bank-info {
  flex: 1;
}

.bank-name {
  font-size: 16px;
  font-weight: 500;
}

.card-type {
  font-size: 12px;
  opacity: 0.8;
}

.card-arrow {
  font-size: 20px;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 15px;
}

.action {
  text-align: center;
  flex: 1;
}

/* 添加银行卡按钮 */
.add-card-button {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  position: relative;
}

.add-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 20px;
  color: #1677ff;
}

.add-text {
  font-size: 16px;
}

.share-button {
  position: absolute;
  right: 15px;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  color: #666;
}

/* 快速添加区域 */
.quick-add-section {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}

.quick-add-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.quick-option {
  display: flex;
  align-items: center;
  flex: 1;
}

.option-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.free-input-option {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

/* 推荐银行 */
.recommended-banks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bank-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.bank-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: white;
  font-weight: bold;
}

.abc {
  background-color: #4CAF50;
}

.icbc {
  background-color: #F44336;
}

.ccb {
  background-color: #1e90ff;
}

.bank-promo {
  position: absolute;
  right: 0;
  color: #ff6b6b;
  font-size: 12px;
}

/* 常用工具 */
.common-tools {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(20% - 16px);
}

.tool-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  position: relative;
}

.new-tag::after {
  content: '已更新';
  position: absolute;
  top: -5px;
  right: -15px;
  background-color: #ff6b6b;
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
}

.tool-name {
  font-size: 12px;
  text-align: center;
}
</style>