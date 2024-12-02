import type { Express } from "express";

export function registerRoutes(app: Express) {
  app.get("/api/health", (_, res) => {
    res.json({ status: "ok" });
  });
}
