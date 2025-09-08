export default async function teardown() {
  console.log('🧹 Starting test cleanup...')
  
  try {
    // 动态导入数据库连接，避免模块解析问题
    const { db } = await import('@nexstack/database')
    
    // 1. 关闭Prisma数据库连接
    console.log('🔌 Closing database connections...')
    await db.$disconnect()
    console.log('✅ Database connections closed')
    
    // 2. 清理测试数据库（可选 - 保留数据用于调试）
    // 如果需要完全清理测试数据库，取消注释以下代码
    // console.log('🗑️  Cleaning up test database...')
    // await db.$executeRaw`TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE;`
    // console.log('✅ Test database cleaned')
    
    // 3. 等待所有异步操作完成
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // 4. 清理环境变量
    delete process.env.DATABASE_URL
    delete process.env.NODE_ENV
    
    console.log('✅ Test cleanup completed successfully')
  } catch (error) {
    console.error('❌ Error during test cleanup:', error)
    console.error('   This is not critical and won\'t fail the tests')
    // 即使清理失败，也不应该让测试失败
    process.exitCode = 0
  }
  
  // 5. 强制垃圾回收（如果可用）
  if (global.gc) {
    global.gc()
    console.log('♻️  Memory garbage collected')
  }
}