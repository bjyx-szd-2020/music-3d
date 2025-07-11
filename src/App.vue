<template>
    <div class="main-bg">
        <h1>🎼 音乐轨道小球踩点动画 Demo</h1>
        <MusicBall />
        <footer>
            <small>Made with Vue 3 + Vite + TypeScript + Three.js</small>
        </footer>
    </div>
</template>

<script lang="ts" setup>
    import MusicBall from './views/music-ball.vue'
</script>

<style scoped>
    .main-bg {
        min-height: 100vh;
        background: #111;
        color: #fff;
        text-align: center;
        font-family: 'Segoe UI', 'PingFang SC', 'Hiragino Sans', Arial, sans-serif;
    }
    footer {
        margin-top: 24px;
    }
</style>
