import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Admin',
    component: Admin
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
    return;
  }

  const token = window.sessionStorage.getItem('token');

  // 模拟 token 验证
  const isValidToken = (token) => {
    // 在实际场景中，可以调用后端接口验证 token
    return token && token.length > 10; // 示例条件
  };

  if (!isValidToken(token)) {
    next('/login'); // 跳转到登录页
  } else {
    next(); // 放行
  }
});

export default router
