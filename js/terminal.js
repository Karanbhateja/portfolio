// ─── Terminal Engine ──────────────────────────────────────────────────────────

const Terminal = (() => {

    // ── Shared utilities ───────────────────────────────────────────────────────
    function escHtml(t) {
        return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    // Fake filesystem
    const FS = {
        '/':            ['root/', 'etc/', 'opt/', 'var/', 'home/'],
        '/root':        ['profile.txt', 'notes.txt', '.bashrc', 'tools/'],
        '/root/tools':  ['recon/', 'exploit/', 'post/'],
        '/opt':         ['tools/', 'scripts/'],
        '/opt/tools':   ['nmap', 'metasploit/', 'burpsuite', 'nuclei', 'ffuf', 'gobuster', 'amass', 'subfinder', 'httpx', 'sqlmap'],
        '/opt/scripts': ['web-recon.py', 'header-check.py', 'urlhunter.py', 'net-scan.py', 'winhunter.py'],
        '/etc':         ['passwd', 'hostname', 'hosts', 'os-release', 'ssh/'],
    };
    const FILES = {
        '/root/profile.txt': [
            '<span class="t-green">Name    :</span> <span class="t-white">Karan Bhateja</span>',
            '<span class="t-green">Role    :</span> <span class="t-white">Cybersecurity Engineer</span>',
            '<span class="t-green">Focus   :</span> <span class="t-white">Offensive Testing · Automation · ISO 27001</span>',
            '<span class="t-green">GitHub  :</span> <span class="t-cyan"><a href="https://github.com/karanbhateja" target="_blank">github.com/karanbhateja</a></span>',
            '<span class="t-green">Email   :</span> <span class="t-cyan">karanbhatejaa@protonmail.com</span>',
            '<span class="t-green">Status  :</span> <span class="t-green">● Available for opportunities</span>',
        ],
        '/root/notes.txt': [
            '<span class="t-dim">## current focus</span>',
            '<span class="t-white">- finishing website recon framework v2</span>',
            '<span class="t-white">- expanding nuclei template library</span>',
            '<span class="t-white">- raspberry pi vpn lab setup</span>',
            '<span class="t-dim">## reminder</span>',
            '<span class="t-white">- always enumerate before you exploit</span>',
            '<span class="t-white">- document everything</span>',
        ],
        '/root/.bashrc': [
            '<span class="t-dim"># ~/.bashrc — karan@portfolio</span>',
            '<span class="t-green">export</span> <span class="t-white">PATH</span>=<span class="t-cyan">$PATH:/opt/tools:/opt/scripts</span>',
            '<span class="t-green">alias</span> <span class="t-white">ll</span>=<span class="t-cyan">\'ls -alF\'</span>',
            '<span class="t-green">alias</span> <span class="t-white">scan</span>=<span class="t-cyan">\'nmap -sV -O --open\'</span>',
            '<span class="t-green">alias</span> <span class="t-white">recon</span>=<span class="t-cyan">\'python3 /opt/scripts/web-recon.py\'</span>',
        ],
        '/etc/hostname': ['<span class="t-white">portfolio</span>'],
        '/etc/os-release': [
            '<span class="t-green">NAME</span>=<span class="t-cyan">"Kali GNU/Linux Rolling"</span>',
            '<span class="t-green">VERSION</span>=<span class="t-cyan">"2024.1"</span>',
            '<span class="t-green">ID</span>=<span class="t-cyan">kali</span>',
            '<span class="t-green">PRETTY_NAME</span>=<span class="t-cyan">"Kali GNU/Linux Rolling"</span>',
        ],
    };

    // ── Terminal instance factory ───────────────────────────────────────────────
    function createTerminal({ outputEl, onClear, onClose, promptStr = 'karan@portfolio:~$', cls = 'term-line', anchorEl = null }) {

        function print(html, extraCls = '') {
            const line = document.createElement('div');
            line.className = cls + (extraCls ? ' ' + extraCls : '');
            line.innerHTML = html;
            // insert before anchorEl (the live input row) so output never goes below it
            if (anchorEl && anchorEl.parentNode === outputEl) {
                outputEl.insertBefore(line, anchorEl);
            } else {
                outputEl.appendChild(line);
            }
            outputEl.scrollTop = outputEl.scrollHeight;
        }
        function nl() { print('&nbsp;'); }
        function prompt(cmd) {
            print(`<span class="t-prompt">${promptStr}</span> <span class="t-cmd">${escHtml(cmd)}</span>`);
        }

        // ── Commands ────────────────────────────────────────────────────────────
        const commands = {

            help(args) {
                const target = args.trim();
                nl();
                if (target) {
                    const desc = commandList.find(([c]) => c === target);
                    if (desc) {
                        print(`<span class="t-cyan">NAME</span>`);
                        print(`    <span class="t-white">${desc[0]}</span> — ${desc[1]}`);
                        nl();
                        print(`<span class="t-cyan">USAGE</span>`);
                        print(`    <span class="t-white">${desc[0]}</span> ${desc[2] || ''}`);
                        nl();
                    } else {
                        print(`<span class="t-red">No manual entry for ${escHtml(target)}</span>`);
                        nl();
                    }
                    return;
                }
                print(`<span class="t-cyan">┌──────────────────────────────────────────────────┐</span>`);
                print(`<span class="t-cyan">│</span>  <span class="t-green">karan@portfolio</span> — available commands            <span class="t-cyan">│</span>`);
                print(`<span class="t-cyan">└──────────────────────────────────────────────────┘</span>`);
                nl();
                const groups = [
                    { label: 'Profile', cmds: ['whoami','about','skills','projects','contact'] },
                    { label: 'System',  cmds: ['pwd','ls','cat','uname','date','uptime','ps','ifconfig'] },
                    { label: 'Network', cmds: ['ping','nmap','ssh','curl'] },
                    { label: 'Shell',   cmds: ['echo','sudo','man','history','clear','banner','exit'] },
                ];
                groups.forEach(g => {
                    print(`  <span class="t-dim">// ${g.label}</span>`);
                    g.cmds.forEach(name => {
                        const entry = commandList.find(([c]) => c === name);
                        if (entry) print(`  <span class="t-cyan">${entry[0].padEnd(12)}</span><span class="t-dim">—</span> <span class="t-white">${entry[1]}</span>`);
                    });
                    nl();
                });
                print(`<span class="t-dim">  Tip: use Tab to autocomplete · ↑↓ for history</span>`);
                nl();
            },

            whoami() {
                nl();
                print(`<span class="t-green">► Name   :</span> <span class="t-white">Karan Bhateja</span>`);
                print(`<span class="t-green">► Title  :</span> <span class="t-white">Cybersecurity Engineer | Automation & Security Tooling Developer</span>`);
                print(`<span class="t-green">► Focus  :</span> <span class="t-white">Offensive Testing · ISO 27001 · Security Automation</span>`);
                print(`<span class="t-green">► OS     :</span> <span class="t-white">Kali Linux / Debian</span>`);
                print(`<span class="t-green">► Shell  :</span> <span class="t-white">/bin/bash — uid=0(root) gid=0(root)</span>`);
                print(`<span class="t-green">► GitHub :</span> <span class="t-cyan"><a href="https://github.com/karanbhateja" target="_blank">github.com/karanbhateja</a></span>`);
                nl();
            },

            about() {
                nl();
                print(`<span class="t-cyan">[ About ]</span>`);
                nl();
                print(`<span class="t-white">Cybersecurity professional focused on building practical security tools,</span>`);
                print(`<span class="t-white">automation workflows, and real-world defensive solutions. I work across</span>`);
                print(`<span class="t-white">offensive testing, internal audits, and infrastructure hardening.</span>`);
                nl();
                print(`<span class="t-white">From 12+ modular recon scripts and NVD-integrated network scanners to</span>`);
                print(`<span class="t-white">a self-hosted Raspberry Pi security lab — every tool I build is</span>`);
                print(`<span class="t-white">deployable, documented, and actually useful in a real environment.</span>`);
                nl();
            },

            skills() {
                nl();
                print(`<span class="t-cyan">[ Languages ]</span>`);
                print(`  <span class="t-green">●</span> Python  <span class="t-green">●</span> Bash/Shell  <span class="t-green">●</span> PowerShell  <span class="t-green">●</span> JavaScript`);
                nl();
                print(`<span class="t-cyan">[ Cybersecurity ]</span>`);
                ['Network Security', 'ISO 27001 Audits', 'Security Automation', 'Web Security', 'Secure Infrastructure', 'OSINT & Recon'].forEach(s =>
                    print(`  <span class="t-green">●</span> <span class="t-white">${s}</span>`)
                );
                nl();
                print(`<span class="t-cyan">[ Tools ]</span>`);
                print(`  <span class="t-white">Nmap · Nuclei · Burp Suite · ffuf · Gobuster · SQLmap</span>`);
                print(`  <span class="t-white">Amass · Subfinder · httpx · Shodan · Censys · Wireshark</span>`);
                nl();
            },

            projects() {
                nl();
                const projs = [
                    { id:'01', name:'Website Reconnaissance Framework',    tags:['Python','OSINT','Shodan','AI'],       link:null },
                    { id:'02', name:'Raspberry Pi Security Lab',           tags:['Linux','SSH','Networking','VPN'],      link:null },
                    { id:'03', name:'Internal Network Pentesting Automation', tags:['Python','Nmap','NVD','CVE'],         link:null },
                    { id:'04', name:'Security Header Analyzer',            tags:['Python','HTTP','CSP','HSTS'],          link:null },
                    { id:'05', name:'WinHunter',                           tags:['Windows','Red Team','Payload'],        link:null },
                    { id:'06', name:'URLHunter',                           tags:['Python','OSINT','Web Recon'],          link:'https://github.com/Karanbhateja/URLHunter' },
                    { id:'07', name:'Security Script Obfuscation & Licensing', tags:['Python','Cryptography'],           link:null },
                    { id:'08', name:'Security Automation Scripts',         tags:['Bash','Python','Automation'],          link:'https://github.com/karanbhateja' },
                ];
                projs.forEach(p => {
                    print(`<span class="t-cyan">┌─[</span><span class="t-green">PROJECT-${p.id}</span><span class="t-cyan">]──────────────────────────</span>`);
                    print(`<span class="t-cyan">│</span> <span class="t-white">${p.name}</span>`);
                    print(`<span class="t-cyan">│</span> ${p.tags.map(t => `<span class="t-tag">[${t}]</span>`).join(' ')}`);
                    if (p.link) print(`<span class="t-cyan">│</span> <span class="t-cyan"><a href="${p.link}" target="_blank">${p.link}</a></span>`);
                    print(`<span class="t-cyan">└───────────────────────────────────────</span>`);
                    nl();
                });
            },

            contact() {
                nl();
                print(`<span class="t-cyan">[ Contact ]</span>`);
                nl();
                print(`  <span class="t-green">► GitHub :</span> <span class="t-cyan"><a href="https://github.com/karanbhateja" target="_blank">github.com/karanbhateja</a></span>`);
                print(`  <span class="t-green">► Email  :</span> <span class="t-cyan"><a href="mailto:karanbhatejaa@protonmail.com">karanbhatejaa@protonmail.com</a></span>`);
                nl();
                print(`<span class="t-dim">  Open to freelance, collaboration, and full-time opportunities.</span>`);
                nl();
            },

            pwd() {
                print(`<span class="t-white">/root</span>`);
                nl();
            },

            ls(args) {
                const path = (args.trim() || '/root').replace(/\/$/, '') || '/';
                const key  = path.startsWith('/') ? path : '/root/' + path;
                const entries = FS[key] || FS['/root/' + path.replace(/^~\/?/, '')] || null;
                nl();
                if (!entries) {
                    print(`<span class="t-red">ls: cannot access '${escHtml(path)}': No such file or directory</span>`);
                } else {
                    const line = entries.map(e =>
                        e.endsWith('/') ? `<span class="t-cyan">${e}</span>` : `<span class="t-white">${e}</span>`
                    ).join('  ');
                    print(line);
                }
                nl();
            },

            cat(args) {
                const path = args.trim();
                if (!path) { print(`<span class="t-red">cat: missing operand</span>`); nl(); return; }
                const key = path.startsWith('/') ? path : '/root/' + path;
                const content = FILES[key] || FILES['/root/' + path];
                nl();
                if (!content) {
                    print(`<span class="t-red">cat: ${escHtml(path)}: No such file or directory</span>`);
                } else {
                    content.forEach(l => print(l));
                }
                nl();
            },

            uname(args) {
                const full = args.includes('-a') || args.includes('a');
                nl();
                if (full) {
                    print(`<span class="t-white">Linux portfolio 6.6.9-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.9-1kali1 x86_64 GNU/Linux</span>`);
                } else {
                    print(`<span class="t-white">Linux</span>`);
                }
                nl();
            },

            date() {
                nl();
                print(`<span class="t-white">${new Date().toString()}</span>`);
                nl();
            },

            uptime() {
                nl();
                const days = Math.floor(Math.random() * 30) + 10;
                print(`<span class="t-white"> ${new Date().toLocaleTimeString()} up ${days} days,  1:37,  1 user,  load average: 0.42, 0.18, 0.09</span>`);
                nl();
            },

            ps(args) {
                nl();
                print(`<span class="t-dim">  PID TTY          TIME CMD</span>`);
                [
                    ['    1','?   ','00:00:03','systemd'],
                    [' 1042','?   ','00:00:00','sshd'],
                    [' 1337','pts/0','00:00:00','bash'],
                    [' 2048','?   ','00:01:12','nuclei'],
                    [' 3141','?   ','00:00:07','python3 web-recon.py'],
                    [' 4200','pts/0','00:00:00','ps'],
                ].forEach(([pid,tty,time,cmd]) =>
                    print(`<span class="t-green">${pid}</span> <span class="t-dim">${tty}</span> <span class="t-dim">${time}</span> <span class="t-white">${cmd}</span>`)
                );
                nl();
            },

            ifconfig() {
                nl();
                print(`<span class="t-green">eth0</span>: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500`);
                print(`        inet <span class="t-cyan">192.168.1.10</span>  netmask 255.255.255.0  broadcast 192.168.1.255`);
                print(`        ether <span class="t-dim">00:1a:2b:3c:4d:5e</span>  txqueuelen 1000  (Ethernet)`);
                nl();
                print(`<span class="t-green">lo</span>: flags=73&lt;UP,LOOPBACK,RUNNING&gt;  mtu 65536`);
                print(`        inet <span class="t-cyan">127.0.0.1</span>  netmask 255.0.0.0`);
                nl();
                print(`<span class="t-green">tun0</span>: flags=4305&lt;UP,POINTOPOINT,RUNNING,NOARP,MULTICAST&gt;  mtu 1500`);
                print(`        inet <span class="t-cyan">10.10.14.5</span>  netmask 255.255.254.0  destination 10.10.14.5`);
                nl();
            },

            echo(args) {
                print(`<span class="t-white">${escHtml(args)}</span>`);
                nl();
            },

            man(args) {
                const target = args.trim();
                if (!target) { print(`<span class="t-red">What manual page do you want?</span>`); nl(); return; }
                commands.help(target);
            },

            async ping(args) {
                const host = args.trim() || 'localhost';
                nl();
                print(`<span class="t-white">PING ${escHtml(host)}: 56 data bytes</span>`);
                for (let i = 0; i < 4; i++) {
                    await sleep(500);
                    const ms = (Math.random() * 20 + 1).toFixed(3);
                    print(`<span class="t-white">64 bytes from ${escHtml(host)}: icmp_seq=${i} ttl=64 time=<span class="t-green">${ms} ms</span></span>`);
                }
                await sleep(200);
                print(`<span class="t-dim">--- ${escHtml(host)} ping statistics ---</span>`);
                print(`<span class="t-white">4 packets transmitted, 4 received, <span class="t-green">0% packet loss</span></span>`);
                nl();
            },

            async nmap(args) {
                nl();
                const target = args.trim() || '192.168.1.0/24';
                print(`<span class="t-green">Starting Nmap 7.94 ( https://nmap.org )</span>`);
                print(`<span class="t-dim">Scanning ${escHtml(target)}...</span>`);
                nl();
                const fakeHosts = [
                    { ip:'192.168.1.1',  host:'router.local',      ports:['22/tcp   ssh','80/tcp   http','443/tcp  https'] },
                    { ip:'192.168.1.10', host:'kali.local',         ports:['22/tcp   ssh','4444/tcp msf-listener'] },
                    { ip:'192.168.1.15', host:'rpi-seclab.local',   ports:['22/tcp   ssh','8080/tcp http-proxy'] },
                    { ip:'192.168.1.42', host:'win-host.local',     ports:['135/tcp  msrpc','445/tcp  microsoft-ds','3389/tcp ms-wbt-server'] },
                ];
                for (const h of fakeHosts) {
                    await sleep(550);
                    print(`<span class="t-green">Nmap scan report for ${h.host} (${h.ip})</span>`);
                    print(`<span class="t-white">Host is up (0.00${Math.floor(Math.random()*9)+1}s latency).</span>`);
                    print(`<span class="t-dim">PORT      STATE  SERVICE</span>`);
                    h.ports.forEach(p => print(`<span class="t-cyan">${p.padEnd(16)}</span><span class="t-green">open</span>`));
                    nl();
                }
                await sleep(300);
                print(`<span class="t-green">Nmap done: 4 IP addresses (4 hosts up) scanned in ${(Math.random()*3+1).toFixed(2)}s</span>`);
                print(`<span class="t-dim">[ Simulated scan — no real network activity ]</span>`);
                nl();
            },

            async ssh(args) {
                const host = args.trim() || 'target';
                nl();
                print(`<span class="t-dim">Connecting to ${escHtml(host)}...</span>`);
                await sleep(800);
                print(`<span class="t-red">ssh: connect to host ${escHtml(host)} port 22: Connection refused</span>`);
                print(`<span class="t-dim">Tip: try scanning first with <span class="t-cyan">nmap ${escHtml(host)}</span></span>`);
                nl();
            },

            curl(args) {
                nl();
                if (!args.trim()) { print(`<span class="t-red">curl: no URL specified</span>`); nl(); return; }
                print(`<span class="t-dim">  % Total    % Received % Xferd  Average Speed</span>`);
                print(`<span class="t-dim">100   418  100   418    0     0   1024      0 --:--:-- --:--:--</span>`);
                print(`<span class="t-white">{"status":"ok","message":"Nice try. This is a portfolio terminal."}</span>`);
                nl();
            },

            sudo(args) {
                nl();
                if (args.trim() === 'su' || args.trim() === '-i' || args.trim() === 'bash') {
                    print(`<span class="t-green">root@portfolio:~#</span> <span class="t-dim">...wait, you're already root.</span>`);
                } else if (args.includes('rm -rf')) {
                    print(`<span class="t-red">nice try.</span>`);
                    print(`<span class="t-dim">This incident has been logged. Just kidding. But no.</span>`);
                } else {
                    print(`<span class="t-red">[sudo] password for karan:</span>`);
                    print(`<span class="t-white">karan is not in the sudoers file. This incident will be reported.</span>`);
                }
                nl();
            },

            async scan() { await commands.nmap(''); },

            banner() {
                onClear();
                showBanner();
            },

            history() {
                nl();
                if (!cmdHistory.length) {
                    print(`<span class="t-dim">No commands in history.</span>`);
                } else {
                    cmdHistory.forEach((c, i) =>
                        print(`  <span class="t-dim">${String(i+1).padStart(3)}</span>  <span class="t-white">${escHtml(c)}</span>`)
                    );
                }
                nl();
            },

            clear() { onClear(); },
            exit()  { if (onClose) onClose(); },

            // ── Easter eggs ───────────────────────────────────────────────────
            hack() {
                nl();
                print(`<span class="t-green">Initializing exploit framework...</span>`);
                sleep(600).then(() => {
                    print(`<span class="t-red">[!] Just kidding. This is a portfolio, not a hacking tool.</span>`);
                    print(`<span class="t-dim">    But check out the real projects above 👆</span>`);
                    nl();
                });
            },
            'rm -rf /'()  { nl(); print(`<span class="t-red">Permission denied. (nice try)</span>`); nl(); },
            matrix() {
                nl();
                print(`<span class="t-green">Wake up, Neo...</span>`);
                sleep(700).then(() => { print(`<span class="t-green">The Matrix has you.</span>`); nl(); });
            },
            coffee() { nl(); print(`<span class="t-cyan">☕ Brewing... done. Error: cup not found.</span>`); nl(); },
            vim()    { nl(); print(`<span class="t-dim">Entering vim... just kidding. No one escapes vim here anyway.</span>`); nl(); },
            nano()   { nl(); print(`<span class="t-white">nano: no display. Try cat instead.</span>`); nl(); },
        };

        // ── Command list for help/tab ──────────────────────────────────────────
        const commandList = [
            ['whoami',   'Display identity info',           ''],
            ['about',    'Full bio & background',           ''],
            ['skills',   'Technical skill set',             ''],
            ['projects', 'List all projects',               ''],
            ['contact',  'Get contact information',         ''],
            ['pwd',      'Print working directory',         ''],
            ['ls',       'List directory contents',         '[path]'],
            ['cat',      'Display file contents',           '<file>'],
            ['uname',    'Print system information',        '[-a]'],
            ['date',     'Print current date and time',     ''],
            ['uptime',   'Show how long system has been running', ''],
            ['ps',       'Report process status',           '[aux]'],
            ['ifconfig', 'Show network interfaces',         ''],
            ['ping',     'Ping a host',                     '<host>'],
            ['nmap',     'Run a network scan',              '[target]'],
            ['ssh',      'Attempt SSH connection',          '<host>'],
            ['curl',     'Transfer data from URL',          '<url>'],
            ['echo',     'Print text',                      '<text>'],
            ['sudo',     'Run as superuser (lol)',           '<command>'],
            ['man',      'Show manual for command',         '<command>'],
            ['history',  'Show command history',            ''],
            ['scan',     'Alias for nmap',                  ''],
            ['banner',   'Display ASCII banner',            ''],
            ['clear',    'Clear the terminal',              ''],
            ['exit',     'Close the terminal',              ''],
        ];

        // Command name list for tab completion
        const cmdNames = commandList.map(([c]) => c);

        // ── Per-instance history ───────────────────────────────────────────────
        const cmdHistory = [];
        let histIdx = -1;

        // ── Run ────────────────────────────────────────────────────────────────
        async function run(raw) {
            const trimmed = raw.trim();
            if (!trimmed) return;

            cmdHistory.push(trimmed);
            histIdx = cmdHistory.length;
            prompt(trimmed);

            const spaceIdx = trimmed.indexOf(' ');
            const cmdName  = (spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx)).toLowerCase();
            const args     = spaceIdx === -1 ? '' : trimmed.slice(spaceIdx + 1);

            if (commands[cmdName]) {
                await commands[cmdName](args);
            } else {
                nl();
                print(`<span class="t-red">bash: ${escHtml(cmdName)}: command not found</span>`);
                print(`<span class="t-dim">Type <span class="t-cyan">help</span> for available commands.</span>`);
                nl();
            }
        }

        // ── Tab completion ─────────────────────────────────────────────────────
        function tabComplete(val) {
            const matches = cmdNames.filter(c => c.startsWith(val));
            if (matches.length === 1) return matches[0];
            if (matches.length > 1) {
                nl();
                print(matches.join('  '));
            }
            return val;
        }

        // ── Wire an input element ──────────────────────────────────────────────
        function attachInput(inputEl) {
            inputEl.addEventListener('keydown', async (e) => {
                if (e.key === 'Enter') {
                    const val = inputEl.value;
                    inputEl.value = '';
                    histIdx = cmdHistory.length;
                    await run(val);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (histIdx > 0) histIdx--;
                    inputEl.value = cmdHistory[histIdx] || '';
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (histIdx < cmdHistory.length - 1) histIdx++;
                    else { histIdx = cmdHistory.length; inputEl.value = ''; return; }
                    inputEl.value = cmdHistory[histIdx] || '';
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    inputEl.value = tabComplete(inputEl.value);
                } else if (e.key === 'l' && e.ctrlKey) {
                    e.preventDefault();
                    onClear();
                } else if (e.key === 'c' && e.ctrlKey) {
                    e.preventDefault();
                    print(`<span class="t-prompt">${promptStr}</span> <span class="t-cmd">${escHtml(inputEl.value)}</span><span class="t-dim">^C</span>`);
                    inputEl.value = '';
                }
            });
        }

        function showBanner() {
            const art = [
                `<span class="t-green"> _  __ ____  </span>`,
                `<span class="t-green">| |/ /|  _ \\ </span>`,
                `<span class="t-green">| ' / | |_) |</span>`,
                `<span class="t-green">| . \\ |  _ < </span>`,
                `<span class="t-green">|_|\\_\\|_| \\_\\</span>  <span class="t-cyan">Karan Bhateja — Cybersecurity Portfolio v2.0</span>`,
            ];
            art.forEach(l => print(l));
            nl();
            print(`<span class="t-dim">Type <span class="t-cyan">help</span> to see available commands · Tab to autocomplete · ↑↓ for history</span>`);
            nl();
        }

        return { run, tabComplete, attachInput, showBanner, cmdNames };
    }

    // ── Modal Terminal ─────────────────────────────────────────────────────────
    const modalOutputEl = document.getElementById('termOutput');
    const modalInputEl  = document.getElementById('termInput');
    const modal         = document.getElementById('terminalModal');

    const modalEngine = createTerminal({
        outputEl: modalOutputEl,
        promptStr: 'karan@portfolio:~$',
        cls: 'term-line',
        onClear:  () => { modalOutputEl.innerHTML = ''; },
        onClose:  () => closeTerminal(),
    });

    function openTerminal() {
        modal.classList.add('active');
        if (modalOutputEl.children.length === 0) modalEngine.showBanner();
        setTimeout(() => modalInputEl && modalInputEl.focus(), 80);
    }
    function closeTerminal() {
        modal.classList.remove('active');
        modalInputEl && modalInputEl.blur();
    }

    function init() {
        modalEngine.attachInput(modalInputEl);

        document.getElementById('termBody').addEventListener('click', () => {
            if (modal.classList.contains('active')) modalInputEl.focus();
        });
        document.addEventListener('keydown', (e) => {
            // Escape to close
            if (e.key === 'Escape' && modal.classList.contains('active')) closeTerminal();
            // ` or ~ to open terminal
            if ((e.key === '`' || e.key === '~') && !modal.classList.contains('active')) {
                const tag = document.activeElement.tagName;
                if (tag !== 'INPUT' && tag !== 'TEXTAREA') openTerminal();
            }
        });
        document.getElementById('termClose').addEventListener('click', closeTerminal);
        document.getElementById('termCloseBtn').addEventListener('click', closeTerminal);
        document.querySelectorAll('.launch-terminal').forEach(btn => {
            btn.addEventListener('click', openTerminal);
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeTerminal();
        });
    }

    function runCommand(cmd) {
        openTerminal();
        // slight delay so the modal is visible before output appears
        setTimeout(() => modalEngine.run(cmd), 220);
    }

    return { init, openTerminal, closeTerminal, createTerminal, runCommand };
})();
