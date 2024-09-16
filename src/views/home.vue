<template>
    <div class="home">
        登录
        <button @click="onLogin">登录</button>
    </div>
</template>
<script>
export default {
    methods: {
        onLogin() { 
            localStorage.setItem('isLogin', 1)
            this.$router.push('/model')
        }
    }
}
</script>
