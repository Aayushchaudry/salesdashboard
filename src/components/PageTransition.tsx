// src/components/PageTransition.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface PageTransitionProps {
  children: React.ReactNode;
}

const TransitionContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <TransitionContainer
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      // exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 3,
        ease: [0.08, 0.69, 0.2, 0.99]
      }}
    >
      {children}
    </TransitionContainer>
  );
};

export default PageTransition;
