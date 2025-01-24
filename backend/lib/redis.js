import Redis from "ioredis";

export const redis = new Redis({
  host: "redis-16796.c265.us-east-1-2.ec2.redns.redis-cloud.com",
  port: 16796,
  password: "zuZFteAGEn8Yl6QRtvIWlBmB14YOEsva",
});

redis.on("connect", () => {
  console.log("Connected to Redis successfully");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});
