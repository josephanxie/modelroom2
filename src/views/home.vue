<template>
    <div class="login-container">
      <div class="login-card">
        <h1 class="title">中国农业大学虚拟模型室</h1>
  
        <!-- 登录表单 -->
        <form @submit.prevent="onLogin">
          <!-- 用户名输入框 -->
          <div class="form-group">
            <label for="username">用户名</label>
            <input
              v-model="username"
              id="username"
              type="text"
              class="input-field"
              required
            />
          </div>
  
          <!-- 密码输入框 -->
          <div class="form-group">
            <label for="password">密码</label>
            <input
              v-model="password"
              id="password"
              type="password"
              class="input-field"
              required
            />
          </div>
  
          <!-- 登录按钮 -->
          <button class="login-btn" type="submit" :disabled="loading">
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "", // 用户名
        password: "", // 密码
        loading: false, // 控制登录按钮加载状态
      };
    },
    methods: {
      // 登录函数
      onLogin() {
        if (this.username && this.password) {
          this.loading = true;
          // 模拟异步登录请求
          setTimeout(() => {
            alert("登录成功！");
            this.loading = false;
          }, 1500);
          localStorage.setItem('isLogin', 1)
            this.$router.push('/model')
        } else {
          alert("请填写所有必填项");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* 页面容器样式 */
  .login-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
  }
  
  /* 卡片样式 */
  .login-card {
    background-color: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    text-align: center;
  }
  
  /* 标题样式 */
  .title {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  /* 表单组样式 */
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  /* 标签和输入框样式 */
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-sizing: border-box;
  }
  
  /* 登录按钮样式 */
  .login-btn {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .login-btn:hover {
    background-color: #45a049;
  }
  
  .login-btn:disabled {
    background-color: #9e9e9e;
    cursor: not-allowed;
  }
  </style>
  