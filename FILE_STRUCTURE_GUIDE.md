# 📦 COMPLETE SETUP PACKAGE - File Structure & Instructions

## 📂 Directory Structure (What You Need)

```
~/hacker-portfolio/
│
├── README.md                          ← START HERE! Read this first
├── QUICK_START.md                     ← 5-minute setup guide
├── DOCKER_SETUP_GUIDE.md              ← Complete Docker guide
├── RASPBERRY_PI_SETUP_GUIDE.md        ← Raspberry Pi specific
│
├── setup.sh                           ← RUN THIS: bash setup.sh
│
├── Dockerfile                         ← Docker build config (don't modify)
├── docker-compose.yml                 ← Container config (don't modify unless changing port)
├── .dockerignore                      ← Optimization file (don't modify)
├── package.json                       ← Dependencies (don't modify)
│
├── public/
│   └── index.html                     ← React HTML entry point
│
└── src/
    ├── index.js                       ← React bootstrap
    ├── App.js                         ← App wrapper
    └── components/
        └── HackerPortfolio.jsx        ← MAIN FILE - Your portfolio logic
```

---

## 🚀 Getting Started (Step-by-Step)

### Step 1: Download All Files

Download the complete package from outputs:
- All `.md` files
- All `.js` and `.jsx` files
- `Dockerfile`, `docker-compose.yml`, `package.json`
- The `public/` and `src/` directories
- `setup.sh`

### Step 2: Organize on Your Raspberry Pi

```bash
# Create the main directory
mkdir -p ~/hacker-portfolio
cd ~/hacker-portfolio

# Create subdirectories
mkdir -p public src/components

# Copy all files into these locations
# Your structure should match the diagram above
```

### Step 3: Copy File Contents

**Copy these files exactly as shown:**

1. **Root Level Files:**
   - README.md
   - QUICK_START.md
   - DOCKER_SETUP_GUIDE.md
   - RASPBERRY_PI_SETUP_GUIDE.md
   - setup.sh (make executable: `chmod +x setup.sh`)
   - Dockerfile
   - docker-compose.yml
   - .dockerignore
   - package.json

2. **public/index.html**
   - Copy the index.html content into public/

3. **src/ files:**
   - index.js → src/index.js
   - App.js → src/App.js
   - HackerPortfolio.jsx → src/components/HackerPortfolio.jsx

### Step 4: Verify Structure

```bash
cd ~/hacker-portfolio

# Check structure
tree -L 2
# or
find . -type f -name "*.js*" -o -name "*.md" -o -name "Dockerfile*" | sort
```

Should show:
```
./README.md
./QUICK_START.md
./DOCKER_SETUP_GUIDE.md
./RASPBERRY_PI_SETUP_GUIDE.md
./setup.sh
./Dockerfile
./docker-compose.yml
./package.json
./public/index.html
./src/index.js
./src/App.js
./src/components/HackerPortfolio.jsx
```

### Step 5: Run Setup Script

```bash
cd ~/hacker-portfolio
bash setup.sh
```

This script will:
- ✅ Check/install Docker
- ✅ Check/install Docker Compose
- ✅ Build the Docker image
- ✅ Start the container
- ✅ Show you the URL to access

### Step 6: Access Your Portfolio

Open browser:
```
http://localhost:3000
```

Or from another computer:
```
http://<YOUR_PI_IP>:3000
```

---

## 📋 File Descriptions

### Documentation Files

| File | Purpose | Read When |
|------|---------|-----------|
| README.md | Overview & features | First thing |
| QUICK_START.md | TL;DR setup (5 min) | Want quick setup |
| DOCKER_SETUP_GUIDE.md | Complete Docker guide | Need all options |
| RASPBERRY_PI_SETUP_GUIDE.md | Pi-specific tips | Raspberry Pi issues |

### Configuration Files

| File | Purpose | Modify? |
|------|---------|---------|
| Dockerfile | Docker build recipe | ❌ No (unless expert) |
| docker-compose.yml | Container config | ⚠️ Only to change port |
| package.json | Dependencies | ❌ No |
| .dockerignore | Build optimization | ❌ No |

### Application Files

| File | Purpose | Modify? |
|------|---------|---------|
| public/index.html | HTML entry point | ⚠️ Only if needed |
| src/index.js | React bootstrap | ❌ No |
| src/App.js | App wrapper | ❌ No |
| src/components/HackerPortfolio.jsx | Your portfolio | ✅ YES! Customize here |

### Setup Files

| File | Purpose |
|------|---------|
| setup.sh | One-command setup |

---

## 🎯 What to Customize

### Only Modify: `src/components/HackerPortfolio.jsx`

This file contains:
- Terminal commands
- Your contact info
- Your projects
- Your skills
- Easter egg messages
- Command outputs

Example - Update your email:
```javascript
contact: () => [
  '[+] CONTACT INFORMATION:',
  '📧 Email: YOUR_EMAIL@domain.com',  // ← Change this
  '🔗 GitHub: github.com/YOUR_NAME',   // ← And this
  // ...
]
```

After editing:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## ✅ Pre-Launch Checklist

Before running `bash setup.sh`, verify:

- [ ] You have ~/hacker-portfolio directory
- [ ] All files are in correct locations (check structure above)
- [ ] setup.sh is executable: `chmod +x setup.sh`
- [ ] You have internet connection (for Docker downloads)
- [ ] Your Pi has enough storage: `df -h` (need ~1GB free)
- [ ] Docker/Docker Compose will be installed or already installed

---

## 🚦 After Launch Checklist

After running setup.sh:

- [ ] Script completes without errors
- [ ] You see: "✅ SETUP COMPLETE!"
- [ ] URL shown: http://localhost:3000
- [ ] Container running: `docker-compose ps` shows "Up"
- [ ] Can access website in browser
- [ ] Terminal loads and accepts input
- [ ] You can type "help" command

---

## 📱 Quick Command Reference

### Essential Commands

```bash
# Navigate to project
cd ~/hacker-portfolio

# View status
docker-compose ps

# View live logs
docker-compose logs -f

# Restart container
docker-compose restart

# Stop container
docker-compose down

# Start again
docker-compose up -d

# Rebuild after changes
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check IP address
hostname -I

# Check disk space
df -h

# Check memory
free -h
```

---

## 🔧 Common Modifications

### Change Port (to 8080)

Edit `docker-compose.yml`:
```yaml
services:
  hacker-portfolio:
    ports:
      - "8080:3000"  # Changed from "3000:3000"
```

Then:
```bash
docker-compose down
docker-compose up -d
# Access at http://localhost:8080
```

### Update Your Contact Info

Edit `src/components/HackerPortfolio.jsx`:

Find `contact: () => [` and update:
```javascript
contact: () => [
  '[+] CONTACT INFORMATION:',
  '📧 Email: YOUR_EMAIL@gmail.com',
  '🔗 GitHub: github.com/YOUR_USERNAME',
  '🎮 HackTheBox: YOUR_PROFILE_NAME',
  '🌐 LinkedIn: linkedin.com/in/YOUR_PROFILE',
  // ... rest of contact info
]
```

### Add New Command

In `HackerPortfolio.jsx`, find the `commands` object and add:

```javascript
commands = {
  // ... other commands ...
  mycommand: () => [
    '[+] Output line 1',
    '[+] Output line 2',
    '[!] Warning line'
  ]
}
```

### Change Theme Color

Find and replace in `HackerPortfolio.jsx`:
- All `text-cyan-400` → `text-green-400` (for green theme)
- All `border-cyan-500` → `border-green-500`
- All `bg-cyan-500` → `bg-green-500`

---

## 🆘 Troubleshooting Quick Guide

### "Command not found: docker"
→ Run setup.sh, it will install Docker

### "Port 3000 already in use"
→ Change port in docker-compose.yml to 8080

### "Build taking too long"
→ Normal! First build on Pi takes 10-15 minutes. Let it finish.

### "Container won't start"
→ Check logs: `docker-compose logs`

### "Out of memory"
→ Add to docker-compose.yml: `mem_limit: 512m`

### "Can't access from another computer"
→ Check Pi's IP: `hostname -I`
→ Use that IP: `http://<PI_IP>:3000`

### "Want to start over"
→ Run: `docker-compose down -v && docker system prune -a && docker-compose build --no-cache && docker-compose up -d`

---

## 📊 File Size Reference

All files combined: ~100KB (very lightweight!)

| File | Size |
|------|------|
| HackerPortfolio.jsx | 18KB |
| README.md | 12KB |
| DOCKER_SETUP_GUIDE.md | 7KB |
| Other docs | ~20KB |
| Configuration files | <2KB |
| **Total** | **~60KB** |

Docker image: ~300MB (normal for Node.js app)

---

## 🔐 Security Notes

The default setup:
- ✅ Only accessible locally (localhost)
- ✅ No data transmission to external servers
- ✅ No analytics or tracking
- ✅ Completely self-contained

To expose to internet:
- ⚠️ Use HTTPS (Let's Encrypt)
- ⚠️ Use firewall rules
- ⚠️ Consider reverse proxy (Nginx)
- ⚠️ See DOCKER_SETUP_GUIDE.md for details

---

## 🎯 Success Scenarios

### Scenario 1: "Want it running in 5 minutes"
→ Use QUICK_START.md

### Scenario 2: "Want to understand everything"
→ Read README.md first, then DOCKER_SETUP_GUIDE.md

### Scenario 3: "Getting errors"
→ Check DOCKER_SETUP_GUIDE.md troubleshooting section

### Scenario 4: "Want to customize"
→ Edit src/components/HackerPortfolio.jsx

### Scenario 5: "Want to expose to internet"
→ See DOCKER_SETUP_GUIDE.md section 8 & 10

---

## 📞 Need Help?

**Before asking for help, try:**

1. Read README.md (you're reading it!)
2. Read QUICK_START.md (5 minute version)
3. Check logs: `docker-compose logs`
4. Verify file structure is correct
5. Ensure all required files exist

**Common issues solved by:**

```bash
# 1. Check what's running
docker-compose ps

# 2. Check logs
docker-compose logs

# 3. Try restarting
docker-compose restart

# 4. Try rebuilding
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 🎓 Learning Path

1. **Day 1:** Run setup.sh and access website
2. **Day 2:** Customize your information
3. **Day 3:** Explore Easter eggs
4. **Day 4:** Add custom commands
5. **Day 5:** Expose to internet safely

---

## 🚀 You're Ready!

Everything you need is here:
- ✅ Complete source code
- ✅ Docker configuration
- ✅ Setup script
- ✅ Comprehensive guides
- ✅ Troubleshooting help
- ✅ Customization examples

**Next step:** Follow QUICK_START.md or run `bash setup.sh`

---

**Happy hacking! 🔐🚀**

*Questions? Check the guides. Guides don't help? Something's probably misconfigured. Re-verify file structure.*
