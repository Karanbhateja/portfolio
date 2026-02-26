#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  🚀 HACKER PORTFOLIO - DOCKER SETUP${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}\n"

# Get current directory (where the script is run from)
CURRENT_DIR="$(pwd)"
echo -e "${GREEN}[✓] Working directory: $CURRENT_DIR${NC}\n"

# Check if Docker is installed
echo -e "${YELLOW}[*] Checking Docker installation...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}[!] Docker is not installed!${NC}"
    exit 1
else
    echo -e "${GREEN}[✓] Docker is installed${NC}"
    docker --version
fi

# Check if Docker Compose is installed
echo -e "${YELLOW}[*] Checking Docker Compose installation...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}[!] Docker Compose is not installed!${NC}"
    exit 1
else
    echo -e "${GREEN}[✓] Docker Compose is installed${NC}"
    docker-compose --version
fi

# Check required files in CURRENT directory
echo -e "${YELLOW}\n[*] Checking required files...${NC}"
REQUIRED_FILES=("package.json" "Dockerfile" "docker-compose.yml")
MISSING=0

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$CURRENT_DIR/$file" ]; then
        echo -e "${GREEN}[✓] $file${NC}"
    else
        echo -e "${RED}[✗] $file NOT FOUND${NC}"
        MISSING=$((MISSING + 1))
    fi
done

if [ $MISSING -gt 0 ]; then
    echo -e "\n${RED}❌ ERROR: Required files missing!${NC}"
    echo -e "${YELLOW}Current directory: $CURRENT_DIR${NC}"
    echo -e "${YELLOW}Files found:${NC}"
    ls -la "$CURRENT_DIR"
    exit 1
fi

# Create missing directories if needed
echo -e "${YELLOW}\n[*] Checking directories...${NC}"
if [ ! -d "$CURRENT_DIR/public" ]; then
    echo -e "${YELLOW}[!] Creating public/ directory${NC}"
    mkdir -p "$CURRENT_DIR/public"
fi

if [ ! -d "$CURRENT_DIR/src/components" ]; then
    echo -e "${YELLOW}[!] Creating src/components/ directories${NC}"
    mkdir -p "$CURRENT_DIR/src/components"
fi

# Check for source files
echo -e "${YELLOW}\n[*] Checking source files...${NC}"
SOURCE_FILES=("public/index.html" "src/index.js" "src/App.js" "src/components/HackerPortfolio.jsx")
MISSING_SOURCE=0

for file in "${SOURCE_FILES[@]}"; do
    if [ -f "$CURRENT_DIR/$file" ]; then
        echo -e "${GREEN}[✓] $file${NC}"
    else
        echo -e "${YELLOW}[!] $file NOT FOUND${NC}"
        MISSING_SOURCE=$((MISSING_SOURCE + 1))
    fi
done

if [ $MISSING_SOURCE -gt 0 ]; then
    echo -e "\n${YELLOW}⚠️  WARNING: Source files missing!${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check Docker daemon
echo -e "${YELLOW}\n[*] Checking Docker daemon...${NC}"
if ! docker ps > /dev/null 2>&1; then
    echo -e "${RED}[!] Docker daemon not running${NC}"
    exit 1
fi
echo -e "${GREEN}[✓] Docker daemon is running${NC}"

# Start building
echo -e "\n${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Building and starting your portfolio...${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}\n"

# Build Docker image
echo -e "${YELLOW}[*] Step 1/3: Building Docker image...${NC}"
echo -e "${YELLOW}⏱️  This takes 10-15 minutes on first build${NC}\n"

cd "$CURRENT_DIR"
docker-compose build --no-cache 2>&1

if [ $? -ne 0 ]; then
    echo -e "\n${RED}❌ Build failed!${NC}"
    echo -e "${YELLOW}Check logs: docker-compose logs${NC}"
    exit 1
fi

echo -e "\n${GREEN}[✓] Docker image built!${NC}"

# Start container
echo -e "${YELLOW}\n[*] Step 2/3: Starting container...${NC}"
docker-compose up -d

if [ $? -ne 0 ]; then
    echo -e "\n${RED}❌ Failed to start container!${NC}"
    echo -e "${YELLOW}Check logs: docker-compose logs${NC}"
    exit 1
fi

echo -e "${GREEN}[✓] Container started!${NC}"

# Wait
echo -e "${YELLOW}\n[*] Step 3/3: Waiting for service...${NC}"
sleep 5

# Show status
echo -e "\n${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ SETUP COMPLETE!${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}\n"

docker-compose ps

# Get IP
IP_ADDRESS=$(hostname -I | awk '{print $1}')

echo -e "\n${BLUE}🌐 Access your portfolio:${NC}"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo -e "   ${YELLOW}http://$IP_ADDRESS:3000${NC}\n"

echo -e "${BLUE}📖 Useful commands:${NC}"
echo -e "   docker-compose logs -f    (View logs)"
echo -e "   docker-compose ps         (Check status)"
echo -e "   docker-compose restart    (Restart)"
echo -e "   docker-compose down       (Stop)\n"

echo -e "${BLUE}🎮 Try these commands:${NC}"
echo -e "   help, recognize, fsociety, matrix\n"

echo -e "${GREEN}Happy hacking! 🔐🚀${NC}\n"
