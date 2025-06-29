#!/bin/bash

# Tempo Pomodoro Production Deployment Script
# This script handles the complete deployment process

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="tempo-pomodoro"
DOCKER_IMAGE="tempo-pomodoro"
DOCKER_TAG="latest"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    # Check if Docker Compose is installed
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    # Check if .env files exist
    if [ ! -f "server/.env" ]; then
        log_warning "Server .env file not found. Creating from example..."
        cp server/env.example server/.env
        log_warning "Please update server/.env with your production values"
    fi
    
    if [ ! -f "client/.env" ]; then
        log_warning "Client .env file not found. Creating from example..."
        cp client/env.example client/.env
        log_warning "Please update client/.env with your production values"
    fi
    
    log_success "Prerequisites check completed"
}

build_application() {
    log_info "Building application..."
    
    # Build Docker images
    docker-compose build --no-cache
    
    log_success "Application build completed"
}

deploy_application() {
    log_info "Deploying application..."
    
    # Stop existing containers
    docker-compose down
    
    # Start new containers
    docker-compose up -d
    
    # Wait for services to be ready
    log_info "Waiting for services to be ready..."
    sleep 30
    
    # Check if services are running
    if docker-compose ps | grep -q "Up"; then
        log_success "Application deployed successfully"
    else
        log_error "Application deployment failed"
        docker-compose logs
        exit 1
    fi
}

run_migrations() {
    log_info "Running database migrations..."
    
    # Run migrations
    docker-compose exec server npx prisma migrate deploy
    
    log_success "Database migrations completed"
}

health_check() {
    log_info "Performing health check..."
    
    # Wait a bit for services to fully start
    sleep 10
    
    # Check if the API is responding
    if curl -f http://localhost:3001/api/v1/health > /dev/null 2>&1; then
        log_success "API health check passed"
    else
        log_warning "API health check failed - this might be normal if health endpoint is not implemented"
    fi
    
    # Check if the frontend is responding
    if curl -f http://localhost:5173 > /dev/null 2>&1; then
        log_success "Frontend health check passed"
    else
        log_warning "Frontend health check failed - this might be normal if not accessible directly"
    fi
}

show_status() {
    log_info "Application status:"
    docker-compose ps
    
    log_info "Application URLs:"
    echo "Frontend: http://localhost:5173"
    echo "Backend API: http://localhost:3001"
    echo "Database: localhost:5432"
    
    log_info "Useful commands:"
    echo "View logs: docker-compose logs -f"
    echo "Stop application: docker-compose down"
    echo "Restart application: docker-compose restart"
}

cleanup() {
    log_info "Cleaning up..."
    
    # Remove unused Docker images
    docker image prune -f
    
    # Remove unused Docker volumes
    docker volume prune -f
    
    log_success "Cleanup completed"
}

# Main deployment process
main() {
    log_info "Starting Tempo Pomodoro deployment..."
    
    check_prerequisites
    build_application
    deploy_application
    run_migrations
    health_check
    cleanup
    show_status
    
    log_success "Deployment completed successfully!"
}

# Handle script arguments
case "${1:-}" in
    "build")
        check_prerequisites
        build_application
        ;;
    "deploy")
        deploy_application
        ;;
    "migrate")
        run_migrations
        ;;
    "health")
        health_check
        ;;
    "status")
        show_status
        ;;
    "cleanup")
        cleanup
        ;;
    "stop")
        docker-compose down
        log_success "Application stopped"
        ;;
    "logs")
        docker-compose logs -f
        ;;
    "restart")
        docker-compose restart
        log_success "Application restarted"
        ;;
    *)
        main
        ;;
esac 