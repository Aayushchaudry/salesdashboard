// src/components/ExpandedView.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Performance from './Options/Performance'; // Import your Performance component
import LeadPipeline from './Options/Lead'; // Import your LeadPipeline component
import FollowUpTimeline from './Options/Followups'; // Import your FollowUpTimeline component
import SelectCustomer from './Options/Selectcustomer'; // Import your SelectCustomer component
import MultiStepForm from './Options/Addcustomer'; // Import your MultiStepForm component
import CalendarView from './Options/Scheduledsessions';
import PastSessions from './Options/Pastsessions';
interface ExpandedViewProps {
  cardId: number;
  optionIndex: number;
  cardTitle: string;
  options: string[];
  onClose: () => void;
  onChangeOption: (index: number) => void;
  originPosition: { top: number; left: number; width: number; height: number } | null;
}

const ExpandedView: React.FC<ExpandedViewProps> = ({ 
  cardId, 
  optionIndex, 
  cardTitle,
  options,
  onClose, 
  onChangeOption,
  originPosition
}) => {
  const selectedOption = options[optionIndex];
  
  // Render content based on card and option
  const renderContent = () => {
    // For Quick Stats card (assuming cardId 1)
    if (cardId === 1) {
      if (optionIndex === 0) return <Performance />;
      if (optionIndex === 1) return <LeadPipeline />;
      if (optionIndex === 2) return <FollowUpTimeline />;
      
    }
    
    // For Customer card (cardId 2)
    if (cardId === 2) {
      if (optionIndex === 0) return <MultiStepForm />; // Add Customer
      if (optionIndex === 1) return <SelectCustomer />;
      // If no specific option matched, return default content for Customer card
      return (
        <>
          <h3>Select Customer</h3>
          {/* Future implementation of customer selection */}
        </>
      );
    }
    if (cardId === 3) {
      if (optionIndex === 0) return <CalendarView />;
      if (optionIndex === 1) return <PastSessions />;
      
      
    }
    
    // Default content for other options
    return (
      <>
        <h3>{cardTitle} - {selectedOption}</h3>
        <p>This is where the detailed content for {selectedOption} would appear.</p>
        <p>You can replace this with actual components specific to each option.</p>
      </>
    );
  };
  
  return (
    <Container
      initial={{ 
        position: 'fixed',
        top: originPosition?.top || 0,
        left: originPosition?.left || 0,
        width: originPosition?.width || 0,
        height: originPosition?.height || 0,
        borderRadius: '8px',
        opacity: 0.9
      }}
      animate={{ 
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        borderRadius: '0px',
        opacity: 1
      }}
      exit={{ 
        top: originPosition?.top || 0,
        left: originPosition?.left || 0,
        width: originPosition?.width || 0,
        height: originPosition?.height || 0,
        borderRadius: '8px',
        opacity: 0
      }}
      transition={{ duration: 3, ease: [0.08, 0.69, 0.2, 0.99] }}
    >
      <ContentContainer
        initial={{ 
          opacity: 0,
          scale: 0.7,
          transformOrigin: originPosition ? 
            `${(originPosition.left + originPosition.width/2)}px ${(originPosition.top + originPosition.height/2)}px` : 
            'center center'
        }}
        animate={{ 
          opacity: 1,
          scale: 1
        }}
        transition={{ 
          duration: 2.5, // Slightly shorter than container animation
          ease: [0.08, 0.69, 0.2, 0.99]
        }}
      >
        <BackButton onClick={onClose}>
          ← Back to Dashboard
        </BackButton>
        <ExpandedTitle>{selectedOption}</ExpandedTitle>
        
        <JourneyNav>
          {options.map((option, index) => (
            <JourneyOption 
              key={index}
              active={index === optionIndex}
              onClick={() => onChangeOption(index)}
            >
              {option}
            </JourneyOption>
          ))}
        </JourneyNav>
        
        <ExpandedContent>
          {renderContent()}
        </ExpandedContent>
      </ContentContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  z-index: 999;
  overflow: hidden;
  height: 100%;
`;

const ContentContainer = styled(motion.div)`
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
`;

const BackButton = styled.button`
  background: ${props => props.theme.buttonBg};
  color: ${props => props.theme.buttonText};
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  font-family: Inter;
  
  &:hover {
    background: ${props => props.theme.buttonHover};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadow};
  }
`;

const ExpandedTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
  color: ${props => props.theme.title};
  font-family: Inter;
`;

const JourneyNav = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const JourneyOption = styled.button<{ active: boolean }>`
  background: ${props => props.active ? props.theme.buttonBg : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.theme.buttonText};
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.3s ease;
  font-family: Inter;
  &:hover {
    background: ${props => props.active ? props.theme.buttonBg : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-2px);
  }
`;

const ExpandedContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 30px;
  min-height: 60vh;
  text-align: left;
  
  h3 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
`;

export default ExpandedView;
