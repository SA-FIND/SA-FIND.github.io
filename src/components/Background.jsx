import { useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════
// VERTEX SHADER
// ═══════════════════════════════════════════════════════════
const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// ═══════════════════════════════════════════════════════════
// FRAGMENT SHADER — Froth Flotation (Optimized)
// ═══════════════════════════════════════════════════════════
const FRAGMENT_SHADER = `
  precision mediump float; // Use mediump for better performance

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_mouseActive;

  // Faster 2D hash for noise
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // Fast 2D Simplex Noise
  float snoise(vec2 p) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;

    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);

    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;

    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash2(i + 0.0)),
                                  dot(b, hash2(i + o)),
                                  dot(c, hash2(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  // Fractional Brownian Motion (reduced iterations for performance)
  float fbm(vec2 p) {
    float f = 0.0;
    float amp = 0.5;
    for(int i = 0; i < 4; i++) { // Only 4 octaves
      f += amp * snoise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return f;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;
    p.x *= aspect;

    float t = u_time * 0.4; // Speed of slurry flow

    // ── Mouse disturbance (aeration / paddle movement) ──
    vec2 mouse = u_mouse;
    mouse.x *= aspect;
    float mouseDist = length(p - mouse);
    float mouseInfluence = u_mouseActive * smoothstep(0.4, 0.0, mouseDist) * 0.3;

    // ── Froth Flotation Slurry (Dark base with bubbles) ──
    // Moving upwards
    vec2 flowP = p * 2.5 + vec2(0.0, -t * 1.5);
    
    // Domain warping for fluid motion
    float q = fbm(flowP + vec2(0.0, t * 0.2));
    float fluid = fbm(flowP + q * 1.5 + mouseInfluence * snoise(p * 4.0));

    // ── Colors ──
    vec3 darkSlurry = vec3(0.04, 0.05, 0.06); // Dark mineral pulp
    vec3 froth      = vec3(0.12, 0.15, 0.18); // Froth/bubbles
    vec3 goldSpec   = vec3(1.0, 0.85, 0.3);   // Attached gold particles

    // Mix base slurry and froth
    vec3 color = mix(darkSlurry, froth, smoothstep(0.1, 0.7, fluid));

    // ── Rising Golden Mineral Particles ──
    // Creating sharp, bright hotspots that float upwards
    float particles = snoise(p * 15.0 + vec2(0.0, -t * 3.0));
    particles = pow(max(particles, 0.0), 5.0) * 1.5; // Make them sparse and bright
    
    // Particles cluster more where froth is thicker (higher fluid value)
    color += goldSpec * particles * smoothstep(0.3, 0.8, fluid);

    // ── Vignette ──
    float vignette = 1.0 - length((uv - 0.5) * 1.2);
    color *= smoothstep(0.0, 0.8, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ═══════════════════════════════════════════════════════════
// CSS PARTICLE SYSTEM — Macroscopic Bubbles/Gold
// ═══════════════════════════════════════════════════════════
function generateBubbles(count) {
  return Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 6 + 2;
    const isGold = Math.random() > 0.7; // Some bubbles carry gold particles
    return {
      id: i,
      style: {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        bottom: '-10px',
        borderRadius: '50%',
        background: isGold 
          ? `radial-gradient(circle, rgba(212,168,67,0.8), rgba(212,168,67,0) 70%)`
          : `radial-gradient(circle, rgba(255,255,255,0.15), rgba(255,255,255,0) 70%)`,
        boxShadow: isGold ? '0 0 8px rgba(212,168,67,0.4)' : 'none',
        animation: `bubbleRise ${Math.random() * 10 + 5}s ${Math.random() * 5}s ease-in infinite`,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }
    };
  });
}

const Background = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: 0 });
  const rafRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const initGL = useCallback((canvas) => {
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return null;

    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return null;
    }

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    return {
      gl,
      uniforms: {
        resolution: gl.getUniformLocation(program, 'u_resolution'),
        time: gl.getUniformLocation(program, 'u_time'),
        mouse: gl.getUniformLocation(program, 'u_mouse'),
        mouseActive: gl.getUniformLocation(program, 'u_mouseActive'),
      },
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Drastically reduce resolution scale to fix scroll lag/framerate issues
    const isMobile = window.innerWidth < 768;
    const dpr = 1; // Force 1x pixel ratio to save GPU
    const scale = isMobile ? 0.35 : 0.5; // 35-50% scale is usually enough for a blurry abstract bg

    const resize = () => {
      const w = window.innerWidth * scale;
      const h = window.innerHeight * scale;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    };
    resize();

    const context = initGL(canvas);
    if (!context) return;

    const { gl, uniforms } = context;

    const handleMouse = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
        active: 1,
      };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    const render = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, elapsed);
      gl.uniform2f(uniforms.mouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uniforms.mouseActive, mouseRef.current.active);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      rafRef.current = requestAnimationFrame(render);
    };
    render();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', resize);
    };
  }, [initGL]);

  const bubbles = useRef(generateBubbles(window.innerWidth < 768 ? 15 : 30)).current;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        {bubbles.map(bubble => (
          <div key={bubble.id} style={bubble.style} />
        ))}
      </div>

      <style>{`
        @keyframes bubbleRise {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0;
          }
          10% { opacity: 0.8; }
          50% {
            transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 20 + 5}px, -40vh) scale(1);
            opacity: 0.8;
          }
          90% { opacity: 0.8; }
          100% {
            transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 40 + 10}px, -110vh) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Background;
