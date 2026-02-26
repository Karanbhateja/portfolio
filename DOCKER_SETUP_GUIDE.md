# 🚀 HACKER PORTFOLIO - DOCKER DEPLOYMENT GUIDE FOR RASPBERRY PI

## Prerequisites

Before you start, make sure you have:

1. **Raspberry Pi** (Pi 4 or later recommended for better performance)
2. **Raspberry Pi OS** installed (Bullseye or latest)
3. **Docker** installed
4. **Docker Compose** installed
5. **Git** (optional, for cloning)

---

## STEP 1: Install Docker on Raspberry Pi

If Docker isn't installed, run these commands:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group (so you don't need sudo)
sudo usermod -aG docker $USER
newgrp docker
```

Verify installation:
```bash
docker --version
docker run hello-world
```

---

## STEP 2: Install Docker Compose

```bash
sudo apt-get update
sudo apt-get install docker-compose -y

# Verify installation
docker-compose --version
```

---

## STEP 3: Prepare Your Project Directory

```bash
# Create project directory
mkdir -p ~/hacker-portfolio
cd ~/hacker-portfolio

# Create all necessary folders
mkdir -p src/components public

# Copy all the files from this guide into the directories
# (package.json, Dockerfile, docker-compose.yml, etc.)
```

Your directory structure should look like:
```
hacker-portfolio/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── .dockerignore
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── App.js
    └── components/
        └── HackerPortfolio.jsx
```

---

## STEP 4: Build and Run with Docker Compose

### Option A: Build and Run (Recommended)

```bash
cd ~/hacker-portfolio

# Build the Docker image
docker-compose build

# Start the container
docker-compose up -d
```

The `-d` flag runs it in the background (daemon mode).

### Option B: Using Docker Directly (If you prefer)

```bash
# Build the image
docker build -t hacker-portfolio .

# Run the container
docker run -d -p 3000:3000 --name hacker_portfolio --restart unless-stopped hacker-portfolio
```

---

## STEP 5: Access Your Portfolio

Once running, open your browser and go to:

```
http://localhost:3000
```

Or from another machine on your network:
```
http://<your-raspberry-pi-ip>:3000
```

To find your Raspberry Pi's IP:
```bash
hostname -I
```

---

## STEP 6: Useful Docker Commands

### View Container Status
```bash
docker-compose ps
# or
docker ps
```

### View Logs
```bash
docker-compose logs -f hacker-portfolio
# or
docker logs -f hacker_portfolio
```

### Stop the Container
```bash
docker-compose down
# or
docker stop hacker_portfolio
```

### Restart the Container
```bash
docker-compose restart
# or
docker restart hacker_portfolio
```

### Remove Everything and Start Fresh
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Rebuild After Code Changes
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## STEP 7: Advanced Configuration

### Access Container Shell (Debugging)
```bash
docker exec -it hacker_portfolio /bin/bash
```

### View Resource Usage
```bash
docker stats hacker_portfolio
```

### Run on Startup (Auto-start on Reboot)

The `restart: unless-stopped` policy in docker-compose.yml handles this automatically.

To make Docker itself start on boot:
```bash
sudo systemctl enable docker
```

---

## STEP 8: Expose to the Internet (Optional)

**⚠️ SECURITY WARNING: Only do this if you understand the risks!**

### Using Ngrok (Easy but requires account)
```bash
# Install ngrok
curl https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-arm.zip -o ngrok.zip
unzip ngrok.zip
sudo mv ngrok /usr/local/bin/

# Expose your port
ngrok http 3000
```

### Using LocalTunnel (Simpler)
```bash
npm install -g localtunnel
lt --port 3000
```

### Using Cloudflare Tunnel (Most Secure)
```bash
# Install cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm.tgz
tar xzf cloudflared-linux-arm.tgz
sudo mv cloudflared /usr/local/bin

# Create tunnel
cloudflared tunnel run hacker-portfolio
```

---

## STEP 9: Troubleshooting

### Container won't start?
```bash
docker-compose logs hacker-portfolio
```

### Port 3000 already in use?
```bash
# Change port in docker-compose.yml:
# ports:
#   - "8080:3000"  <- Change 3000 to 8080

docker-compose down
docker-compose up -d
# Access at http://localhost:8080
```

### Out of memory on Raspberry Pi?
Limit container memory in docker-compose.yml:
```yaml
services:
  hacker-portfolio:
    # ... other configs
    mem_limit: 512m
    memswap_limit: 512m
```

### Build takes too long?
- This is normal on Pi 4. First build takes 10-15 minutes.
- Subsequent builds are much faster.
- Consider using `docker-compose build --no-cache` only when needed.

---

## STEP 10: Production Considerations

### Add Nginx Reverse Proxy
Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://hacker-portfolio:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Enable HTTPS with Let's Encrypt
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot certonly --standalone -d your-domain.com
```

### Monitor with Watchtower (Auto-updates containers)
```bash
docker run -d \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ~/.docker/config.json:/config.json \
  --restart unless-stopped \
  containrrr/watchtower
```

---

## STEP 11: Access from Different Ports

Need multiple services? Update docker-compose.yml:

```yaml
services:
  hacker-portfolio:
    ports:
      - "80:3000"      # HTTP
      - "443:3000"     # HTTPS (if configured)
      - "3000:3000"    # Direct access
```

---

## Quick Cheat Sheet

```bash
# Build & Run
docker-compose up -d

# View status
docker-compose ps

# View logs (live)
docker-compose logs -f

# Restart
docker-compose restart

# Stop everything
docker-compose down

# Clean up (remove unused images)
docker image prune -a

# Check disk usage
docker system df
```

---

## Performance Tips for Raspberry Pi

1. **Use docker-compose** - cleaner, easier to manage
2. **Limit swap** - Pi has limited storage; watch swap usage
3. **Monitor resources** - `docker stats` is your friend
4. **Use ARM-compatible images** - we already do this with node:18-bullseye
5. **Cache aggressively** - Docker layers help with rebuild time

---

## Getting Help

If something breaks:
1. Check logs: `docker-compose logs`
2. Verify file structure is correct
3. Ensure all ports are available
4. Try rebuilding: `docker-compose down && docker-compose build --no-cache && docker-compose up -d`
5. Check Raspberry Pi resources: `df -h` (disk), `free -h` (memory)

---

## Next Steps

1. **Customize your portfolio** - Edit src/components/HackerPortfolio.jsx
2. **Add SSL/HTTPS** - Use Nginx + Let's Encrypt
3. **Set up CI/CD** - Use GitHub Actions to auto-build
4. **Monitor uptime** - Use Uptime Kuma or similar
5. **Share it** - Get a domain and expose it to the web!

---

**Happy Hacking! 🚀🔐**
