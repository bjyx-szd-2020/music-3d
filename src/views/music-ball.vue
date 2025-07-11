<template>
    <div>
        <input type="file" accept="audio/*" @change="onFileChange" />
        <div class="hint">{{ hint }}</div>
        <div ref="threeContainer" class="three-canvas"></div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import * as THREE from 'three'
    import { gsap } from 'gsap'

    const threeContainer = ref<HTMLDivElement | null>(null)
    const hint = ref('请上传一段音乐(mp3)体验自动踩点动画~')

    let renderer: THREE.WebGLRenderer
    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera

    let curve: THREE.CatmullRomCurve3
    let pads: THREE.Mesh[] = []
    let ball: THREE.Mesh | null = null
    let beatTimes: number[] = []
    let audioCtx: AudioContext | null = null
    let source: AudioBufferSourceNode | null = null
    let audioBuffer: AudioBuffer | null = null
    let animationStart = 0
    let isPlaying = false

    /** 控制GSAP动画的对象 */
    const ballAnim = {
        t: 0,
        jump: 0,
        scale: 1,
    }

    function initThree() {
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000)
        camera.position.z = 18

        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(window.innerWidth, 500)
        threeContainer.value!.appendChild(renderer.domElement)

        // 灯光
        const light = new THREE.PointLight(0xffffff, 1, 100)
        light.position.set(0, 10, 10)
        scene.add(light)

        // 轨道
        curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-8, 0, 0),
            new THREE.Vector3(-3, 2, 0),
            new THREE.Vector3(2, -2, 0),
            new THREE.Vector3(8, 0, 0),
        ])
        const curvePoints = curve.getPoints(200)
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints)
        const material = new THREE.LineBasicMaterial({ color: 0x00ffff })
        const trackLine = new THREE.Line(geometry, material)
        scene.add(trackLine)
    }

    function clearPads() {
        for (const p of pads) scene.remove(p)
        pads = []
    }

    function spawnPads(times: number[]) {
        clearPads()
        const maxT = times[times.length - 1]
        for (const t of times) {
            const pos = curve.getPoint(Math.min(1, t / maxT))
            const g = new THREE.BoxGeometry(0.4, 0.2, 0.2)
            const m = new THREE.MeshPhongMaterial({ color: 0xfff200, emissive: 0x222200 })
            const pad = new THREE.Mesh(g, m)
            pad.position.copy(pos)
            pads.push(pad)
            scene.add(pad)
        }
    }

    function spawnBall() {
        if (ball) scene.remove(ball)
        const g = new THREE.SphereGeometry(0.35, 32, 32)
        const m = new THREE.MeshPhongMaterial({ color: 0xff3366, emissive: 0x220011 })
        ball = new THREE.Mesh(g, m)
        ball.position.copy(curve.getPoint(0))
        scene.add(ball)
    }

    /** GSAP控制小球弹跳+scale动画 */
    function jumpBall(fromIdx: number, toIdx: number, duration: number) {
        gsap.killTweensOf(ballAnim)
        ballAnim.t = 0
        ballAnim.jump = 0
        ballAnim.scale = 1

        gsap.to(ballAnim, {
            t: 1,
            duration,
            ease: 'power1.inOut',
            onUpdate() {
                // 抛物线弹跳
                ballAnim.jump = Math.sin(Math.PI * ballAnim.t) * 1.6
                // scale 动画（落地时短暂放大）
                if (Math.abs(ballAnim.t - 1) < 0.12) ballAnim.scale = 1.3 - (1.1 * Math.abs(ballAnim.t - 1)) / 0.12
                else if (ballAnim.t < 0.12) ballAnim.scale = 1.3 - (1.1 * ballAnim.t) / 0.12
                else ballAnim.scale = 1
            },
        })
    }

    /** 节奏驱动动画 */
    function scheduleJumps() {
        if (!beatTimes.length) return
        // 每一跳按节奏触发
        for (let i = 1; i < beatTimes.length; i++) {
            const delay = beatTimes[i] - beatTimes[0]
            const duration = beatTimes[i] - beatTimes[i - 1]
            setTimeout(() => {
                jumpBall(i - 1, i, duration)
            }, delay * 1000)
        }
        // 补第一跳
        jumpBall(0, 1, beatTimes[1] - beatTimes[0])
    }

    function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)

        if (isPlaying && beatTimes.length > 1) {
            // 当前所在的节奏段
            const t = audioCtx ? audioCtx.currentTime - animationStart : 0
            let idx = beatTimes.findIndex((bt) => bt > t)
            if (idx < 0) idx = beatTimes.length - 1
            const t0 = beatTimes[Math.max(0, idx - 1)]
            const t1 = beatTimes[idx]
            const p0 = curve.getPoint(Math.min(1, t0 / beatTimes[beatTimes.length - 1]))
            const p1 = curve.getPoint(Math.min(1, t1 / beatTimes[beatTimes.length - 1]))
            // 用 GSAP 动画对象插值
            const pos = new THREE.Vector3().lerpVectors(p0, p1, ballAnim.t)
            pos.y += ballAnim.jump
            if (ball) {
                ball.position.copy(pos)
                ball.scale.set(ballAnim.scale, ballAnim.scale, ballAnim.scale)
            }
        }
    }

    async function onFileChange(e: Event) {
        const files = (e.target as HTMLInputElement).files
        if (!files || !files[0]) return
        if (audioCtx) audioCtx.close()
        clearPads()
        if (ball) scene.remove(ball)
        hint.value = '正在分析节奏，请稍候...'

        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const arrayBuffer = await files[0].arrayBuffer()
        audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0))
        beatTimes = await detectBeats(audioBuffer)
        if (beatTimes.length < 2) {
            hint.value = '节奏分析失败，请换一首歌试试'
            return
        }
        hint.value = '分析成功，自动生成动画，正在播放...'
        spawnPads(beatTimes)
        spawnBall()

        if (source) source.stop()
        source = audioCtx.createBufferSource()
        source.buffer = audioBuffer
        source.connect(audioCtx.destination)
        source.onended = () => {
            isPlaying = false
            hint.value = '播放结束，重新上传可更换音乐'
        }

        animationStart = audioCtx.currentTime
        isPlaying = true
        source.start(0)
        scheduleJumps()
    }

    /** 简单能量峰值检测 */
    async function detectBeats(buffer: AudioBuffer): Promise<number[]> {
        const raw = buffer.getChannelData(0)
        const interval = Math.floor(buffer.sampleRate * 0.02) // 20ms
        const energies: number[] = []
        for (let i = 0; i < raw.length; i += interval) {
            let sum = 0
            for (let j = 0; j < interval && i + j < raw.length; j++) sum += Math.abs(raw[i + j])
            energies.push(sum / interval)
        }
        const beats: number[] = []
        const threshold = (1.6 * energies.reduce((a, b) => a + b, 0)) / energies.length
        for (let i = 1; i < energies.length - 1; i++) {
            if (energies[i] > threshold && energies[i] > energies[i - 1] && energies[i] > energies[i + 1]) {
                beats.push(i * 0.02)
            }
        }
        // 若极少则均匀补充
        if (beats.length < 4) {
            const duration = buffer.duration
            const bpm = 120
            for (let t = 0; t < duration; t += 60 / bpm) beats.push(t)
        }
        return beats
    }

    onMounted(() => {
        initThree()
        animate()
        window.addEventListener('resize', resizeRenderer)
    })

    onBeforeUnmount(() => {
        if (audioCtx) audioCtx.close()
        window.removeEventListener('resize', resizeRenderer)
    })

    function resizeRenderer() {
        if (!renderer || !camera) return
        const width = window.innerWidth
        renderer.setSize(width, 500)
        camera.aspect = width / 500
        camera.updateProjectionMatrix()
    }
</script>

<style scoped>
    .three-canvas {
        width: 100vw;
        height: 500px;
        margin: 0 auto;
        background: #181c20;
        border-radius: 16px;
        box-shadow: 0 4px 24px #0008;
        overflow: hidden;
    }
    input[type='file'] {
        margin: 1em 0;
    }
    .hint {
        margin-bottom: 10px;
        color: #b7e2ff;
        min-height: 1.6em;
    }
</style>
