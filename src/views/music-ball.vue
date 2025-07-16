<template>
    <div>
        <input type="file" @change="handleFileUpload" accept=".mid,.midi" />
        <button @click="playWindChime">播放钢琴音色</button>
        <div ref="scoreContainer"></div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { Midi } from '@tonejs/midi'
    import Soundfont from 'soundfont-player'

    const scoreContainer = ref(null)
    let midiData = null
    let piano = null
    let audioCtx = null

    // 处理MIDI文件上传
    const handleFileUpload = async (e) => {
        const file = e.target.files
        const arrayBuffer = await file[0].arrayBuffer()
        midiData = new Midi(arrayBuffer)
        console.log('MIDI解析完成:', midiData)
        // 初始化Soundfont钢琴
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        piano = await Soundfont.instrument(audioCtx, 'acoustic_grand_piano')
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

        const BATCH_SIZE = 10
        let currentIndex = 0
        const startTime = audioCtx.currentTime

        // 分批调度函数
        function scheduleBatch(fromIdx) {
            const batch = notes.slice(fromIdx, fromIdx + BATCH_SIZE)
            batch.forEach((note) => {
                const when = startTime + note.time
                piano.play(note.name, when, { gain: note.velocity, duration: note.duration })
            })

            // 如果还有下一批，设置定时器在第40个音符的time时调度
            if (fromIdx + BATCH_SIZE < notes.length) {
                const nextTime = batch[Math.floot(BATCH_SIZE / 2)].time
                setTimeout(() => {
                    scheduleBatch(fromIdx + BATCH_SIZE)
                }, nextTime * 1000)
            }
        }

        scheduleBatch(0)
    }
</script>
