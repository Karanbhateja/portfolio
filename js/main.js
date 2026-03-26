// ─── Main JS ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════════════════════════════════════════
    // ── Typewriter (hero role) ────────────────────────────────────────────────
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
            if (cIdx === cur.length) { deleting = true; setTimeout(type, 1800); return; }
        } else {
            typer.textContent = cur.slice(0, --cIdx);
            if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
        }
        setTimeout(type, deleting ? 48 : 72);
    }
    if (typer) type();

    // ══════════════════════════════════════════════════════════════════════════
    // ── Hero Terminal — auto-type demo ────────────────────────────────────────
    // ══════════════════════════════════════════════════════════════════════════
    const htBody = document.getElementById('htBody');
    if (htBody) {
        // Lines to display: [type, text, delay_before_ms]
        const htScript = [
            { t: 'prompt', text: 'whoami', delay: 600 },
            { t: 'out',    text: '<span class="ht-green">► Name   :</span> <span style="color:#e2f2e2">Karan Bhateja</span>', delay: 80 },
            { t: 'out',    text: '<span class="ht-green">► Role   :</span> <span style="color:#e2f2e2">Cybersecurity Engineer</span>', delay: 60 },
            { t: 'out',    text: '<span class="ht-green">► Focus  :</span> <span style="color:#e2f2e2">Offensive Testing · Automation</span>', delay: 60 },
            { t: 'out',    text: '<span class="ht-green">► GitHub :</span> <span class="ht-cyan">github.com/karanbhateja</span>', delay: 60 },
            { t: 'blank',  text: '', delay: 80 },
            { t: 'prompt', text: 'skills --short', delay: 400 },
            { t: 'out',    text: '<span class="ht-dim">Languages  :</span> <span class="ht-green">Python · Bash · PowerShell</span>', delay: 70 },
            { t: 'out',    text: '<span class="ht-dim">Security   :</span> <span class="ht-green">Network · ISO 27001 · Automation</span>', delay: 70 },
            { t: 'out',    text: '<span class="ht-dim">Tools      :</span> <span class="ht-green">Nmap · Kali · Wireshark · SSH</span>', delay: 70 },
            { t: 'blank',  text: '', delay: 80 },
            { t: 'prompt', text: 'status', delay: 400 },
            { t: 'out',    text: '<span class="ht-green">● Available for opportunities</span>', delay: 70 },
            { t: 'blank',  text: '', delay: 120 },
        ];

        let htTimeout = null;

        function htTypeLine(text, onDone) {
            // Simulate typing character by character for the prompt
            let i = 0;
            const cursor = document.createElement('span');
            cursor.className = 'ht-cursor';
            const lineEl = document.createElement('div');
            lineEl.className = 'ht-line';
            const promptEl = document.createElement('span');
            promptEl.className = 'ht-prompt';
            promptEl.textContent = 'karan@portfolio:~$ ';
            const cmdEl = document.createElement('span');
            cmdEl.className = 'ht-cmd';
            lineEl.appendChild(promptEl);
            lineEl.appendChild(cmdEl);
            lineEl.appendChild(cursor);
            htBody.appendChild(lineEl);
            htBody.scrollTop = htBody.scrollHeight;

            function typeChar() {
                if (i < text.length) {
                    cmdEl.textContent += text[i++];
                    htBody.scrollTop = htBody.scrollHeight;
                    htTimeout = setTimeout(typeChar, 55 + Math.random() * 30);
                } else {
                    lineEl.removeChild(cursor);
                    htTimeout = setTimeout(onDone, 180);
                }
            }
            typeChar();
        }

        function htOutputLine(html) {
            const el = document.createElement('div');
            el.className = 'ht-line';
            el.innerHTML = html;
            htBody.appendChild(el);
            htBody.scrollTop = htBody.scrollHeight;
        }

        function runHtScript(idx) {
            if (idx >= htScript.length) {
                // Show idle cursor at end
                const idleLine = document.createElement('div');
                idleLine.className = 'ht-line';
                idleLine.innerHTML = '<span class="ht-prompt">karan@portfolio:~$ </span><span class="ht-cursor"></span>';
                htBody.appendChild(idleLine);
                return;
            }

            const step = htScript[idx];

            htTimeout = setTimeout(() => {
                if (step.t === 'prompt') {
                    htTypeLine(step.text, () => runHtScript(idx + 1));
                } else if (step.t === 'out') {
                    htOutputLine(step.text);
                    runHtScript(idx + 1);
                } else if (step.t === 'blank') {
                    htOutputLine('&nbsp;');
                    runHtScript(idx + 1);
                }
            }, step.delay);
        }

        // Start after a short boot delay
        htTimeout = setTimeout(() => runHtScript(0), 1200);
    }

    // ══════════════════════════════════════════════════════════════════════════
    // ── Scroll reveal + hero terminal fade ───────────────────────────────────
    // ══════════════════════════════════════════════════════════════════════════
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // Skill bar fill
    const skillObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.skill-fill').forEach(b => b.style.width = b.dataset.pct);
                skillObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.25 });
    document.querySelectorAll('.skills-section').forEach(el => skillObs.observe(el));

    // Hero terminal scroll-fade + scroll hint hide
    const heroTerminal = document.getElementById('heroTerminal');
    const scrollHint   = document.querySelector('.scroll-hint');
    const heroSect     = document.getElementById('home');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Hero terminal fades when user scrolls past ~30% of hero
        if (heroTerminal && heroSect) {
            const fadeStart = heroSect.offsetHeight * 0.25;
            const fadeEnd   = heroSect.offsetHeight * 0.6;
            if (scrollY > fadeStart) {
                const progress = Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
                heroTerminal.style.opacity   = 1 - progress;
                heroTerminal.style.transform = `translateY(${-progress * 20}px) scale(${1 - progress * 0.03})`;
            } else {
                heroTerminal.style.opacity   = '1';
                heroTerminal.style.transform = '';
            }
        }

        // Hide scroll hint after tiny scroll
        if (scrollHint) scrollHint.classList.toggle('hidden', scrollY > 60);

        // Active nav
        let cur = '';
        document.querySelectorAll('section[id]').forEach(s => {
            if (scrollY >= s.offsetTop - 130) cur = s.id;
        });
        document.querySelectorAll('.nav-link').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
        });

        // Navbar bg
        document.querySelector('.navbar').classList.toggle('scrolled', scrollY > 60);
    }, { passive: true });

    // ══════════════════════════════════════════════════════════════════════════
    // ── Mobile menu ──────────────────────────────────────────────────────────
    // ══════════════════════════════════════════════════════════════════════════
    const burger  = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');
    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        navMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                burger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ══════════════════════════════════════════════════════════════════════════
    // ── Glitch randomiser ────────────────────────────────────────────────────
    // ══════════════════════════════════════════════════════════════════════════
    document.querySelectorAll('.glitch').forEach(el => {
        el.dataset.text = el.textContent;
        setInterval(() => {
            el.classList.add('glitching');
            setTimeout(() => el.classList.remove('glitching'), 200);
        }, 4000 + Math.random() * 6000);
    });

    // ══════════════════════════════════════════════════════════════════════════
    // ── Custom Dual Cursor ────────────────────────────────────────────────────
    // ══════════════════════════════════════════════════════════════════════════
    const cursorDot   = document.getElementById('cursorDot');
    const cursorOuter = document.getElementById('cursorOuter');
    let mouseX = -100, mouseY = -100, outerX = -100, outerY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top  = mouseY + 'px';
        // Trail
        if (Math.random() > 0.9) {
            const t = document.createElement('div');
            t.className = 'cursor-trail';
            t.style.left = mouseX + 'px';
            t.style.top  = mouseY + 'px';
            document.body.appendChild(t);
            setTimeout(() => t.remove(), 500);
        }
    });

    (function animateOuter() {
        outerX += (mouseX - outerX) * 0.15;
        outerY += (mouseY - outerY) * 0.15;
        cursorOuter.style.left = outerX + 'px';
        cursorOuter.style.top  = outerY + 'px';
        requestAnimationFrame(animateOuter);
    })();

    const interactSel = 'a, button, input, [role="button"], .proj-link, .chip, .cmd-hint, .btn, .nav-link, .nav-term-btn, .contact-link, .term-dot, .project-card, .skill-card, .hero-terminal';
    document.addEventListener('mouseover', e => {
        if (e.target.closest(interactSel)) {
            cursorDot.classList.add('hovered');
            cursorOuter.classList.add('hovered');
        }
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(interactSel)) {
            cursorDot.classList.remove('hovered');
            cursorOuter.classList.remove('hovered');
        }
    });
    document.addEventListener('mousedown', () => cursorOuter.classList.add('clicking'));
    document.addEventListener('mouseup',   () => cursorOuter.classList.remove('clicking'));
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0'; cursorOuter.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1'; cursorOuter.style.opacity = '1';
    });

    // ══════════════════════════════════════════════════════════════════════════
    // ── Terminal Modal open / close ───────────────────────────────────────────
    // ══════════════════════════════════════════════════════════════════════════
    Terminal.init();

    // ── Smooth scroll ────────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });
});
