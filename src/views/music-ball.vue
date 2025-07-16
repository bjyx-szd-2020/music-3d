<template>
    <div class="main-bg">
        <h1>🎼 MIDI音乐播放Demo</h1>
        <div>
            <input type="file" @change="handleFileUpload" accept=".mid,.midi" />
            <button :disabled="loading" @click="playWindChime">播放钢琴音色</button>
            <div ref="threeContainer" style="width: 800px; height: 500px; margin: 0 auto"></div>
        </div>
        <footer>
            <small>Made with Vue 3 + Vite + TypeScript + soundfont-player + @tonejs/midi + three.js</small>
        </footer>
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
        noteBars = []
    let animationId = null

    onMounted(() => {
        // 初始化Three.js场景
        initThree()
        renderLoop()
    })

    onBeforeUnmount(() => {
        if (animationId) cancelAnimationFrame(animationId)
        renderer?.dispose?.()
    })

    // Three.js 场景初始化
    function initThree() {
        if (renderer) {
            renderer.dispose?.()
            threeContainer.value.innerHTML = ''
        }
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(45, 800 / 500, 0.1, 1000)
        // 相机俯视或斜视
        camera.position.set(0, 15, 30)
        camera.lookAt(0, 0, 0)

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(800, 500)
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

        // 环境贴图异步加载
        const loader = new THREE.CubeTextureLoader()
        loader.load(
            [
                'https://threejs.org/examples/textures/cube/Bridge2/posx.jpg',
                'https://threejs.org/examples/textures/cube/Bridge2/negx.jpg',
                'https://threejs.org/examples/textures/cube/Bridge2/posy.jpg',
                'https://threejs.org/examples/textures/cube/Bridge2/negy.jpg',
                'https://threejs.org/examples/textures/cube/Bridge2/posz.jpg',
                'https://threejs.org/examples/textures/cube/Bridge2/negz.jpg',
            ],
            (envTexture) => {
                scene.environment = envTexture
                scene.background = envTexture

                // 球体材质
                const ballMat = new THREE.MeshPhysicalMaterial({
                    color: 0xffffff,
                    metalness: 0.7,
                    roughness: 0.05,
                    transmission: 1,
                    thickness: 1.2,
                    ior: 1.45,
                    envMap: envTexture,
                    envMapIntensity: 1.2,
                    clearcoat: 1,
                    clearcoatRoughness: 0.1,
                    reflectivity: 0.8,
                    transparent: true,
                    opacity: 0.92,
                    sheen: 1,
                    sheenColor: new THREE.Color(0x66ccff),
                    sheenRoughness: 0.2,
                })

                // 球体
                const ballGeo = new THREE.SphereGeometry(1, 64, 64)
                ball = new THREE.Mesh(ballGeo, ballMat)
                ball.position.set(0, 10 + 2, 0) // y=12，刚好在最上方
                scene.add(ball)

                // 球体外发光轮廓
                const glowGeo = new THREE.SphereGeometry(1.08, 64, 64)
                const glowMat = new THREE.MeshBasicMaterial({
                    color: 0x66ccff,
                    transparent: true,
                    opacity: 0.18,
                    side: THREE.BackSide,
                })
                const glow = new THREE.Mesh(glowGeo, glowMat)
                ball.add(glow)
            },
        )
    }
    // 2. 生成纵向排列的音乐板
    function createNoteBars(notes) {
        noteBars.forEach((bar) => scene.remove(bar.mesh))
        noteBars = []
        // 取前16个不同音高
        const uniquePitches = [...new Set(notes.map((n) => n.midi))].sort((a, b) => a - b).slice(0, 16)
        uniquePitches.forEach((midi, i) => {
            // 1. 主体：带圆角的长方体
            const barGeo = new RoundedBoxGeometry(3, 0.4, 1, 6, 0.18)
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
            const holeHeight = 0.45
            const holeMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.3 })
            const hole1 = new THREE.Mesh(new THREE.CylinderGeometry(holeRadius, holeRadius, holeHeight, 24), holeMat)
            hole1.rotation.z = Math.PI / 2
            hole1.position.set(-1.25, 0, 0)
            bar.add(hole1)
            const hole2 = hole1.clone()
            hole2.position.set(1.25, 0, 0)
            bar.add(hole2)

            // 3. 支架（两根竖直黑色小圆柱体）
            const standRadius = 0.06
            const standHeight = 0.7
            const standMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.7, roughness: 0.4 })
            const stand1 = new THREE.Mesh(
                new THREE.CylinderGeometry(standRadius, standRadius, standHeight, 16),
                standMat,
            )
            stand1.position.set(-1.25, -0.55, 0)
            bar.add(stand1)
            const stand2 = stand1.clone()
            stand2.position.set(1.25, -0.55, 0)
            bar.add(stand2)

            // 纵向排列
            bar.position.set(0, 10 - i * 2.2, 0)
            scene.add(bar)
            noteBars.push({ midi, mesh: bar, x: bar.position.x, y: bar.position.y })
        })
    }
    // 3. 小球下落动画
    function animateBallTo(midi, jumpHeight = 6) {
        const bar = noteBars.find((b) => b.midi === midi)
        if (!bar) return
        // 动画参数
        const startX = ball.position.x
        const endX = bar.x
        const startY = ball.position.y
        const endY = bar.y + 1.2 // 球落到板上方
        const duration = 0.5 // 秒
        let t = 0
        function animate() {
            t += 1 / 60 / duration
            if (t > 1) t = 1
            // 抛物线插值
            ball.position.x = startX + (endX - startX) * t
            // y轴下落，带弹跳
            ball.position.y = (1 - t) * startY + t * endY + Math.sin(Math.PI * t) * jumpHeight * (1 - t)
            renderer.render(scene, camera)
            if (t < 1) {
                animationId = requestAnimationFrame(animate)
            } else {
                ball.position.y = endY
                renderer.render(scene, camera)
            }
        }
        animate()
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
        const file = e.target.files
        const arrayBuffer = await file[0].arrayBuffer()
        midiData = new Midi(arrayBuffer)
        console.log('MIDI数据:', midiData)
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        piano = await Soundfont.instrument(audioCtx, 'acoustic_grand_piano')

        // 再生成音符条
        const notes = []
        midiData.tracks.forEach((track) => notes.push(...track.notes))
        createNoteBars(notes)
        loading.value = false

        renderLoop()
    }
    // 播放并驱动小球动画
    async function playWindChime() {
        if (!midiData || !piano) return
        if (audioCtx.state === 'suspended') await audioCtx.resume()
        piano.stop && piano.stop()

        // 收集所有音符
        const notes = []
        midiData.tracks.forEach((track) => notes.push(...track.notes))
        if (notes.length === 0) return

        // 让所有音符的time减去最小值，实现即点即响
        const minTime = Math.min(...notes.map((n) => n.time))
        notes.forEach((n) => (n.time -= minTime))

        // 按时间排序
        notes.sort((a, b) => a.time - b.time)

        const startTime = audioCtx.currentTime

        // 音符播放+小球动画
        let noteIdx = 0
        function scheduleNextNote() {
            if (noteIdx >= notes.length) return
            const note = notes[noteIdx]
            const when = startTime + note.time
            const delay = Math.max(0, when - audioCtx.currentTime)
            setTimeout(() => {
                piano.play(note.name, audioCtx.currentTime, { gain: note.velocity, duration: note.duration })
                animateBallTo(note.midi)
                noteIdx++
                scheduleNextNote()
            }, delay * 1000)
        }
        scheduleNextNote()
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
