import { createRouter, createWebHistory } from 'vue-router';

// 导入视图组件
import Home from './views/Home.vue';
import My from './views/My.vue';
import MessagePage from './views/MessagePage.vue';
import PaymentPage from './views/PaymentPage.vue';
import BankCardPage from './views/BankCardPage.vue';
import AddBankCardPage from './views/AddBankCardPage.vue';


const routes = [
  // { path: '/', component: Home },
  // { path: '/my', component: My },
  // 临时添加一个根路径，指向 App.vue 的内容，后续会替换
  { path: '/', redirect: '/home' }, // 默认重定向到首页
  // 使用实际的视图组件
  { path: '/home', component: Home },
  { path: '/my', component: My },
  { path: '/wealth', component: { template: '<div>理财页面内容区域</div>' } },
  { path: '/life', component: { template: '<div>生活页面内容区域</div>' } },
  { path: '/message', component: MessagePage },
  { path: '/scan', component: () => import('./views/ScanPage.vue') },
  { path: '/payment', component: PaymentPage },
  { path: '/bankcard', component: BankCardPage },
  { path: '/addbankcard', component: AddBankCardPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;