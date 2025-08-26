"use client";

import { Button } from "@/components/ui/button";
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
    const model = IMAGE_TO_VIDEO_MODELS.find(m => `${m.provider}/${m.id}` === value);
    if (!model) {
      const defaultModel = IMAGE_TO_VIDEO_MODELS[0];
      if (!defaultModel) throw new Error("No models available");
      return { provider: defaultModel.provider, modelId: defaultModel.id };
    }
    return { provider: model.provider, modelId: model.id };
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
    const model = IMAGE_TO_VIDEO_MODELS.find(m => `${m.provider}/${m.id}` === value);
    return model ? `${model.name} (${model.provider})` : "Select a model";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen w-full bg-bgMain text-textMain relative overflow-hidden">

      {/* 主内容区域 */}
      <div className="relative z-10 w-full min-w-[100vw] min-h-screen flex overflow-x-hidden">
        {/* 左侧：控制栏 */}
        <div className="w-[400px] p-6 flex flex-col gap-4 bg-bgCard border-r border-borderSubtle">
          
          {/* Tabs */}
          <div className="flex w-full">
            <button
              onClick={() => setMode("text-to-video")}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                mode === "text-to-video"
                  ? "bg-primaryBlue text-textMain shadow-sm"
                  : "text-textSubtle hover:bg-bgMain hover:text-textMain"
              )}
            >
              Text-to-Video
            </button>
            <button
              onClick={() => setMode("image-to-video")}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                mode === "image-to-video"
                  ? "bg-primaryBlue text-textMain shadow-sm"
                  : "text-textSubtle hover:bg-bgMain hover:text-textMain"
              )}
            >
              Image-to-Video
            </button>
          </div>

          {/* Image Upload - Only for Image-to-Video mode */}
          {mode === "image-to-video" && (
            <div>
              {sourceImage ? (
                <div className="relative border border-borderSubtle rounded-md overflow-hidden h-32 bg-bgMain group">
                  <Button
                    size="icon"
                    className="absolute top-2 right-2 z-10 h-6 w-6 bg-red-500 hover:bg-red-600 text-white rounded-full"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <Image
                    src={sourceImage}
                    alt="Source image"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <label className="border-2 border-dashed border-borderSubtle rounded-md p-4 h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primaryBlue transition-colors bg-bgMain">
                  <FileUp className="h-6 w-6 text-textSubtle mb-2" />
                  <span className="text-sm text-textSubtle text-center">
                    Click to upload image
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

          {/* Prompt */}
          <div>
            <Textarea
              placeholder={
                mode === "text-to-video"
                  ? "Be detailed and specific about what you want to see in your video..."
                  : "Describe how the image should animate..."
              }
              className="h-40 w-full rounded-md border border-borderSubtle bg-bgMain p-2 text-sm font-medium text-textMain placeholder:text-textSubtle outline-none focus:ring-1 focus:ring-primaryBlue"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
          </div>

          {/* Model Selection */}
          <div>
            <Select
              value={selectedModel}
              onValueChange={setSelectedModel}
              disabled={IMAGE_TO_VIDEO_MODELS.length === 0 || loading}
            >
              <SelectTrigger className="h-10 w-full rounded-md border border-borderSubtle bg-bgMain p-2 text-sm font-medium text-textMain outline-none focus:ring-1 focus:ring-primaryBlue">
                <SelectValue placeholder="Select a model">
                  {getModelDisplayName(selectedModel)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-bgCard border-borderSubtle">
                {IMAGE_TO_VIDEO_MODELS.length === 0 && (
                  <SelectItem value="no-models" disabled className="text-textSubtle">
                    No models available
                  </SelectItem>
                )}
                {IMAGE_TO_VIDEO_MODELS.map((model) => (
                  <SelectItem
                    key={`${model.provider}/${model.id}`}
                    value={`${model.provider}/${model.id}`}
                    className="text-textMain hover:bg-bgMain"
                  >
                    {model.name} ({model.provider})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration Selection */}
          <div>
            <Select
              value={duration}
              onValueChange={setDuration}
              disabled={loading}
            >
              <SelectTrigger className="h-10 w-full rounded-md border border-borderSubtle bg-bgMain p-2 text-sm font-medium text-textMain outline-none focus:ring-1 focus:ring-primaryBlue">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-bgCard border-borderSubtle">
                <SelectItem value="5" className="text-textMain hover:bg-bgMain">5 seconds</SelectItem>
                <SelectItem value="10" className="text-textMain hover:bg-bgMain">10 seconds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <div>
            <Button
              onClick={handleGenerate}
              disabled={
                loading || 
                !prompt.trim() || 
                !selectedModel ||
                (mode === "image-to-video" && !sourceImage)
              }
              className="w-full h-12"
              variant="primaryBlue"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Generate Video
                </>
              )}
            </Button>
          </div>

        </div>

        {/* 右侧：预览区域 */}
        <div className="flex-1 p-10 flex flex-col items-center justify-center bg-bgMain">
          <div className="w-full max-w-4xl">
            <h3 className="text-lg font-semibold mb-6 text-textMain">
              Video Preview
            </h3>
            
            <div className="flex items-center justify-center bg-bgCard border border-borderSubtle rounded-lg min-h-[600px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <Loader2 className="h-12 w-12 animate-spin text-primaryBlue mb-4" />
                  <p className="text-textMain font-medium">
                    Generating your video...
                  </p>
                  <p className="text-textSubtle text-sm mt-1">
                    This may take a few minutes
                  </p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <X className="h-12 w-12 text-red-500 mb-4" />
                  <p className="text-red-500 font-medium">Generation Failed</p>
                  <p className="text-textSubtle text-sm mt-1 max-w-xs">{error}</p>
                  <Button 
                    onClick={handleGenerate}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-textMain"
                  >
                    Try Again
                  </Button>
                </div>
              ) : resultVideo ? (
                <div className="w-full">
                  <div className="relative rounded-lg overflow-hidden bg-bgMain mb-6">
                    <video
                      src={resultVideo}
                      controls
                      className="w-full h-auto max-h-[500px] object-contain"
                      autoPlay
                      muted
                      loop
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onClick={() =>
                        downloadFileFromUrl(resultVideo, "veo4-generated-video.mp4")
                      }
                      disabled={!resultVideo}
                      className="bg-green-600 hover:bg-green-700 text-textMain font-medium px-6 py-3 rounded-xl"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Video
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-textSubtle p-8">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-textMain font-medium mb-2 text-lg">Ready to Generate</p>
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
        </div>
      </div>
    </div>
  );
}