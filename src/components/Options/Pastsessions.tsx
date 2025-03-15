import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format, subDays, subMonths, isAfter } from 'date-fns';

// Interface for session data
interface Session {
  id: number;
  title: string;
  client: string;
  contact: string;
  date: Date;
  duration: number;
  type: 'demo' | 'overview' | 'proposal' | 'follow-up';
  status: 'completed';
  notes?: string;
  outcome?: string;
}

// Sample past sessions data
const pastSessions: Session[] = [
  {
    id: 1,
    title: 'Product Demo: Convrse Spaces',
    client: 'Acme Corp',
    contact: 'John Smith',
    date: subDays(new Date(), 5),
    duration: 60,
    type: 'demo',
    status: 'completed',
    notes: 'Client was impressed with the UI and asked for pricing details',
    outcome: 'Positive'
  },
  {
    id: 2,
    title: 'Solution Overview',
    client: 'XYZ Inc',
    contact: 'Sarah Johnson',
    date: subDays(new Date(), 12),
    duration: 45,
    type: 'overview',
    status: 'completed',
    notes: 'Discussed integration possibilities with their existing systems',
    outcome: 'Neutral'
  },
  {
    id: 3,
    title: 'Proposal Review',
    client: 'Tech Solutions',
    contact: 'Michael Brown',
    date: subDays(new Date(), 18),
    duration: 30,
    type: 'proposal',
    status: 'completed',
    notes: 'Client requested some modifications to the pricing structure',
    outcome: 'Positive'
  },
  {
    id: 4,
    title: 'Follow-up Meeting',
    client: 'Global Services',
    contact: 'Emily Davis',
    date: subDays(new Date(), 25),
    duration: 30,
    type: 'follow-up',
    status: 'completed',
    notes: 'Addressed concerns about implementation timeline',
    outcome: 'Positive'
  },
  {
    id: 5,
    title: 'Product Demo: Mobile Features',
    client: 'Innovate LLC',
    contact: 'Robert Wilson',
    date: subDays(new Date(), 35),
    duration: 60,
    type: 'demo',
    status: 'completed',
    notes: 'Focused on mobile capabilities, client was interested in iOS features',
    outcome: 'Positive'
  }
];

const PastSessions: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('all');
  const [filteredSessions, setFilteredSessions] = useState<Session[]>(pastSessions);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessionToFollowUp, setSessionToFollowUp] = useState<Session | null>(null);
const [showFollowUpModal, setShowFollowUpModal] = useState(false);
const [showDetailModal, setShowDetailModal] = useState(false);
const [sessionDetail, setSessionDetail] = useState<Session | null>(null);


  // Filter sessions based on selected time period
  useEffect(() => {
    const now = new Date();
    let filtered: Session[];
    
    if (timeFilter === 'week') {
      const weekAgo = subDays(now, 7);
      filtered = pastSessions.filter(session => isAfter(session.date, weekAgo));
    } else if (timeFilter === 'month') {
      const monthAgo = subMonths(now, 1);
      filtered = pastSessions.filter(session => isAfter(session.date, monthAgo));
    } else {
      filtered = [...pastSessions];
    }
    
    // Sort by date, most recent first
    filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
    setFilteredSessions(filtered);
  }, [timeFilter]);

  // Get color based on session type
  const getSessionColor = (type: string) => {
    switch(type) {
      case 'demo': return '#38ce3c'; // green
      case 'overview': return '#f9c74f'; // yellow
      case 'proposal': return '#5d4b8c'; // purple
      case 'follow-up': return '#1eae98'; // teal
      default: return '#e63946'; // red
    }
  };

  // Get icon based on session outcome
  const getOutcomeIcon = (outcome?: string) => {
    if (!outcome) return '❓';
    switch(outcome.toLowerCase()) {
      case 'positive': return '✅';
      case 'negative': return '❌';
      case 'neutral': return '⚠️';
      default: return '❓';
    }
  };
  const handleScheduleFollowUp = (session: Session) => {
    setSessionToFollowUp(session);
    setShowFollowUpModal(true);
  };
  
  const handleViewDetails = (session: Session) => {
    setSessionDetail(session);
    setShowDetailModal(true);
  };
  

  return (
    <Container>
      <Header>
        
        <FilterContainer>
          <FilterButton 
            active={timeFilter === 'all'} 
            onClick={() => setTimeFilter('all')}
          >
            All Time
          </FilterButton>
          <FilterButton 
            active={timeFilter === 'month'} 
            onClick={() => setTimeFilter('month')}
          >
            Past Month
          </FilterButton>
          <FilterButton 
            active={timeFilter === 'week'} 
            onClick={() => setTimeFilter('week')}
          >
            Past Week
          </FilterButton>
        </FilterContainer>
      </Header>

      <Legend>
      {/* Existing session type legend items */}
      <LegendItem>
        <LegendColor color="#38ce3c" />
        <LegendLabel>Product Demo</LegendLabel>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#f9c74f" />
        <LegendLabel>Solution Overview</LegendLabel>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#5d4b8c" />
        <LegendLabel>Proposal Review</LegendLabel>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#1eae98" />
        <LegendLabel>Follow-up Meeting</LegendLabel>
      </LegendItem>
      
      {/* Divider between color and icon legends */}
      <LegendDivider />
      
      {/* Outcome icon legend items */}
      <LegendTitle>Outcomes:</LegendTitle>
      <LegendItem>
        <LegendIcon>✅</LegendIcon>
        <LegendLabel>Positive</LegendLabel>
      </LegendItem>
      <LegendItem>
        <LegendIcon>⚠️</LegendIcon>
        <LegendLabel>Neutral</LegendLabel>
      </LegendItem>
      <LegendItem>
        <LegendIcon>❌</LegendIcon>
        <LegendLabel>Negative</LegendLabel>
      </LegendItem>
      <LegendItem>
        <LegendIcon>❓</LegendIcon>
        <LegendLabel>Unknown</LegendLabel>
      </LegendItem>
    </Legend>


      <ContentContainer>
        <TimelineContainer>
          {filteredSessions.length === 0 ? (
            <EmptyState>No past sessions found for the selected time period.</EmptyState>
          ) : (
            filteredSessions.map(session => (
              <TimelineItem 
                key={session.id}
                onClick={() => setSelectedSession(session)}
                selected={selectedSession?.id === session.id}
              >
                <TimelineDate>{format(session.date, 'MMM d, yyyy')}</TimelineDate>
                <TimelineConnector>
                  <TimelineDot color={getSessionColor(session.type)} />
                  <TimelineLine />
                </TimelineConnector>
                <TimelineContent>
                  <TimelineHeader>
                    <TimelineTitle>{session.title}</TimelineTitle>
                    <TimelineOutcome>{getOutcomeIcon(session.outcome)}</TimelineOutcome>
                  </TimelineHeader>
                  <TimelineClient>{session.client} • {session.contact}</TimelineClient>
                  <TimelineDuration>{session.duration} minutes</TimelineDuration>
                  {selectedSession?.id === session.id && (
                    <TimelineDetails>
                      <TimelineNotes>
                        <strong>Notes:</strong> {session.notes || 'No notes available'}
                      </TimelineNotes>
                      <TimelineActions>
                      <ActionButton onClick={() => handleScheduleFollowUp(session)}>
                        Schedule Follow-up
                      </ActionButton>
                      <ActionButton onClick={() => handleViewDetails(session)}>
                        View Details
                      </ActionButton>
                    </TimelineActions>
                    </TimelineDetails>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))
          )}
        </TimelineContainer>
      </ContentContainer>

      {showFollowUpModal && (
  <ModalOverlay onClick={() => setShowFollowUpModal(false)}>
    <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <ModalHeader>
        <ModalTitle>Schedule Follow-up</ModalTitle>
        <CloseButton onClick={() => setShowFollowUpModal(false)}>×</CloseButton>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Client</Label>
          <Input value={sessionToFollowUp?.client} disabled />
        </FormGroup>
        <FormGroup>
          <Label>Follow-up Type</Label>
          <Select>
            <option value="call">Phone Call</option>
            <option value="email">Email</option>
            <option value="meeting">Meeting</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Date</Label>
          <Input type="date" min={new Date().toISOString().split('T')[0]} />
        </FormGroup>
        <FormGroup>
          <Label>Time</Label>
          <Input type="time" />
        </FormGroup>
        <FormGroup>
          <Label>Notes</Label>
          <Textarea placeholder="Add notes about this follow-up..." rows={3} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <CancelButton onClick={() => setShowFollowUpModal(false)}>Cancel</CancelButton>
        <SubmitButton onClick={() => {
          // Handle follow-up scheduling logic here
          alert('Follow-up scheduled successfully!');
          setShowFollowUpModal(false);
        }}>
          Schedule
        </SubmitButton>
      </ModalFooter>
    </ModalContent>
  </ModalOverlay>
)}

{showDetailModal && (
  <ModalOverlay onClick={() => setShowDetailModal(false)}>
    <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <ModalHeader>
        <ModalTitle>Session Details</ModalTitle>
        <CloseButton onClick={() => setShowDetailModal(false)}>×</CloseButton>
      </ModalHeader>
      <ModalBody>
        <DetailGroup>
          <DetailLabel>Session Type:</DetailLabel>
          <DetailValue>{sessionDetail?.type}</DetailValue>
        </DetailGroup>
        <DetailGroup>
          <DetailLabel>Client:</DetailLabel>
          <DetailValue>{sessionDetail?.client}</DetailValue>
        </DetailGroup>
        <DetailGroup>
          <DetailLabel>Contact:</DetailLabel>
          <DetailValue>{sessionDetail?.contact}</DetailValue>
        </DetailGroup>
        <DetailGroup>
          <DetailLabel>Date:</DetailLabel>
          <DetailValue>{sessionDetail?.date.toLocaleDateString()}</DetailValue>
        </DetailGroup>
        <DetailGroup>
          <DetailLabel>Duration:</DetailLabel>
          <DetailValue>{sessionDetail?.duration} minutes</DetailValue>
        </DetailGroup>
        <DetailGroup>
          <DetailLabel>Outcome:</DetailLabel>
          <DetailValue>{sessionDetail?.outcome || 'Not specified'}</DetailValue>
        </DetailGroup>
        <DetailGroup>
          <DetailLabel>Notes:</DetailLabel>
          <DetailValue>{sessionDetail?.notes || 'No notes available'}</DetailValue>
        </DetailGroup>
      </ModalBody>
      <ModalFooter>
        <SubmitButton onClick={() => setShowDetailModal(false)}>Close</SubmitButton>
      </ModalFooter>
    </ModalContent>
  </ModalOverlay>
)}

    </Container>
  );
};

// Styled Components
const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;



interface FilterButtonProps {
  active: boolean;
}

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button<FilterButtonProps>`
  background: ${props => props.active ? props.theme.buttonBg : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: Inter;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.buttonBg : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-2px);
  }
`;

const Legend = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: Inter;
`;

interface LegendColorProps {
  color: string;
}

const LegendColor = styled.div<LegendColorProps>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${props => props.color};
`;

const LegendLabel = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const LegendDivider = styled.div`
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 10px;
`;

const LegendTitle = styled.span`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-right: 10px;
  font-family: Inter;
`;

const LegendIcon = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  font-family: Inter;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface TimelineItemProps {
  selected: boolean;
}

const TimelineItem = styled.div<TimelineItemProps>`
  display: flex;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  background: ${props => props.selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TimelineDate = styled.div`
  width: 100px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
`;

const TimelineConnector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20px;
  flex-shrink: 0;
`;

interface TimelineDotProps {
  color: string;
}

const TimelineDot = styled.div<TimelineDotProps>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.color};
  margin-bottom: 5px;
`;

const TimelineLine = styled.div`
  width: 2px;
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.1);
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const TimelineTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const TimelineOutcome = styled.div`
  font-size: 16px;
`;

const TimelineClient = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 5px;
`;

const TimelineDuration = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
`;

const TimelineDetails = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const TimelineNotes = styled.div`
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.5;
`;

const TimelineActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: ${props => props.theme.buttonBg};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: Inter;
  &:hover {
    background: ${props => props.theme.buttonHover};
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: rgba(255, 255, 255, 0.6);
`;

const DetailGroup = styled.div`
  margin-bottom: 15px;
`;

const DetailLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.8);
`;

const DetailValue = styled.div`
  color: white;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${props => props.theme.background};
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  font-family: Inter;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const ModalFooter = styled.div`
  padding: 15px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  font-family: Inter;
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.buttonBg};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  font-family: Inter;
  option {
    background: ${props => props.theme.background};
    color: white;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.buttonBg};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  resize: vertical;
  font-family: Inter;
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.buttonBg};
  }
`;

const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.buttonBg};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter;
  &:hover {
    background: ${props => props.theme.buttonHover};
    transform: translateY(-2px);
  }
`;



export default PastSessions;
