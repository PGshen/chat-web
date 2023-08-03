# 使用一个基本的 Node.js 镜像
FROM --platform=linux/amd64 node:alpine

# 设置工作目录
WORKDIR /app

# 将项目文件复制到工作目录
COPY . .

# 安装pnpm
RUN npm install -g pnpm
# 安装项目的依赖
RUN pnpm install

# 构建项目
RUN pnpm run build

# 暴露项目的端口
EXPOSE 3000

# 启动项目
CMD ["pnpm", "run", "preview"]
