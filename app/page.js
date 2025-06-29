'use client';
import { useEffect, useState, useRef } from 'react';
import { db } from '@/firebase/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp, FiArrowRight, FiBook, FiUser, FiClock } from 'react-icons/fi';

export default function Home() {
  const [poems, setPoems] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const latestPoemsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState({
    latestPoems: false,
    testimonials: false
  });
  
  // Format UTC time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const faqData = [
    {
      question: 'How do I submit my own poems?',
      answer: "You can submit your poems through the 'Submit' page, and we'll review and publish them if they meet our guidelines.",
    },
    {
      question: 'Can I request a specific poem?',
      answer: 'We are open to suggestions! Feel free to send us a request via the Contact page.',
    },
    {
      question: 'Is there an age limit to read poems?',
      answer: 'No, our poems are suitable for readers of all ages.',
    },
  ];

  const testimonials = [
    {
      name: 'Poshan Kanwar.',
      role: 'Poetry Enthusiast',
      quote: 'The poems here truly resonate with my emotions. Each piece feels personal, as though the poet is speaking directly to me.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Himanshu Sahu.',
      role: 'Literature Professor',
      quote: 'This collection offers a fresh perspective on contemporary poetry. The depth of emotions captured here is remarkable.',
      color: 'from-blue-400 to-blue-500'
    },
    {
      name: 'Prithvi Diwan.',
      role: 'Aspiring Writer',
      quote: 'Finding this treasure trove of poetic expression has been inspirational for my own writing journey.',
      color: 'from-blue-600 to-blue-700'
    },
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === latestPoemsRef.current) {
            setVisibleSections(prev => ({ ...prev, latestPoems: entry.isIntersecting }));
          } else if (entry.target === testimonialsRef.current) {
            setVisibleSections(prev => ({ ...prev, testimonials: entry.isIntersecting }));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (latestPoemsRef.current) observer.observe(latestPoemsRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);

    return () => {
      if (latestPoemsRef.current) observer.unobserve(latestPoemsRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const q = query(collection(db, 'poems'), orderBy('datePosted', 'desc'), limit(4));
        const querySnapshot = await getDocs(q);

        const fetchedPoems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPoems(fetchedPoems);
      } catch (error) {
        console.error('Error fetching poems:', error);
      }
    };

    fetchPoems();
  }, []);

  return (
    <main className="w-full bg-white text-neutral-800 overflow-hidden">
      {/* Enhanced Custom styles with 3D animations */}
      <style jsx global>{`
        @keyframes float3D {
          0%, 100% { 
            transform: translateY(0) translateZ(0) rotateX(0deg);
          }
          50% { 
            transform: translateY(-20px) translateZ(20px) rotateX(5deg);
          }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(37, 99, 235, 0.5),
              0 0 20px rgba(37, 99, 235, 0.3),
              0 0 30px rgba(37, 99, 235, 0.2);
            transform: translateZ(0);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(37, 99, 235, 0.8),
              0 0 40px rgba(37, 99, 235, 0.5),
              0 0 60px rgba(37, 99, 235, 0.3);
            transform: translateZ(30px);
          }
        }

        @keyframes slideInRotate {
          0% {
            opacity: 0;
            transform: translateY(50px) rotateX(-20deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        .hero-content {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .animate-3d-title {
          animation: textGlow 3s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .animate-3d-subtitle {
          animation: slideInRotate 1s ease-out 0.3s backwards;
          transform-style: preserve-3d;
        }

        .animate-3d-button {
          animation: float3D 3s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .gradient-text {
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientFlow 8s ease infinite;
        }
      `}</style>
      
      
      {/* Enhanced Hero Section with 3D effects */}
      <section 
        className="relative w-full h-screen flex items-center bg-cover bg-center overflow-hidden"
        style={{ 
          backgroundImage: "url('/assets/hero-bg.jpg')",
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        
        {/* 3D Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl animate-3d-button"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl animate-3d-button" style={{ animationDelay: '-1.5s' }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center hero-content">
          <div className="max-w-3xl mx-auto transform-gpu">
            <div 
              className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/20 animate-3d-button"
            >
              ✨ Explore the Soul of Poetry ✨
            </div>
            <div className="flex flex-col items-center mb-8">
 
  <a
    href="https://poems.toshankanwar.website/everything-about-project"
    target="_blank"
    rel="noopener"
    className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 group"
  >
    <span className="animate-bounce">
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24" className="text-yellow-200">
        <path d="M12 4v14M12 18l-7-7M12 18l7-7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span>
      Want to know <span className="underline underline-offset-2">everything</span> about the project?
    </span>
    <span className="animate-spin-slow">
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-pink-200 ml-1">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />
      </svg>
    </span>
  </a>

</div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Welcome to{' '}
              <span className="animate-3d-title inline-block gradient-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                PoemSite
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-12 animate-3d-subtitle">
              Discover poems born from the soul—crafted through love, emotion, and lifes reflections.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                href="/poem"
                className="group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-105 transform-gpu animate-3d-button"
              >
                <FiBook className="text-xl" />
                <span>Explore Poems</span>
                <FiArrowRight className="ml-1 transition-transform duration-500 group-hover:translate-x-2" />
              </Link>

              <Link
                href="/submit-poem-request"
                className="flex items-center gap-3 bg-white/90 text-blue-700 hover:bg-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-105 transform-gpu animate-3d-button"
                style={{ animationDelay: '0.2s' }}
              >
                <FiUser className="text-xl" />
                <span>Submit Poem Request to Post</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-3d-button">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Latest Poems Section */}
      <section
        ref={latestPoemsRef}
        className="relative w-full px-6 py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white"
      >
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-3">
              RECENT CREATIONS
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 ${
              visibleSections.latestPoems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">Latest Poems</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Immerse yourself in our most recent poetic expressions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {poems.length > 0 ? (
              poems.map((poem, index) => (
                <Link
                  key={`${poem.id}-${index}`}
                  href={`/poem/${poem.slug}`}
                  className={`poem-card-hover bg-white rounded-xl overflow-hidden shadow-md p-6 relative transition-all duration-500 border border-gray-100 ${
                    visibleSections.latestPoems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 origin-left transition-transform duration-300 poem-gradient-line"></div>
                  
                  <div className="mb-3 text-xs text-blue-600 font-medium">
                    {new Date(poem.datePosted?.toDate?.() || Date.now()).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{poem.title}</h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{poem.content}</p>
                  
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    Read more
                    <FiArrowRight className="ml-1" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <div className="w-16 h-16 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading poems...</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="/poem"
              className="inline-flex items-center px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-all duration-300"
            >
              View all poems <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full px-6 py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-3">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Find answers to common questions about our poetry collection
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleAnswer(index)}
                >
                  <h3 className="text-base md:text-lg font-medium text-gray-900">{faq.question}</h3>
                  <span className={`text-blue-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <FiChevronDown />
                  </span>
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-4 pt-1">
                    <div className="h-px w-full bg-gray-100 mb-3"></div>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="relative w-full px-6 py-16 md:py-20 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-3">
              READER EXPERIENCES
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 ${
              visibleSections.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">What Our Readers Say</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Discover how our poetry collection has touched hearts and minds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ${
                  visibleSections.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative bg-white rounded-xl p-6 shadow-md h-full border border-gray-100">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${testimonial.color} rounded-t-xl`}></div>
                  
                  <div className="mb-4 text-gray-300">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8v6a6 6 0 01-6 6H4v4h4a10 10 0 0010-10V8h-8zm18 0v6a6 6 0 01-6 6h-2v4h4a10 10 0 0010-10V8h-6z"></path>
                    </svg>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-5 italic">{testimonial.quote}</p>
                  
                  <div className="flex items-center mt-auto">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${testimonial.color} text-white font-bold`}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-14 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: "16px 16px"
              }}></div>
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to explore more poetry?
              </h2>
              <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                Join our community of poetry enthusiasts and discover poems that inspire, move, and transform.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/poem"
                  className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300"
                >
                  Browse All Poems
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
