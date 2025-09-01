import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, Megaphone, Camera, Palette, Globe } from "lucide-react";

const services = [
  {
    icon: ShoppingBag,
    title: "E-commerce Product Photos",
    description: "Create clean, professional product images that boost sales and conversions.",
    color: "from-blue-500 to-purple-600"
  },
  {
    icon: User,
    title: "Profile Pictures",
    description: "Perfect headshots for social media, LinkedIn, and professional portfolios.",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: Megaphone,
    title: "Marketing Creatives",
    description: "Design stunning advertisements and promotional materials with ease.",
    color: "from-pink-500 to-red-600"
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Enhance your photos with clean backgrounds for any creative project.",
    color: "from-red-500 to-orange-600"
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Create compelling visuals for presentations, websites, and print media.",
    color: "from-orange-500 to-yellow-600"
  },
  {
    icon: Globe,
    title: "Social Media",
    description: "Stand out on Instagram, Facebook, and other platforms with clean imagery.",
    color: "from-green-500 to-blue-600"
  }
];

export const ServicesSection = () => {
  const scrollToBackgroundRemover = () => {
    const element = document.querySelector("#background-remover");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 px-6 bg-gradient-secondary">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Perfect for Every <span className="bg-gradient-primary bg-clip-text text-transparent">Use Case</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From e-commerce to social media, our background remover adapts to your needs. 
            Discover how professionals across industries use our tool.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-soft hover:shadow-strong transition-all duration-500 bg-card overflow-hidden">
                <CardContent className="p-8 relative">
                  {/* Animated Background Gradient */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} rounded-full blur-2xl -translate-y-8 translate-x-8`}
                  />
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-primary mb-6 group-hover:shadow-medium transition-all duration-300"
                    >
                      <service.icon className="h-7 w-7 text-primary-foreground" />
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="inline-block border-0 shadow-medium bg-gradient-primary">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-primary-foreground/90 mb-6 max-w-md">
                Join thousands of professionals who trust our AI-powered background remover.
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToBackgroundRemover}
                className="shadow-soft hover:shadow-medium"
              >
                Try It Now - It's Free
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};