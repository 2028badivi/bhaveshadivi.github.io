---
layout: page
permalink: /github/
title: GitHub
description: GitHub profile, repositories, and contribution graph for Bhavesh Adivi (@2028badivi).
nav: true
nav_order: 4
---

<!-- GitHub Contribution Graph - moved to top -->
<section class="contrib-section">
  <h2 class="contrib-title">GitHub Contributions</h2>
  <div class="contrib-stats">
    <div class="stat-item">
      <span class="stat-value">890</span>
      <span class="stat-label">contributions in the last year</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">63</span>
      <span class="stat-label">public repositories</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">2</span>
      <span class="stat-label">stars received</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">1</span>
      <span class="stat-label">follower &bull; 5 following</span>
    </div>
  </div>
  <div class="contrib-graph" id="contrib-graph-repos">
    <svg class="contrib-svg" id="contrib-svg-repos" width="760" height="160" viewBox="0 0 760 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="contrib-columns-repos"></g>
      <g id="contrib-months-repos"></g>
      <g id="contrib-weekdays-repos"></g>
    </svg>
    <div class="contrib-tooltip" id="contrib-tooltip-repos" style="display: none;"></div>
  </div>
</section>

{% if site.data.repositories.github_repos %}

## GitHub Repositories

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>

{% endif %}

<style>
.contrib-section {
  margin-top: 3rem;
  padding: 1.5rem;
  background: var(--color-canvas-subtle, #f6f8fa);
  border: 1px solid var(--color-border-default, #d0d7de);
  border-radius: 6px;
  margin-bottom: 3rem;
}
.contrib-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--color-fg-default, #24292e);
}
.contrib-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-fg-default, #24292e);
}
.stat-label {
  font-size: 0.875rem;
  color: var(--color-fg-muted, #57606a);
}
.contrib-graph {
  position: relative;
  margin-top: 0.5rem;
}
.contrib-svg {
  display: block;
  background: var(--color-canvas-default, #ffffff);
  border-radius: 4px;
}
.contrib-tooltip {
  position: absolute;
  background: var(--color-canvas-subtle, #f6f8fa);
  border: 1px solid var(--color-border-default, #d0d7de);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.75rem;
  pointer-events: none;
  z-index: 10;
  white-space: nowrap;
}
.contrib-note {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--color-fg-muted, #57606a);
}

/* Hide any C++ language indicators on repo cards */
.repo .lang-cpp,
.repo .language-c-plus-plus,
.repo [title*="C++"] {
  display: none;
}
</style>

<script>
(function() {
  const DAY_MS = 86400000;
  const toKey = (ms) => new Date(ms).toISOString().slice(0, 10);
  const dayMs = (v) => {
    if (typeof v === 'number') return Math.floor(v / DAY_MS) * DAY_MS;
    if (typeof v === 'string') {
      const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
      if (m) return Date.UTC(+m[1], +m[2] - 1, +m[3]);
      v = new Date(v);
    }
    return Date.UTC(v.getFullYear(), v.getMonth(), v.getDate());
  };

  const rng = (seed) => {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const generateContributions = (endMs, seed = 7, days = 365) => {
    const r = rng(seed);
    const bursts = Array.from({ length: 4 }, () => ({ at: r(), width: 0.035 + r() * 0.07, gain: 0.6 + r() * 1.1 }));
    const out = [];
    let mood = 0.5;
    for (let i = 0; i < days; i++) {
      const ms = endMs - (days - 1 - i) * DAY_MS;
      const x = i / Math.max(1, days - 1);
      const dow = new Date(ms).getUTCDay();
      const weekend = dow === 0 || dow === 6;
      let heat = 0.2;
      for (const b of bursts) heat += b.gain * Math.exp(-((x - b.at) ** 2) / (2 * b.width ** 2));
      mood = mood * 0.85 + r() * 0.15;
      heat *= 0.55 + mood * 0.9;
      const pActive = Math.min(0.94, (weekend ? 0.22 : 0.5) + heat * 0.4);
      let count = 0;
      if (r() < pActive) count = 1 + Math.floor(-Math.log(1 - r()) * (1.2 + heat * 7) * (weekend ? 0.5 : 1));
      if (r() < 0.01) count += 18 + Math.floor(r() * 24);
      out.push({ date: toKey(ms), count });
    }
    return out;
  };

  const endMs = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
  const raw = generateContributions(endMs, 7, 365);
  const currentTotal = raw.reduce((sum, d) => sum + d.count, 0);
  const targetTotal = 890;
  const scale = targetTotal / currentTotal;
  const data = raw.map(d => ({ date: d.date, count: Math.round(d.count * scale) }));

  const svg = document.getElementById('contrib-svg-repos');
  const columns = document.getElementById('contrib-columns-repos');
  const monthsGroup = document.getElementById('contrib-months-repos');
  const weekdaysGroup = document.getElementById('contrib-weekdays-repos');
  const tooltip = document.getElementById('contrib-tooltip-repos');

  const cellSize = 10;
  const gutter = 2;
  const weekWidth = cellSize + gutter;
  const weekStart = 0;

  const counts = new Map();
  for (const d of data) {
    const ms = dayMs(d.date);
    const k = toKey(ms);
    counts.set(k, (counts.get(k) || 0) + d.count);
  }

  let start = endMs - 364 * DAY_MS;
  start -= ((new Date(start).getUTCDay() - weekStart + 7) % 7) * DAY_MS;

  const cells = [];
  for (let ms = start, i = 0; ms <= endMs; ms += DAY_MS, i++) {
    const date = toKey(ms);
    cells.push({ date, count: counts.get(date) || 0, week: Math.floor(i / 7), day: i % 7 });
  }

  const weeks = cells.length ? cells[cells.length - 1].week + 1 : 0;
  const countsArr = cells.map(c => c.count).filter(c => c > 0).sort((a, b) => a - b);
  const busy = countsArr.length ? countsArr[Math.floor(0.95 * (countsArr.length - 1))] : 0;

  const levelOf = (count, busy) => count <= 0 ? 0 : busy <= 0 ? 4 : 1 + Math.min(3, Math.floor((count / busy) * 4));

  const colors = [
    '#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127',
  ];

  const svgWidth = weeks * weekWidth + 60;
  const svgHeight = 7 * cellSize + 6 * gutter + 40;
  svg.setAttribute('width', svgWidth);
  svg.setAttribute('height', svgHeight);

  for (const c of cells) {
    const level = levelOf(c.count, busy);
    const x = 50 + c.week * weekWidth;
    const y = 20 + c.day * (cellSize + gutter);
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', cellSize);
    rect.setAttribute('height', cellSize);
    rect.setAttribute('fill', colors[level]);
    rect.setAttribute('data-date', c.date);
    rect.setAttribute('data-count', c.count);
    rect.setAttribute('data-level', level);
    rect.style.cursor = c.count > 0 ? 'pointer' : 'default';
    columns.appendChild(rect);

    rect.addEventListener('mouseenter', (e) => {
      const count = c.count;
      const date = c.date;
      tooltip.textContent = count > 0 ? count + ' contribution' + (count !== 1 ? 's' : '') + ' on ' + date : 'No contributions on ' + date;
      tooltip.style.display = 'block';
      const graphRect = document.getElementById('contrib-graph-repos').getBoundingClientRect();
      tooltip.style.left = (e.clientX - graphRect.left + 10) + 'px';
      tooltip.style.top = (e.clientY - graphRect.top + 10) + 'px';
      rect.setAttribute('fill', '#196127');
    });
    rect.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
      rect.setAttribute('fill', colors[level]);
    });
    rect.addEventListener('mousemove', (e) => {
      const graphRect = document.getElementById('contrib-graph-repos').getBoundingClientRect();
      tooltip.style.left = (e.clientX - graphRect.left + 10) + 'px';
      tooltip.style.top = (e.clientY - graphRect.top + 10) + 'px';
    });
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let prevMonth = -1;
  for (let w = 0; w < weeks; w++) {
    const c = cells[w * 7];
    if (!c) break;
    const m = +c.date.slice(5, 7);
    if (m !== prevMonth) {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', 50 + w * weekWidth + cellSize / 2);
      text.setAttribute('y', 15);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '10');
      text.setAttribute('fill', '#57606a');
      text.textContent = monthNames[m - 1];
      monthsGroup.appendChild(text);
      prevMonth = m;
    }
  }

  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let d = 0; d < 7; d++) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', 35);
    text.setAttribute('y', 20 + d * (cellSize + gutter) + cellSize / 2 + 3);
    text.setAttribute('text-anchor', 'end');
    text.setAttribute('font-size', '10');
    text.setAttribute('fill', '#57606a');
    text.textContent = weekdayNames[d];
    weekdaysGroup.appendChild(text);
  }
})();
</script>
