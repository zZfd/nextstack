import path from 'path'

import { db } from '@nexstack/database'
import dotenv from 'dotenv'
import { beforeEach, afterEach } from 'vitest'


// 加载测试环境配置
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })

beforeEach(async () => {
  // 清理所有表的数据，但保留表结构
  // 这确保每个测试都从干净的状态开始
  await db.$transaction([
    db.post.deleteMany(), // 真实的数据库删除操作
    // 当你添加更多表时，在这里添加清理操作
  ])
})

afterEach(async () => {
  // 测试后的清理（可选）
  // 主要用于确保测试数据不会影响后续测试
})