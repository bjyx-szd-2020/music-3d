<template>
    <div class="main-bg">
        <h1>🎼 MIDI音乐播放Demo</h1>
        <div>
            <input type="file" @change="handleFileUpload" accept=".mid,.midi" />
            <button :disabled="loading" @click="playWindChime">播放钢琴音色</button>
            <div ref="scoreContainer"></div>
        </div>
        <footer>
            <small>Made with Vue 3 + Vite + TypeScript + soundfont-player + @tonejs/midi</small>
        </footer>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { Midi } from '@tonejs/midi'
    import Soundfont from 'soundfont-player'

    const scoreContainer = ref(null)
    const loading = ref(true)
    let midiData = null
    let piano = null
    let audioCtx = null

    // 处理MIDI文件上传
    async function handleFileUpload(e) {
        loading.value = true
        const file = e.target.files
        const arrayBuffer = await file[0].arrayBuffer()
        midiData = new Midi(arrayBuffer)
        console.log('MIDI解析完成:', midiData)
        // 初始化Soundfont钢琴
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        piano = await Soundfont.instrument(audioCtx, 'acoustic_grand_piano')
        loading.value = false
    }

    // 使用 Soundfont 播放和弦
    async function playWindChime() {
        if (!midiData || !piano) return

        // 确保 audioCtx 已 resume
        if (audioCtx.state === 'suspended') {
            await audioCtx.resume()
        }

        piano.stop && piano.stop()

        // 收集所有音符
        const notes = []
        midiData.tracks.forEach((track) => {
            notes.push(...track.notes)
        })
        if (notes.length === 0) {
            console.warn('没有找到音符')
            return
        }

        const BATCH_SIZE = 10
        const firstNoteTime = notes[0].time
        let currentIndex = 0
        //audioCtx.currentTime 是当前音乐播放时间
        const startTime = audioCtx.currentTime
        console.log(startTime)

        // 分批调度函数
        function scheduleBatch(fromIdx) {
            const batch = notes.slice(fromIdx, fromIdx + BATCH_SIZE)
            batch.forEach((note) => {
                const when = startTime + note.time - firstNoteTime
                piano.play(note.name, when, { gain: note.velocity, duration: note.duration })
            })

            // 如果还有下一批，设置定时器在第40个音符的time时调度
            if (fromIdx + BATCH_SIZE < notes.length) {
                const nextTime = batch[BATCH_SIZE / 2].time - firstNoteTime
                const delay = Math.max(0, startTime + nextTime - audioCtx.currentTime)
                setTimeout(() => {
                    scheduleBatch(fromIdx + BATCH_SIZE)
                }, delay * 1000)
            }
        }

        scheduleBatch(0)
    }
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
