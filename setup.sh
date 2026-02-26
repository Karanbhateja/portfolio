#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  🚀 HACKER PORTFOLIO - DOCKER SETUP SCRIPT${NC}"
echo -e "${BLUE}================================================${NC}\n"

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
    echo -e "${GREEN}[+] Docker is installed${NC}"
    docker --version
fi

# Check if Docker Compose is installed
echo -e "${YELLOW}\n[*] Checking Docker Compose installation...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}[!] Docker Compose is not installed!${NC}"
    echo "Installing Docker Compose..."
    sudo apt-get update
    sudo apt-get install docker-compose -y
    echo -e "${GREEN}[+] Docker Compose installed successfully!${NC}"
else
    echo -e "${GREEN}[+] Docker Compose is installed${NC}"
    docker-compose --version
fi

# Create project directory
echo -e "${YELLOW}\n[*] Creating project directory...${NC}"
PROJECT_DIR="$HOME/hacker-portfolio"
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Create subdirectories
mkdir -p src/components public

echo -e "${GREEN}[+] Project directory created at: $PROJECT_DIR${NC}"

# Check if files exist
echo -e "${YELLOW}\n[*] Checking required files...${NC}"
REQUIRED_FILES=("package.json" "Dockerfile" "docker-compose.yml" ".dockerignore" "public/index.html" "src/index.js" "src/App.js" "src/components/HackerPortfolio.jsx")

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}[+] $file found${NC}"
    else
        echo -e "${YELLOW}[!] $file not found - please ensure all files are copied${NC}"
    fi
done

# Build Docker image
echo -e "${YELLOW}\n[*] Building Docker image...${NC}"
echo "This may take 10-15 minutes on Raspberry Pi (first build only)"
docker-compose build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}[+] Docker image built successfully!${NC}"
else
    echo -e "${RED}[!] Failed to build Docker image${NC}"
    exit 1
fi

# Start container
echo -e "${YELLOW}\n[*] Starting container...${NC}"
docker-compose up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}[+] Container started successfully!${NC}"
else
    echo -e "${RED}[!] Failed to start container${NC}"
    exit 1
fi

# Get IP address
echo -e "${YELLOW}\n[*] Getting system information...${NC}"
IP_ADDRESS=$(hostname -I | awk '{print $1}')

# Wait for service to be ready
echo -e "${YELLOW}\n[*] Waiting for service to start (this takes ~30 seconds)...${NC}"
sleep 5

# Check service status
docker-compose ps

echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}✅ SETUP COMPLETE!${NC}"
echo -e "${GREEN}================================================${NC}\n"

echo -e "${BLUE}📍 Access your portfolio at:${NC}"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo -e "   ${YELLOW}http://$IP_ADDRESS:3000${NC}\n"

echo -e "${BLUE}📊 Useful commands:${NC}"
echo -e "   ${YELLOW}docker-compose logs -f${NC}          - View live logs"
echo -e "   ${YELLOW}docker-compose ps${NC}}              - Check status"
echo -e "   ${YELLOW}docker-compose restart${NC}}         - Restart container"
echo -e "   ${YELLOW}docker-compose down${NC}}            - Stop container\n"

echo -e "${BLUE}🎮 Try these commands in the terminal:${NC}"
echo -e "   ${YELLOW}help${NC}       - List all commands"
echo -e "   ${YELLOW}portfolio${NC}   - View projects"
echo -e "   ${YELLOW}recognize${NC}   - Find Mr. Robot easter egg"
echo -e "   ${YELLOW}fsociety${NC}    - Unlock hidden content\n"

echo -e "${BLUE}📖 For detailed setup guide, see:${NC}"
echo -e "   ${YELLOW}DOCKER_SETUP_GUIDE.md${NC}\n"

echo -e "${YELLOW}[*] First build takes 10-15 minutes${NC}"
echo -e "${YELLOW}[*] Check logs if service doesn't start: docker-compose logs${NC}\n"

echo -e "${GREEN}Happy hacking! 🔐🚀${NC}\n"
