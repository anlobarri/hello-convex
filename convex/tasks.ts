import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const create = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
      const taskId = await ctx.db.insert("tasks", { text: args.text, isCompleted: false });
      return taskId;
    },
  });

export const remove = mutation({
    args: { taskId: v.id("tasks") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.taskId);
    },
  });

export const setCompleted = mutation({
    args: { taskId: v.id("tasks"), isCompleted: v.boolean() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.taskId, { isCompleted: args.isCompleted });
    },
});

