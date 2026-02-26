# 🚀 QUICK START GUIDE - Docker on Raspberry Pi

## TLDR (Too Long, Didn't Read)

```bash
# 1. Copy all files to ~/hacker-portfolio/
# 2. Run this:
bash setup.sh

# 3. Open browser: http://localhost:3000
```

Done! 🎉

---

## Step-by-Step (5 minutes)

### 1️⃣ Prerequisites

Make sure you have:
- Raspberry Pi (4GB+ RAM recommended)
- Raspberry Pi OS installed
- SSH access OR keyboard+monitor

### 2️⃣ Download All Files

**Option A: Using Git (Easiest)**
```bash
git clone <your-repo-url> ~/hacker-portfolio
cd ~/hacker-portfolio
```

**Option B: Manual Copy**
- Create folder: `~/hacker-portfolio`
- Copy all files from outputs into it
- Structure should be:
```
hacker-portfolio/
├── setup.sh
├── Dockerfile
├── docker-compose.yml
├── package.json
├── .dockerignore
├── DOCKER_SETUP_GUIDE.md
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── App.js
    └── components/
        └── HackerPortfolio.jsx
```

### 3️⃣ Run Setup Script

```bash
cd ~/hacker-portfolio
bash setup.sh
```

This will:
- ✅ Install Docker (if needed)
- ✅ Install Docker Compose (if needed)
- ✅ Build the Docker image (~10-15 min first time)
- ✅ Start the container
- ✅ Show you the access URL

### 4️⃣ Access Your Portfolio

Open your browser:
```
http://localhost:3000
```

Or from another computer:
```
http://<YOUR_PI_IP>:3000
```

**Find your Pi's IP:**
```bash
hostname -I
```

---

## 🎮 Quick Command Reference

### View Status
```bash
docker-compose ps
```

### View Logs (Real-time)
```bash
docker-compose logs -f
```

### Stop Running
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

### Delete Everything & Start Over
```bash
docker-compose down -v
docker system prune -a
docker-compose build --no-cache
docker-compose up -d
```

---

## 🎯 Test Your Portfolio

Open terminal and try these commands:

1. **help** - List all commands
2. **whoami** - Your profile
3. **portfolio** - Your projects
4. **skills** - Your expertise
5. **recognize** - First easter egg
6. **fsociety** - Secret message
7. **matrix** - Cool visual effect
8. **hack-game** - Simulate exploit

---

## ⚠️ Common Issues

### "Port 3000 already in use"
**Solution:** Change port in `docker-compose.yml`
```yaml
ports:
  - "8080:3000"  # Change 3000 to 8080
```
Then access: `http://localhost:8080`

### "Container won't start"
**Check logs:**
```bash
docker-compose logs
```

### "Build stuck/slow"
**This is normal!** First build on Pi takes 10-15 minutes.
Let it finish, subsequent builds are faster.

### "Out of memory"
**Limit container in docker-compose.yml:**
```yaml
services:
  hacker-portfolio:
    mem_limit: 512m
```

### "Need to restart Pi - what happens to my container?"
**Don't worry!** Add this to docker-compose.yml:
```yaml
restart: unless-stopped
```
Container auto-restarts on reboot.

---

## 🔧 Manual Docker Commands (If not using docker-compose)

```bash
# Build image
docker build -t hacker-portfolio .

# Run container
docker run -d -p 3000:3000 --name hacker_portfolio \
  --restart unless-stopped hacker-portfolio

# View logs
docker logs -f hacker_portfolio

# Stop
docker stop hacker_portfolio

# Start again
docker start hacker_portfolio

# Remove
docker rm hacker_portfolio
```

---

## 📊 Monitor Performance

```bash
# Real-time resource usage
docker stats hacker_portfolio

# Disk usage
docker system df

# Check Pi resources
free -h          # Memory
df -h             # Disk space
vcgencmd measure_temp  # CPU temperature
```

---

## 🌐 Access from Internet (Optional)

**WARNING: Security risk! Only do if you know what you're doing!**

### Using Cloudflare Tunnel (Safest)
```bash
# Install
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm.tgz
tar xzf cloudflared-linux-arm.tgz
sudo mv cloudflared /usr/local/bin

# Run
cloudflared tunnel run hacker-portfolio
```

### Using LocalTunnel (Quick & Easy)
```bash
npm install -g localtunnel
lt --port 3000
```

### Using Ngrok (Popular)
```bash
# Download: https://ngrok.com/
# Unzip and run:
./ngrok http 3000
```

---

## 🛡️ Security Notes

1. **Default:** Only accessible locally (port 3000)
2. **If exposing to internet:** Use HTTPS
3. **Never:** Use weak passwords in comments
4. **Consider:** Running behind Nginx with SSL

---

## 📁 File Structure Explained

```
hacker-portfolio/
├── setup.sh                    # One-command setup
├── Dockerfile                  # Docker image recipe
├── docker-compose.yml          # Container config
├── package.json                # Node.js dependencies
├── .dockerignore               # Files to skip in build
├── DOCKER_SETUP_GUIDE.md       # Full guide (this file)
├── public/
│   └── index.html              # HTML entry point
└── src/
    ├── index.js                # React entry point
    ├── App.js                  # Main App component
    └── components/
        └── HackerPortfolio.jsx # The portfolio component
```

---

## 🔄 Update/Rebuild

After making changes to `HackerPortfolio.jsx`:

```bash
cd ~/hacker-portfolio

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# View new version
docker-compose logs -f
```

---

## ❓ Need Help?

### Check Logs
```bash
docker-compose logs hacker-portfolio
docker-compose logs --tail=50 -f
```

### Verify Container Running
```bash
docker ps
docker-compose ps
```

### Test Network
```bash
curl http://localhost:3000
```

### Check System Resources
```bash
free -h
df -h
top
```

---

## 🎓 Learning Resources

- **Docker Docs:** https://docs.docker.com/
- **Docker Compose:** https://docs.docker.com/compose/
- **Raspberry Pi:** https://www.raspberrypi.com/documentation/
- **React:** https://react.dev/

---

## 📝 Customization

### Change Portfolio Content

Edit `src/components/HackerPortfolio.jsx`:

```javascript
// Update contact info
contact: () => [
  '[+] CONTACT INFORMATION:',
  '',
  '📧 Email: YOUR_EMAIL@email.com',
  '🔗 GitHub: github.com/YOUR_USERNAME',
  // ... etc
]

// Add new commands
newcommand: () => [
  '[+] This is your new command!',
  'Output line 1',
  'Output line 2'
]
```

Then rebuild:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Change Port
Edit `docker-compose.yml`:
```yaml
services:
  hacker-portfolio:
    ports:
      - "8080:3000"  # Changed from 3000 to 8080
```

### Change Theme Colors
Edit the Tailwind classes in `HackerPortfolio.jsx`:
- `text-cyan-400` → `text-green-400`
- `bg-slate-950` → `bg-slate-900`
- etc.

---

## 🚀 Next Steps

1. **Customize content** - Edit your projects/skills
2. **Add SSL/HTTPS** - Set up with Nginx
3. **Monitor uptime** - Use tools like Uptime Kuma
4. **Get domain** - Buy domain and point to your Pi
5. **Share** - Tell people about your portfolio!

---

## 🎉 Success Checklist

- [ ] Docker installed
- [ ] Docker Compose installed
- [ ] All files copied to ~/hacker-portfolio
- [ ] setup.sh executed successfully
- [ ] Container is running (`docker ps`)
- [ ] Portfolio accessible at http://localhost:3000
- [ ] Terminal commands work (try "help")
- [ ] Easter egg found (try "recognize")

---

## 💡 Pro Tips

1. **Always backup** your customizations
2. **Monitor disk space** - Docker can use a lot
3. **Use `.dockerignore`** to optimize builds
4. **Keep logs** - helps with debugging
5. **Test locally first** before exposing to internet

---

## 📞 Support

If you get stuck:
1. Check the logs: `docker-compose logs`
2. Verify file structure is correct
3. Try rebuilding: `docker-compose build --no-cache`
4. Check Raspberry Pi resources
5. Read the full guide: `DOCKER_SETUP_GUIDE.md`

---

**Happy hacking! 🔐🚀**

**Questions? Found a bug? Feel free to reach out!**
