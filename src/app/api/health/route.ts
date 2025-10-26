import { NextResponse } from "next/server";

export async function GET() {
  try {
    const healthCheck = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      server: "Next.js Frontend Server",
      uptime: `${process.uptime().toFixed(2)} seconds`,
      memory: {
        rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      },
      environment: process.env.NODE_ENV || "development",
      nodeVersion: process.version,
    };

    return NextResponse.json(healthCheck, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        server: "Next.js Frontend Server",
        error: "Server health check failed",
      },
      { status: 503 }
    );
  }
}
