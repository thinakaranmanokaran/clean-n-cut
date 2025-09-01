import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Loader2, Image as ImageIcon, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const BackgroundRemoverSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    setFile(file); // 🔑 save the actual File for remove.bg API

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setProcessedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async () => {
    if (!file) return; // use actual File, not just preview

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("image_file", file);

    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": "tHXZU2CW25YNUcwunupNkzUr", // ⚠️ replace with env variable in production
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Background removal failed");

      const blob = await response.blob();
      const outputUrl = URL.createObjectURL(blob);
      setProcessedImage(outputUrl);

      toast({
        title: "Background removed successfully!",
        description: "Your image is ready for download.",
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'background-removed.png';
      link.click();
    }
  };

  const resetTool = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="background-remover" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Background Remover</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload your image and watch our AI work its magic. Professional results in seconds.
          </p>
        </motion.div>

        {!originalImage ? (
          /* Upload Section */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card
              className={`border-2 border-dashed transition-all duration-300 ${isDragging
                ? 'border-primary bg-primary-glow/20 shadow-medium'
                : 'border-border hover:border-primary/50 shadow-soft hover:shadow-medium'
                }`}
            >
              <CardContent
                className="p-16 text-center cursor-pointer"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <motion.div
                  animate={{ y: isDragging ? -10 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6">
                    <Upload className="h-10 w-10 text-primary-foreground" />
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">
                    Drop your image here, or{" "}
                    <span className="text-primary hover:underline">browse</span>
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    Supports JPG, PNG, WEBP up to 10MB
                  </p>

                  <Button variant="outline" size="lg">
                    <Upload className="mr-2 h-5 w-5" />
                    Select Image
                  </Button>
                </motion.div>
              </CardContent>
            </Card>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </motion.div>
        ) : (
          /* Processing Section */
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Original Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <ImageIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="font-medium">Original Image</span>
                    </div>
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={originalImage}
                        alt="Original"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Processed Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {processedImage ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                          <span className="font-medium">Background Removed</span>
                        </>
                      ) : (
                        <>
                          { isProcessing && <Loader2 className={`h-5 w-5 mr-2 ${isProcessing ? 'animate-spin text-primary' : 'text-muted-foreground'}`} />}
                          <span className="font-medium">{isProcessing ?  "Processing..." : "Click below to Start"}</span>
                        </>
                      )}
                    </div>
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted bg-[linear-gradient(45deg,_#f0f0f0_25%,_transparent_25%),linear-gradient(-45deg,_#f0f0f0_25%,_transparent_25%),linear-gradient(45deg,_transparent_75%,_#f0f0f0_75%),linear-gradient(-45deg,_transparent_75%,_#f0f0f0_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]">
                      {processedImage ? (
                        <motion.img
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          src={processedImage}
                          alt="Processed"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {isProcessing ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <Loader2 className="h-12 w-12 text-primary" />
                            </motion.div>
                          ) : (
                            <div className="text-muted-foreground text-center">
                              <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                              <p>Click process to start</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              {!processedImage ? (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={processImage}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Loader2 className="mr-2 h-5 w-5" />
                      Remove Background
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={downloadImage}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Result
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                onClick={resetTool}
              >
                Try Another Image
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};