<template>
    <div>
        <input type="file" @change="handleFileUpload" accept=".mid,.midi" />
        <button @click="playWindChime">播放风铃音色</button>
        <div ref="scoreContainer"></div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { Midi } from '@tonejs/midi'
    import * as Tone from 'tone'

    const scoreContainer = ref(null)
    let midiData = null

    // 优化后的风铃音色合成器，更空灵、通透
    const windChimeSynth = new Tone.PolySynth(Tone.MetalSynth, {
        maxPolyphony: 8,
        options: {
            frequency: 900,
            envelope: {
                attack: 0.001,
                decay: 0.3,
                release: 2.5,
            },
            harmonicity: 8,
            modulationIndex: 40,
            resonance: 700,
            octaves: 2.5,
        },
    }).toDestination()

    // 处理MIDI文件上传
    const handleFileUpload = async (e) => {
        const file = e.target.files
        const arrayBuffer = await file[0].arrayBuffer()
        midiData = new Midi(arrayBuffer)
        console.log('MIDI解析完成:', midiData)
    }

    // 使用 Tone.Part 实现和弦/同一时刻多音播放
    const playWindChime = () => {
        if (!midiData) return

        Tone.start()
        Tone.Transport.stop()
        Tone.Transport.cancel()

        // 收集所有音符事件
        const events = []
        midiData.tracks.forEach((track) => {
            track.notes.forEach((note) => {
                events.push({
                    time: note.time,
                    note: note.name,
                    duration: note.duration,
                    velocity: note.velocity,
                })
            })
        })

        // 按时间分组，解决同一时刻和弦问题
        const grouped = {}
        events.forEach((e) => {
            if (!grouped[e.time]) grouped[e.time] = []
            grouped[e.time].push(e)
        })

        // 转换为 Tone.Part 需要的格式
        const partEvents = Object.entries(grouped).map(([time, notes]) => ({
            time: parseFloat(time),
            notes: notes.map((n) => ({
                name: n.note,
                duration: n.duration,
                velocity: n.velocity,
            })),
        }))

        // 创建 Tone.Part
        const part = new Tone.Part((time, value) => {
            // 支持和弦
            windChimeSynth.triggerAttackRelease(
                value.notes.map((n) => n.name),
                value.notes[0].duration,
                time,
                value.notes[0].velocity,
            )
        }, partEvents).start(0)

        Tone.Transport.start()
    }
</script>
