/**
 * Cloudflare Pages Function for AI single chat
 * Converts Next.js API route to Cloudflare Workers format with edge runtime
 */

import { apiResponse } from "@/lib/api-response";
import { anthropic } from "@ai-sdk/anthropic";
import { deepseek } from "@ai-sdk/deepseek";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { xai } from "@ai-sdk/xai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  LanguageModel,
  streamText
} from "ai";
import { z } from 'zod';

const inputSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty"),
  modelId: z.string().min(1, "Model ID cannot be empty"),
  provider: z.string().min(1, "Provider cannot be empty"),
});

export async function onRequestPost(context: { request: Request; env: any }) {
  const { request, env } = context;

  // Set environment variables from Cloudflare
  if (env) {
    Object.entries(env).forEach(([key, value]) => {
      if (typeof value === 'string') {
        process.env[key] = value;
      }
    });
  }

  if (process.env.NODE_ENV === "production") {
    return apiResponse.badRequest("This page is only for administrators to test locally. Please purchase nexty.dev to test it yourself.");
  }

  try {
    const rawBody = await request.json();

    const validationResult = inputSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return apiResponse.badRequest(`Invalid input: ${validationResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
    }

    const { prompt, modelId, provider } = validationResult.data;

    let textModel: LanguageModel;

    switch (provider) {
      case "openai":
        if (!process.env.OPENAI_API_KEY) {
          return apiResponse.serverError("Server configuration error: Missing OpenAI API Key.");
        }
        textModel = openai(modelId);
        break;

      case "anthropic":
        if (!process.env.ANTHROPIC_API_KEY) {
          return apiResponse.serverError("Server configuration error: Missing Anthropic API Key.");
        }
        textModel = anthropic(modelId);
        break;

      case "google":
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
          return apiResponse.serverError("Server configuration error: Missing Google API Key.");
        }
        textModel = google(modelId);
        break;

      case "deepseek":
        if (!process.env.DEEPSEEK_API_KEY) {
          return apiResponse.serverError("Server configuration error: Missing DeepSeek API Key.");
        }
        textModel = deepseek(modelId);
        break;

      case "xai":
        if (!process.env.XAI_API_KEY) {
          return apiResponse.serverError("Server configuration error: Missing XAI API Key.");
        }
        textModel = xai(modelId);
        break;

      case "openrouter":
        if (!process.env.OPENROUTER_API_KEY) {
          return apiResponse.serverError("Server configuration error: Missing OpenRouter API Key.");
        }
        const openrouterProvider = createOpenRouter({
          apiKey: process.env.OPENROUTER_API_KEY,
        });
        textModel = openrouterProvider.chat(modelId);
        break;

      default:
        return apiResponse.badRequest("Invalid provider");
    }

    const result = await streamText({
      model: textModel,
      prompt: prompt,
    });

    return result.toDataStreamResponse({
      sendReasoning: true,
    });

  } catch (error: any) {
    console.error("Chat generation failed:", error);
    const errorMessage = error?.message || "Failed to generate response";
    if (errorMessage.includes("API key")) {
      return apiResponse.serverError(`Server configuration error: ${errorMessage}`);
    }
    return apiResponse.serverError(errorMessage);
  }
}