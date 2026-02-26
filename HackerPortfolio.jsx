import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, AlertCircle, Zap, Lock, Wifi } from 'lucide-react';

const HackerPortfolio = () => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'welcome', text: '████████████████████████████████████████████████████' },
    { type: 'welcome', text: '██  CYBERSECURITY ENGINEER TERMINAL INTERFACE  ██' },
    { type: 'welcome', text: '████████████████████████████████████████████████████' },
    { type: 'info', text: 'Type "help" to list available commands' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [systemStatus, setSystemStatus] = useState({
    securityLevel: 'HIGH',
    firewallStatus: 'ACTIVE',
    intrusions: 0,
    uptime: '365d 12h 43m'
  });
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [mrRobotMode, setMrRobotMode] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: () => [
      'Available commands:',
      '─────────────────────────────────────────────',
      'whoami              Display identity information',
      'portfolio           Show projects and experience',
      'skills              List technical expertise',
      'ctf                 Interactive CTF challenges',
      'hack-game           Start interactive exploit demo',
      'scan                Run vulnerability scanner',
      'matrix              Activate matrix mode',
      'easteregg           Find hidden content (hint: try "recognize")',
      'contact             Display contact information',
      'clear               Clear terminal',
      'exit                Close terminal',
      '─────────────────────────────────────────────'
    ],
    whoami: () => [
      '[+] Identity Information:',
      '    Name: Security Engineer',
      '    Role: Penetration Tester & Network Security Specialist',
      '    Status: Active',
      '    Threat Level: DANGEROUS ⚠️',
      '    Specialization: Network Exploitation, Web Security, Dark Web Research'
    ],
    portfolio: () => [
      '[+] SECURITY PROJECTS:',
      '',
      '1. Advanced Vulnerability Scanner',
      '   └─ Automated detection of CVSS 9.0+ vulnerabilities',
      '   └─ Tech: Python, Selenium, PostgreSQL',
      '',
      '2. Penetration Testing Framework',
      '   └─ Custom toolkit for full-cycle security assessments',
      '   └─ Tech: Bash, Python, Metasploit Integration',
      '',
      '3. Network IDS System',
      '   └─ Real-time intrusion detection with anomaly analysis',
      '   └─ Tech: C, TensorFlow, Packet Analysis',
      '',
      '4. Cryptanalysis Tools',
      '   └─ Breaking encryption through frequency analysis',
      '   └─ Tech: Python, Cryptography, Statistics',
      '',
      '5. Dark Web Intelligence Platform',
      '   └─ Market monitoring and threat intelligence',
      '   └─ Tech: Tor, Python, Data Science'
    ],
    skills: () => [
      '[+] TECHNICAL SKILLS:',
      '',
      '🔓 Penetration Testing:',
      '   • Nmap • Burp Suite • Metasploit • SQLmap • Hashcat',
      '',
      '🌐 Network Security:',
      '   • Wireshark • Snort/Suricata • IDS/IPS • VPN • BGP',
      '',
      '💻 Programming:',
      '   • Python (Expert) • Bash/Shell • C • Go • JavaScript',
      '',
      '☁️ Cloud Security:',
      '   • AWS • Azure • GCP • Kubernetes • Container Security',
      '',
      '🔐 Advanced:',
      '   • Cryptography • Reverse Engineering • Malware Analysis',
      '',
      '[+] CERTIFICATIONS:',
      '    ✓ OSCP (Offensive Security Certified Professional)',
      '    ✓ CEH (Certified Ethical Hacker)',
      '    ✓ GPEN (GIAC Penetration Tester)',
      '    ✓ Security+ (CompTIA)'
    ],
    ctf: () => [
      '[+] CTF CHALLENGE MODE ACTIVATED',
      '',
      'Challenge 1: Port Enumeration',
      '  $ nmap -sV -p- target.internal',
      '  └─ Which 3 ports are open? (Answer: 22,80,443)',
      '',
      'Challenge 2: SQL Injection',
      '  $ sqlmap -u "http://target/login" --dbs',
      '  └─ Extract admin password? (Try: admin\' OR \'1\'=\'1)',
      '',
      'Challenge 3: Privilege Escalation',
      '  $ sudo -l',
      '  └─ Find SUID binaries and exploit',
      '',
      '[?] Type "exploit-test" to run an interactive demo'
    ],
    'hack-game': () => {
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 3000);
      return [
        '[!] INITIATING LIVE EXPLOIT SEQUENCE...',
        '    Scanning target: 192.168.1.105',
        '    Payload type: Reverse Shell',
        '    Encoding: Shikata Ga Nai',
        '',
        '[*] Building payload...',
        '    [████████████████████] 100%',
        '',
        '[+] Exploit sent successfully!',
        '[+] Reverse shell established!',
        '[+] UID: 0 (root access granted)',
        '',
        '[✓] System compromised in 2.34 seconds',
        '[!] WARNING: This is a simulation for educational purposes only'
      ];
    },
    scan: () => {
      setIsScanning(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setIsScanning(false);
        }
        setScanProgress(progress);
      }, 500);
      return ['[*] Vulnerability scan initiated...', '[*] Scanning in background...'];
    },
    matrix: () => {
      setMrRobotMode(true);
      setTimeout(() => setMrRobotMode(false), 5000);
      return [
        '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
        '█ M A T R I X   M O D E   █',
        '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
        '',
        'There is no spoon... 🥄',
        '',
        'But there ARE vulnerabilities everywhere.',
        'Look closer. Type "recognize" if you understand.'
      ];
    },
    recognize: () => {
      return [
        '[✓] Ah, you recognize the reference...',
        '',
        '╔════════════════════════════════════════════╗',
        '║  "Hello, friend. You\'re not alone."        ║',
        '║  - Mr. Robot (Elliot Alderson)             ║',
        '╚════════════════════════════════════════════╝',
        '',
        '[+] EASTER EGG UNLOCKED: Mr. Robot Connection Established',
        '',
        'The world is not what you see. FSociety was right.',
        'Corporations control everything. We only fight back.',
        '',
        '[!] Access to hidden terminal mode: GRANTED',
        '[!] Type "fsociety" to reveal more...'
      ];
    },
    fsociety: () => {
      return [
        '    ___________________________',
        '   /                          /',
        '  /  F S O C I E T Y        /',
        ' /  We are the ones who talk back /',
        '/____________________________/',
        '',
        '[!] ENCRYPTED MESSAGE INCOMING:',
        '',
        'Power corrupts. Absolute power corrupts absolutely.',
        'They want us to be passive. To accept their systems.',
        '',
        'But every system has a vulnerability.',
        'Every network has a backdoor.',
        'Every corporation has secrets.',
        '',
        '[+] Your mission, should you choose to accept it:',
        '    Find the exploits. Expose the truth. Take them down.',
        '',
        '[✓] This terminal is now your weapon. Use it wisely.',
        '[!] Remember: You\'re either a ghost in the machine, or you\'re nothing.'
      ];
    },
    contact: () => [
      '[+] CONTACT INFORMATION:',
      '',
      '📧 Email: security@protonmail.com',
      '🔗 GitHub: github.com/cybersecurity-engineer',
      '🎮 HackTheBox: Profile: Elite Hacker',
      '🌐 LinkedIn: linkedin.com/in/cybersec-expert',
      '',
      '[+] AVAILABILITY:',
      '    ✓ Open to: Penetration Testing | Bug Bounty | Security Consulting',
      '    ✓ Response Time: 2-4 hours (encrypted communication preferred)',
      '    ✓ Rate: Negotiable for interesting projects'
    ],
    clear: () => {
      setTerminalOutput([]);
      return [];
    },
    exit: () => [
      'Closing connection...',
      '[+] Session terminated.',
      'Goodbye, friend.'
    ]
  };

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const output = commands[trimmed] ? commands[trimmed]() : [
      `Command not found: ${trimmed}`,
      'Type "help" for available commands'
    ];

    const newOutput = [
      ...terminalOutput,
      { type: 'command', text: `$ ${cmd}` },
      ...output.map(line => ({ type: 'response', text: line }))
    ];

    setTerminalOutput(newOutput);
    setCommandHistory([...commandHistory, cmd]);
    setHistoryIndex(-1);

    setTimeout(() => {
      terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (terminalInput.trim()) {
        executeCommand(terminalInput);
        setTerminalInput('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setTerminalInput('');
      }
    }
  };

  return (
    <div className={`min-h-screen w-full font-mono transition-all duration-300 ${
      mrRobotMode 
        ? 'bg-black animate-pulse' 
        : 'bg-gradient-to-br from-slate-950 via-black to-slate-900'
    }`}>
      {/* Animated glitch background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>
        {mrRobotMode && (
          <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>
        )}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Status Bar */}
        <div className="border-b border-cyan-500/20 bg-slate-950/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-xs">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${systemStatus.securityLevel === 'HIGH' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-green-400">SECURITY: {systemStatus.securityLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi size={12} className="text-cyan-400" />
                <span className="text-cyan-400">FIREWALL: {systemStatus.firewallStatus}</span>
              </div>
              <div className="text-purple-400">UPTIME: {systemStatus.uptime}</div>
            </div>
            <div className="text-gray-400">[{new Date().toLocaleTimeString()}]</div>
          </div>

          {isScanning && (
            <div className="max-w-7xl mx-auto px-4 py-2">
              <div className="bg-slate-800 rounded p-2">
                <div className="text-cyan-400 text-xs mb-1">SCANNING...</div>
                <div className="w-full bg-slate-900 rounded h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Terminal Area */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TerminalIcon className="text-cyan-400" size={28} />
              <h1 className="text-3xl font-black text-cyan-400">SECURE_TERMINAL_v2.0</h1>
            </div>
            <div className="text-gray-400 text-sm">
              Cybersecurity Engineer | Penetration Testing | Network Security Specialist
            </div>
          </div>

          {/* Terminal Output */}
          <div className="flex-1 mb-6 bg-black/40 border border-cyan-500/30 rounded-lg p-6 overflow-y-auto font-mono text-sm max-h-96 space-y-1">
            {terminalOutput.map((line, idx) => (
              <div key={idx} className={`${
                line.type === 'command' ? 'text-cyan-400 font-bold' :
                line.type === 'welcome' ? 'text-green-400' :
                line.type === 'info' ? 'text-yellow-400' :
                'text-gray-300'
              }`}>
                {line.type === 'response' && line.text.startsWith('[+]') && <span className="text-green-400">{line.text}</span>}
                {line.type === 'response' && line.text.startsWith('[!]') && <span className="text-red-400">{line.text}</span>}
                {line.type === 'response' && line.text.startsWith('[*]') && <span className="text-blue-400">{line.text}</span>}
                {line.type === 'response' && !line.text.startsWith('[') && <span>{line.text}</span>}
                {(line.type === 'command' || line.type === 'welcome' || line.type === 'info') && line.text}
              </div>
            ))}
            <div ref={terminalRef} />
          </div>

          {/* Input Area */}
          <div className="border border-cyan-500/30 rounded-lg p-4 bg-black/40">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-cyan-300 outline-none text-sm"
                placeholder="Type command..."
                autoFocus
              />
            </div>
          </div>

          {/* Command Hints */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {['help', 'portfolio', 'skills', 'recognize'].map((hint) => (
              <button
                key={hint}
                onClick={() => {
                  setTerminalInput(hint);
                  inputRef.current?.focus();
                }}
                className="p-3 rounded border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer"
              >
                {`$ ${hint}`}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="border-t border-cyan-500/20 px-4 py-3 text-xs text-gray-500 text-center">
          {mrRobotMode 
            ? '[MATRIX MODE ACTIVE] There is no spoon.' 
            : '[Secure Terminal] Ready for your commands. Stay paranoid, stay safe.'}
        </div>
      </div>

      {/* Matrix rain effect (Mr. Robot mode) */}
      {mrRobotMode && (
        <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
          <div className="absolute inset-0 flex">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 text-green-500/30 text-sm leading-none font-mono overflow-hidden"
                style={{
                  animation: `fall ${3 + Math.random() * 4}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                {Array.from({ length: 30 }).map(() => Math.random().toString(2).substring(2, 3)).join('\n')}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </div>
  );
};

export default HackerPortfolio;
