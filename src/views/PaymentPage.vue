<template>
  <div class="payment-page">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="back-button" @click="goBack">
        <span>&#8592;</span>
      </div>
      <div class="title">收付款</div>
      <div class="more-options">...</div>
    </div>

    <!-- 二维码收款卡片 -->
    <div class="payment-card">
      <div class="vip-badge">黄金会员</div>
      <div class="payment-title">
        <span class="icon">&#9783;</span>
        <span>向商家付钱</span>
      </div>
      <div class="qr-code">
        <!-- 二维码图像 -->
        <div class="qr-image">
          <!-- 这里使用一个简单的方块表示二维码 -->
          <div class="qr-placeholder"></div>
        </div>
        <!-- 中间的安全标识 -->
        <div class="security-badge">支</div>
      </div>
      <!-- 银行信息 -->
      <div class="bank-info">
        <div class="bank-logo">&#9733;</div>
        <div class="bank-name">中国银行</div>
        <div class="bank-arrow">&#8250;</div>
      </div>
      <div class="payment-tip">优先使用此付款方式付款</div>
    </div>

    <!-- 底部支付选项 -->
    <div class="payment-options">
      <div class="option-item">
        <div class="option-icon">&#9783;</div>
        <div class="option-text">二维码收款</div>
        <div class="option-arrow">&#8250;</div>
      </div>
      <div class="option-item">
        <div class="option-icon">&#9783;</div>
        <div class="option-text">花呗分期支付</div>
        <div class="option-arrow">&#8250;</div>
      </div>
      <div class="option-item">
        <div class="option-icon">&#9783;</div>
        <div class="option-text">医保码支付</div>
        <div class="option-arrow">&#8250;</div>
      </div>
      <div class="option-item">
        <div class="option-icon">&#9783;</div>
        <div class="option-text">向支付宝或银行卡转账</div>
        <div class="option-arrow">&#8250;</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';

const router = useRouter();

// 隐藏底部导航栏
onMounted(() => {
  const footer = document.querySelector('.footer-fixed');
  if (footer) {
    footer.style.display = 'none';
  }
});

// 离开页面时恢复底部导航栏
onUnmounted(() => {
  const footer = document.querySelector('.footer-fixed');
  if (footer) {
    footer.style.display = '';
  }
});

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.payment-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1E90FF; /* 蓝色背景 */
}

/* 顶部导航栏 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  color: white;
}

.back-button {
  font-size: 20px;
  cursor: pointer;
}

.back-button span {
  display: inline-block;
  transform: scale(1.5, 1); /* 使箭头更像 < 符号 */
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.more-options {
  font-size: 20px;
}

/* 二维码收款卡片 */
.payment-card {
  background-color: white;
  margin: 15px;
  border-radius: 10px;
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vip-badge {
  background-color: #DAA520; /* 金色 */
  color: white;
  padding: 5px 10px;
  border-radius: 10px 10px 0 0;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%; /* 改为100%自适应宽度 */
  text-align: center;
  box-sizing: border-box; /* 确保padding不会增加宽度 */
}

.payment-title {
  margin-top: 25px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
}

.qr-code {
  margin: 20px 0;
  position: relative;
  width: 150px;
  height: 150px;
}

.qr-image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qr-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 5px;
  padding: 10px;
}

.qr-placeholder::before,
.qr-placeholder::after {
  content: '';
  grid-column: 1;
  grid-row: 1;
  border: 10px solid #333;
  border-right: none;
  border-bottom: none;
}

.qr-placeholder::after {
  grid-column: 3;
  grid-row: 1;
  border: 10px solid #333;
  border-left: none;
  border-bottom: none;
}

.security-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1E90FF;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.bank-info {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.bank-logo {
  color: #c00;
  margin-right: 10px;
}

.bank-name {
  flex: 1;
}

.bank-arrow {
  color: #999;
}

.payment-tip {
  color: #999;
  font-size: 12px;
  margin-top: 10px;
}

/* 底部支付选项 */
.payment-options {
  margin: 15px; /* 与上面的卡片保持一致的margin */
  background-color: rgba(255, 255, 255, 0.1); /* 比背景色浅一点 */
  border-radius: 10px;
  overflow: hidden;
}

.option-item {
  display: flex;
  align-items: center;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.8); /* 颜色淡一点 */
  padding: 15px;
  position: relative;
}

.option-item:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 15px;
  right: 15px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3); /* 分隔线颜色 */
}

.option-icon {
  margin-right: 15px;
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.8); /* 颜色淡一点 */
  color: rgba(30, 144, 255, 0.8); /* 颜色淡一点 */
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.option-text {
  flex: 1;
  color: rgba(255, 255, 255, 0.8); /* 颜色淡一点 */
}

.option-arrow {
  color: rgba(255, 255, 255, 0.6); /* 颜色淡一点 */
}
</style>