import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope';
import InvitationBook from './components/InvitationBook';
import { theme } from './styles/theme';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.seasalt}, ${props => props.theme.colors.seasalt2});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fonts.primary};
  padding: 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="%23F9D6DA" opacity="0.3"/><circle cx="80" cy="40" r="1.5" fill="%23D1CACF" opacity="0.2"/><circle cx="40" cy="80" r="1" fill="%23F9D6DA" opacity="0.4"/><circle cx="90" cy="90" r="1.5" fill="%23D1CACF" opacity="0.3"/></svg>') repeat;
    pointer-events: none;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.wenge};
  text-align: center;
  margin-bottom: 30px;
  font-weight: 300;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(123, 102, 112, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.wenge};
  text-align: center;
  margin-bottom: 40px;
  opacity: 0.8;
  font-family: ${props => props.theme.fonts.secondary};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
`;

const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${props => props.theme.colors.mimiPink};
  border-radius: 50%;
  opacity: 0.6;
`;

function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [particles, setParticles] = useState([]);
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false);

  const handleEnvelopeOpen = () => {
    // Create floating particles effect
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
    
    // Show invitation after a short delay
    setTimeout(() => {
      setShowInvitation(true);
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        
        <ContentWrapper>
          <AnimatePresence mode="wait">
            {!showInvitation ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <Envelope onEnvelopeOpen={handleEnvelopeOpen} isOpen={showInvitation} setEnvelopeFlipped={setEnvelopeFlipped} />
              </motion.div>
            ) : (
              <motion.div
                key="invitation"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <InvitationBook isEnvelopeFlipped={envelopeFlipped} />
              </motion.div>
            )}
          </AnimatePresence>
        </ContentWrapper>

        <FloatingParticles>
          {particles.map((particle) => (
            <Particle
              key={particle.id}
              initial={{ 
                x: `${particle.x}%`, 
                y: `${particle.y}%`,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [`${particle.y}%`, `${particle.y - 20}%`]
              }}
              transition={{ 
                duration: 3,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </FloatingParticles>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
