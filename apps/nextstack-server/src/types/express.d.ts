// Type augmentation for Express Request interface
declare namespace Express {
  interface Request {
    requestId: string;
  }
}
