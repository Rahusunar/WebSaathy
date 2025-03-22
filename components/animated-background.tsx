"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDarkMode = theme === "dark"

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {isDarkMode && (
        <>
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
          <div className="stars-extra"></div>
          <div className="stars-tiny"></div>
          <div className="planet planet-1"></div>
          <div className="planet planet-2"></div>
          <div className="planet planet-3"></div>
          <div className="planet planet-4"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star-2"></div>
          <div className="shooting-star-3"></div>
          <div className="nebula nebula-1"></div>
          <div className="nebula nebula-2"></div>
          <div className="comet"></div>
        </>
      )}
      <style jsx>{`
        .stars-small,
        .stars-medium,
        .stars-large,
        .stars-extra,
        .stars-tiny {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        
        .stars-small {
          background-image: 
            radial-gradient(1px 1px at 25px 5px, white, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 50px 25px, white, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 125px 20px, white, rgba(255, 255, 255, 0)),
            radial-gradient(1.5px 1.5px at 50px 75px, white, rgba(255, 255, 255, 0)),
            radial-gradient(2px 2px at 15px 125px, white, rgba(255, 255, 255, 0)),
            radial-gradient(2.5px 2.5px at 110px 80px, white, rgba(255, 255, 255, 0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.3;
          animation: twinkle 5s ease-in-out infinite alternate;
        }

        .stars-medium {
          background-image: 
            radial-gradient(1.5px 1.5px at 75px 45px, white, rgba(255, 255, 255, 0)),
            radial-gradient(2px 2px at 100px 80px, white, rgba(255, 255, 255, 0)),
            radial-gradient(2.5px 2.5px at 199px 100px, white, rgba(255, 255, 255, 0)),
            radial-gradient(3px 3px at 50px 180px, white, rgba(255, 255, 255, 0)),
            radial-gradient(3.5px 3.5px at 175px 180px, white, rgba(255, 255, 255, 0));
          background-size: 250px 250px;
          opacity: 0.4;
          animation: twinkle 7s ease-in-out infinite alternate;
          animation-delay: 0.3s;
        }

        .stars-large {
          background-image: 
            radial-gradient(2px 2px at 10px 10px, white, rgba(255, 255, 255, 0)),
            radial-gradient(2.5px 2.5px at 150px 150px, white, rgba(255, 255, 255, 0)),
            radial-gradient(3px 3px at 200px 50px, white, rgba(255, 255, 255, 0)),
            radial-gradient(3.5px 3.5px at 250px 250px, white, rgba(255, 255, 255, 0)),
            radial-gradient(4px 4px at 300px 300px, white, rgba(255, 255, 255, 0));
          background-size: 350px 350px;
          opacity: 0.5;
          animation: twinkle 9s ease-in-out infinite alternate;
          animation-delay: 0.6s;
        }
        
        .stars-extra {
          background-image: 
            radial-gradient(2px 2px at 120px 120px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(2.5px 2.5px at 170px 220px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(1.5px 1.5px at 210px 290px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(2px 2px at 350px 350px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(3px 3px at 400px 100px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(2px 2px at 450px 450px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(1.5px 1.5px at 500px 500px, #f9fafb, rgba(255, 255, 255, 0));
          background-size: 550px 550px;
          opacity: 0.4;
          animation: twinkle 11s ease-in-out infinite alternate;
          animation-delay: 1s;
        }
        
        .stars-tiny {
          background-image: 
            radial-gradient(1px 1px at 10px 20px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 150px 150px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 70px 170px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 290px 100px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 310px 300px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 400px 400px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 500px 100px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 50px 330px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 180px 460px, #f9fafb, rgba(255, 255, 255, 0)),
            radial-gradient(1px 1px at 420px 520px, #f9fafb, rgba(255, 255, 255, 0));
          background-size: 600px 600px;
          opacity: 0.3;
          animation: twinkle 13s ease-in-out infinite alternate;
          animation-delay: 1.5s;
        }

        .planet {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
        }

        .planet-1 {
          top: 10%;
          right: 10%;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle at 30% 30%, #a78bfa, #4c1d95);
          box-shadow: 0 0 20px rgba(167, 139, 250, 0.5);
          animation: float 20s ease-in-out infinite;
        }

        .planet-2 {
          bottom: 15%;
          left: 5%;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle at 30% 30%, #34d399, #065f46);
          box-shadow: 0 0 15px rgba(52, 211, 153, 0.5);
          animation: float 15s ease-in-out infinite reverse;
        }

        .planet-3 {
          top: 40%;
          left: 20%;
          width: 25px;
          height: 25px;
          background: radial-gradient(circle at 30% 30%, #fcd34d, #92400e);
          box-shadow: 0 0 10px rgba(252, 211, 77, 0.5);
          animation: float 25s ease-in-out infinite;
          animation-delay: 5s;
        }
        
        .planet-4 {
          bottom: 30%;
          right: 25%;
          width: 35px;
          height: 35px;
          background: radial-gradient(circle at 30% 30%, #60a5fa, #1e40af);
          box-shadow: 0 0 12px rgba(96, 165, 250, 0.5);
          animation: float 18s ease-in-out infinite;
          animation-delay: 3s;
        }

        .shooting-star,
        .shooting-star-2,
        .shooting-star-3 {
          position: absolute;
          top: 50%;
          left: -100px;
          width: 100px;
          height: 2px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8));
          transform: rotate(-45deg);
          animation: shootingStar 8s linear infinite;
        }

        .shooting-star-2 {
          top: 30%;
          animation-delay: 4s;
        }
        
        .shooting-star-3 {
          top: 70%;
          animation-delay: 7s;
          width: 150px;
          height: 3px;
        }

        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(10px);
        }
        
        .nebula-1 {
          top: 60%;
          right: 10%;
          width: 200px;
          height: 200px;
          background: radial-gradient(ellipse at center, 
            rgba(167, 139, 250, 0.2) 0%, 
            rgba(139, 92, 246, 0.15) 40%, 
            rgba(124, 58, 237, 0.1) 60%, 
            rgba(109, 40, 217, 0.05) 80%, 
            rgba(0, 0, 0, 0) 100%);
          animation: pulse 15s ease-in-out infinite alternate;
        }
        
        .nebula-2 {
          top: 20%;
          left: 15%;
          width: 150px;
          height: 150px;
          background: radial-gradient(ellipse at center, 
            rgba(248, 113, 113, 0.2) 0%, 
            rgba(239, 68, 68, 0.15) 40%, 
            rgba(220, 38, 38, 0.1) 60%, 
            rgba(185, 28, 28, 0.05) 80%, 
            rgba(0, 0, 0, 0) 100%);
          animation: pulse 18s ease-in-out infinite alternate-reverse;
        }
        
        .comet {
          position: absolute;
          top: 15%;
          right: -100px;
          width: 150px;
          height: 4px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8));
          border-radius: 50%;
          transform: rotate(-15deg);
          filter: blur(1px);
          animation: comet 15s linear infinite;
          animation-delay: 2s;
        }
        
        .comet::before {
          content: '';
          position: absolute;
          top: -2px;
          right: 0;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.7);
        }

        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 0.8; }
        }

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }

        @keyframes shootingStar {
          0% { 
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          20% {
            transform: translateX(300px) translateY(300px) rotate(-45deg);
            opacity: 0;
          }
          100% {
            transform: translateX(300px) translateY(300px) rotate(-45deg);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        
        @keyframes comet {
          0% {
            transform: translateX(0) translateY(0) rotate(-15deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          20% {
            transform: translateX(-500px) translateY(100px) rotate(-15deg);
            opacity: 0;
          }
          100% {
            transform: translateX(-500px) translateY(100px) rotate(-15deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

