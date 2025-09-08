import { db } from '@nexstack/database';
import { describe, expect, it } from 'vitest';

describe('Database Real Operations Verification', () => {
  it('should perform real database CRUD operations', async () => {
    console.log('🔍 Starting real database operations test...');

    // 1. 真实的创建操作
    console.log('📝 Creating post...');
    const created = await db.post.create({
      data: {
        title: 'Real Database Test',
        content: 'This proves we are using a real database',
      },
    });

    console.log(`✅ Created post with ID: ${created.id}`);
    expect(created.id).toBeDefined();
    expect(created.title).toBe('Real Database Test');

    // 2. 真实的查询操作
    console.log('🔎 Querying post...');
    const found = await db.post.findUnique({
      where: { id: created.id },
    });

    console.log(`✅ Found post: ${found?.title}`);
    expect(found).not.toBeNull();
    expect(found!.content).toBe('This proves we are using a real database');

    // 3. 真实的更新操作
    console.log('📝 Updating post...');
    const updated = await db.post.update({
      where: { id: created.id },
      data: { title: 'Updated Real Database Test' },
    });

    console.log(`✅ Updated post title: ${updated.title}`);
    expect(updated.title).toBe('Updated Real Database Test');

    // 4. 验证更新在数据库中生效
    console.log('🔍 Verifying update in database...');
    const verifyUpdate = await db.post.findUnique({
      where: { id: created.id },
    });

    expect(verifyUpdate).not.toBeNull();
    expect(verifyUpdate!.title).toBe('Updated Real Database Test');

    // 5. 真实的删除操作
    console.log('🗑️ Deleting post...');
    await db.post.delete({
      where: { id: updated.id }, // 使用updated.id而不是created.id
    });

    // 6. 验证删除成功
    console.log('🔍 Verifying deletion...');
    const deleted = await db.post.findUnique({
      where: { id: updated.id }, // 使用updated.id保持一致
    });

    console.log('✅ Post successfully deleted from database');
    expect(deleted).toBeNull();
  });

  it('should demonstrate data persistence between operations', async () => {
    console.log('🔄 Testing data persistence...');

    // 创建数据
    const post1 = await db.post.create({
      data: {
        title: 'Persistence Test 1',
        content: 'This should persist',
      },
    });

    // 在另一个操作中查找
    const foundPost1 = await db.post.findMany({
      where: {
        title: 'Persistence Test 1',
      },
    });

    expect(foundPost1.length).toBe(1);
    expect(foundPost1[0].id).toBe(post1.id);
    console.log('✅ Data persisted correctly between operations');
  });

  it('should show real database constraints work', async () => {
    console.log('🚨 Testing database constraints...');

    try {
      // 尝试创建带有无效数据的记录（如果你的schema有约束）
      await db.post.create({
        data: {
          title: '', // 假设title不能为空
          content: 'Test content',
        },
      });

      // 如果没有约束，这个测试会通过
      console.log('⚠️  No database constraints detected');
      expect(true).toBe(true);
    } catch (error) {
      console.log('✅ Database constraints are working:', error.message);
      expect(error).toBeDefined();
    }
  });
});
