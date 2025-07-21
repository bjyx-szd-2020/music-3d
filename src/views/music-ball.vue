<template>
    <div class="main-bg">
        <button style="position: absolute; top: 20px; right: 20px" :disabled="loading" @click="playWindChime"
            >播放钢琴音色</button
        >
        <div ref="threeContainer" style="height: 100%; margin: 0 auto"></div>
    </div>
</template>

<script setup>
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
    // ...existing code...

    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { Midi } from '@tonejs/midi'
    import Soundfont from 'soundfont-player'
    import * as THREE from 'three'
    import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

    const loading = ref(true)
    let midiData = null
    let piano = null
    let audioCtx = null

    const threeContainer = ref(null)
    let renderer,
        scene,
        camera,
        controls,
        ball,
        pianoTimer,
        noteBars = {},
        notes = []

    let animationId = null

    onMounted(() => {
        // 初始化Three.js场景
        const containerHeight = threeContainer.value.clientHeight || window.innerHeight
        const containerWidth = Math.floor(containerHeight * 0.72)
        threeContainer.value.style.width = `${containerWidth}px`

        initThree(containerWidth, containerHeight)
        renderLoop()
        setTimeout(() => {
            handleFileUpload()
        }, 1000)
    })

    onBeforeUnmount(() => {
        if (animationId) cancelAnimationFrame(animationId)
        renderer?.dispose?.()
        clearTimeout(pianoTimer)
    })

    // Three.js 场景初始化
    function initThree(containerWidth, containerHeight) {
        if (renderer) {
            renderer.dispose?.()
            threeContainer.value.innerHTML = ''
        }
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 0.1, 1000)
        // 相机俯视或斜视
        camera.position.set(0, 6, 20)
        camera.lookAt(0, 0, 0)

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(containerWidth, containerHeight)
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.1
        renderer.outputColorSpace = THREE.SRGBColorSpace
        threeContainer.value.appendChild(renderer.domElement)

        // 鼠标控制
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.08
        controls.minDistance = 10
        controls.maxDistance = 80
        controls.target.set(0, 0, 0)
        controls.update()

        // 灯光
        const light = new THREE.DirectionalLight(0xffffff, 1)
        light.position.set(0, 20, 20)
        scene.add(light)
        scene.add(new THREE.AmbientLight(0xffffff, 0.5))

        scene.background = createTileTexture()

        // 创建彩色发光球体
        const ballGeo = new THREE.SphereGeometry(0.5, 64, 64)
        const colors = []
        const colorList = [
            new THREE.Color(0xff66cc), // 粉
            new THREE.Color(0x66ccff), // 蓝
            new THREE.Color(0x99ff66), // 绿
            new THREE.Color(0xffff66), // 黄
            new THREE.Color(0xff9966), // 橙
            new THREE.Color(0xcc66ff), // 紫
        ]
        for (let i = 0; i < ballGeo.attributes.position.count; i++) {
            // 按顶点分段渐变
            const color = colorList[i % colorList.length]
            colors.push(color.r, color.g, color.b)
        }
        ballGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

        const ballMat = new THREE.MeshStandardMaterial({
            vertexColors: true, // 启用顶点颜色
            metalness: 0.2,
            roughness: 0.2,
            transparent: true,
            opacity: 0.95,
            emissive: 0xffffff, // 发光颜色（白色，和顶点色混合）
            emissiveIntensity: 2.5, // 发光强度（可调大一点）
        })

        ball = new THREE.Mesh(ballGeo, ballMat)
        ball.position.set(0, 7, 0)
        scene.add(ball)

        // 可选：外发光轮廓
        const glowGeo = new THREE.SphereGeometry(0.52, 64, 64)
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x66ccff,
            transparent: true,
            opacity: 0.18,
            side: THREE.BackSide,
        })
        const glow = new THREE.Mesh(glowGeo, glowMat)
        ball.add(glow)
    }
    // 2. 生成纵向排列的音乐板
    function createNoteBars() {
        // 获取节奏信息
        const tempos = midiData.header.tempos
        const bpm = tempos.length ? tempos[0].bpm : 120
        const beatLength = 60 / bpm // 每拍秒数

        // 设定路径参数
        let yStart = 5
        let yStep = 1.5 // 每个音符板的垂直间距
        let curveAmplitude = 5 // 蜿蜒幅度
        let curveFreq = 0.7 // 蜿蜒频率

        notes.forEach((note, i) => {
            // 蜿蜒路径：x轴正弦曲线，y轴递减
            const x = Math.sin(i * curveFreq) * curveAmplitude
            const y = yStart - i * yStep

            // 1. 主体：带圆角的长方体
            // RoundedBoxGeometry各参数说明
            // width：盒子的宽度（x轴方向）。
            // height：盒子的高度（y轴方向）。
            // depth：盒子的深度（z轴方向）。
            // segments：圆角细分数（越大越圆润，推荐6~12）。
            // radius：圆角半径（决定圆角的大小，推荐0.1~0.2）
            const barGeo = new RoundedBoxGeometry(1, 0.4, 4, 6, 0.18)
            const barMat = new THREE.MeshPhysicalMaterial({
                color: 0xf0f0ff,
                metalness: 0.7,
                roughness: 0.18,
                transmission: 0.1,
                thickness: 0.2,
                ior: 1.2,
                envMap: scene.environment,
                envMapIntensity: 1.1,
                clearcoat: 0.7,
                clearcoatRoughness: 0.1,
                reflectivity: 0.7,
                sheen: 0.5,
                sheenColor: new THREE.Color(0x99ccff),
                sheenRoughness: 0.3,
            })
            const bar = new THREE.Mesh(barGeo, barMat)

            // 2. 两端孔洞（用黑色小圆柱体模拟）
            const holeRadius = 0.09
            const holeHeight = 0.82
            const holeMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.3 })
            const hole1 = new THREE.Mesh(new THREE.CylinderGeometry(holeRadius, holeRadius, holeHeight, 24), holeMat)

            hole1.position.set(0, -0.2, -1.5)
            bar.add(hole1)
            const hole2 = hole1.clone()
            hole2.position.set(0, -0.2, -0.5)
            bar.add(hole2)

            // 3. 支架（两根竖直黑色小圆柱体）
            const standRadius = 0.06
            const standHeight = 4
            //    0x222222
            const standMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.7, roughness: 0.4 })
            const stand1 = new THREE.Mesh(
                new THREE.CylinderGeometry(standRadius, standRadius, standHeight, 16),
                standMat,
            )
            stand1.rotation.x = Math.PI / 2
            stand1.position.set(0, -0.55, -2.5)
            bar.add(stand1)
            // 支架底座
            const stand2 = new THREE.Mesh(new THREE.CylinderGeometry(standRadius, standRadius * 5, 0.6, 16), standMat)
            stand2.rotation.x = Math.PI / 2
            stand2.position.set(0, -0.55, -4.5)
            bar.add(stand2)

            bar.position.set(x, y, 0)
            scene.add(bar)
            noteBars[note.ticks] = { x, y }
        })
    }

    // 3. 小球下落动画
    function animateBallTo(ticks, duration) {
        const jumpHeight = 6
        const bar = noteBars[ticks]
        if (!bar) return

        // 取消上一次动画，防止多次 requestAnimationFrame 堆积
        if (animationId) cancelAnimationFrame(animationId)

        const startX = ball.position.x
        const endX = bar.x
        const startY = ball.position.y
        const endY = bar.y + 1.2 // 球落到板上方
        let startTime = null

        function animate(now) {
            if (!startTime) startTime = now
            const elapsed = (now - startTime) / 1000
            let t = Math.min(elapsed / duration, 1)

            // 抛物线插值
            ball.position.x = startX + (endX - startX) * t
            ball.position.y = (1 - t) * startY + t * endY + Math.sin(Math.PI * t) * jumpHeight * (1 - t)

            renderer.render(scene, camera)
            if (t < 1) {
                animationId = requestAnimationFrame(animate)
            } else {
                ball.position.x = endX
                ball.position.y = endY
                renderer.render(scene, camera)
                animationId = null
            }
        }
        animationId = requestAnimationFrame(animate)
    }

    // 渲染循环
    function renderLoop() {
        controls && controls.update()
        renderer.render(scene, camera)
        animationId = requestAnimationFrame(renderLoop)
    }

    // 处理MIDI文件上传
    async function handleFileUpload(e) {
        loading.value = true
        let arrayBuffer
        if (!e) {
            const response = await fetch('/如果声音不记得.mid')
            arrayBuffer = await response.arrayBuffer()
        } else {
            const file = e.target.files
            arrayBuffer = await file[0].arrayBuffer()
        }

        midiData = new Midi(arrayBuffer)

        console.log('MIDI数据:', midiData)
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        piano = await Soundfont.instrument(audioCtx, 'acoustic_grand_piano')

        // 再生成音符条
        midiData.tracks.forEach((track) => notes.push(...track.notes))
        // 让所有音符的time减去最小值，实现即点即响
        const minTime = notes[0].time
        notes.forEach((n) => (n.time -= minTime)) //time变化会导致ticks自动变化
        createNoteBars()
        loading.value = false

        renderLoop()
    }
    // 播放并驱动小球动画
    async function playWindChime() {
        if (!midiData || !piano) return
        if (audioCtx.state === 'suspended') await audioCtx.resume()
        piano.stop && piano.stop()
        clearTimeout(pianoTimer)

        // 收集所有音符并按时间排序

        if (notes.length === 0) return

        const startTime = audioCtx.currentTime

        // 音符播放+小球动画
        let preNoteTicks
        let tempNotes = [...notes]
        function scheduleNextNote() {
            const note = tempNotes.shift()
            if (!note) return
            if (note.ticks === preNoteTicks) {
                preNoteTicks = note.ticks

                piano.play(note.name, startTime + note.time, { gain: note.velocity, duration: note.duration })
                scheduleNextNote()
            } else {
                const delay = Math.max(0, startTime + note.time - audioCtx.currentTime)
                preNoteTicks = note.ticks
                animateBallTo(note.ticks, delay)
                pianoTimer = setTimeout(() => {
                    piano.play(note.name, audioCtx.currentTime, { gain: note.velocity, duration: note.duration })

                    scheduleNextNote()
                }, delay * 1000)
            }
        }
        scheduleNextNote()
    }
    function createTileTexture() {
        const size = 512
        const tile = 128
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = size
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#222a38'
        ctx.fillRect(0, 0, size, size)
        ctx.strokeStyle = '#444'
        ctx.lineWidth = 2
        for (let x = 0; x <= size; x += tile) {
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, size)
            ctx.stroke()
        }
        for (let y = 0; y <= size; y += tile) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(size, y)
            ctx.stroke()
        }
        return new THREE.CanvasTexture(canvas)
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
</style>
