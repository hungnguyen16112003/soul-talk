# Hướng dẫn chạy ứng dụng với Docker

## Yêu cầu
- Docker Desktop (Windows/Mac) hoặc Docker Engine (Linux)
- Docker Compose V2 (thường đi kèm với Docker Desktop)

## Cài đặt Docker

### Windows
1. Tải Docker Desktop: https://www.docker.com/products/docker-desktop
2. Cài đặt và khởi động Docker Desktop
3. Đảm bảo Docker đang chạy (icon Docker trong system tray)

### Mac
1. Tải Docker Desktop: https://www.docker.com/products/docker-desktop
2. Cài đặt và khởi động Docker Desktop

### Linux
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Hoặc cài Docker Compose V2
sudo apt-get install docker-compose-plugin
```

## Chạy ứng dụng

### Cách 1: Sử dụng Docker Compose (Khuyến nghị)
```bash
# Build và chạy
docker compose up -d --build

# Xem logs
docker compose logs -f

# Dừng
docker compose down

# Dừng và xóa volumes
docker compose down -v
```

### Cách 2: Sử dụng Docker trực tiếp
```bash
# Build image
docker build -t soul-talk .

# Chạy container
docker run -d -p 80:80 --name soul-talk-app soul-talk

# Xem logs
docker logs -f soul-talk-app

# Dừng container
docker stop soul-talk-app

# Xóa container
docker rm soul-talk-app
```

## Kiểm tra

1. **Truy cập ứng dụng:**
   - http://localhost
   - http://localhost:80

2. **Kiểm tra health:**
   - http://localhost/health

3. **Kiểm tra container đang chạy:**
   ```bash
   docker ps
   ```

4. **Kiểm tra logs:**
   ```bash
   docker compose logs soul-talk
   ```

## Troubleshooting

### Port 80 đã được sử dụng
Nếu port 80 đã bị chiếm, sửa `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Thay đổi 8080 thành port khác nếu cần
```

Sau đó truy cập: http://localhost:8080

### Lỗi permission (Linux)
```bash
sudo usermod -aG docker $USER
# Đăng xuất và đăng nhập lại
```

### Xóa và build lại từ đầu
```bash
docker compose down -v
docker compose build --no-cache
docker compose up -d
```





