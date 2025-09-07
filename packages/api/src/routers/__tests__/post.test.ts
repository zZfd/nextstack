import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { postRouter } from '../post';
import { createCallerFactory } from '@trpc/server';

// Mock database
const mockDb = {
  post: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

// Create router caller
const createCaller = createCallerFactory(postRouter);

describe('Post Router', () => {
  let caller: ReturnType<typeof createCaller>;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create caller with mock context
    caller = createCaller({
      db: mockDb,
    });
  });

  describe('all', () => {
    it('should return all posts', async () => {
      const mockPosts = [
        { id: '1', title: 'Test Post 1', content: 'Content 1' },
        { id: '2', title: 'Test Post 2', content: 'Content 2' },
      ];
      
      mockDb.post.findMany.mockResolvedValue(mockPosts);

      const result = await caller.all();

      expect(result).toEqual(mockPosts);
      expect(mockDb.post.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('byId', () => {
    it('should return post by id', async () => {
      const mockPost = { id: '1', title: 'Test Post', content: 'Test Content' };
      const postId = '1';
      
      mockDb.post.findFirst.mockResolvedValue(mockPost);

      const result = await caller.byId(postId);

      expect(result).toEqual(mockPost);
      expect(mockDb.post.findFirst).toHaveBeenCalledWith({ 
        where: { id: postId } 
      });
    });

    it('should return null for non-existent post', async () => {
      mockDb.post.findFirst.mockResolvedValue(null);

      const result = await caller.byId('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const inputData = { title: 'New Post', content: 'New Content' };
      const mockCreatedPost = { id: '3', ...inputData };
      
      mockDb.post.create.mockResolvedValue(mockCreatedPost);

      const result = await caller.create(inputData);

      expect(result).toEqual(mockCreatedPost);
      expect(mockDb.post.create).toHaveBeenCalledWith({ 
        data: inputData 
      });
    });

    it('should validate input data', async () => {
      // Test with invalid input
      await expect(
        caller.create({ title: '', content: '' })
      ).rejects.toThrow();
    });
  });
});