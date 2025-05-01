<template>
  <div class="add-bank-card-page">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="back-button" @click="goBack">&#8592;</div>
      <div class="title">添加银行卡</div>
      <div class="right-icons">
        <div class="icon">&#127911;</div>
        <div class="icon">&#9881;</div>
      </div>
    </div>

    <!-- 安全提示 -->
    <div class="security-tip">
      <div class="check-icon">&#10003;</div>
      <div class="tip-text">支付宝全力保护你的信息安全</div>
    </div>

    <!-- 搜索框 -->
    <div class="search-container">
      <div class="search-box">
        <div class="search-icon">&#128269;</div>
        <input type="text" placeholder="输入银行名称或本人银行卡号" class="search-input" />
        <div class="camera-icon">&#128247;</div>
      </div>
      <div class="camera-text">拍照添卡</div>
    </div>

    <!-- 已添加的卡 -->
    <div class="added-cards-section">
      <div class="section-header">
        <span>添加过的卡</span>
        <div class="arrow-icon">&#8250;</div>
      </div>
      
      <!-- 工商银行卡 -->
      <div class="bank-item">
        <div class="bank-icon icbc">工</div>
        <div class="bank-info">
          <div class="bank-name">中国工商银行储蓄卡(4658)</div>
        </div>
        <div class="add-button">添加</div>
      </div>
    </div>

    <!-- 免输卡号添加 -->
    <div class="free-input-section">
      <div class="section-title">免输卡号添加</div>
      
      <!-- 农业银行 -->
      <div class="bank-item">
        <div class="bank-icon abc">农</div>
        <div class="bank-info">
          <div class="bank-name">中国农业银行</div>
        </div>
        <div class="promo-tag">信用卡得5元红包</div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 工商银行 -->
      <div class="bank-item">
        <div class="bank-icon icbc">工</div>
        <div class="bank-info">
          <div class="bank-name">中国工商银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 建设银行 -->
      <div class="bank-item">
        <div class="bank-icon ccb">建</div>
        <div class="bank-info">
          <div class="bank-name">中国建设银行</div>
        </div>
        <div class="promo-tag">信用卡得8元红包</div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 邮政储蓄银行 -->
      <div class="bank-item">
        <div class="bank-icon psbc">邮</div>
        <div class="bank-info">
          <div class="bank-name">中国邮政储蓄银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 招商银行 -->
      <div class="bank-item">
        <div class="bank-icon cmb">招</div>
        <div class="bank-info">
          <div class="bank-name">招商银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 交通银行 -->
      <div class="bank-item">
        <div class="bank-icon bocom">交</div>
        <div class="bank-info">
          <div class="bank-name">交通银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 平安银行 -->
      <div class="bank-item">
        <div class="bank-icon pab">平</div>
        <div class="bank-info">
          <div class="bank-name">平安银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 中信银行 -->
      <div class="bank-item">
        <div class="bank-icon citic">中</div>
        <div class="bank-info">
          <div class="bank-name">中信银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.add-bank-card-page {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  min-height: 100vh;
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
  font-size: 20px;
  margin-right: 15px;
  cursor: pointer;
}

.title {
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.right-icons {
  display: flex;
  gap: 15px;
}

.icon {
  font-size: 20px;
  color: #666;
}

/* 安全提示 */
.security-tip {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px 15px;
  margin-bottom: 10px;
}

.check-icon {
  color: #1677ff;
  margin-right: 10px;
  font-size: 16px;
}

.tip-text {
  font-size: 14px;
  color: #333;
}

/* 搜索框 */
.search-container {
  background-color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 8px 15px;
}

.search-icon {
  color: #999;
  margin-right: 10px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
}

.camera-icon {
  color: #666;
}

.camera-text {
  font-size: 14px;
  color: #666;
  margin-left: 15px;
}

/* 已添加的卡 */
.added-cards-section {
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 500;
}

.arrow-icon {
  color: #999;
  font-size: 18px;
}

/* 免输卡号添加 */
.free-input-section {
  background-color: white;
  padding: 15px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}

/* 银行项目样式 */
.bank-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
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
  margin-right: 15px;
  color: white;
  font-weight: bold;
}

.bank-info {
  flex: 1;
}

.bank-name {
  font-size: 16px;
}

.promo-tag {
  color: #ff6b6b;
  font-size: 12px;
  position: absolute;
  right: 60px;
}

.add-button {
  background-color: #e6f7ff;
  color: #1677ff;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 14px;
}

/* 银行图标颜色 */
.icbc {
  background-color: #F44336;
}

.abc {
  background-color: #4CAF50;
}

.ccb {
  background-color: #1e90ff;
}

.psbc {
  background-color: #4CAF50;
}

.cmb {
  background-color: #F44336;
}

.bocom {
  background-color: #1e90ff;
}

.pab {
  background-color: #FF9800;
}

.citic {
  background-color: #F44336;
}
</style>