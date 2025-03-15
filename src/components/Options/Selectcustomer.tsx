import React, { useState } from 'react';
import styled from 'styled-components';

interface Customer {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  lastInteraction: string;
  status: 'active' | 'inactive' | 'prospect';
}

const SelectCustomer = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Acme Corp',
      contact: 'John Smith',
      email: 'john@acmecorp.com',
      phone: '(555) 123-4567',
      industry: 'Technology',
      companySize: '51-200',
      lastInteraction: '2025-03-10',
      status: 'active'
    },
    {
      id: '2',
      name: 'XYZ Inc',
      contact: 'Sarah Johnson',
      email: 'sarah@xyzinc.com',
      phone: '(555) 987-6543',
      industry: 'Healthcare',
      companySize: '11-50',
      lastInteraction: '2025-03-05',
      status: 'prospect'
    },
    {
      id: '3',
      name: 'Tech Solutions',
      contact: 'Michael Brown',
      email: 'michael@techsolutions.com',
      phone: '(555) 456-7890',
      industry: 'Technology',
      companySize: '1-10',
      lastInteraction: '2025-02-28',
      status: 'active'
    },
    {
      id: '4',
      name: 'Global Services',
      contact: 'Emily Davis',
      email: 'emily@globalservices.com',
      phone: '(555) 234-5678',
      industry: 'Finance',
      companySize: '201-500',
      lastInteraction: '2025-03-12',
      status: 'inactive'
    },
    {
      id: '5',
      name: 'Innovate LLC',
      contact: 'Robert Wilson',
      email: 'robert@innovatellc.com',
      phone: '(555) 876-5432',
      industry: 'Manufacturing',
      companySize: '51-200',
      lastInteraction: '2025-03-08',
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [detailPanelOpen, setDetailPanelOpen] = useState(true);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === '' || customer.industry === industryFilter;
    const matchesStatus = statusFilter === '' || customer.status === statusFilter;
    
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const industries = Array.from(new Set(customers.map(customer => customer.industry)));

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDetailPanelOpen(true);
  };

  const handleSchedulePresentation = () => {
    setShowScheduleModal(true);
  };

  const closeScheduleModal = () => {
    setShowScheduleModal(false);
  };

  const handleDeleteCustomer = (id: string) => {
    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to remove this customer?")) {
      // Remove the customer from the list
      setCustomers(customers.filter(customer => customer.id !== id));
      
      // If the deleted customer was selected, clear the selection
      if (selectedCustomer?.id === id) {
        setSelectedCustomer(null);
      }
    }
  };

  return (
    <Container>
      <Header>
        
        <SearchAndFilterContainer>
          <SearchBar 
            placeholder="Search by name or contact..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterContainer>
            <FilterSelect 
              value={industryFilter} 
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </FilterSelect>
            <FilterSelect 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="prospect">Prospect</option>
            </FilterSelect>
          </FilterContainer>
        </SearchAndFilterContainer>
      </Header>

      <ContentContainer>
        <CustomerListContainer>
          <RecentSection>
            <SectionTitle>Recently Viewed</SectionTitle>
            <CustomerGrid>
              {filteredCustomers.slice(0, 3).map(customer => (
                <CustomerCard 
                  key={customer.id}
                  onClick={() => handleCustomerSelect(customer)}
                  selected={selectedCustomer?.id === customer.id}
                  status={customer.status}
                >
                  <CustomerName>{customer.name}</CustomerName>
                  <CustomerDetail>{customer.contact}</CustomerDetail>
                  <CustomerDetail>{customer.email}</CustomerDetail>
                  <CustomerFooter>
                    <CustomerIndustry>{customer.industry}</CustomerIndustry>
                    <CustomerStatus status={customer.status}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </CustomerStatus>
                  </CustomerFooter>
                </CustomerCard>
              ))}
            </CustomerGrid>
          </RecentSection>

          <SectionTitle>All Customers</SectionTitle>
          <CustomerGrid>
            {filteredCustomers.map(customer => (
              <CustomerCard 
                key={customer.id}
                onClick={() => handleCustomerSelect(customer)}
                selected={selectedCustomer?.id === customer.id}
                status={customer.status}
              >
                <CustomerName>{customer.name}</CustomerName>
                <CustomerDetail>{customer.contact}</CustomerDetail>
                <CustomerDetail>{customer.email}</CustomerDetail>
                <CustomerFooter>
                  <CustomerIndustry>{customer.industry}</CustomerIndustry>
                  <CustomerStatus status={customer.status}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </CustomerStatus>
                </CustomerFooter>
              </CustomerCard>
            ))}
          </CustomerGrid>
        </CustomerListContainer>

        {selectedCustomer && detailPanelOpen && (
       <CustomerDetailPanel>
            <CloseIconButton onClick={() => setDetailPanelOpen(false)}>×</CloseIconButton>
            <DetailHeader>
              <DetailTitle>{selectedCustomer.name}</DetailTitle>
              <ButtonGroup>
              <ScheduleButton onClick={handleSchedulePresentation}>
                Schedule Meeting
              </ScheduleButton>
              <DeleteButton onClick={() => handleDeleteCustomer(selectedCustomer.id)}>
                Remove Customer
              </DeleteButton>
              </ButtonGroup>
            </DetailHeader>
            <DetailSection>
              <DetailSectionTitle>Contact Information</DetailSectionTitle>
              <DetailItem>
                <DetailLabel>Primary Contact:</DetailLabel>
                <DetailValue>{selectedCustomer.contact}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Email:</DetailLabel>
                <DetailValue>{selectedCustomer.email}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Phone:</DetailLabel>
                <DetailValue>{selectedCustomer.phone}</DetailValue>
              </DetailItem>
            </DetailSection>
            <DetailSection>
              <DetailSectionTitle>Company Information</DetailSectionTitle>
              <DetailItem>
                <DetailLabel>Industry:</DetailLabel>
                <DetailValue>{selectedCustomer.industry}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Company Size:</DetailLabel>
                <DetailValue>{selectedCustomer.companySize} employees</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Status:</DetailLabel>
                <DetailValue>
                  <CustomerStatus status={selectedCustomer.status} inline>
                    {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                  </CustomerStatus>
                </DetailValue>
              </DetailItem>
            </DetailSection>
            <DetailSection>
              <DetailSectionTitle>Interaction History</DetailSectionTitle>
              <DetailItem>
                <DetailLabel>Last Interaction:</DetailLabel>
                <DetailValue>{new Date(selectedCustomer.lastInteraction).toLocaleDateString()}</DetailValue>
              </DetailItem>
              <InteractionTimeline>
                <TimelineItem>
                  <TimelineDate>March 12, 2025</TimelineDate>
                  <TimelineContent>
                    <TimelineTitle>Email Follow-up</TimelineTitle>
                    <TimelineDescription>Sent product information and pricing details</TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineDate>March 5, 2025</TimelineDate>
                  <TimelineContent>
                    <TimelineTitle>Initial Call</TimelineTitle>
                    <TimelineDescription>Discussed needs and potential solutions</TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineDate>February 28, 2025</TimelineDate>
                  <TimelineContent>
                    <TimelineTitle>Lead Created</TimelineTitle>
                    <TimelineDescription>Contact information added to system</TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
              </InteractionTimeline>
            </DetailSection>
          </CustomerDetailPanel>
        )}
      </ContentContainer>

      {showScheduleModal && (
        <ModalOverlay onClick={closeScheduleModal}>
          <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Schedule Meeting</ModalTitle>
              <CloseButton onClick={closeScheduleModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Customer</Label>
                <Input value={selectedCustomer?.name} disabled />
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
                <Label>Presentation Type</Label>
                <Select>
                  <option value="product">Product Demo</option>
                  <option value="solution">Solution Overview</option>
                  <option value="proposal">Proposal Review</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Notes</Label>
                <Textarea placeholder="Add any additional details about the presentation..." rows={4} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <CancelButton onClick={closeScheduleModal}>Cancel</CancelButton>
              <SubmitButton>Schedule</SubmitButton>
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



const SearchAndFilterContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const SearchBar = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-family: Inter;
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterSelect = styled.select`
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-family: Inter;
  option {
    background: #2a3a4a;
    color: white;
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
  overflow: hidden;
  font-family: Inter;
`;

const CustomerListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
`;

const RecentSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 15px 0;
  font-weight: 500;
  font-family: Inter;
`;

const DeleteButton = styled.button`
  background: #e63946;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: Inter;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  transition: all 0.2s ease;
  
  &:hover {
    background: #c1121f;
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const TrashIcon = styled.span`
  &:before {
    content: "🗑️";
  }
`;


const CustomerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
`;

interface CustomerCardProps {
  selected: boolean;
  status: string;
}

const CustomerCard = styled.div<CustomerCardProps>`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 4px solid ${props => {
    switch(props.status) {
      case 'active': return '#38ce3c';
      case 'inactive': return '#e63946';
      case 'prospect': return '#f9c74f';
      default: return 'transparent';
    }
  }};
  box-shadow: ${props => props.selected ? '0 0 0 2px #1eae98' : 'none'};
  transform: ${props => props.selected ? 'translateY(-2px)' : 'none'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`;

const CustomerName = styled.h4`
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 600;
`;

const CustomerDetail = styled.p`
  margin: 0 0 5px 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const CustomerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const CloseIconButton = styled.button`
  position: relative;
  left: 95%;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  cursor: pointer;
  width: 30px;
 
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;


const CustomerIndustry = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
`;

interface CustomerStatusProps {
  status: string;
  inline?: boolean;
}

const CustomerStatus = styled.span<CustomerStatusProps>`
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
  background: ${props => {
    switch(props.status) {
      case 'active': return 'rgba(56, 206, 60, 0.2)';
      case 'inactive': return 'rgba(230, 57, 70, 0.2)';
      case 'prospect': return 'rgba(249, 199, 79, 0.2)';
      default: return 'transparent';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#38ce3c';
      case 'inactive': return '#e63946';
      case 'prospect': return '#f9c74f';
      default: return 'white';
    }
  }};
  display: ${props => props.inline ? 'inline-block' : 'block'};
`;

const CustomerDetailPanel = styled.div`
  width: 350px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
`;

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const DetailTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
`;

const ScheduleButton = styled.button`
  background: ${props => props.theme.buttonBg};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: Inter;
  &:hover {
    background: ${props => props.theme.buttonHover};
    transform: translateY(-2px);
  }
`;

const DetailSection = styled.div`
  margin-bottom: 25px;
`;

const DetailSectionTitle = styled.h4`
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  width: 120px;
  flex-shrink: 0;
`;

const DetailValue = styled.span`
  font-size: 14px;
`;

const InteractionTimeline = styled.div`
  margin-top: 15px;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  position: relative;
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    top: 24px;
    left: 7px;
    bottom: -15px;
    width: 2px;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TimelineDate = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  width: 100px;
`;

const TimelineContent = styled.div`
  flex: 1;
  padding-left: 15px;
`;

const TimelineTitle = styled.h5`
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const TimelineDescription = styled.p`
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
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
  color: white;
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

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: white;
  font-family: Inter;
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

export default SelectCustomer;
