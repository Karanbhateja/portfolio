#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  🚀 HACKER PORTFOLIO - SMART DOCKER SETUP${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}\n"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${GREEN}[✓] Working directory: $(pwd)${NC}\n"

# Check if Docker is installed
echo -e "${YELLOW}[*] Checking Docker installation...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}[!] Docker is not installed!${NC}"
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    echo -e "${GREEN}[+] Docker installed successfully!${NC}"
else
    echo -e "${GREEN}[✓] Docker is installed${NC}"
    docker --version
fi

# Check if Docker Compose is installed
echo -e "${YELLOW}[*] Checking Docker Compose installation...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}[!] Docker Compose is not installed!${NC}"
    echo "Installing Docker Compose..."
    sudo apt-get update > /dev/null 2>&1
    sudo apt-get install docker-compose -y
    echo -e "${GREEN}[+] Docker Compose installed successfully!${NC}"
else
    echo -e "${GREEN}[✓] Docker Compose is installed${NC}"
    docker-compose --version
fi

# Check if required files exist
echo -e "${YELLOW}\n[*] Checking required files in current directory...${NC}"
REQUIRED_FILES=("package.json" "Dockerfile" "docker-compose.yml")
MISSING=0

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}[✓] $file${NC}"
    else
        echo -e "${RED}[✗] $file NOT FOUND${NC}"
        MISSING=$((MISSING + 1))
    fi
done

# Check for directory structure (these can be created if missing)
echo -e "${YELLOW}\n[*] Checking directory structure...${NC}"
if [ -d "public" ]; then
    echo -e "${GREEN}[✓] public/${NC}"
else
    echo -e "${YELLOW}[!] public/ directory missing - creating it${NC}"
    mkdir -p public
fi

if [ -d "src/components" ]; then
    echo -e "${GREEN}[✓] src/components/${NC}"
else
    echo -e "${YELLOW}[!] src/components/ directory missing - creating it${NC}"
    mkdir -p src/components
fi

# Check for source files
echo -e "${YELLOW}\n[*] Checking source files...${NC}"
SOURCE_FILES=("public/index.html" "src/index.js" "src/App.js" "src/components/HackerPortfolio.jsx")
MISSING_SOURCE=0

for file in "${SOURCE_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}[✓] $file${NC}"
    else
        echo -e "${YELLOW}[!] $file NOT FOUND (will try to proceed)${NC}"
        MISSING_SOURCE=$((MISSING_SOURCE + 1))
    fi
done

if [ $MISSING -gt 0 ]; then
    echo -e "\n${RED}❌ ERROR: Critical files missing!${NC}"
    echo -e "${YELLOW}Missing files:${NC}"
    for file in "${REQUIRED_FILES[@]}"; do
        if [ ! -f "$file" ]; then
            echo -e "  ${RED}✗${NC} $file"
        fi
    done
    echo -e "\n${YELLOW}Make sure you're in the correct directory.${NC}"
    echo -e "${YELLOW}Current directory: $(pwd)${NC}"
    echo -e "${YELLOW}Files in this directory:${NC}\n"
    ls -lah
    exit 1
fi

if [ $MISSING_SOURCE -gt 0 ]; then
    echo -e "\n${YELLOW}⚠️  WARNING: Some source files are missing!${NC}"
    echo -e "${YELLOW}The build may fail. You need:${NC}"
    for file in "${SOURCE_FILES[@]}"; do
        if [ ! -f "$file" ]; then
            echo -e "  ${YELLOW}→${NC} $file"
        fi
    done
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check Docker is running
echo -e "${YELLOW}\n[*] Checking Docker daemon...${NC}"
if ! docker ps > /dev/null 2>&1; then
    echo -e "${RED}[!] Docker daemon is not running or you don't have permission${NC}"
    echo -e "${YELLOW}Try: sudo systemctl start docker${NC}"
    echo -e "${YELLOW}Or: sudo usermod -aG docker \$USER${NC}"
    exit 1
fi
echo -e "${GREEN}[✓] Docker is running${NC}"

# Show what we're about to do
echo -e "\n${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Building and starting your portfolio...${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}\n"

# Build Docker image
echo -e "${YELLOW}[*] Step 1/3: Building Docker image...${NC}"
echo -e "${YELLOW}⏱️  This takes 10-15 minutes on first build (be patient!)${NC}\n"

docker-compose build --no-cache 2>&1

if [ $? -ne 0 ]; then
    echo -e "\n${RED}❌ Build failed!${NC}"
    echo -e "${YELLOW}Try this to see what went wrong:${NC}"
    echo -e "  docker-compose logs${NC}"
    exit 1
fi

echo -e "\n${GREEN}[✓] Docker image built successfully!${NC}"

# Start container
echo -e "${YELLOW}\n[*] Step 2/3: Starting container...${NC}"
docker-compose up -d

if [ $? -ne 0 ]; then
    echo -e "\n${RED}❌ Failed to start container!${NC}"
    echo -e "${YELLOW}Debug with:${NC}"
    echo -e "  docker-compose logs${NC}"
    exit 1
fi

echo -e "${GREEN}[✓] Container started${NC}"

# Wait for service
echo -e "${YELLOW}\n[*] Step 3/3: Waiting for service to be ready...${NC}"
sleep 5

# Check status
echo -e "\n${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ SETUP COMPLETE!${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}\n"

# Display container status
docker-compose ps

# Get IP
IP_ADDRESS=$(hostname -I | awk '{print $1}')

echo -e "\n${BLUE}🌐 Access your portfolio:${NC}"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo -e "   ${YELLOW}http://$IP_ADDRESS:3000${NC}\n"

echo -e "${BLUE}📖 Useful commands:${NC}"
echo -e "   ${YELLOW}docker-compose logs -f${NC}    - View live logs"
echo -e "   ${YELLOW}docker-compose ps${NC}         - Check status"
echo -e "   ${YELLOW}docker-compose restart${NC}    - Restart"
echo -e "   ${YELLOW}docker-compose down${NC}       - Stop container\n"

echo -e "${BLUE}🎮 Try these commands in terminal:${NC}"
echo -e "   ${YELLOW}help      recognize    fsociety    matrix${NC}\n"

echo -e "${YELLOW}[*] Rebuilding after code changes:${NC}"
echo -e "   ${YELLOW}docker-compose down${NC}"
echo -e "   ${YELLOW}docker-compose build --no-cache${NC}"
echo -e "   ${YELLOW}docker-compose up -d${NC}\n"

echo -e "${GREEN}Happy hacking! 🔐🚀${NC}\n"
