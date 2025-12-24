export default {
  prisma: {
    schema: "prisma/schema.prisma",
  },
  datasource: {
    provider: "mysql",
    url: process.env.DATABASE_URL,
  },
};
