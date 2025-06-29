'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function About() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  const skills = [
    { name: "Lyrical Poetry", color: "from-blue-400 to-blue-600", percentage: 95 },
    { name: "Nature Poetry", color: "from-blue-300 to-blue-500", percentage: 90 },
    { name: "Free Verse", color: "from-blue-500 to-blue-700", percentage: 85 },
    { name: "Haiku", color: "from-blue-200 to-blue-400", percentage: 80 },
  ];

  const testimonials = [
    {
      quote: "Thaneshwar's poetry speaks directly to the soul. His words have a way of capturing emotions that I didn't even know I had.",
      author: "Literary Review"
    },
    {
      quote: "A remarkable talent with an extraordinary ability to weave words into unforgettable experiences.",
      author: "Poetry Monthly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-16 pb-20 px-4 sm:px-8 lg:px-20 font-sans relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-20 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-gradient-to-tr from-blue-300 to-blue-400 rounded-full opacity-20 blur-3xl -z-10" style={{animationDelay: '2s', animationDuration: '8s'}}></div>
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-20 blur-3xl -z-10" style={{animationDelay: '1s', animationDuration: '10s'}}></div>
      
      <motion.div 
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-block px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium text-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            About The Poet
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
            Welcome to My Poetic Journey
          </h1>
          
          <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A space where words dance, emotions flow, and stories unfold through carefully crafted verses that speak to the soul.
          </p>
        </motion.div>

        {/* Main content card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
          variants={itemVariants}
          style={{
            boxShadow: "0 10px 40px -10px rgba(59, 130, 246, 0.1), 0 20px 60px -30px rgba(59, 130, 246, 0.15)"
          }}
        >
          {/* Hero banner */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 relative">
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: "12px 12px"
              }}></div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 sm:p-10">
            {/* Poet's quote */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl py-6 px-8 mb-12 relative"
              whileHover={{ y: -5, boxShadow: "0 12px 30px -10px rgba(59, 130, 246, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1/2">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 7L4 13L10 19" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 7L14 13L20 19" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-lg italic text-gray-600 font-light leading-relaxed">
                "Poetry is the rhythmic creation of beauty in words. It's how I interpret the world, how I make sense of my emotions, and how I connect with others. Through poetry, I've found my voice and my purpose."
              </p>
              <div className="mt-4 flex items-center">
                <div className="h-1 w-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-3"></div>
                <span className="text-blue-600 font-medium">Thaneshwar Sahu</span>
              </div>
            </motion.div>

            {/* Image and Bio */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center mb-12">
              <motion.div 
                className="md:col-span-2 flex justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-blue-600 rounded-2xl transform rotate-6 scale-105 opacity-70 blur-sm"></div>
                  <img
                    src="/assets/photo-about.jpg"
                    alt="Thaneshwar Sahu"
                    className="relative w-64 h-64 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-white rounded-full p-2 shadow-lg">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-xs font-medium">Poet</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <div className="md:col-span-3">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">About Thaneshwar</span>
                  <div className="ml-3 h-px flex-grow bg-gradient-to-r from-blue-500 to-transparent"></div>
                </h2>
                
                <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed">
                    I am Thaneshwar Sahu, a poet with a passion for capturing the essence of life through word. My journey in poetry began during my formative years, where I discovered the power of expression through carefully crafted verses.
                  </p>
                  <p className="leading-relaxed">
                    Each poem I write is a reflection of my observations, emotions, and experiences. I draw inspiration from nature, human connections, and the simple yet profound moments that make up our lives.
                  </p>
                  <p className="leading-relaxed">
                    Through my poetry, I aim to create a bridge between hearts and minds, to evoke emotions that resonate with readers, and to offer a fresh perspective on the world around us.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">Poetic Expertise</span>
                <div className="ml-3 h-px flex-grow bg-gradient-to-r from-blue-500 to-transparent"></div>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm"
                    whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(59, 130, 246, 0.2)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-gray-500">{skill.percentage}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + (0.1 * index) }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">Poetic Journey</span>
                <div className="ml-3 h-px flex-grow bg-gradient-to-r from-blue-500 to-transparent"></div>
              </h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 transform md:translate-x-px"></div>
                
                {/* Timeline items */}
                <div className="space-y-12">
                  {[
                    { year: "2015", title: "First Published Work", description: "Had my first poem published in a local anthology, marking the beginning of my public poetic journey." },
                    { year: "2018", title: "Poetry Collection", description: "Released my first collection of poems titled 'Whispers of the Soul' which received critical acclaim." },
                    { year: "2022", title: "Online Presence", description: "Established this online platform to share my poetry with a wider audience and connect with poetry enthusiasts around the world." }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: 0.2 * index }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-white border-2 border-blue-500 transform -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      
                      {/* Content */}
                      <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                        <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-lg shadow-md border border-gray-100">
                          <div className="text-lg font-semibold text-blue-600 mb-1">{item.year}</div>
                          <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h4>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">What Critics Say</span>
                <div className="ml-3 h-px flex-grow bg-gradient-to-r from-blue-500 to-transparent"></div>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl relative"
                    whileHover={{ y: -5, boxShadow: "0 12px 30px -10px rgba(59, 130, 246, 0.25)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                  >
                    <div className="absolute top-4 left-4 text-4xl text-blue-300 opacity-50">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7L4 13L10 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 7L14 13L20 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 italic mb-4 pl-6">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="h-0.5 w-6 bg-blue-500 mr-2"></div>
                      <span className="text-blue-700 font-medium">{testimonial.author}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center mb-12"
              whileHover={{ y: -5, boxShadow: "0 12px 30px -10px rgba(59, 130, 246, 0.3)" }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Connect with Me</h3>
              <p className="text-gray-600 mb-6">Follow my poetic journey on social media and be part of this creative community</p>
              
              <div className="flex justify-center space-x-5">
                <motion.a
                  href="https://instagram.com/yourpoet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaInstagram size={20} />
                </motion.a>
                
                <motion.a
                  href="https://facebook.com/yourpoet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFacebook size={20} />
                </motion.a>
                
                <motion.a
                  href="https://twitter.com/yourpoet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTwitter size={20} />
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/yourpoet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}