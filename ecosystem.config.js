module.exports = {
  apps: [
    {
      PORT: 4000, // 自定义端口
      name: 'blog-next', // 应用程序名称
      script: 'npm', // 要执行的脚本
      args: 'start', // 传递给脚本的参数
      instances: 1, // 实例数量
      autorestart: true, // 自动重启
      watch: false, // 是否监听文件变化
      max_memory_restart: '1G', // 内存限制，超过该限制自动重启
      env: {
        NODE_ENV: 'production' // 环境变量
      }
    }
  ]
}
