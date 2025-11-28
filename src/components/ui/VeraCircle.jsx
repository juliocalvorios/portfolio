import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// === SIMPLEX NOISE IMPLEMENTATION ===
class SimplexNoise {
    constructor(r) {
        if (r == undefined) r = Math.random;
        this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[-1,-1,-1]];
        this.p = [];
        for (var i = 0; i < 256; i++) {
            this.p[i] = Math.floor(r() * 256);
        }
        this.perm = [];
        for (var i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
        }
    }

    noise3d(xin, yin, zin) {
        var n0, n1, n2, n3;
        var F3 = 1.0/3.0;
        var s = (xin+yin+zin)*F3;
        var i = Math.floor(xin+s);
        var j = Math.floor(yin+s);
        var k = Math.floor(zin+s);
        var G3 = 1.0/6.0;
        var t = (i+j+k)*G3;
        var X0 = i-t;
        var Y0 = j-t;
        var Z0 = k-t;
        var x0 = xin-X0;
        var y0 = yin-Y0;
        var z0 = zin-Z0;
        var i1, j1, k1;
        var i2, j2, k2;
        if(x0>=y0) {
            if(y0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
            else if(x0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
            else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
        } else {
            if(y0<z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
            else if(x0<z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
            else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
        }
        var x1 = x0 - i1 + G3;
        var y1 = y0 - j1 + G3;
        var z1 = z0 - k1 + G3;
        var x2 = x0 - i2 + 2.0*G3;
        var y2 = y0 - j2 + 2.0*G3;
        var z2 = z0 - k2 + 2.0*G3;
        var x3 = x0 - 1.0 + 3.0*G3;
        var y3 = y0 - 1.0 + 3.0*G3;
        var z3 = z0 - 1.0 + 3.0*G3;
        var ii = i & 255;
        var jj = j & 255;
        var kk = k & 255;
        var gi0 = this.perm[ii+this.perm[jj+this.perm[kk]]] % 12;
        var gi1 = this.perm[ii+i1+this.perm[jj+j1+this.perm[kk+k1]]] % 12;
        var gi2 = this.perm[ii+i2+this.perm[jj+j2+this.perm[kk+k2]]] % 12;
        var gi3 = this.perm[ii+1+this.perm[jj+1+this.perm[kk+1]]] % 12;
        var t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
        if(t0<0) n0 = 0.0;
        else {
            t0 *= t0;
            n0 = t0 * t0 * (this.grad3[gi0][0] * x0 + this.grad3[gi0][1] * y0 + this.grad3[gi0][2] * z0);
        }
        var t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
        if(t1<0) n1 = 0.0;
        else {
            t1 *= t1;
            n1 = t1 * t1 * (this.grad3[gi1][0] * x1 + this.grad3[gi1][1] * y1 + this.grad3[gi1][2] * z1);
        }
        var t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
        if(t2<0) n2 = 0.0;
        else {
            t2 *= t2;
            n2 = t2 * t2 * (this.grad3[gi2][0] * x2 + this.grad3[gi2][1] * y2 + this.grad3[gi2][2] * z2);
        }
        var t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
        if(t3<0) n3 = 0.0;
        else {
            t3 *= t3;
            n3 = t3 * t3 * (this.grad3[gi3][0] * x3 + this.grad3[gi3][1] * y3 + this.grad3[gi3][2] * z3);
        }
        return 32.0*(n0 + n1 + n2 + n3);
    }
}

// Color principal
const CIRCLE_COLOR = '#2C5F6F'

export default function VeraCircle({ width = 280, height = 280 }) {
    const mountRef = useRef(null)
    const rendererRef = useRef(null)
    const sceneRef = useRef(null)
    const cameraRef = useRef(null)
    const animationRef = useRef(null)
    const particlesRef = useRef(null)

    useEffect(() => {
        if (!mountRef.current) return

        // === THREE.JS SETUP ===
        const scene = new THREE.Scene()
        sceneRef.current = scene

        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1000, 1000)
        cameraRef.current = camera
        camera.position.z = 100

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        rendererRef.current = renderer
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))
        renderer.setSize(width, height)

        const aspect = width / height
        const frustumSize = 300
        camera.left = frustumSize * aspect / -2
        camera.right = frustumSize * aspect / 2
        camera.top = frustumSize / 2
        camera.bottom = frustumSize / -2
        camera.updateProjectionMatrix()

        mountRef.current.appendChild(renderer.domElement)

        // === PARTICLE SYSTEM ===
        const PARTICLE_COUNT = 4000
        const noise = new SimplexNoise()
        const clock = new THREE.Clock()
        const interactionPoint = new THREE.Vector2(10000, 10000)
        let basePositions

        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(PARTICLE_COUNT * 3)
        const colors = new Float32Array(PARTICLE_COUNT * 3)
        const customData = new Float32Array(PARTICLE_COUNT * 3)

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = (i / PARTICLE_COUNT) * Math.PI * 2
            const radius = 80 + Math.random() * 40

            positions[i * 3] = Math.cos(angle) * radius
            positions[i * 3 + 1] = Math.sin(angle) * radius
            positions[i * 3 + 2] = 0

            customData[i * 3] = angle
            customData[i * 3 + 1] = radius
            customData[i * 3 + 2] = Math.random()
        }

        basePositions = new Float32Array(positions)

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        geometry.setAttribute('customData', new THREE.BufferAttribute(customData, 3))

        // Particle texture
        const canvas = document.createElement('canvas')
        canvas.width = 64
        canvas.height = 64
        const ctx = canvas.getContext('2d')
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        gradient.addColorStop(0.3, 'rgba(128, 128, 128, 0.7)')
        gradient.addColorStop(1, 'rgba(79, 70, 229, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 64, 64)
        const texture = new THREE.CanvasTexture(canvas)
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false
        texture.anisotropy = 8

        const material = new THREE.PointsMaterial({
            vertexColors: true,
            size: 2,
            sizeAttenuation: false,
            map: texture,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 1,
            depthWrite: false,
        })

        const particles = new THREE.Points(geometry, material)
        particlesRef.current = particles
        scene.add(particles)

        // === INTERACTION EVENTS ===
        const onMouseMove = (event) => {
            const rect = renderer.domElement.getBoundingClientRect()
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
            const aspect = rect.width / rect.height
            const frustumSize = 300
            interactionPoint.x = x * frustumSize * aspect / 2
            interactionPoint.y = y * frustumSize / 2
        }
        const onMouseLeave = () => interactionPoint.set(10000, 10000)
        renderer.domElement.addEventListener('mousemove', onMouseMove)
        renderer.domElement.addEventListener('mouseleave', onMouseLeave)

        // === ANIMATION ===
        const stateColor = new THREE.Color(CIRCLE_COLOR)

        const animate = () => {
            animationRef.current = requestAnimationFrame(animate)
            const time = clock.getElapsedTime() * 0.5
            const positions = particles.geometry.attributes.position.array
            const colors = particles.geometry.attributes.color.array

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3
                const basePosition = new THREE.Vector2(basePositions[i3], basePositions[i3 + 1])
                const noiseX = noise.noise3d(basePosition.x * 0.01, basePosition.y * 0.01, time * 0.3) * 20
                const noiseY = noise.noise3d(basePosition.y * 0.01, basePosition.x * 0.01, time * 0.3) * 20

                const targetPos = new THREE.Vector2(basePosition.x + noiseX, basePosition.y + noiseY)
                const distanceToInteraction = targetPos.distanceTo(interactionPoint)
                const interactionRadius = 100
                let repulsion = new THREE.Vector2(0, 0)

                if (distanceToInteraction < interactionRadius) {
                    const force = Math.pow(1 - distanceToInteraction / interactionRadius, 2)
                    repulsion.subVectors(targetPos, interactionPoint).normalize().multiplyScalar(force * 40)
                }

                const targetX = targetPos.x + repulsion.x
                const targetY = targetPos.y + repulsion.y
                positions[i3] += (targetX - positions[i3]) * 0.08
                positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.08

                const targetColor = new THREE.Color()
                if (distanceToInteraction < interactionRadius) {
                    // Purple color on hover
                    targetColor.set('#6366f1')
                } else {
                    targetColor.copy(stateColor)
                }

                colors[i3] += (targetColor.r - colors[i3]) * 0.1
                colors[i3 + 1] += (targetColor.g - colors[i3 + 1]) * 0.1
                colors[i3 + 2] += (targetColor.b - colors[i3 + 2]) * 0.1
            }

            particles.geometry.attributes.position.needsUpdate = true
            particles.geometry.attributes.color.needsUpdate = true
            renderer.render(scene, camera)
        }

        animate()

        // === CLEANUP ===
        return () => {
            cancelAnimationFrame(animationRef.current)
            renderer.domElement.removeEventListener('mousemove', onMouseMove)
            renderer.domElement.removeEventListener('mouseleave', onMouseLeave)

            scene.traverse(object => {
                if (object.geometry) object.geometry.dispose()
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => {
                            if (material.map) material.map.dispose()
                            material.dispose()
                        })
                    } else {
                        if (object.material.map) object.material.map.dispose()
                        object.material.dispose()
                    }
                }
            })

            texture.dispose()
            geometry.dispose()
            material.dispose()

            renderer.dispose()
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement)
            }
        }
    }, [])

    // Resize handler
    useEffect(() => {
        const renderer = rendererRef.current
        const camera = cameraRef.current
        if (renderer && camera) {
            renderer.setSize(width, height)
            const aspect = width / height
            const frustumSize = 300
            camera.left = frustumSize * aspect / -2
            camera.right = frustumSize * aspect / 2
            camera.top = frustumSize / 2
            camera.bottom = frustumSize / -2
            camera.updateProjectionMatrix()
        }
    }, [width, height])

    return (
        <div
            ref={mountRef}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                background: 'transparent'
            }}
        />
    )
}
