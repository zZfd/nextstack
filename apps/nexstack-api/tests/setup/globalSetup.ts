import { exec } from 'child_process'
import { promisify } from 'util'
import dotenv from 'dotenv'
import path from 'path'

const execAsync = promisify(exec)

export default async function setup() {
  console.log('🏗️  Setting up test database...')
  
  // 加载测试环境配置
  dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
  
  // 创建测试数据库
  const testDbName = 'nexstack_test'
  
  try {
    // 1. 尝试创建测试数据库（如果不存在）
    console.log('📦 Creating test database if not exists...')
    await execAsync(`createdb -h localhost -p 5433 -U nexstack_user ${testDbName} || echo "Database might already exist"`)
    
    // 2. 确保环境变量正确设置
    process.env.DATABASE_URL = `postgresql://nexstack_user:nexstack_password@localhost:5433/${testDbName}`
    process.env.NODE_ENV = 'test'
    
    // 3. 运行数据库迁移
    console.log('🔄 Running database migrations...')
    await execAsync('cd ../../packages/database && pnpm db:push', {
      env: {
        ...process.env,
        DATABASE_URL: `postgresql://nexstack_user:nexstack_password@localhost:5433/${testDbName}`
      }
    })
    
    console.log('✅ Test database setup completed')
  } catch (error) {
    console.error('❌ Test database setup failed:', error)
    console.log('💡 Make sure Docker PostgreSQL is running: docker-compose up -d db')
    throw error
  }
}