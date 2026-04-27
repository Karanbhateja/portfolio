// ─── Main JS ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════════════════════════════════════════
    //  Typewriter (hero role)
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
        setTimeout(type, deleting ? 45 : 68);
    }
    if (typer) type();

    // ══════════════════════════════════════════════════════════════════════════
    //  Hero terminal — auto-type
    // ══════════════════════════════════════════════════════════════════════════
    const htBody = document.getElementById('htBody');
    if (htBody) {
        const steps = [
            { t:'prompt', text:'whoami',        delay:900 },
            { t:'out', text:'<span class="ht-green">► Name   :</span> <span style="color:#e8f5ee">Karan Bhateja</span>', delay:70 },
            { t:'out', text:'<span class="ht-green">► Role   :</span> <span style="color:#e8f5ee">Cybersecurity Engineer</span>', delay:60 },
            { t:'out', text:'<span class="ht-green">► Focus  :</span> <span style="color:#e8f5ee">Offensive Testing · Automation</span>', delay:60 },
            { t:'out', text:'<span class="ht-green">► GitHub :</span> <span class="ht-cyan">github.com/karanbhateja</span>', delay:60 },
            { t:'blank', text:'', delay:80 },
            { t:'prompt', text:'skills --short', delay:420 },
            { t:'out', text:'<span class="ht-dim">Languages :</span> <span class="ht-green">Python · Bash · PowerShell</span>', delay:65 },
            { t:'out', text:'<span class="ht-dim">Security  :</span> <span class="ht-green">Network · ISO 27001 · Automation</span>', delay:65 },
            { t:'out', text:'<span class="ht-dim">Tools     :</span> <span class="ht-green">Nmap · Kali · Wireshark · SSH</span>', delay:65 },
            { t:'blank', text:'', delay:80 },
            { t:'prompt', text:'status',         delay:380 },
            { t:'out', text:'<span class="ht-green">● Available for opportunities</span>', delay:70 },
            { t:'blank', text:'', delay:140 },
        ];

        function htAddLine(html) {
            const el = document.createElement('div');
            el.className='ht-line'; el.innerHTML=html;
            htBody.appendChild(el); htBody.scrollTop=htBody.scrollHeight;
        }
        function htTypeLine(text, done) {
            let i=0;
            const wrap=document.createElement('div'); wrap.className='ht-line';
            const pEl=document.createElement('span'); pEl.className='ht-prompt'; pEl.textContent='karan@portfolio:~$ ';
            const cEl=document.createElement('span'); cEl.className='ht-cmd';
            const cur=document.createElement('span'); cur.className='ht-cursor';
            wrap.append(pEl,cEl,cur); htBody.appendChild(wrap);
            function t(){
                if(i<text.length){cEl.textContent+=text[i++]; htBody.scrollTop=htBody.scrollHeight; setTimeout(t,50+Math.random()*26);}
                else{wrap.removeChild(cur); setTimeout(done,160);}
            }
            t();
        }

        // After the intro sequence, attach a live input row
        let htActiveInput = null;
        const heroTermEl = document.getElementById('heroTerminal');
        if (heroTermEl) {
            heroTermEl.addEventListener('click', () => { if (htActiveInput) htActiveInput.focus(); });
        }

        function htActivateLive() {
            // Input row lives inside htBody as the last child — never removed
            const row = document.createElement('div');
            row.className = 'ht-input-row';
            const pEl = document.createElement('span');
            pEl.className = 'ht-prompt'; pEl.textContent = 'karan@portfolio:~$ ';
            const inp = document.createElement('input');
            inp.type = 'text'; inp.className = 'ht-input'; inp.autocomplete = 'off';
            inp.spellcheck = false; inp.setAttribute('aria-label', 'terminal input');
            row.append(pEl, inp);
            htBody.appendChild(row);
            htActiveInput = inp;

            Terminal.createTerminal({
                outputEl:  htBody,
                cls:       'ht-line',
                promptStr: 'karan@portfolio:~$',
                anchorEl:  row,   // output always inserts before this row
                onClear:   () => {
                    // remove all output lines, keep the input row
                    Array.from(htBody.children).forEach(c => { if (c !== row) c.remove(); });
                },
                onClose:   () => Terminal.openTerminal(),
            }).attachInput(inp);
        }

        function run(idx){
            if(idx>=steps.length){ htActivateLive(); return; }
            const s=steps[idx];
            setTimeout(()=>{
                if(s.t==='prompt')     htTypeLine(s.text,()=>run(idx+1));
                else if(s.t==='out') { htAddLine(s.text); run(idx+1); }
                else                 { htAddLine('&nbsp;'); run(idx+1); }
            }, s.delay);
        }
        setTimeout(()=>run(0), 1400);
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  Animated stat counters
    // ══════════════════════════════════════════════════════════════════════════
    function animateCounter(el, target, suffix='', duration=1800) {
        let start = null;
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const val = Math.floor(ease * target);
            el.textContent = val + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
    }

    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const raw = el.dataset.count;
            if (!raw) return;
            const num    = parseFloat(raw);
            const suffix = el.dataset.suffix || '';
            animateCounter(el, num, suffix);
            counterObs.unobserve(el);
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

    // ══════════════════════════════════════════════════════════════════════════
    //  Scroll effects: hero terminal fade, nav, section links
    // ══════════════════════════════════════════════════════════════════════════
    const heroTerminal   = document.getElementById('heroTerminal');
    const scrollHint     = document.querySelector('.scroll-hint');
    const heroSect       = document.getElementById('home');
    const navbar         = document.querySelector('.navbar');
    const sections       = document.querySelectorAll('section[id]');
    const navLinks       = document.querySelectorAll('.nav-link');
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollY   = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollProgress) scrollProgress.style.transform = `scaleX(${maxScroll > 0 ? scrollY / maxScroll : 0})`;

        // Hero terminal fade
        if (heroTerminal && heroSect) {
            const start = heroSect.offsetHeight * 0.2;
            const end   = heroSect.offsetHeight * 0.52;
            const prog  = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
            heroTerminal.style.opacity   = 1 - prog;
            heroTerminal.style.transform = `translateY(${-prog * 20}px) scale(${1 - prog * 0.03})`;
        }

        if (scrollHint) scrollHint.classList.toggle('hidden', scrollY > 70);
        navbar.classList.toggle('scrolled', scrollY > 55);

        let cur = '';
        sections.forEach(s => { if (scrollY >= s.offsetTop - 140) cur = s.id; });
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));

        // Cursor trail color per section
        document.body.className = document.body.className.replace(/\bin-\S+/g, '').trim();
        if (cur) document.body.classList.add('in-' + cur);
    }, { passive: true });

    // ══════════════════════════════════════════════════════════════════════════
    //  Mouse parallax on hero
    // ══════════════════════════════════════════════════════════════════════════
    const heroContent  = document.querySelector('.hero-content');
    const heroTerminalEl = document.getElementById('heroTerminal');

    document.addEventListener('mousemove', (e) => {
        if (window.scrollY > window.innerHeight * 0.3) return;
        const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
        if (heroContent)    heroContent.style.transform   = `translate(${dx * -6}px, ${dy * -6}px)`;
        if (heroTerminalEl) heroTerminalEl.style.transform = `translate(${dx * 8}px, ${dy * 8}px)`;
    });

    // ══════════════════════════════════════════════════════════════════════════
    //  Intersection Observers — reveal + skills
    // ══════════════════════════════════════════════════════════════════════════
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
        });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

    const skillObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('.skill-fill').forEach(b => { b.style.width = b.dataset.pct; });
            skillObs.unobserve(e.target);
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.skills-section').forEach(el => skillObs.observe(el));

    // ══════════════════════════════════════════════════════════════════════════
    //  3D Card Tilt
    // ══════════════════════════════════════════════════════════════════════════
    document.querySelectorAll('[data-tilt]').forEach(card => {
        const MAX = 7;
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform .1s ease, border-color .32s, box-shadow .32s';
        });
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const dx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
            const dy = ((e.clientY - r.top)  / r.height - 0.5) * 2;
            card.style.transform = `translateY(-8px) perspective(900px) rotateX(${-dy * MAX}deg) rotateY(${dx * MAX}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform .55s cubic-bezier(.34,1.28,.64,1), border-color .32s, box-shadow .32s';
            card.style.transform = '';
        });
    });

    // ══════════════════════════════════════════════════════════════════════════
    //  Magnetic buttons
    // ══════════════════════════════════════════════════════════════════════════
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const r   = btn.getBoundingClientRect();
            const dx  = e.clientX - (r.left + r.width  / 2);
            const dy  = e.clientY - (r.top  + r.height / 2);
            btn.style.transform = `translate(${dx * 0.2}px, ${dy * 0.3}px) translateY(-3px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.transition = 'all .4s cubic-bezier(.34,1.28,.64,1)';
            setTimeout(() => { btn.style.transition = ''; }, 400);
        });
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform .08s ease, all .28s ease';
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
        }, 5000 + Math.random() * 8000);
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
        if (Math.random() > 0.88) {
            const t = document.createElement('div');
            t.className = 'cursor-trail';
            t.style.cssText = `left:${mx}px;top:${my}px`;
            document.body.appendChild(t);
            setTimeout(() => t.remove(), 600);
        }
    });

    (function lerp() {
        ox += (mx - ox) * 0.12; oy += (my - oy) * 0.12;
        outer.style.left = ox + 'px'; outer.style.top = oy + 'px';
        requestAnimationFrame(lerp);
    })();

    const sel = 'a,button,input,[role="button"],.chip,.cmd-hint,.proj-link,.contact-link,.project-card,.skill-card,.hero-terminal,.term-dot,.about-card';
    document.addEventListener('mouseover', e => {
        if (e.target.closest(sel)) { dot.classList.add('hovered'); outer.classList.add('hovered'); }
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(sel)) { dot.classList.remove('hovered'); outer.classList.remove('hovered'); }
    });
    document.addEventListener('mousedown', () => outer.classList.add('clicking'));
    document.addEventListener('mouseup',   () => outer.classList.remove('clicking'));
    document.addEventListener('mouseleave', () => { dot.style.opacity='0'; outer.style.opacity='0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity='1'; outer.style.opacity='1'; });

    // ══════════════════════════════════════════════════════════════════════════
    //  Terminal + smooth scroll
    // ══════════════════════════════════════════════════════════════════════════
    Terminal.init();

    // Cmd hints — open terminal and auto-run the command
    document.querySelectorAll('.cmd-hint[data-cmd]').forEach(btn => {
        btn.addEventListener('click', () => Terminal.runCommand(btn.dataset.cmd));
    });

    // Hero terminal: hide interactive input on touch devices (no physical keyboard)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        const htInputRow = htBody && htBody.querySelector('.ht-input-row');
        if (htInputRow) htInputRow.style.display = 'none';
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });
});
