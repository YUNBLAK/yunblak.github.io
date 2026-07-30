export function createRenderer(canvas, width, height) {
  const logical = typeof OffscreenCanvas !== "undefined"
    ? new OffscreenCanvas(width, height)
    : Object.assign(document.createElement("canvas"), { width, height });
  const ctx = logical.getContext("2d", { alpha: false, desynchronized: true });
  ctx.imageSmoothingEnabled = false;

  const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, powerPreference: "high-performance" });
  if (!gl) {
    const fallback = canvas.getContext("2d", { alpha: false, desynchronized: true });
    fallback.imageSmoothingEnabled = false;
    return { ctx: fallback, gpu: false, present() {} };
  }

  const vs = `#version 300 es
    in vec2 p; out vec2 uv;
    void main(){uv=(p+1.0)*0.5;gl_Position=vec4(p,0,1);}`;
  const fs = `#version 300 es
    precision mediump float; in vec2 uv; uniform sampler2D tex; out vec4 color;
    void main(){color=texture(tex,vec2(uv.x,1.0-uv.y));}`;
  const compile = (type, source) => {
    const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); return shader;
  };
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(program); gl.useProgram(program);
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const location = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

  return {
    ctx, gpu: true,
    present() {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, logical);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  };
}
