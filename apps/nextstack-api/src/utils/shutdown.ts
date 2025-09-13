import type { Server } from 'http';
import type { Socket } from 'net';

/**
 * Graceful shutdown handler
 * Handles SIGTERM and SIGINT signals to shut down the server gracefully
 */
export class GracefulShutdown {
  private server: Server;
  private isShuttingDown = false;
  private connections = new Set<Socket>();
  private timeoutMs: number;

  constructor(server: Server, timeoutMs: number = 30000) {
    this.server = server;
    this.timeoutMs = timeoutMs;
    this.setupConnectionTracking();
    this.setupSignalHandlers();
  }

  private setupConnectionTracking() {
    // Track all connections
    this.server.on('connection', (connection) => {
      this.connections.add(connection);

      connection.on('close', () => {
        this.connections.delete(connection);
      });
    });
  }

  private setupSignalHandlers() {
    // Handle SIGTERM (Docker, Kubernetes, etc.)
    process.on('SIGTERM', () => {
      console.log('Received SIGTERM signal, starting graceful shutdown...');
      this.shutdown('SIGTERM');
    });

    // Handle SIGINT (Ctrl+C)
    process.on('SIGINT', () => {
      console.log('Received SIGINT signal, starting graceful shutdown...');
      this.shutdown('SIGINT');
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      this.shutdown('UNCAUGHT_EXCEPTION');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Promise Rejection:', reason);
      console.error('Promise:', promise);
      this.shutdown('UNHANDLED_REJECTION');
    });
  }

  private async shutdown(signal: string) {
    if (this.isShuttingDown) {
      console.log('Shutdown already in progress...');
      return;
    }

    this.isShuttingDown = true;
    console.log(`Starting graceful shutdown due to ${signal}...`);

    const shutdownTimeout = setTimeout(() => {
      console.error(`Graceful shutdown timeout after ${this.timeoutMs}ms, forcing exit`);
      this.forceShutdown();
    }, this.timeoutMs);

    try {
      // Stop accepting new connections
      console.log('Stopping server from accepting new connections...');
      this.server.close(() => {
        console.log('Server stopped accepting new connections');
        clearTimeout(shutdownTimeout);
        this.exit(0);
      });

      // Close existing connections gracefully
      if (this.connections.size > 0) {
        console.log(`Closing ${this.connections.size} existing connections...`);

        // Give connections time to finish naturally
        setTimeout(() => {
          this.connections.forEach((connection) => {
            if (!connection.destroyed) {
              connection.destroy();
            }
          });
        }, 5000); // Wait 5 seconds before forcing connection closure
      }

      // Add any cleanup tasks here
      await this.performCleanup();

    } catch (error) {
      console.error('Error during graceful shutdown:', error);
      clearTimeout(shutdownTimeout);
      this.forceShutdown();
    }
  }

  private async performCleanup(): Promise<void> {
    console.log('Performing cleanup tasks...');

    try {
      // Add any cleanup logic here:
      // - Close database connections
      // - Clear caches
      // - Save pending data
      // - etc.

      console.log('Cleanup completed successfully');
    } catch (error) {
      console.error('Error during cleanup:', error);
      throw error;
    }
  }

  private forceShutdown() {
    console.log('Forcing immediate shutdown...');
    this.exit(1);
  }

  private exit(code: number) {
    console.log(`Exiting with code ${code}`);
    process.exit(code);
  }
}

/**
 * Initialize graceful shutdown for the given server
 */
export function setupGracefulShutdown(server: Server, timeoutMs?: number): GracefulShutdown {
  return new GracefulShutdown(server, timeoutMs);
}