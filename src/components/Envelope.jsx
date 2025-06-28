import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const EnvelopeContainer = styled.div`
  position: relative;
  width: 420px;
  height: 280px;
  perspective: 1600px;
  cursor: pointer;
  margin: 60px auto;
  z-index: 10;
  @media (max-width: 768px) {
    width: 90vw;
    height: 54vw;
    min-width: 220px;
    min-height: 140px;
    margin: 24px auto;
    perspective: 1200px;
  }
  @media (max-width: 480px) {
    width: 85vw;
    height: 56vw;
    min-width: 200px;
    min-height: 130px;
    margin: 20px auto;
    perspective: 1000px;
  }
`;

const EnvelopeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.77,0,0.18,1);
`;

const EnvelopeSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px; /* Chỉ bo góc dưới vì nắp đè lên góc trên */
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 22px;
  color: ${props => props.theme.colors.wenge};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  @media (max-width: 768px) {
    border-radius: 12px;
    font-size: 18px;
  }
  @media (max-width: 480px) {
    border-radius: 10px;
    font-size: 16px;
  }
`;

// Mặt trước thiệp
const Front = styled(EnvelopeSide)`
  background: linear-gradient(135deg, ${props => props.theme.colors.mimiPink}, ${props => props.theme.colors.frenchGray});
  transform: rotateY(0deg);
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M20,30 L50,50 L80,30 L80,70 L20,70 Z" fill="none" stroke="%237B6670" stroke-width="2"/><path d="M20,30 L50,50 L80,30" fill="none" stroke="%237B6670" stroke-width="2"/></svg>') no-repeat center;
    background-size: 60%;
    opacity: 0.18;
  }
  @media (max-width: 768px) {
    &::before {
      background-size: 50%;
    }
  }
  @media (max-width: 480px) {
    &::before {
      background-size: 45%;
    }
  }
`;

// Mặt sau thiệp - không có nội dung text
const Back = styled(EnvelopeSide)`
  background: linear-gradient(135deg, ${props => props.theme.colors.seasalt}, ${props => props.theme.colors.mimiPink});
  transform: rotateY(180deg);
  padding: 30px;
  box-sizing: border-box;
  flex-direction: column;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="30" cy="30" r="3" fill="%23F9D6DA" opacity="0.4"/><circle cx="70" cy="40" r="2" fill="%23D1CACF" opacity="0.3"/><circle cx="50" cy="70" r="2.5" fill="%23F9D6DA" opacity="0.5"/></svg>') no-repeat center;
    background-size: 80%;
    opacity: 0.6;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    font-size: 14px;
    line-height: 1.5;
    &::before {
      background-size: 70%;
    }
  }
  @media (max-width: 480px) {
    padding: 16px;
    font-size: 12px;
    line-height: 1.4;
    &::before {
      background-size: 60%;
    }
  }
`;

// Container cho nắp thiệp - cũng sẽ quay theo thiệp
const FlapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  transform-style: preserve-3d;
  pointer-events: none;
  z-index: 20;
  transition: none;
  backface-visibility: visible;
  overflow: visible;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    height: 48px;
  }
  @media (max-width: 480px) {
    height: 40px;
  }
`;

const FlapWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform-origin: top center;
  margin: 0;
  padding: 0;
  overflow: visible;
`;

// Mặt sau nắp thiệp - có hình tam giác để mở
const FlapBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, ${props => props.theme.colors.seasalt} 0%, ${props => props.theme.colors.mimiPink} 60%, ${props => props.theme.colors.frenchGray} 100%);
  border-radius: 18px 18px 22px 22px/36px 36px 12px 12px;
  backface-visibility: hidden;
  box-shadow: 0 6px 18px 0 rgba(249,214,218,0.18), 0 2px 8px 0 rgba(123,102,112,0.08);
  border-bottom: 3px solid ${props => props.theme.colors.frenchGray};
  transform: rotateX(180deg);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  overflow: visible;
  /* Hiệu ứng highlight mép trên nhẹ nhàng */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 10px;
    border-radius: 18px 18px 0 0/36px 36px 0 0;
    background: linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.0) 100%);
    z-index: 2;
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-bottom: 8px solid ${props => props.theme.colors.seasalt};
    opacity: 0.7;
    z-index: 1;
  }
  @media (max-width: 768px) {
    border-radius: 12px 12px 14px 14px/22px 22px 6px 6px;
    &::before { height: 6px; border-radius: 12px 12px 0 0/22px 22px 0 0; }
    &::after { border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 5px solid ${props => props.theme.colors.seasalt}; }
  }
  @media (max-width: 480px) {
    border-radius: 8px 8px 10px 10px/14px 14px 3px 3px;
    &::before { height: 3px; border-radius: 8px 8px 0 0/14px 14px 0 0; }
    &::after { border-left: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 3px solid ${props => props.theme.colors.seasalt}; }
  }
`;

const Glow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  pointer-events: none;
  background: radial-gradient(circle, #F9D6DA55 0%, transparent 70%);
  filter: blur(16px);
  opacity: 0.7;
  transform: translate(-50%, -50%);
  z-index: 0;
  @media (max-width: 768px) {
    filter: blur(12px);
    opacity: 0.6;
  }
  @media (max-width: 480px) {
    filter: blur(8px);
    opacity: 0.5;
  }
`;

const InnerLetter = styled.div`
  position: absolute;
  top: 0;
  left: 12px;
  right: 12px;
  height: 54px;
  background: linear-gradient(180deg, #fff 0%, #fefefe 100%);
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 18px 0 rgba(123,102,112,0.10);
  z-index: 2;
  border: 1.2px solid #ede3d7;
  border-top: none;
  pointer-events: none;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%);
  @media (max-width: 768px) {
    left: 6px;
    right: 6px;
    height: 36px;
    border-radius: 0 0 12px 12px;
  }
  @media (max-width: 480px) {
    left: 2px;
    right: 2px;
    height: 22px;
    border-radius: 0 0 8px 8px;
  }
`;

const LetterLines = styled.div`
  position: absolute;
  top: 12px;
  left: 10px;
  right: 10px;
  height: 32px;
  z-index: 3;
  pointer-events: none;
  background: url('data:image/svg+xml;utf8,<svg width="100%" height="32" xmlns="http://www.w3.org/2000/svg"><path d="M5 8 Q40 16 95 8" stroke="black" stroke-width="1" fill="none" opacity="0.25"/><path d="M10 18 Q50 28 90 18" stroke="black" stroke-width="1" fill="none" opacity="0.18"/><path d="M15 28 Q60 36 85 28" stroke="black" stroke-width="1" fill="none" opacity="0.13"/></svg>') no-repeat center/100% 100%;
  @media (max-width: 768px) {
    top: 7px;
    height: 18px;
  }
  @media (max-width: 480px) {
    top: 4px;
    height: 10px;
  }
`;

const Envelope = ({ onEnvelopeOpen, isOpen, setEnvelopeFlipped }) => {
  const envelopeRef = useRef(null);
  const flapContainerRef = useRef(null);
  const containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);

  useEffect(() => {
    // Animation xuất hiện phong bì
    if (containerRef.current) {
      containerRef.current.style.opacity = 0;
      containerRef.current.style.transform = 'translateY(120px) scale(0.7)';
      setTimeout(() => {
        containerRef.current.style.transition = 'all 1.5s cubic-bezier(0.77,0,0.18,1)';
        containerRef.current.style.opacity = 1;
        containerRef.current.style.transform = 'translateY(0) scale(1)';
      }, 100);
    }
  }, []);

  // Xoay phong bì và mở nắp bằng Framer Motion
  const handleClick = () => {
    if (!isOpen && !isAnimating) {
      setIsAnimating(true);
      if (setEnvelopeFlipped) setEnvelopeFlipped(true);
      // Xoay phong bì
      if (envelopeRef.current && flapContainerRef.current) {
        envelopeRef.current.style.transition = 'transform 0.8s cubic-bezier(0.77,0,0.18,1)';
        flapContainerRef.current.style.transition = 'transform 0.8s cubic-bezier(0.77,0,0.18,1)';
        envelopeRef.current.style.transform = 'rotateY(180deg)';
        flapContainerRef.current.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
          setIsFlapOpen(true); // Mở nắp bằng Framer Motion
          setTimeout(() => {
            setIsAnimating(false);
            onEnvelopeOpen();
          }, 800);
        }, 1000);
      }
    }
  };

  return (
    <EnvelopeContainer ref={containerRef} onClick={handleClick}>
      <Glow />
      <EnvelopeWrapper ref={envelopeRef}>
        <Front>
          <span style={{fontWeight:600,letterSpacing:1}}>Click để mở</span>
        </Front>
        <Back>
          <InnerLetter>
            <LetterLines />
          </InnerLetter>
        </Back>
      </EnvelopeWrapper>
      
      {/* Nắp thiệp với 1 mặt */}
      <FlapContainer ref={flapContainerRef}>
        <FlapWrapper
          animate={{ rotateX: isFlapOpen ? -120 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <FlapBack />
        </FlapWrapper>
      </FlapContainer>
    </EnvelopeContainer>
  );
};

export default Envelope;