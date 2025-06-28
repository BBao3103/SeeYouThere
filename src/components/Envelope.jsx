import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

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
  border-radius: 16px;
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

// Mặt sau thiệp - hiển thị nội dung bên trong
const Back = styled(EnvelopeSide)`
  background: linear-gradient(135deg, ${props => props.theme.colors.seasalt}, ${props => props.theme.colors.mimiPink});
  transform: rotateY(180deg);
  padding: 30px;
  box-sizing: border-box;
  flex-direction: column;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    padding: 20px;
    font-size: 14px;
    line-height: 1.5;
  }
  @media (max-width: 480px) {
    padding: 16px;
    font-size: 12px;
    line-height: 1.4;
  }
`;

// Container cho nắp thiệp - cũng sẽ quay theo thiệp
const FlapContainer = styled.div`
  position: absolute;
  top: -80px;
  left: 0;
  width: 100%;
  height: 80px;
  transform-style: preserve-3d;
  pointer-events: none;
  z-index: 5;
  transition: transform 0.6s cubic-bezier(0.77,0,0.18,1);
  
  @media (max-width: 768px) {
    top: -48px;
    height: 48px;
  }
  @media (max-width: 480px) {
    top: -40px;
    height: 40px;
  }
`;

const FlapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform-origin: bottom center;
  transform: rotateX(0deg);
`;

// Mặt trước nắp thiệp - màu giống thiệp
const FlapFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, ${props => props.theme.colors.mimiPink}, ${props => props.theme.colors.frenchGray});
  border-radius: 24px 24px 0 0;
  backface-visibility: hidden;
  box-shadow: 0 8px 32px 0 rgba(249,214,218,0.25), 0 2px 8px 0 rgba(123,102,112,0.10);
  border-bottom: 4px solid ${props => props.theme.colors.frenchGray};
  transform: rotateX(0deg);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    border-bottom: 18px solid ${props => props.theme.colors.seasalt};
  }
  
  @media (max-width: 768px) {
    border-radius: 14px 14px 0 0;
    border-bottom: 3px solid ${props => props.theme.colors.frenchGray};
    &::after {
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid ${props => props.theme.colors.seasalt};
    }
  }
  @media (max-width: 480px) {
    border-radius: 12px 12px 0 0;
    border-bottom: 2px solid ${props => props.theme.colors.frenchGray};
    &::after {
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid ${props => props.theme.colors.seasalt};
    }
  }
`;

// Mặt sau nắp thiệp - có hình tam giác để mở
const FlapBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, ${props => props.theme.colors.frenchGray}, ${props => props.theme.colors.mimiPink});
  border-radius: 24px 24px 0 0;
  backface-visibility: hidden;
  box-shadow: 0 8px 32px 0 rgba(249,214,218,0.25), 0 2px 8px 0 rgba(123,102,112,0.10);
  border-bottom: 4px solid ${props => props.theme.colors.frenchGray};
  transform: rotateX(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 30px solid ${props => props.theme.colors.wenge};
    opacity: 0.6;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    border-bottom: 18px solid ${props => props.theme.colors.seasalt};
  }
  
  @media (max-width: 768px) {
    border-radius: 14px 14px 0 0;
    border-bottom: 3px solid ${props => props.theme.colors.frenchGray};
    &::before {
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 18px solid ${props => props.theme.colors.wenge};
    }
    &::after {
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid ${props => props.theme.colors.seasalt};
    }
  }
  @media (max-width: 480px) {
    border-radius: 12px 12px 0 0;
    border-bottom: 2px solid ${props => props.theme.colors.frenchGray};
    &::before {
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 15px solid ${props => props.theme.colors.wenge};
    }
    &::after {
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid ${props => props.theme.colors.seasalt};
    }
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

const Envelope = ({ onEnvelopeOpen, isOpen, setEnvelopeFlipped }) => {
  const envelopeRef = useRef(null);
  const flapContainerRef = useRef(null);
  const flapWrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    gsap.fromTo(containerRef.current, {
      y: 120,
      scale: 0.7,
      opacity: 0
    }, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.3
    });
  }, []);

  const handleClick = () => {
    if (!isOpen && !isAnimating) {
      setIsAnimating(true);
      if (setEnvelopeFlipped) setEnvelopeFlipped(true);
      
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          onEnvelopeOpen();
        }
      });
      
      // Bước 1: Xoay cả thiệp và nắp thiệp cùng lúc
      tl.to([envelopeRef.current, flapContainerRef.current], { 
        rotateY: 180,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 0)
      // Bước 2: Sau khi xoay xong, đợi một chút rồi mở nắp thiệp từ dưới lên
      .to(flapWrapperRef.current, { 
        rotateX: -120,
        duration: 1.0,
        ease: 'power2.out'
      }, 1.5);
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
          <div style={{marginBottom: '15px', fontWeight: 'bold', fontSize: '20px'}}>
            🎉 Lời mời đặc biệt 🎉
          </div>
          <div style={{marginBottom: '10px'}}>
            Chúng tôi trân trọng mời bạn tham dự
          </div>
          <div style={{fontWeight: 'bold', fontSize: '16px'}}>
            SỰ KIỆN QUAN TRỌNG
          </div>
          <div style={{marginTop: '15px', fontSize: '14px', opacity: 0.8}}>
            Thời gian: 20:00 - Ngày 30/12/2024<br/>
            Địa điểm: Khách sạn Grand Plaza
          </div>
        </Back>
      </EnvelopeWrapper>
      
      {/* Nắp thiệp với 2 mặt */}
      <FlapContainer>
        <FlapWrapper ref={flapWrapperRef}>
          <FlapFront />
          <FlapBack />
        </FlapWrapper>
      </FlapContainer>
    </EnvelopeContainer>
  );
};

export default Envelope;