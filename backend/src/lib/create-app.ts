//hono create-app router

import { Hono } from "hono";

export const createRouter = () => {
  return new Hono();
};

export default {
  createRouter,
};
