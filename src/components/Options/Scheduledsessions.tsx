import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format, addDays, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';

// Sample data for scheduled sessions



interface Session {
  id: number;
  title: string;
  client: string;
  contact: string;
  date: Date;
  duration: number;
  type: 'demo' | 'overview' | 'proposal' | 'follow-up';
  status: 'upcoming' | 'completed';
}

const initialSessions: Session[] = [
  {
    id: 1,
    title: 'Product Demo: Convrse Spaces',
    client: 'Acme Corp',
    contact: 'John Smith',
    date: new Date(2025, 2, 17, 10, 0), // March 17, 2025, 10:00 AM
    duration: 60, // minutes
    type: 'demo',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Solution Overview',
    client: 'XYZ Inc',
    contact: 'Sarah Johnson',
    date: new Date(2025, 2, 14, 14, 30), // March 14, 2025, 2:30 PM
    duration: 45,
    type: 'overview',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Proposal Review',
    client: 'Tech Solutions',
    contact: 'Michael Brown',
    date: new Date(2025, 2, 16, 11, 0), // March 16, 2025, 11:00 AM
    duration: 30,
    type: 'proposal',
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Follow-up Meeting',
    client: 'Global Services',
    contact: 'Emily Davis',
    date: new Date(2025, 2, 13, 9, 15), // March 13, 2025, 9:15 AM
    duration: 30,
    type: 'follow-up',
    status: 'completed'
  }
];


const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 15)); // March 15, 2025
  const [view, setView] = useState('week'); // 'month', 'week', or 'day'
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [draggingSession, setDraggingSession] = useState<Session | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessionToCancel, setSessionToCancel] = useState<Session | null>(null);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);


  // Generate days for the current view
  const getDaysInView = () => {
    if (view === 'day') {
      return [currentDate];
    } else if (view === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    }
    // Month view implementation would go here
    return [];
  };

  const days = getDaysInView();

  // Get hours for the day view (8 AM to 6 PM)
  const hours = Array.from({ length: 11 }, (_, i) => i + 8);

  
  // Handle session drag start
  const handleDragStart = (session: Session) => {
    setDraggingSession(session);
  };

  // Handle dropping a session on a new time slot
  const handleDrop = (day: Date, hour: number) => {
    if (draggingSession) {
      const newDate = new Date(day);
      newDate.setHours(hour);
      newDate.setMinutes(0);
      
      setSessions(prev => prev.map(session => 
        session.id === draggingSession.id 
          ? { ...session, date: newDate } 
          : session
      ));
      setDraggingSession(null);
    }
  };

  // Get sessions for a specific day and hour
  const getSessionsForTimeSlot = (day: Date, hour: number) => {
    return sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return isSameDay(sessionDate, day) && sessionDate.getHours() === hour;
    });
  };

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

  const handleCancelSession = (session: Session) => {
    setSessionToCancel(session);
    setShowCancelConfirmation(true);
  };
  
  const confirmCancelSession = () => {
    if (sessionToCancel) {
      // Remove the session from the list
      setSessions(prev => prev.filter(s => s.id !== sessionToCancel.id));
      setShowCancelConfirmation(false);
      setSessionToCancel(null);
      
      // If the canceled session was selected, clear the selection
      if (selectedSession?.id === sessionToCancel.id) {
        setSelectedSession(null);
      }
    }
  };
  

  
  return (
    <Container>
      <Header>
        
        <Controls>
          <ViewToggle>
            <ViewButton 
              active={view === 'day'} 
              onClick={() => setView('day')}
            >
              Day
            </ViewButton>
            <ViewButton 
              active={view === 'week'} 
              onClick={() => setView('week')}
            >
              Week
            </ViewButton>
          </ViewToggle>
          <NavigationButtons>
            <NavButton onClick={() => setCurrentDate(prev => view === 'week' ? subWeeks(prev, 1) : addDays(prev, -1))}>
              &lt;
            </NavButton>
            <CurrentDateDisplay>
              {view === 'day' 
                ? format(currentDate, 'MMMM d, yyyy') 
                : `${format(days[0], 'MMM d')} - ${format(days[days.length - 1], 'MMM d, yyyy')}`
              }
            </CurrentDateDisplay>
            <NavButton onClick={() => setCurrentDate(prev => view === 'week' ? addWeeks(prev, 1) : addDays(prev, 1))}>
              &gt;
            </NavButton>
          </NavigationButtons>
        </Controls>
        <Legend>
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
   
  </Legend>
      </Header>

      <CalendarGrid>
        {/* Day headers */}
        <TimeColumn>
          <DayHeader>Time</DayHeader>
          {hours.map(hour => (
            <TimeSlot key={hour}>
              {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
            </TimeSlot>
          ))}
        </TimeColumn>

        {days.map(day => (
          <DayColumn key={day.toString()}>
            <DayHeader>
              {format(day, 'EEE')}<br />
              {format(day, 'MMM d')}
            </DayHeader>
            {hours.map(hour => (
              <TimeSlotContainer 
                key={`${day}-${hour}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(day, hour)}
              >
                {getSessionsForTimeSlot(day, hour).map(session => (
                  <SessionCard 
                    key={session.id}
                    color={getSessionColor(session.type)}
                    duration={session.duration}
                    draggable
                    onDragStart={() => handleDragStart(session)}
                    onClick={() => setSelectedSession(session)}
                    completed={session.status === 'completed'}
                  >
                    <SessionTime>{format(session.date, 'h:mm a')}</SessionTime>
                    <SessionTitle>{session.title}</SessionTitle>
                    <SessionClient>{session.client}</SessionClient>
                  </SessionCard>
                ))}
              </TimeSlotContainer>
            ))}
          </DayColumn>
        ))}
      </CalendarGrid>

      {selectedSession && (
        <SessionDetailModal>
          <ModalContent>
            <CloseButton onClick={() => setSelectedSession(null)}>×</CloseButton>
            <ModalTitle>{selectedSession.title}</ModalTitle>
            <ModalDetail><strong>Client:</strong> {selectedSession.client}</ModalDetail>
            <ModalDetail><strong>Contact:</strong> {selectedSession.contact}</ModalDetail>
            <ModalDetail><strong>Date:</strong> {format(selectedSession.date, 'MMMM d, yyyy')}</ModalDetail>
            <ModalDetail><strong>Time:</strong> {format(selectedSession.date, 'h:mm a')}</ModalDetail>
            <ModalDetail><strong>Duration:</strong> {selectedSession.duration} minutes</ModalDetail>
            <ModalDetail><strong>Type:</strong> {selectedSession.type.charAt(0).toUpperCase() + selectedSession.type.slice(1)}</ModalDetail>
            <ModalDetail><strong>Status:</strong> {selectedSession.status.charAt(0).toUpperCase() + selectedSession.status.slice(1)}</ModalDetail>
            <ButtonGroup>
            <ActionButton color="#e63946" onClick={() => handleCancelSession(selectedSession)}>
              Cancel Session
            </ActionButton>
          </ButtonGroup>
          </ModalContent>
        </SessionDetailModal>
      )}
      {showCancelConfirmation && (
  <ModalOverlay onClick={() => setShowCancelConfirmation(false)}>
    <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <ModalHeader>
        <ModalTitle>Cancel Session</ModalTitle>
        <CloseButton onClick={() => setShowCancelConfirmation(false)}>×</CloseButton>
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to cancel this session with {sessionToCancel?.client}?</p>
      </ModalBody>
      <ModalFooter>
        <CancelButton onClick={() => setShowCancelConfirmation(false)}>No, Keep It</CancelButton>
        <SubmitButton onClick={confirmCancelSession} style={{ background: '#e63946' }}>
          Yes, Cancel Session
        </SubmitButton>
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



const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ViewToggle = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
`;

const ViewButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? props.theme.buttonBg : 'transparent'};
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: Inter;
  &:hover {
    background: ${props => props.active ? props.theme.buttonBg : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CurrentDateDisplay = styled.div`
  font-weight: 500;
  font-family: Inter;
`;

const CalendarGrid = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

const TimeColumn = styled.div`
  width: 80px;
  flex-shrink: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

const DayColumn = styled.div`
  flex: 1;
  min-width: 150px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-right: none;
  }
`;

const DayHeader = styled.div`
  padding: 10px;
  text-align: center;
  font-weight: 500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeSlot = styled.div`
  height: 60px;
  padding: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
`;

const TimeSlotContainer = styled.div`
  height: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px; /* Match the padding */
  position: relative;
  box-sizing: border-box;
`;


const SessionCard = styled.div<{ color: string; duration: number; completed: boolean }>`
  background: ${props => props.color};
  opacity: ${props => props.completed ? 0.6 : 1};
  border-radius: 4px;
  padding: 5px;
  font-size: 12px;
  cursor: pointer;
  height: 40px;
  font-family: Inter;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SessionTime = styled.div`
  font-weight: bold;
  font-size: 10px;
`;

const SessionTitle = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SessionClient = styled.div`
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SessionDetailModal = styled.div`
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
  padding: 20px;
  width: 400px;
  max-width: 90%;
  position: relative;
  font-family: Inter;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const ModalTitle = styled.h3`
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalDetail = styled.p`
  margin: 8px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ActionButton = styled.button<{ color: string }>`
  background: ${props => props.color};
  color: white;
  border: none;
  font-family: Inter;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

// Add this component to your CalendarView
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

const LegendColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${props => props.color};
`;

const LegendLabel = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
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

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  
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
  
  &:hover {
    background: ${props => props.theme.buttonHover};
    transform: translateY(-2px);
  }
`;



export default CalendarView;
