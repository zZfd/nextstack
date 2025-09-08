import { appRouter, createContext } from '@nexstack/api'
import { db } from '@nexstack/database'
import { describe, it, expect } from 'vitest'

describe('Post API Integration Tests', () => {
  // 直接创建tRPC caller，绕过test-utils问题
  const caller = appRouter.createCaller(createContext())

  it('should create a post in real database', async () => {
    // 这是真实的数据库写入操作
    const newPost = await caller.post.create({
      title: 'Integration Test Post',
      content: 'This is a real database entry'
    })

    // 验证返回的数据
    expect(newPost.id).toBeDefined()
    expect(newPost.title).toBe('Integration Test Post')
    expect(newPost.content).toBe('This is a real database entry')

    // 直接从数据库验证数据真实存在
    const dbPost = await db.post.findUnique({
      where: { id: newPost.id }
    })
    
    expect(dbPost).not.toBeNull()
    expect(dbPost!.title).toBe('Integration Test Post')
    expect(dbPost!.content).toBe('This is a real database entry')
  })

  it('should retrieve all posts from real database', async () => {
    // 先在数据库中创建测试数据
    const testPost1 = await db.post.create({
      data: {
        title: 'Test Post 1',
        content: 'Content 1'
      }
    })
    
    const testPost2 = await db.post.create({
      data: {
        title: 'Test Post 2', 
        content: 'Content 2'
      }
    })

    // 通过 tRPC 获取数据
    const posts = await caller.post.all()

    // 验证真实的数据库查询结果 - 应该至少包含我们刚创建的2个
    expect(posts.length).toBeGreaterThanOrEqual(2)
    
    // 检查我们创建的测试数据是否存在
    const foundPost1 = posts.find(p => p.id === testPost1.id)
    const foundPost2 = posts.find(p => p.id === testPost2.id)
    
    expect(foundPost1).toBeDefined()
    expect(foundPost1?.title).toBe('Test Post 1')
    expect(foundPost2).toBeDefined()
    expect(foundPost2?.title).toBe('Test Post 2')
    
    // 验证总数是否正确（这个测试应该包含我们的测试数据）
    const ourTestPosts = posts.filter(p => 
      p.title === 'Test Post 1' || p.title === 'Test Post 2'
    )
    expect(ourTestPosts).toHaveLength(2)
  })

  it('should retrieve specific post by ID from real database', async () => {
    // 先创建一个真实的数据库记录
    const createdPost = await db.post.create({
      data: {
        title: 'Specific Test Post',
        content: 'Specific test content'
      }
    })

    // 通过 tRPC 根据 ID 查询
    const foundPost = await caller.post.byId(createdPost.id)

    // 验证查询结果
    expect(foundPost).not.toBeNull()
    expect(foundPost!.id).toBe(createdPost.id)
    expect(foundPost!.title).toBe('Specific Test Post')
    expect(foundPost!.content).toBe('Specific test content')
  })

  it('should return null when post does not exist', async () => {
    // 查询一个不存在的 ID
    const nonExistentId = 'non-existent-id'
    const foundPost = await caller.post.byId(nonExistentId)

    expect(foundPost).toBeNull()
  })
})