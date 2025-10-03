/**
 * createPumpkin
 * Dynamically creates an SVG Halloween pumpkin and appends it to a container.
 *
 * @param {HTMLElement|string} container - DOM node or selector string where the pumpkin will be appended.
 * @param {Object} [options]
 * @param {number} [options.size=220] - Width/height (square) of the pumpkin SVG in pixels.
 * @param {string} [options.skinColor='#ff8c00'] - Pumpkin body fill color.
 * @param {string} [options.strokeColor='#cc6d00'] - Outline stroke color.
 * @param {string} [options.stemColor='#5a3d06'] - Stem color.
 * @param {string} [options.glowColor='#ffbf40'] - Internal face glow color.
 * @param {boolean} [options.glow=true] - Whether to add a glow effect filter.
 * @param {('classic'|'smile'|'spooky')} [options.face='classic'] - Face style variant.
 * @param {boolean} [options.animate=true] - Adds a gentle floating animation.
 * @returns {SVGSVGElement} The created SVG element.
 */
export function createPumpkin(container, options = {}) {
  const {
    size = 220,
    skinColor = '#ff8c00',
    strokeColor = '#cc6d00',
    stemColor = '#5a3d06',
    glowColor = '#ffbf40',
    glow = true,
    face = 'classic',
    animate = true,
  } = options;

  const target = typeof container === 'string' ? document.querySelector(container) : container;
  if (!target) throw new Error('createPumpkin: container not found');

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', '0 0 220 220');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Halloween pumpkin');
  svg.style.display = 'block';
  svg.style.maxWidth = '100%';
  svg.style.userSelect = 'none';

  // Optional floating animation via injected style tag (only once)
  if (animate && !document.getElementById('pumpkin-floating-style')) {
    const style = document.createElement('style');
    style.id = 'pumpkin-floating-style';
    style.textContent = `@keyframes pumpkinFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      .pumpkin-float { animation: pumpkinFloat 4s ease-in-out infinite; }`;
    document.head.appendChild(style);
  }
  if (animate) svg.classList.add('pumpkin-float');

  // Define filters (glow + subtle shadow)
  if (glow) {
    const defs = document.createElementNS(svgNS, 'defs');
    const filter = document.createElementNS(svgNS, 'filter');
    filter.setAttribute('id', 'pumpkinGlow');
    filter.innerHTML = `
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feFlood flood-color="${glowColor}" flood-opacity="0.55" />
      <feComposite in2="blur" operator="in" result="colored" />
      <feMerge><feMergeNode in="colored" /><feMergeNode in="SourceGraphic" /></feMerge>`;
    defs.appendChild(filter);

    const shadow = document.createElementNS(svgNS, 'filter');
    shadow.setAttribute('id', 'pumpkinShadow');
    shadow.innerHTML = `
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.35" />`;
    defs.appendChild(shadow);

    svg.appendChild(defs);
  }

  // Group for entire pumpkin
  const g = document.createElementNS(svgNS, 'g');
  g.setAttribute('filter', glow ? 'url(#pumpkinShadow)' : '');

  // Pumpkin body (layered lobes)
  const lobesData = [
    { rx: 70, fill: shadeColor(skinColor, -8), x: 110, opacity: 0.9 },
    { rx: 85, fill: skinColor, x: 110, opacity: 1 },
    { rx: 60, fill: shadeColor(skinColor, -5), x: 110, opacity: 0.92 }
  ];
  lobesData.forEach(({ rx, fill, x, opacity }) => {
    const ellipse = document.createElementNS(svgNS, 'ellipse');
    ellipse.setAttribute('cx', x);
    ellipse.setAttribute('cy', '125');
    ellipse.setAttribute('rx', rx);
    ellipse.setAttribute('ry', '85');
    ellipse.setAttribute('fill', fill);
    ellipse.setAttribute('stroke', strokeColor);
    ellipse.setAttribute('stroke-width', '3');
    ellipse.setAttribute('opacity', opacity);
    g.appendChild(ellipse);
  });

  // Stem
  const stem = document.createElementNS(svgNS, 'path');
  stem.setAttribute('d', 'M105 35 C104 20 110 10 122 12 C130 13 132 24 128 38 C126 45 130 54 126 58 C118 52 114 45 110 44 Z');
  stem.setAttribute('fill', stemColor);
  stem.setAttribute('stroke', shadeColor(stemColor, -20));
  stem.setAttribute('stroke-width', '2');
  g.appendChild(stem);

  // Face (eyes, nose, mouth) per variant
  const faceGroup = document.createElementNS(svgNS, 'g');
  if (glow) faceGroup.setAttribute('filter', 'url(#pumpkinGlow)');
  faceGroup.setAttribute('fill', glow ? glowColor : '#111');
  faceGroup.setAttribute('stroke', '#000');
  faceGroup.setAttribute('stroke-width', '2');

  const variants = buildFaceVariants();
  const chosen = variants[face] || variants.classic;
  chosen.forEach(pathD => {
    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', pathD);
    faceGroup.appendChild(p);
  });
  g.appendChild(faceGroup);

  svg.appendChild(g);
  target.appendChild(svg);
  return svg;
}

/** Build face path data variants */
function buildFaceVariants() {
  return {
    classic: [
      // Eyes
      'M75 95 L95 75 L105 110 Z',
      'M145 95 L125 75 L115 110 Z',
      // Nose
      'M108 120 L115 105 L122 120 Z',
      // Mouth
      'M70 140 C90 165 130 165 150 140 L145 150 C128 170 92 170 75 150 Z'
    ],
    smile: [
      'M80 95 Q95 75 110 95 Q95 85 80 95 Z',
      'M140 95 Q125 75 110 95 Q125 85 140 95 Z',
      'M108 120 L115 105 L122 120 Z',
      'M75 140 Q110 175 145 140 Q140 150 130 157 Q110 168 90 157 Q80 150 75 140 Z'
    ],
    spooky: [
      'M70 100 L95 70 L110 115 Z',
      'M150 100 L125 70 L110 115 Z',
      'M108 118 L115 103 L122 118 Z',
      'M65 140 L155 140 L150 150 L140 155 L130 150 L120 155 L110 150 L100 155 L90 150 L80 155 L70 150 Z'
    ]
  };
}

/** Simple color shade helper (positive percent lightens, negative darkens) */
function shadeColor(hex, percent) {
  if (!/^#?[0-9a-f]{6}$/i.test(hex)) return hex; // bail if not 6-char hex
  const h = hex.replace('#', '');
  const num = parseInt(h, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  const amt = Math.round(2.55 * percent);
  r = Math.min(255, Math.max(0, r + amt));
  g = Math.min(255, Math.max(0, g + amt));
  b = Math.min(255, Math.max(0, b + amt));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Optional auto-mount helper for quick demos: if an element with id 'pumpkin-root' exists, mount one.
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const auto = document.getElementById('pumpkin-root');
    if (auto) {
      createPumpkin(auto, { face: 'classic', glow: true });
    }
  });
}

export default createPumpkin;
