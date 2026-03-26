// ─── Main JS ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════════════════════════════════════════
    //  Typewriter (hero)
    // ══════════════════════════════════════════════════════════════════════════
    const phrases = [
        'Cybersecurity Engineer',
        'Automation & Tooling Developer',
        'Offensive Security Enthusiast',
        'Network Audit Specialist',
        'ISO 27001 Practitioner',
    ];
    let pIdx = 0, cIdx = 0, deleting = false;
    const typer = document.getElementById('typewriter');
    function type() {
        const cur = phrases[pIdx];
        if (!deleting) {
            typer.textContent = cur.slice(0, ++cIdx);
            if (cIdx === cur.length) { deleting = true; setTimeout(type, 1900); return; }
        } else {
            typer.textContent = cur.slice(0, --cIdx);
            if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
        }
        setTimeout(type, deleting ? 46 : 70);
    }
    if (typer) type();

    // ══════════════════════════════════════════════════════════════════════════
    //  Hero terminal — auto-type demo
    // ══════════════════════════════════════════════════════════════════════════
    const htBody = document.getElementById('htBody');
    if (htBody) {
        const steps = [
            { t: 'prompt', text: 'whoami',           delay: 800 },
            { t: 'out',    text: '<span class="ht-green">► Name   :</span> <span style="color:#ddeedd">Karan Bhateja</span>', delay: 70 },
            { t: 'out',    text: '<span class="ht-green">► Role   :</span> <span style="color:#ddeedd">Cybersecurity Engineer</span>', delay: 60 },
            { t: 'out',    text: '<span class="ht-green">► Focus  :</span> <span style="color:#ddeedd">Offensive Testing · Automation</span>', delay: 60 },
            { t: 'out',    text: '<span class="ht-green">► GitHub :</span> <span class="ht-cyan">github.com/karanbhateja</span>', delay: 60 },
            { t: 'blank',  text: '',                  delay: 80 },
            { t: 'prompt', text: 'skills --short',    delay: 420 },
            { t: 'out',    text: '<span class="ht-dim">Languages :</span> <span class="ht-green">Python · Bash · PowerShell</span>', delay: 65 },
            { t: 'out',    text: '<span class="ht-dim">Security  :</span> <span class="ht-green">Network · ISO 27001 · Automation</span>', delay: 65 },
            { t: 'out',    text: '<span class="ht-dim">Tools     :</span> <span class="ht-green">Nmap · Kali · Wireshark · SSH</span>', delay: 65 },
            { t: 'blank',  text: '',                  delay: 80 },
            { t: 'prompt', text: 'status',            delay: 400 },
            { t: 'out',    text: '<span class="ht-green">● Available for opportunities</span>', delay: 70 },
            { t: 'blank',  text: '',                  delay: 140 },
        ];

        function htAddLine(html) {
            const el = document.createElement('div');
            el.className = 'ht-line'; el.innerHTML = html;
            htBody.appendChild(el); htBody.scrollTop = htBody.scrollHeight;
        }

        function htTypeLine(text, done) {
            let i = 0;
            const wrap = document.createElement('div'); wrap.className = 'ht-line';
            const pEl  = document.createElement('span'); pEl.className = 'ht-prompt'; pEl.textContent = 'karan@portfolio:~$ ';
            const cEl  = document.createElement('span'); cEl.className = 'ht-cmd';
            const cur  = document.createElement('span'); cur.className = 'ht-cursor';
            wrap.append(pEl, cEl, cur);
            htBody.appendChild(wrap);
            function t() {
                if (i < text.length) { cEl.textContent += text[i++]; htBody.scrollTop = htBody.scrollHeight; setTimeout(t, 52 + Math.random() * 28); }
                else { wrap.removeChild(cur); setTimeout(done, 160); }
            }
            t();
        }

        function run(idx) {
            if (idx >= steps.length) {
                htAddLine('<span class="ht-prompt">karan@portfolio:~$ </span><span class="ht-cursor"></span>');
                return;
            }
            const s = steps[idx];
            setTimeout(() => {
                if (s.t === 'prompt')      htTypeLine(s.text, () => run(idx + 1));
                else if (s.t === 'out')  { htAddLine(s.text);  run(idx + 1); }
                else                     { htAddLine('&nbsp;');run(idx + 1); }
            }, s.delay);
        }
        setTimeout(() => run(0), 1300);
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  Scroll-driven effects
    // ══════════════════════════════════════════════════════════════════════════
    const heroTerminal = document.getElementById('heroTerminal');
    const scrollHint   = document.querySelector('.scroll-hint');
    const heroSect     = document.getElementById('home');
    const navbar       = document.querySelector('.navbar');
    const sections     = document.querySelectorAll('section[id]');
    const navLinks     = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Hero terminal fade
        if (heroTerminal && heroSect) {
            const start = heroSect.offsetHeight * 0.22;
            const end   = heroSect.offsetHeight * 0.55;
            const prog  = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
            heroTerminal.style.opacity   = 1 - prog;
            heroTerminal.style.transform = `translateY(${-prog * 18}px) scale(${1 - prog * 0.025})`;
        }

        // Scroll hint hide
        if (scrollHint) scrollHint.classList.toggle('hidden', scrollY > 70);

        // Navbar
        navbar.classList.toggle('scrolled', scrollY > 55);

        // Active nav
        let cur = '';
        sections.forEach(s => { if (scrollY >= s.offsetTop - 140) cur = s.id; });
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
    }, { passive: true });

    // ══════════════════════════════════════════════════════════════════════════
    //  Intersection Observer — reveals + skill bars
    // ══════════════════════════════════════════════════════════════════════════
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    const skillObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('.skill-fill').forEach(b => { b.style.width = b.dataset.pct; });
            skillObs.unobserve(e.target);
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.skills-section').forEach(el => skillObs.observe(el));

    // ══════════════════════════════════════════════════════════════════════════
    //  3D Card Tilt (project cards with data-tilt)
    // ══════════════════════════════════════════════════════════════════════════
    document.querySelectorAll('[data-tilt]').forEach(card => {
        const MAX = 6; // max degrees

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = (e.clientX - cx) / (rect.width  / 2);
            const dy   = (e.clientY - cy) / (rect.height / 2);
            const rotX = -dy * MAX;
            const rotY =  dx * MAX;
            card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.28,0.64,1), border-color 0.32s ease, box-shadow 0.32s ease';
            setTimeout(() => { card.style.transition = ''; }, 500);
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.12s ease, border-color 0.32s ease, box-shadow 0.32s ease';
        });
    });

    // ══════════════════════════════════════════════════════════════════════════
    //  Mobile menu
    // ══════════════════════════════════════════════════════════════════════════
    const burger  = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');
    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            navMenu.classList.toggle('open');
            burger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
        });
        navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            burger.classList.remove('open'); navMenu.classList.remove('open');
        }));
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  Glitch randomiser
    // ══════════════════════════════════════════════════════════════════════════
    document.querySelectorAll('.glitch').forEach(el => {
        el.dataset.text = el.textContent;
        setInterval(() => {
            el.classList.add('glitching');
            setTimeout(() => el.classList.remove('glitching'), 180);
        }, 5000 + Math.random() * 7000);
    });

    // ══════════════════════════════════════════════════════════════════════════
    //  Custom Dual Cursor
    // ══════════════════════════════════════════════════════════════════════════
    const dot   = document.getElementById('cursorDot');
    const outer = document.getElementById('cursorOuter');
    let mx = -200, my = -200, ox = -200, oy = -200;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px'; dot.style.top = my + 'px';
        // Sparse trail
        if (Math.random() > 0.91) {
            const t = document.createElement('div');
            t.className = 'cursor-trail';
            t.style.cssText = `left:${mx}px;top:${my}px`;
            document.body.appendChild(t);
            setTimeout(() => t.remove(), 500);
        }
    });
    (function lerpOuter() {
        ox += (mx - ox) * 0.13; oy += (my - oy) * 0.13;
        outer.style.left = ox + 'px'; outer.style.top = oy + 'px';
        requestAnimationFrame(lerpOuter);
    })();

    const interactSel = 'a,button,input,[role="button"],.chip,.cmd-hint,.proj-link,.contact-link,.project-card,.skill-card,.hero-terminal,.term-dot';
    document.addEventListener('mouseover', e => {
        if (e.target.closest(interactSel)) { dot.classList.add('hovered'); outer.classList.add('hovered'); }
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(interactSel)) { dot.classList.remove('hovered'); outer.classList.remove('hovered'); }
    });
    document.addEventListener('mousedown', () => outer.classList.add('clicking'));
    document.addEventListener('mouseup',   () => outer.classList.remove('clicking'));
    document.addEventListener('mouseleave', () => { dot.style.opacity='0'; outer.style.opacity='0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity='1'; outer.style.opacity='1'; });

    // ══════════════════════════════════════════════════════════════════════════
    //  Terminal + smooth scroll
    // ══════════════════════════════════════════════════════════════════════════
    Terminal.init();

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });
});
