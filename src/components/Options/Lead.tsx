import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';


interface Lead {
  id: string;
  name: string;
  contact: string;
  value: number;
  score: number;
}

interface LeadCardProps {
  lead: Lead;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  removeLead: (id: string) => void;
}

interface DragItem {
  id: string;
  index: number;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, index, moveCard, removeLead }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'LEAD',
    item: { id: lead.id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'LEAD',
    hover: (draggedItem: DragItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });
  const ref = (node: HTMLDivElement | null) => {
    dragRef(node);
    dropRef(node);
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '16px',
        marginBottom: '8px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderLeft: `4px solid ${lead.score >= 80 ? '#38ce3c' : lead.score >= 60 ? '#f9c74f' : '#e63946'}`,
        position: 'relative'

      }}
    >

<CloseButton 
        onClick={(e) => {
          e.stopPropagation(); // Prevent drag when clicking the button
          removeLead(lead.id);
        }}
      >
        ×
      </CloseButton>

      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '5px', fontFamily: 'Inter' }}>{lead.name}</h4>
      <div style={{ fontSize: '14px', color: '#666', fontFamily: 'Inter' }}>{lead.contact}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
      <span style={{ fontWeight: 'bold', color: '#333', fontSize: '15px', fontFamily: 'Inter' }}>${lead.value.toLocaleString()}</span>
        <span style={{ 
          background: lead.score >= 80 ? '#38ce3c' : lead.score >= 60 ? '#f9c74f' : '#e63946',
          color: 'white',
          padding: '2px 6px',
          borderRadius: '10px',
          fontSize: '12px'
        }}>{lead.score}</span>
      </div>
    </div>
  );
};

const LeadPipeline: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([
    { id: 'lead-1', name: 'Acme Corp', contact: 'John Smith', value: 5000, score: 85 },
    { id: 'lead-2', name: 'XYZ Inc', contact: 'Sarah Johnson', value: 7000, score: 72 },
    { id: 'lead-3', name: 'Tech Solutions', contact: 'Michael Brown', value: 3000, score: 65 }
  ]);

  const moveCard = (dragIndex: number, hoverIndex: number): void => {
    const draggedLead = leads[dragIndex];
    const newLeads = [...leads];
    newLeads.splice(dragIndex, 1);
    newLeads.splice(hoverIndex, 0, draggedLead);
    setLeads(newLeads);
  };

  const removeLead = (id: string): void => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h3 style={{ fontFamily: 'Inter' }}>Lead Pipeline</h3>
        <div>
        {leads.map((lead, index) => (
        <LeadCard
          key={lead.id}
          index={index}
          lead={lead}
          moveCard={moveCard}
          removeLead={removeLead}
        />
      ))}
        </div>
      </div>
    </DndProvider>
  );
};


const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: #999;
  font-size: 18px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #333;
  }
`;

export default LeadPipeline;
