# 🎬 HACKER PORTFOLIO - Interactive Terminal-Based Portfolio

> A cybersecurity engineer's interactive terminal portfolio with Mr. Robot easter eggs, running on Docker on Raspberry Pi.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Platform](https://img.shields.io/badge/platform-Raspberry%20Pi-red)
![Docker](https://img.shields.io/badge/docker-enabled-blue)
![React](https://img.shields.io/badge/react-18+-cyan)

---

## 🎯 Features

✨ **Interactive Terminal Interface**
- Real terminal emulator with command execution
- Command history navigation (↑ ↓ arrow keys)
- Live system status bar
- Animated progress indicators

🎬 **Mr. Robot Easter Eggs**
- Hidden FSociety messages
- Matrix mode with falling binary
- Secret unlock sequences
- Thematic references throughout

🔐 **Security Portfolio Features**
- Interactive CTF challenges
- Live exploit simulations
- Vulnerability scanner demo
- Skill showcase
- Project portfolio
- Contact information

⚡ **Technical Excellence**
- Responsive design (mobile, tablet, desktop)
- Optimized for Raspberry Pi
- Docker containerized
- Docker Compose ready
- Health checks built-in
- Auto-restart on failure

---

## 📋 Requirements

**Hardware:**
- Raspberry Pi 4 (4GB+ RAM recommended)
- Or any Linux system with Docker support

**Software:**
- Raspberry Pi OS (Bullseye or later)
- Docker (we provide installation script)
- Docker Compose (we provide installation script)

**Internet:**
- For initial setup only (downloading images)
- ~500MB required for node:18-bullseye base image

---

## 🚀 Quick Start (3 Steps)

### 1. Copy Files

```bash
# Create directory
mkdir -p ~/hacker-portfolio
cd ~/hacker-portfolio

# Copy all files from outputs into this directory
# Should contain: Dockerfile, docker-compose.yml, setup.sh, public/, src/
```

### 2. Run Setup

```bash
bash setup.sh
```

This automatically:
- Installs Docker & Docker Compose (if needed)
- Builds the Docker image
- Starts the container
- Shows you the access URL

### 3. Open Browser

```
http://localhost:3000
```

Or from another computer:
```
http://<YOUR_PI_IP>:3000
```

---

## 📖 Detailed Guides

- **[QUICK_START.md](./QUICK_START.md)** - TL;DR version (5 min read)
- **[DOCKER_SETUP_GUIDE.md](./DOCKER_SETUP_GUIDE.md)** - Complete guide with all options
- **[RASPBERRY_PI_SETUP_GUIDE.md](./RASPBERRY_PI_SETUP_GUIDE.md)** - Pi-specific setup

---

## 🎮 Available Commands

Try these in the terminal:

| Command | Description |
|---------|-------------|
| `help` | List all available commands |
| `whoami` | Display your profile |
| `portfolio` | Show your security projects |
| `skills` | List technical expertise |
| `ctf` | View CTF challenges |
| `hack-game` | Run exploit simulation |
| `scan` | Vulnerability scanner demo |
| `matrix` | Activate matrix mode |
| `recognize` | First easter egg |
| `fsociety` | Unlock secret message |
| `contact` | Display contact info |
| `clear` | Clear terminal |

---

## 🎬 Easter Eggs

**Level 1: Matrix Mode**
```
Type: matrix
Effect: Falling binary with system glitch
```

**Level 2: Recognition**
```
Type: recognize
Effect: Mr. Robot quote + unlock message
```

**Level 3: FSociety**
```
Type: fsociety
Effect: Full encrypted message + hacker philosophy
```

---

## 📁 Project Structure

```
hacker-portfolio/
├── Dockerfile                    # Docker build recipe
├── docker-compose.yml            # Container orchestration
├── package.json                  # Node.js dependencies
├── .dockerignore                 # Optimize Docker build
├── setup.sh                      # One-command setup
├── QUICK_START.md               # Quick reference
├── DOCKER_SETUP_GUIDE.md        # Full setup guide
│
├── public/
│   └── index.html               # React entry point
│
└── src/
    ├── index.js                 # Bootstrap
    ├── App.js                   # Main component
    └── components/
        └── HackerPortfolio.jsx  # Portfolio logic
```

---

## 🐳 Docker Commands

### Build & Run
```bash
docker-compose up -d
```

### View Status
```bash
docker-compose ps
```

### View Logs
```bash
docker-compose logs -f
```

### Stop
```bash
docker-compose down
```

### Restart
```bash
docker-compose restart
```

### Rebuild After Changes
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## ⚙️ Customization

### Edit Your Information

Open `src/components/HackerPortfolio.jsx` and modify:

```javascript
// Your contact info
contact: () => [
  '[+] CONTACT INFORMATION:',
  '📧 Email: YOUR_EMAIL@domain.com',
  '🔗 GitHub: github.com/YOUR_USERNAME',
  // ... etc
]

// Your projects
portfolio: () => [
  '[+] YOUR PROJECT 1',
  '   Description...',
  // ... etc
]

// Your skills
skills: () => [
  '🔓 Your Skills:',
  '   • Skill1 • Skill2 • Skill3',
  // ... etc
]
```

### Change Colors

Replace Tailwind classes:
- `text-cyan-400` (cyan) → `text-green-400` (green)
- `bg-slate-950` (dark) → `bg-gray-950` (darker)
- `border-cyan-500` (cyan border) → `border-green-500` (green border)

### Change Port

Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Change 3000 to 8080
```

Access at: `http://localhost:8080`

### Add New Commands

In `HackerPortfolio.jsx`, add to the `commands` object:

```javascript
commands = {
  // ... existing commands
  mycommand: () => [
    '[+] Output line 1',
    '[+] Output line 2',
    '[!] Output line 3'
  ]
}
```

Then rebuild:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 🔍 Monitoring

### View Real-time Logs
```bash
docker-compose logs -f hacker-portfolio
```

### Monitor Resources
```bash
docker stats hacker_portfolio
```

### Check Disk Usage
```bash
docker system df
```

### Verify Container Health
```bash
docker-compose ps
```

---

## 🌐 Accessing from Internet

### Option 1: Cloudflare Tunnel (Recommended)

```bash
# Install cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm.tgz
tar xzf cloudflared-linux-arm.tgz
sudo mv cloudflared /usr/local/bin

# Run tunnel
cloudflared tunnel run hacker-portfolio
```

### Option 2: LocalTunnel

```bash
npm install -g localtunnel
lt --port 3000
```

### Option 3: Ngrok

```bash
# Download from https://ngrok.com/
./ngrok http 3000
```

**⚠️ Security Warning:** Only expose if you understand the risks!

---

## 🔧 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs

# Common issues:
# 1. Port 3000 in use? Change in docker-compose.yml
# 2. Out of memory? Add mem_limit to docker-compose.yml
# 3. Build failed? Try: docker-compose build --no-cache
```

### Port Already in Use

Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Use different port
```

### Slow Build

This is normal on Raspberry Pi! First build takes 10-15 minutes.
Subsequent builds are much faster (uses cache).

### Out of Memory

Raspberry Pi running out of RAM? Limit container:

```yaml
services:
  hacker-portfolio:
    mem_limit: 512m
    memswap_limit: 512m
```

### Can't Find Pi's IP

```bash
hostname -I
```

---

## 📊 Performance Tips

1. **Use Docker Compose** - easier management
2. **Monitor disk space** - Docker uses storage
3. **Check Pi resources** - `free -h` (RAM), `df -h` (storage)
4. **Monitor temperature** - `vcgencmd measure_temp`
5. **Use health checks** - built-in to our setup

---

## 🔐 Security Notes

1. **Default Setup:** Only accessible locally (localhost:3000)
2. **Network Access:** Use HTTPS if exposing to internet
3. **Firewall:** Consider iptables rules
4. **Updates:** Keep your Pi OS updated
5. **Docker:** Keep Docker updated

---

## 📈 Production Deployment

### With Nginx Reverse Proxy

1. Install Nginx
2. Create proxy config
3. Enable SSL with Let's Encrypt
4. Point domain to your Pi

See [DOCKER_SETUP_GUIDE.md](./DOCKER_SETUP_GUIDE.md) for details.

### Auto-restart on Boot

Already configured! The `restart: unless-stopped` policy in `docker-compose.yml` handles this.

### Enable Docker Daemon on Boot

```bash
sudo systemctl enable docker
```

---

## 🆘 Support & Troubleshooting

### Check Everything Works

```bash
# 1. Container running?
docker-compose ps

# 2. Accessible?
curl http://localhost:3000

# 3. Logs okay?
docker-compose logs

# 4. Resources available?
free -h
df -h
```

### Common Solutions

| Problem | Solution |
|---------|----------|
| Port 3000 in use | Change port in docker-compose.yml |
| Build stuck | Let it finish (10-15 min normal) |
| Out of memory | Limit container in docker-compose.yml |
| Can't access | Check Pi firewall: `sudo ufw status` |
| Container crashes | Check logs: `docker-compose logs` |

---

## 📚 Resources

- **Docker Documentation:** https://docs.docker.com/
- **Docker Compose:** https://docs.docker.com/compose/
- **Raspberry Pi Docs:** https://www.raspberrypi.com/documentation/
- **React:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/

---

## 📝 License

This project is provided as-is for educational and portfolio purposes.

---

## 🎯 Quick Links

- 📖 [Quick Start](./QUICK_START.md)
- 🐳 [Docker Guide](./DOCKER_SETUP_GUIDE.md)
- 🥧 [Raspberry Pi Guide](./RASPBERRY_PI_SETUP_GUIDE.md)
- 📂 [Project Files](./src/components/HackerPortfolio.jsx)

---

## 🚀 What's Next?

1. **Customize** your portfolio with your real projects
2. **Add SSL/HTTPS** for internet access
3. **Set up monitoring** with tools like Uptime Kuma
4. **Get a domain** and point it to your Pi
5. **Share** your amazing portfolio!

---

## 💡 Tips & Tricks

**Quick Commands:**
```bash
# One-liner to rebuild everything
docker-compose down && docker-compose build --no-cache && docker-compose up -d

# Check if it's working
curl http://localhost:3000

# View live logs
docker-compose logs -f

# Clean up everything
docker system prune -a
```

**File Editing:**
```bash
# Edit portfolio content
nano src/components/HackerPortfolio.jsx

# Edit port
nano docker-compose.yml

# View current status
docker-compose ps
```

---

## 🎉 Success Indicators

You've successfully deployed when:

✅ `docker-compose ps` shows container as "Up"
✅ Browser opens to http://localhost:3000
✅ You can type `help` and see commands
✅ `recognize` command shows Easter egg
✅ Terminal is fully interactive

---

## 🤝 Contributing

Have improvements? Ideas for features? Found a bug?

Feel free to:
1. Modify the code
2. Test locally
3. Rebuild: `docker-compose down && docker-compose build --no-cache && docker-compose up -d`
4. Share your improvements

---

## 📞 Getting Help

**If something doesn't work:**

1. Read [QUICK_START.md](./QUICK_START.md) - most answers are there
2. Check logs: `docker-compose logs`
3. Verify files are in correct structure
4. Try rebuilding: `docker-compose build --no-cache`
5. Check Raspberry Pi resources: `free -h`, `df -h`

---

## 🎬 Final Notes

This isn't just a portfolio—it's an **experience**. When people visit, they interact with your terminal, discover easter eggs, and see your personality through your code.

**That's what makes it memorable.**

Good luck, and happy hacking! 🔐🚀

---

**Made with ❤️ for cybersecurity engineers who want to stand out**

*Last Updated: February 2026*
