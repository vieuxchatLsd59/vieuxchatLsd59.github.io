(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789ABCDEF<>/{}[]$#*+=-";

  /* ---------------------------------------------------------
     1. boot sequence
     --------------------------------------------------------- */

  const BOOT_LINES = [
    "[ OK ] montage du volume /dev/portfolio",
    "[ OK ] chargement du noyau web ......... html css js",
    "[ OK ] initialisation du terminal vert",
    "[ OK ] compilation des animations ...... 60 fps",
    "[  ] uplink loraWAN .................. chirpstack",
    "[ OK ] identité chargée : Ismael Berrazzag",
    "[ OK ] prêt.",
  ];

  function boot() {
    const body = document.body;
    if (REDUCED) {
      body.classList.remove("is-booting");
      return;
    }
    const log = $("#bootLog");
    let i = 0;
    const tick = () => {
      log.textContent = BOOT_LINES.slice(0, i).join("\n");
      if (i < BOOT_LINES.length) {
        i += 1;
        setTimeout(tick, 150 + Math.random() * 160);
      } else {
        setTimeout(() => body.classList.remove("is-booting"), 320);
      }
    };
    tick();
  }

  /* ---------------------------------------------------------
     2. pluie de code (matrix)
     --------------------------------------------------------- */

  function rain() {
    const cv = $("#rain");
    if (!cv || REDUCED) return;
    const ctx = cv.getContext("2d");
    let w = 0;
    let h = 0;
    let size = 15;
    let cols = 0;
    let drops = [];
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = w < 640 ? 13 : 16;
      cols = Math.ceil(w / size);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
    };

    const frame = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `700 ${size}px "JetBrains Mono", monospace`;
      for (let c = 0; c < cols; c++) {
        const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        const y = drops[c] * size;
        if (y > 0 && y < h + size) {
          ctx.fillStyle = "rgba(0, 255, 156, 0.55)";
          ctx.fillText(ch, c * size, y);
          ctx.fillStyle = "rgba(190, 255, 225, 0.85)";
          ctx.fillText(ch, c * size, y - size);
        }
        if (y > h + Math.random() * 120) drops[c] = 0;
        drops[c] += 0.55;
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    addEventListener("resize", resize, { passive: true });
    frame();

    addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else frame();
    });
  }

  /* ---------------------------------------------------------
     3. typewriter
     --------------------------------------------------------- */

  const ROLES = [
    "développeur front-end",
    "et embarqué — esp32, lora, capteurs",
    "je fabrique des interfaces qui vivent",
    "css tous les jours, javascript dès que ça bouge",
    "canvas 2d · 0 image · 60 fps",
    "en train d'apprendre le css sur tryhackme",
  ];

  const FULL_NAME = "ISMAEL BERRAZZAG";

  function typeName() {
    const el = $("#typedName");
    if (!el) return;
    if (REDUCED) {
      el.textContent = FULL_NAME;
      return;
    }
    let i = 0;
    const step = () => {
      i += 1;
      el.textContent = FULL_NAME.slice(0, i);
      if (i < FULL_NAME.length) {
        setTimeout(step, 55 + Math.random() * 70);
      }
    };
    el.textContent = "";
    step();
  }

  function typewriter() {
    const el = $("#typed");
    if (!el) return;
    if (REDUCED) {
      el.textContent = ROLES[0];
      return;
    }
    let r = 0;
    let c = 0;
    let erasing = false;

    const step = () => {
      const word = ROLES[r];
      el.textContent = word.slice(0, c);

      let delay = erasing ? 28 : 52;
      if (Math.random() < 0.04) delay += 220;

      if (!erasing && c === word.length) {
        erasing = true;
        delay = 1700;
      } else if (erasing && c === 0) {
        erasing = false;
        r = (r + 1) % ROLES.length;
      } else {
        c += erasing ? -1 : 1;
      }
      setTimeout(step, delay);
    };

    step();
  }

  /* ---------------------------------------------------------
     4. reveal au scroll + compteurs
     --------------------------------------------------------- */

  function countUp(el) {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    if (REDUCED) {
      el.textContent = target + suffix;
      return;
    }
    const dur = 1200;
    const t0 = performance.now();
    const run = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }

  function reveals() {
    const items = $$(".reveal");
    if (REDUCED || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      $$("[data-count]").forEach(countUp);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          $$("[data-count]", entry.target).forEach(countUp);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------
     5. curseur
     --------------------------------------------------------- */

  function cursor() {
    if (matchMedia("(hover: none)").matches) return;
    const dot = $(".cursor__dot");
    const box = $(".cursor");
    const label = $(".cursor__label");
    if (!box || !dot || !label) return;

    let tx = innerWidth / 2;
    let ty = innerHeight / 2;
    let x = tx;
    let y = ty;

    addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const hot = e.target.closest("a, button, .project, .card, input");
      box.classList.toggle("is-hot", Boolean(hot));
      if (hot) label.textContent = hot.dataset.cursor || "open";
    }, { passive: true });

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      box.style.transform = "translate3d(0,0,0)";
      requestAnimationFrame(loop);
    };
    loop();

    addEventListener("mousedown", () => (box.style.opacity = "0.5"));
    addEventListener("mouseup", () => (box.style.opacity = "1"));
  }

  /* ---------------------------------------------------------
     6. terminal jouable
     --------------------------------------------------------- */

  const COMMANDS = {
    help() {
      return [
        "commandes disponibles :",
        "  help        cette liste",
        "  whoami      qui je suis",
        "  about       présentation courte",
        "  skills      mes compétences",
        "  projects    mes projets",
        "  github      lien github",
        "  mail        lien mailto",
        "  ls          liste les fichiers",
        "  cat about   à propos",
        "  clear       efface l'écran",
      ].join("\n");
    },
    whoami() {
      return "ismaelberrazzag  (vieuxchatLsd59) — dev front-end & embarqué";
    },
    about() {
      return [
        "Ismael Berrazzag, développeur front-end et embarqué.",
        "Côté web : le CSS, le temps réel, les interfaces qui vivent.",
        "Côté carte : ESP32, GPS, capteurs, radio LoRaWAN.",
        "J'apprends en ligne (html / css sur tryhackme) et je construis",
        "des projets de bout en bout pour appliquer chaque notion.",
      ].join("\n");
    },
    skills() {
      return [
        "html5 sémantique ...... ████████░░  85 %",
        "css moderne ........... █████████░  90 %",
        "javascript dom ........ ███████░░░  70 %",
        "canvas 2d ............. ██████░░░░  65 %",
        "git & github .......... ███████░░░  75 %",
        "ui / ux ............... ██████░░░░  60 %",
        "c++ / arduino ......... ████████░░  80 %",
        "esp32 / platformio .... ███████░░░  75 %",
        "iot / lorawan ......... ██████░░░░  65 %",
      ].join("\n");
    },
    projects() {
      return [
        "[1] PARTICULA   moteur de particules temps réel en canvas 2d",
        "[2] KITERIDER   kit de suivi kitesurf : balise gps + station",
        "              météo, 2 x t-beam, loraWAN → chirpstack",
        "[3] PROJET_03   emplacement réservé",
        "",
        "détails : voir la section #projets",
      ].join("\n");
    },
    ls() {
      return "about.txt  skills.json  projects/  kiterider/  contact.env";
    },
    cat(arg) {
      if (!arg) return "cat: argument manquant — essaie `cat about`";
      if (/about/i.test(arg)) return COMMANDS.about();
      if (/skills/i.test(arg)) return COMMANDS.skills();
      if (/projects/i.test(arg)) return COMMANDS.projects();
      if (/contact/i.test(arg)) return "mail: ismaelberrdbz@gmail.com\ngithub: github.com/vieuxchatLsd59";
      return `cat: ${arg}: aucun fichier de ce nom`;
    },
    github() {
      return "github : https://github.com/vieuxchatLsd59";
    },
    mail() {
      return "mail : ismaelberrdbz@gmail.com";
    },
    clear() {
      return null;
    },
  };

  function terminal() {
    const out = $("#termOut");
    const input = $("#termInput");
    const term = $("#term");
    if (!out || !input || !term) return;

    const print = (text, cls) => {
      const p = document.createElement("p");
      p.className = cls || "";
      p.textContent = text;
      out.appendChild(p);
    };

    const run = (raw) => {
      const line = raw.trim();
      print(`vieuxchatLsd59@portfolio:~$ ${line}`, "c-str");
      if (line) {
        const [cmd, ...args] = line.split(/\s+/);
        const fn = COMMANDS[cmd.toLowerCase()];
        if (!fn) {
          print(`${cmd}: commande introuvable — tapez \`help\`.`, "c-dim");
        } else if (cmd.toLowerCase() === "clear") {
          out.textContent = "";
        } else {
          print(fn(args.join(" ")));
        }
      }
      term.scrollTop = term.scrollHeight;
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        const v = input.value.trim().toLowerCase();
        const match = Object.keys(COMMANDS).find((c) => c.startsWith(v));
        if (match) input.value = match + (match === "cat" ? " " : "");
        e.preventDefault();
        return;
      }
      if (e.key !== "Enter") return;
      run(input.value);
      input.value = "";
    });

    term.addEventListener("click", (e) => {
      if (e.target === term || e.target.closest(".term__out")) input.focus();
    });

    print("bienvenue. tapez \`help\` pour la liste des commandes.", "c-dim");
  }

  /* ---------------------------------------------------------
     7. horloge
     --------------------------------------------------------- */

  function clock() {
    const el = $("#clock");
    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());
    if (!el) return;
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const d = new Date();
      el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------
     go
     --------------------------------------------------------- */

  const start = () => {
    clock();
    terminal();
    cursor();
    reveals();
    rain();
    typewriter();
    setTimeout(boot, 180);
    setTimeout(typeName, 1450);
  };

  if (document.readyState === "loading") {
    addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
