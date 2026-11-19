/*
 * 流动液体背景（WebGL）：深蓝/黑色流体 + 鼠标拨水涟漪。
 * 不支持 WebGL 时自动退回到 CSS 渐变背景。
 */
(() => {
  "use strict";

  const canvas = document.getElementById("liquid");
  if (!canvas) return;

  const gl =
    canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "low-power" }) ||
    canvas.getContext("experimental-webgl");
  if (!gl) { canvas.remove(); return; }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MAX_RIPPLES = 20;
  const RENDER_SCALE = 0.5;

  const VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}";

  const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uEnergy;
uniform vec4 uR[${MAX_RIPPLES}];

float hash(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p + 0.13; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y);

  vec2 disp = vec2(0.0);
  float rip = 0.0;
  for (int i = 0; i < ${MAX_RIPPLES}; i++){
    vec4 r = uR[i];
    float age = uTime - r.z;
    if (r.w <= 0.0 || age < 0.0 || age > 3.5) continue;
    vec2 d = p - r.xy;
    float dist = length(d);
    float rad = age * 0.3;
    float x = dist - rad;
    float w = sin(x * 60.0) * exp(-x * x * 120.0) * exp(-age * 1.4) * r.w / (1.0 + rad * 5.0);
    disp += (d / (dist + 1e-4)) * w * 0.012;
    rip += w;
  }

  vec2 md = p - uMouse;
  float m2 = dot(md, md);
  disp -= md * exp(-m2 * 28.0) * 0.08 * uEnergy;
  p += disp;

  float t = uTime * 0.06;
  vec2 sp = p * 1.35;
  vec2 q  = vec2(fbm(sp + vec2(0.0, t)), fbm(sp + vec2(5.2, 1.3) - t * 0.8));
  vec2 r2 = vec2(fbm(sp + 3.0 * q + vec2(1.7, 9.2) + t * 1.3), fbm(sp + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(sp + 3.2 * r2);

  vec3 c0 = vec3(0.003, 0.006, 0.016);
  vec3 c1 = vec3(0.008, 0.035, 0.110);
  vec3 c2 = vec3(0.010, 0.120, 0.320);
  vec3 c3 = vec3(0.000, 0.550, 0.950);

  vec3 col = mix(c0, c1, smoothstep(0.25, 0.75, f));
  col = mix(col, c2, smoothstep(0.45, 1.1, length(q) * f * 1.6) * 0.85);
  col += c3 * smoothstep(0.62, 0.95, r2.x * f * 1.8) * 0.20;
  col += c3 * exp(-abs(f - 0.56) * 55.0) * smoothstep(0.4, 0.8, length(r2)) * 0.10;

  col += c3 * max(rip, 0.0) * 0.22;
  col *= 1.0 - max(-rip, 0.0) * 0.25;
  col += vec3(0.0, 0.4, 1.0) * exp(-m2 * 35.0) * (0.03 + 0.07 * uEnergy);

  float vig = 1.0 - smoothstep(0.25, 1.25, length((uv - 0.5) * vec2(1.1, 1.3)));
  col *= mix(0.45, 1.0, vig);
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}`;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn("[liquid] shader error:", gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  };

  const vs = compile(gl.VERTEX_SHADER, VS);
  const fs = compile(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) { canvas.remove(); return; }

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn("[liquid] link error:", gl.getProgramInfoLog(prog));
    canvas.remove();
    return;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aLoc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(aLoc);
  gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

  const U = {
    res: gl.getUniformLocation(prog, "uRes"),
    time: gl.getUniformLocation(prog, "uTime"),
    mouse: gl.getUniformLocation(prog, "uMouse"),
    energy: gl.getUniformLocation(prog, "uEnergy"),
    ripples: gl.getUniformLocation(prog, "uR[0]")
  };

  const ripples = new Float32Array(MAX_RIPPLES * 4);
  let rippleIdx = 0;
  const t0 = performance.now();
  const now = () => (performance.now() - t0) / 1000;

  let aspect = 1;
  const mouse = { x: -10, y: -10, tx: -10, ty: -10, energy: 0, init: false, lx: 0, ly: 0, lt: 0 };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(window.innerWidth * dpr * RENDER_SCALE));
    const h = Math.max(1, Math.floor(window.innerHeight * dpr * RENDER_SCALE));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    aspect = window.innerWidth / window.innerHeight;
  };

  const toP = (cx, cy) => [(cx / window.innerWidth) * aspect, 1 - cy / window.innerHeight];

  const addRipple = (x, y, amp) => {
    ripples.set([x, y, now(), amp], rippleIdx * 4);
    rippleIdx = (rippleIdx + 1) % MAX_RIPPLES;
  };

  const draw = (time) => {
    gl.uniform2f(U.res, canvas.width, canvas.height);
    gl.uniform1f(U.time, time);
    gl.uniform2f(U.mouse, mouse.x, mouse.y);
    gl.uniform1f(U.energy, mouse.energy);
    gl.uniform4fv(U.ripples, ripples);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); if (reduceMotion) draw(8); }, 120);
  });
  resize();

  if (reduceMotion) {
    draw(8);
    canvas.classList.add("ready");
    return;
  }

  window.addEventListener("pointermove", (e) => {
    const [x, y] = toP(e.clientX, e.clientY);
    const t = now();
    if (!mouse.init) {
      Object.assign(mouse, { x, y, tx: x, ty: y, lx: x, ly: y, lt: t, init: true });
      return;
    }
    mouse.tx = x;
    mouse.ty = y;
    const dist = Math.hypot(x - mouse.lx, y - mouse.ly);
    mouse.energy = Math.min(1, mouse.energy + dist * 4);
    if (dist > 0.045 && t - mouse.lt > 0.035) {
      const speed = dist / Math.max(t - mouse.lt, 1e-3);
      addRipple(x, y, Math.min(1, Math.max(0.35, 0.3 + speed * 0.12)));
      mouse.lx = x;
      mouse.ly = y;
      mouse.lt = t;
    }
  }, { passive: true });

  window.addEventListener("pointerdown", (e) => {
    const [x, y] = toP(e.clientX, e.clientY);
    addRipple(x, y, 1.6);
  }, { passive: true });

  document.addEventListener("pointerleave", () => { mouse.energy = 0; });

  let rafId = 0;
  let first = true;
  const loop = () => {
    mouse.x += (mouse.tx - mouse.x) * 0.15;
    mouse.y += (mouse.ty - mouse.y) * 0.15;
    mouse.energy *= 0.95;
    draw(now());
    if (first) { canvas.classList.add("ready"); first = false; }
    rafId = requestAnimationFrame(loop);
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else rafId = requestAnimationFrame(loop);
  });

  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    cancelAnimationFrame(rafId);
    canvas.remove();
  });

  rafId = requestAnimationFrame(loop);
})();
