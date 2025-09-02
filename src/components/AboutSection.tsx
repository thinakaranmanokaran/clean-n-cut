import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process your images in under 3 seconds with our optimized AI algorithms."
  },
  {
    icon: Target,
    title: "Pixel Perfect",
    description: "99.9% accuracy rate ensuring clean, professional results every time."
  },
  {
    icon: Sparkles,
    title: "Effortlessly Simple",
    description: "Just drag, drop, and download. No technical skills required."
  }
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About Our <span className="bg-gradient-primary bg-clip-text text-transparent">Tool</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our AI-powered background remover uses cutting-edge machine learning to deliver 
            professional-quality results instantly. Perfect for e-commerce, social media, 
            and creative projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-secondary">
                <CardContent className="p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6"
                  >
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            How It <span className="bg-gradient-primary bg-clip-text text-transparent">Works</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload", description: "Drag and drop your image or click to browse" },
              { step: "02", title: "Process", description: "Our AI analyzes and removes the background" },
              { step: "03", title: "Download", description: "Get your professional result instantly" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="relative">
                  <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                
                {index < 2 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                    viewport={{ once: true }}
                    className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-primary transform origin-left"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};