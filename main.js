(() => {
  "use strict";

  const D = window.SITE_DATA || {};
  const P = D.profile || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rand = (a, b) => a + Math.random() * (b - a);

  const ICONS = {
    email: { vb: "0 0 24 24", d: "M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
    scholar: { vb: "0 0 24 24", d: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" },
    github: { vb: "0 0 16 16", d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" },
    twitter: { vb: "0 0 24 24", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
    linkedin: { vb: "0 0 24 24", d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" },
    cv: { vb: "0 0 24 24", d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 12h8v2H8zm0 4h8v2H8z" },
    link: { vb: "0 0 24 24", d: "M3.9 12a3.1 3.1 0 013.1-3.1h4V7H7a5 5 0 000 10h4v-1.9H7A3.1 3.1 0 013.9 12zM8 13h8v-2H8v2zm9-6h-4v1.9h4a3.1 3.1 0 010 6.2h-4V17h4a5 5 0 000-10z" }
  };
  const LINK_LABELS = { email: "Email", scholar: "Google Scholar", github: "GitHub", twitter: "X", linkedin: "LinkedIn", cv: "CV" };
  const PUB_LABELS = { paper: "Paper", arxiv: "arXiv", code: "Code", project: "Project", slides: "Slides", video: "Video", bibtex: "BibTeX", poster: "Poster" };

  const icon = (key) => {
    const i = ICONS[key] || ICONS.link;
    return `<svg viewBox="${i.vb}" aria-hidden="true" focusable="false"><path d="${i.d}"/></svg>`;
  };

  const hideSection = (id) => {
    const s = document.getElementById(id);
    if (s) s.hidden = true;
    const a = $(`.nav nav a[href="#${id}"]`);
    if (a) a.hidden = true;
  };

  /* ---------- Hero ---------- */
  function renderHero() {
    const name = P.name || "Your Name";
    const lines = P.nameLines && P.nameLines.length ? P.nameLines : name.split(/\s+/);
    document.title = P.nameZh ? `${name} (${P.nameZh})` : name;
    $("#brand").textContent = name;

    const h1 = $("#neon-name");
    h1.setAttribute("aria-label", name);
    h1.innerHTML = lines
      .map((line) => `<span class="line" aria-hidden="true">${[...line]
        .map((c) => (c === " " ? '<span class="sp"> </span>' : `<span class="ch">${c}</span>`))
        .join("")}</span>`)
      .join("");

    const role = [P.title, P.affiliation].filter(Boolean).join(" · ");
    const roleEl = $("#role");
    if (role) roleEl.innerHTML = role; else roleEl.hidden = true;

    const bioEl = $("#bio");
    const bio = (P.bio || []).map((p) => `<p>${p}</p>`).join("");
    if (bio) bioEl.innerHTML = bio; else bioEl.hidden = true;

    const intEl = $("#interests");
    const interests = P.interests || [];
    if (interests.length) intEl.innerHTML = interests.map((t) => `<span class="tag">${t}</span>`).join("");
    else intEl.hidden = true;

    const collabEl = $("#collab");
    const collabs = P.collaborators || [];
    if (collabs.length) {
      collabEl.innerHTML = `<span class="label">Research Collaborators</span>${collabs
        .map((c) => (c.url
          ? `<a class="collab-item" href="${c.url}" target="_blank" rel="noopener">${c.name}</a>`
          : `<span class="collab-item">${c.name}</span>`))
        .join("")}`;
    } else collabEl.hidden = true;

    const linksEl = $("#links");
    const links = Object.entries(P.links || {})
      .filter(([, v]) => v)
      .map(([k, v]) => {
        const href = k === "email" ? `mailto:${v}` : v;
        const ext = k === "email" ? "" : ' target="_blank" rel="noopener"';
        return `<a class="chip-link" href="${href}"${ext}>${icon(k)}<span>${LINK_LABELS[k] || k}</span></a>`;
      })
      .join("");
    if (links) linksEl.innerHTML = links; else linksEl.hidden = true;
  }

  /* ---------- Neon sign flicker ---------- */
  function setupNeon() {
    const h1 = $("#neon-name");
    const chars = $$(".ch", h1);
    if (!chars.length || reduceMotion) return;

    const faulty = chars[Math.floor(rand(0.45, 0.95) * chars.length) % chars.length];
    faulty.classList.add("faulty");

    const timers = new WeakMap();
    const flicker = (el, pulses) => {
      if (timers.get(el)) return;
      let t = 0;
      for (let i = 0; i < pulses; i++) {
        const off = rand(30, 140);
        const on = rand(35, 190);
        setTimeout(() => el.classList.add("off"), t);
        t += off;
        setTimeout(() => el.classList.remove("off"), t);
        t += on;
      }
      timers.set(el, true);
      setTimeout(() => timers.delete(el), t);
    };

    chars.forEach((c) => c.classList.add("off"));
    h1.classList.add("powering");
    chars.forEach((c) => setTimeout(() => flicker(c, 1 + Math.floor(rand(0, 3))), rand(150, 1100)));
    setTimeout(() => {
      chars.forEach((c) => c.classList.remove("off"));
      h1.classList.remove("powering");
    }, 2200);

    const loop = () => {
      if (!document.hidden) {
        const r = Math.random();
        if (r < 0.12) {
          h1.classList.add("brownout");
          setTimeout(() => h1.classList.remove("brownout"), rand(70, 190));
        } else if (r < 0.7) {
          flicker(faulty, 2 + Math.floor(rand(0, 4)));
        } else {
          flicker(chars[Math.floor(Math.random() * chars.length)], 1 + Math.floor(rand(0, 2)));
        }
      }
      setTimeout(loop, rand(1600, 5200));
    };
    setTimeout(loop, 2600);
  }

  /* ---------- Timelines ---------- */
  function renderTimeline(sectionId, items) {
    if (!items || !items.length) return hideSection(sectionId);
    $(`#${sectionId} .timeline`).innerHTML = items
      .map((it) => `
        <li class="tl-item reveal${it.current ? " current" : ""}">
          <span class="tl-dot" aria-hidden="true"></span>
          <div class="tl-card panel">
            <div class="tl-head">
              <h3>${it.url ? `<a href="${it.url}" target="_blank" rel="noopener">${it.title}</a>` : it.title}</h3>
              <span class="tl-period">${it.period || ""}</span>
            </div>
            ${it.subtitle ? `<p class="tl-sub">${it.subtitle}</p>` : ""}
            ${(it.details || []).length ? `<ul class="tl-details">${it.details.map((d) => `<li>${d}</li>`).join("")}</ul>` : ""}
          </div>
        </li>`)
      .join("");
  }

  /* ---------- Publications ---------- */
  function renderPublications() {
    const pubs = D.publications || [];
    if (!pubs.length) return hideSection("publications");

    const list = $("#pub-list");
    const filters = $("#pub-filters");
    const me = [].concat(P.highlightName || P.name || []).filter(Boolean);
    const hasSelected = pubs.some((p) => p.selected);
    let mode = hasSelected ? "selected" : "all";
    if (!hasSelected) filters.hidden = true;

    const notes = [];
    if (P.links && P.links.scholar) {
      notes.push(`For the complete, regularly updated publication list, see <a href="${P.links.scholar}" target="_blank" rel="noopener">Google Scholar ↗</a>.`);
    }
    const marks = [];
    if (pubs.some((p) => /\*/.test(p.authors || ""))) marks.push("* Equal contribution.");
    if (pubs.some((p) => /†/.test(p.authors || ""))) marks.push("† Corresponding author.");
    if (marks.length) notes.push(marks.join(" "));
    $("#pub-note").innerHTML = notes.join("<br>");

    const fmtAuthors = (s) => me.reduce((acc, n) => acc.split(n).join(`<span class="me">${n}</span>`), s || "");

    const card = (p) => {
      const href = p.links && (p.links.paper || p.links.arxiv);
      const title = href ? `<a href="${href}" target="_blank" rel="noopener">${p.title}</a>` : p.title;
      const side = p.image
        ? `<img class="pub-thumb" src="${p.image}" alt="" loading="lazy">`
        : `<div class="pub-badge">${p.venueShort || p.venue || ""}${p.year ? `<small>${p.year}</small>` : ""}</div>`;
      const tags = (p.tags || []).map((t) => `<span class="tag hl">${t}</span>`).join("");
      const links = Object.entries(p.links || {})
        .filter(([, v]) => v)
        .map(([k, v]) => `<a class="btn-sm" href="${v}" target="_blank" rel="noopener">${PUB_LABELS[k] || k}</a>`)
        .join("");
      return `
        <article class="pub panel reveal">
          ${side}
          <div class="pub-body">
            <h3>${title}</h3>
            <p class="authors">${fmtAuthors(p.authors)}</p>
            <p class="venue"><em>${p.venue || ""}</em>${p.date || p.year ? `, ${p.date || p.year}` : ""}</p>
            ${tags || links ? `<div class="pub-links">${tags}${links}</div>` : ""}
          </div>
        </article>`;
    };

    const draw = () => {
      if (mode === "selected") {
        list.innerHTML = pubs.filter((p) => p.selected).map(card).join("");
      } else {
        const groups = new Map();
        pubs.forEach((p) => {
          const y = p.year || "Other";
          if (!groups.has(y)) groups.set(y, []);
          groups.get(y).push(p);
        });
        const years = [...groups.keys()].sort((a, b) => (a === "Other" ? 1 : b === "Other" ? -1 : b - a));
        list.innerHTML = years.map((y) => `<h3 class="year-label">${y}</h3>${groups.get(y).map(card).join("")}`).join("");
      }
      $$("button[data-mode]", filters).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
      observeReveal(list);
    };

    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-mode]");
      if (!b || b.dataset.mode === mode) return;
      mode = b.dataset.mode;
      draw();
    });
    draw();
  }

  /* ---------- Service & footer ---------- */
  function renderService() {
    const items = D.service || [];
    if (!items.length) {
      if (!D.serviceEmptyText) return hideSection("service");
      $("#service-list").outerHTML = `<p class="empty">${D.serviceEmptyText}</p>`;
      return;
    }
    $("#service-list").innerHTML = items
      .map((r) => `<div class="svc-row"><dt>${r.role}</dt><dd>${r.items}</dd></div>`)
      .join("");
  }

  function renderFooter() {
    const name = [P.name, P.nameZh].filter(Boolean).join(" ");
    $("#footer").innerHTML = `© ${new Date().getFullYear()} ${name}${D.updated ? ` · Updated ${D.updated}` : ""}`;
  }

  function renumberSections() {
    $$("main > .section").filter((s) => !s.hidden).forEach((s, i) => {
      const idx = $(".sec-idx", s);
      if (idx) idx.textContent = String(i + 1).padStart(2, "0");
    });
  }

  /* ---------- Reveal on scroll ---------- */
  let revealObserver;
  function observeReveal(root = document) {
    const items = $$(".reveal:not(.visible)", root);
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((e) => e.classList.add("visible"));
      return;
    }
    revealObserver = revealObserver || new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          revealObserver.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach((e) => revealObserver.observe(e));
  }

  /* ---------- Nav ---------- */
  function setupNav() {
    const nav = $("#nav");
    const toggle = $(".nav-toggle");
    const close = () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", String(nav.classList.toggle("open"))));
    $$(".nav nav a").forEach((a) => a.addEventListener("click", close));

    const links = new Map($$(".nav nav a").map((a) => [a.getAttribute("href").slice(1), a]));
    if ("IntersectionObserver" in window) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.classList.remove("active"));
          links.get(en.target.id).classList.add("active");
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      $$("main > section").filter((s) => !s.hidden && links.has(s.id)).forEach((s) => spy.observe(s));
    }

    const toTop = $("#to-top");
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 40);
      toTop.classList.toggle("show", y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  }

  renderHero();
  renderTimeline("education", D.education);
  renderTimeline("research", D.research);
  renderPublications();
  renderService();
  renderFooter();
  renumberSections();
  setupNav();
  observeReveal();
  setupNeon();
})();
