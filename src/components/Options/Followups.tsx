import React, { useState } from 'react';
import styled from 'styled-components';

// Define interfaces for type safety
interface FollowUp {
  id: number;
  customer: string;
  contact: string;
  date: string;
  type: 'call' | 'email' | 'meeting' | string;
  status: 'pending' | 'completed';
  notes: string;
}

interface FilterButtonProps {
  active: boolean;
}

// Styled components
const FollowUpContainer = styled.div`
  padding: 20px;
  height: calc(100vh - 180px);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin: 0;
  color: white;
  font-size: 24px;
  font-family: Inter;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button<FilterButtonProps>`
  background: ${props => props.active ? props.theme.buttonBg : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-family: Inter;
  &:hover {
    background: ${props => props.active ? props.theme.buttonBg : 'rgba(255, 255, 255, 0.3)'};
  }
`;

const TimelineContainer = styled.div`
  height: calc(100vh - 240px);
  overflow-y: auto;
  padding-right: 10px;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  position: relative;
`;

const TimelineIconContainer = styled.div<{color: string}>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  margin-right: 15px;
  z-index: 2;
`;

const TimelineContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  position: relative;
  border-left: 4px solid ${props => props.color || '#f9c74f'};
`;

const TimelineDate = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const TimelineConnector = styled.div`
  position: absolute;
  left: 20px;
  top: 40px;
  bottom: -20px;
  width: 2px;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 1;
`;

const CompleteButton = styled.button`
  background: #5d4b8c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  transition: all 0.2s ease;
  
  &:hover {
    background: #4a3d70;
    transform: translateY(-2px);
  }
`;

const CompletedBadge = styled.span`
  color: #38ce3c;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
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

const LegendColor = styled.div<{ color: string }>`
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
  font-size: 14px;
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

const ActionContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const RemoveButton = styled.button`
  background: rgba(230, 57, 70, 0.1);
  color: #e63946;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(230, 57, 70, 0.2);
    transform: translateY(-2px);
  }
`;



const FollowUpTimeline: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [followUps, setFollowUps] = useState<FollowUp[]>([
    {
      id: 1,
      customer: "Acme Corp",
      contact: "John Smith",
      date: "2025-03-14T10:00:00",
      type: "call",
      status: "pending",
      notes: "Discuss new product features and pricing options"
    },
    {
      id: 2,
      customer: "XYZ Inc",
      contact: "Sarah Johnson",
      date: "2025-03-13T14:30:00",
      type: "email",
      status: "completed",
      notes: "Sent proposal follow-up with additional information requested"
    },
    {
      id: 3,
      customer: "Tech Solutions",
      contact: "Michael Brown",
      date: "2025-03-12T11:00:00",
      type: "meeting",
      status: "completed",
      notes: "Demo of new features, client expressed interest in premium tier"
    },
    {
      id: 4,
      customer: "Global Services",
      contact: "Emily Davis",
      date: "2025-03-15T09:15:00",
      type: "call",
      status: "pending",
      notes: "Follow up on last week's demo, address remaining questions"
    },
    {
      id: 5,
      customer: "Innovate LLC",
      contact: "Robert Wilson",
      date: "2025-03-11T13:00:00",
      type: "email",
      status: "completed",
      notes: "Sent contract for review, waiting for feedback"
    }
  ]);

  const getIconText = (type: string): string => {
    switch(type) {
      case 'call': return '📞';
      case 'email': return '✉️';
      case 'meeting': return '👥';
      default: return '⏰';
    }
  };

  const getStatusColor = (status: string, date: string): string => {
    switch(status) {
      case 'completed': return "#38ce3c";
      case 'pending': 
        return new Date(date) < new Date() ? "#e63946" : "#f9c74f";
      default: return "#f9c74f";
    }
  };

  const markComplete = (id: number): void => {
    setFollowUps(followUps.map(followUp => 
      followUp.id === id ? {...followUp, status: 'completed'} : followUp
    ));
  };

  const filteredFollowUps = followUps.filter(followUp => {
    if (filter === 'all') return true;
    if (filter === 'pending') return followUp.status === 'pending';
    if (filter === 'completed') return followUp.status === 'completed';
    return true;
  });
  const removeFollowUp = (id: number) => {
    if (window.confirm("Are you sure you want to remove this follow-up?")) {
      setFollowUps(followUps.filter(followUp => followUp.id !== id));
    }
  };

  return (
    <FollowUpContainer>
      <Header>
        <Title>Follow-Up Timeline</Title>
        </Header>
        <Header>
        <Legend>
        <LegendItem>
          <LegendColor color="#38ce3c" />
          <LegendLabel>Completed</LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#f9c74f" />
          <LegendLabel>Pending</LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#e63946" />
          <LegendLabel>Overdue</LegendLabel>
        </LegendItem>
        <LegendDivider />
        <LegendTitle>Follow-up Types:</LegendTitle>
        <LegendItem>
          <LegendIcon>📞</LegendIcon>
          <LegendLabel>Call</LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendIcon>✉️</LegendIcon>
          <LegendLabel>Email</LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendIcon>👥</LegendIcon>
          <LegendLabel>Meeting</LegendLabel>
        </LegendItem>
      </Legend>
        <FilterContainer>
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            All
          </FilterButton>
          <FilterButton active={filter === 'pending'} onClick={() => setFilter('pending')}>
            Pending
          </FilterButton>
          <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>
            Completed
          </FilterButton>
        </FilterContainer>
        </Header>
      
      
        <TimelineContainer>
  {filteredFollowUps.map((followUp, index) => (
    <TimelineItem key={followUp.id}>
      <TimelineIconContainer color={getStatusColor(followUp.status, followUp.date)}>
        {getIconText(followUp.type)}
      </TimelineIconContainer>
      
      {index !== filteredFollowUps.length - 1 && <TimelineConnector />}
      
      <TimelineContent color={getStatusColor(followUp.status, followUp.date)}>
        <TimelineDate>{new Date(followUp.date).toLocaleString()}</TimelineDate>
        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{followUp.customer}</h4>
        <h5 style={{ margin: '0 0 10px 0', color: '#666' }}>{followUp.contact}</h5>
        <p style={{ margin: '0 0 15px 0', color: "black" }}>{followUp.notes}</p>
        <ActionContainer>
          {followUp.status === 'pending' ? (
            <CompleteButton onClick={() => markComplete(followUp.id)}>
              Mark Complete
            </CompleteButton>
          ) : (
            <CompletedBadge>
              Completed
            </CompletedBadge>
          )}
          <RemoveButton onClick={() => removeFollowUp(followUp.id)}>
            Remove
          </RemoveButton>
        </ActionContainer>
      </TimelineContent>
    </TimelineItem>
  ))}
</TimelineContainer>

    </FollowUpContainer>
  );
};

export default FollowUpTimeline;
