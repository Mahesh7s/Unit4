import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, Heart, Camera, Clock, Users, Star, Shield, Image, Video, Mic, Map, Sparkles, BookOpen, Share2, Download } from 'lucide-react';

const LandingPage = () => {
  const sampleMemories = [
    {
      title: "First Day at College",
      description: "The beginning of an amazing journey filled with new friends and experiences that would shape my future.",
      date: "2023-08-15",
      image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["college", "milestone", "education"]
    },
    {
      title: "Family Vacation in Paris",
      description: "An unforgettable trip to the City of Light with my loved ones, creating memories that will last forever.",
      date: "2023-07-20",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["travel", "family", "paris"]
    },
    {
      title: "Graduation Day",
      description: "Finally graduated! All those late nights studying were worth it. A milestone achievement unlocked.",
      date: "2023-05-12",
      image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["graduation", "achievement", "milestone"]
    }
  ];

  const features = [
    {
      icon: Image,
      title: "Photo Memories",
      description: "Preserve your precious moments with high-quality photo uploads. Capture birthdays, vacations, and everyday magic."
    },
    {
      icon: Video,
      title: "Video Stories",
      description: "Save life's moving moments with video uploads. Relive celebrations, adventures, and special events in motion."
    },
    {
      icon: Mic,
      title: "Voice Notes",
      description: "Add personal voice recordings to your memories. Hear the laughter, stories, and emotions again anytime."
    },
    {
      icon: BookOpen,
      title: "Digital Journal",
      description: "Write detailed stories alongside your media. Document the who, what, when, and why of each memory."
    },
    {
      icon: Map,
      title: "Location Tracking",
      description: "Automatically tag locations and create memory maps. See where your life's journey has taken you."
    },
    {
      icon: Star,
      title: "Memory Milestones",
      description: "Highlight special achievements and important life events. Mark birthdays, anniversaries, and big accomplishments."
    },
    {
      icon: Users,
      title: "Family Sharing",
      description: "Create shared albums with family and friends. Build collective memories that everyone can contribute to."
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your favorite memories with loved ones. Create beautiful links to send via message or email."
    },
    {
      icon: Download,
      title: "Export & Backup",
      description: "Download your memories or create beautiful PDF keepsakes. Never worry about losing your precious moments."
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Capture Your Moments",
      description: "Take photos, record videos, or save voice notes from your daily life and special occasions.",
      icon: Camera
    },
    {
      step: "2",
      title: "Organize & Describe",
      description: "Add titles, descriptions, dates, and tags to create meaningful memory stories.",
      icon: BookOpen
    },
    {
      step: "3",
      title: "Relive & Share",
      description: "Browse your timeline, rediscover old memories, and share special moments with loved ones.",
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-400/5 dark:to-pink-400/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
                <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MemoryLane
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Preserve Life's
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                Precious Moments
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Capture, organize, and relive your most cherished memories with photos, videos, and voice notes. 
              Create a beautiful digital timeline of your life's journey that you can treasure forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Your Memory Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How MemoryLane Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simple steps to preserve your memories forever
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-sm">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              See Your Memories Come to Life
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience how your memories will look in our beautiful timeline view
            </p>
          </motion.div>

          <div className="grid gap-8 md:gap-12">
            {sampleMemories.map((memory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-medium">
                    <Clock className="w-4 h-4" />
                    {new Date(memory.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{memory.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{memory.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {memory.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Preserve Your Memories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make memory keeping effortless and meaningful
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose MemoryLane?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Private & Secure",
                description: "Your memories are protected with enterprise-grade security"
              },
              {
                icon: Sparkles,
                title: "Easy to Use",
                description: "Beautiful, intuitive interface that anyone can use"
              },
              {
                icon: Heart,
                title: "Emotional Connection",
                description: "Relive your memories with photos, videos, and voice notes"
              },
              {
                icon: Users,
                title: "Family Friendly",
                description: "Perfect for individuals, couples, and families"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Memory Journey?
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
              Join thousands of families who are already preserving their precious memories with MemoryLane.
              Start creating your digital legacy today!
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-purple-200 text-sm mt-4">
              No credit card required • Start preserving memories in seconds
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;