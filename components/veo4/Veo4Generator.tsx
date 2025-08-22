"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IMAGE_TO_VIDEO_MODELS } from "@/config/models";
import { cn } from "@/lib/utils";
import { Download, FileUp, Loader2, Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type GenerationMode = "text-to-video" | "image-to-video";

const downloadFileFromUrl = (url: string, filename: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function Veo4Generator() {
  const [mode, setMode] = useState<GenerationMode>("text-to-video");
  const [prompt, setPrompt] = useState("");
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState(
    IMAGE_TO_VIDEO_MODELS[0]?.id
      ? `${IMAGE_TO_VIDEO_MODELS[0].provider}/${IMAGE_TO_VIDEO_MODELS[0].id}`
      : ""
  );
  const [duration, setDuration] = useState<string>("5");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
        setResultVideo(null);
        setError(null);
      };
      reader.onerror = () => {
        toast.error("Failed to read the image file.");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSourceImage(null);
    setResultVideo(null);
    setError(null);
  };

  const parseModelValue = (value: string) => {
    const parts = value.split("/");
    if (parts.length < 2) {
      if (IMAGE_TO_VIDEO_MODELS.length > 0) {
        return {
          provider: IMAGE_TO_VIDEO_MODELS[0].provider,
          modelId: IMAGE_TO_VIDEO_MODELS[0].id,
        };
      }
      throw new Error("No models available");
    }
    const provider = parts[0];
    const modelId = parts.slice(1).join("/");
    return { provider, modelId };
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.warning("Please enter a prompt description.");
      return;
    }
    if (mode === "image-to-video" && !sourceImage) {
      toast.warning("Please upload a source image for image-to-video mode.");
      return;
    }
    if (!selectedModel) {
      toast.warning("Please select a model.");
      return;
    }

    setLoading(true);
    setResultVideo(null);
    setError(null);

    const { provider, modelId } = parseModelValue(selectedModel);
    const durationValue = parseInt(duration, 10);

    try {
      const endpoint = mode === "text-to-video" ? "/api/ai-demo/text-to-video" : "/api/ai-demo/image-to-video";
      const body = mode === "text-to-video" 
        ? {
            prompt: prompt,
            duration: durationValue,
            modelId: modelId,
            provider: provider,
          }
        : {
            image: sourceImage,
            prompt: prompt,
            duration: durationValue,
            modelId: modelId,
            provider: provider,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || `HTTP error! status: ${response.status}`
        );
      }

      if (!result.success) {
        throw new Error(result.error || "Failed to generate video");
      }

      if (result.data?.videoUrl) {
        setResultVideo(result.data.videoUrl);
      } else {
        throw new Error("API did not return a video URL.");
      }
    } catch (err: any) {
      console.error("API call failed:", err);
      const errorMessage = err.message || "Failed to generate video.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getModelDisplayName = (value: string) => {
    if (!value) return "Select a model";
    const { provider, modelId } = parseModelValue(value);
    const model = IMAGE_TO_VIDEO_MODELS.find(
      (m) => m.provider === provider && m.id === modelId
    );
    return model ? `${model.name} (${model.provider})` : "Select a model";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex flex-col xl:flex-row gap-4 lg:gap-6 w-full">
        {/* Left Panel - Controls */}
        <div className="xl:w-2/5 w-full space-y-6">
          <Card className="p-4 lg:p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            {/* Mode Toggle */}
            <div className="mb-6">
              <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <button
                  onClick={() => setMode("text-to-video")}
                  className={cn(
                    "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    mode === "text-to-video"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Text-to-Video
                </button>
                <button
                  onClick={() => setMode("image-to-video")}
                  className={cn(
                    "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    mode === "image-to-video"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Image-to-Video
                </button>
              </div>
            </div>

            {/* Image Upload - Only for Image-to-Video mode */}
            {mode === "image-to-video" && (
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">
                  Upload Image
                </Label>
                {sourceImage ? (
                  <div className="relative border rounded-lg overflow-hidden h-40 bg-gray-50 dark:bg-gray-800">
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 z-10 h-8 w-8"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Image
                      src={sourceImage}
                      alt="Source image"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 h-40 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50/50 dark:bg-gray-800/50">
                    <FileUp className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 text-center">
                      Click to upload an image
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageUpload}
                      disabled={loading}
                    />
                  </label>
                )}
              </div>
            )}

            {/* Prompt Input */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">
                Prompt
              </Label>
              <Textarea
                placeholder={
                  mode === "text-to-video"
                    ? "Be detailed and specific about what you want to see in your video..."
                    : "Describe how the image should animate..."
                }
                className="min-h-24 resize-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
            </div>

            {/* Model Selection */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">
                Model
              </Label>
              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
                disabled={IMAGE_TO_VIDEO_MODELS.length === 0 || loading}
              >
                <SelectTrigger className="bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select a model">
                    {getModelDisplayName(selectedModel)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {IMAGE_TO_VIDEO_MODELS.length === 0 && (
                    <SelectItem value="no-models" disabled>
                      No models available
                    </SelectItem>
                  )}
                  {IMAGE_TO_VIDEO_MODELS.map((model) => (
                    <SelectItem
                      key={`${model.provider}/${model.id}`}
                      value={`${model.provider}/${model.id}`}
                    >
                      {model.name} ({model.provider})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration Selection */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">
                Duration
              </Label>
              <Select
                value={duration}
                onValueChange={setDuration}
                disabled={loading}
              >
                <SelectTrigger className="bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 seconds</SelectItem>
                  <SelectItem value="10">10 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={
                loading || 
                !prompt.trim() || 
                !selectedModel ||
                (mode === "image-to-video" && !sourceImage)
              }
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Video...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Generate Video
                </>
              )}
            </Button>
          </Card>
        </div>

        {/* Right Panel - Preview */}
        <div className="xl:w-3/5 w-full">
          <Card className="p-4 lg:p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg h-full">
            <div className="flex flex-col h-full min-h-[500px] lg:min-h-[600px]">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Video Preview
              </h3>
              
              <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                {loading ? (
                  <div className="flex flex-col items-center justify-center text-center p-8">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Generating your video...
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      This may take a few minutes
                    </p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center text-center text-red-600 p-8">
                    <X className="h-12 w-12 mb-4" />
                    <p className="font-medium">Generation Failed</p>
                    <p className="text-sm mt-1 max-w-xs">{error}</p>
                  </div>
                ) : resultVideo ? (
                  <div className="w-full h-full flex flex-col">
                    <div className="flex-1 relative rounded-lg overflow-hidden bg-black">
                      <video
                        src={resultVideo}
                        controls
                        className="w-full h-full object-contain"
                        autoPlay
                        muted
                        loop
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() =>
                          downloadFileFromUrl(resultVideo, "veo4-generated-video.mp4")
                        }
                        disabled={!resultVideo}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 p-8">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Ready to Generate</p>
                    <p className="text-sm">
                      {mode === "text-to-video" 
                        ? "Enter a detailed prompt and click generate"
                        : "Upload an image, add a prompt, and click generate"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}