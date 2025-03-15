import React, { Component, createRef } from "react";
import styled from "styled-components";
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { convrseTheme } from '../components/theme';
import ExpandedView from '../components/ExpandedView';

// Define the state interface
interface State {
  flippedCards: { [key: number]: boolean };
  expandedOption: { cardId: number | null, optionIndex: number | null };
  originPosition: { top: number; left: number; width: number; height: number } | null;
}

// Card data
const cards = [
  { id: 1, title: "Quick Stats", options: ["Performance", "Leads", "Follow Ups"] },
  { id: 2, title: "Customer ", options: ["Add Customer", "Select Customer"] },
  { id: 3, title: "Session Insights", options: ["Scheduled Sessions", "Past Sessions"] },
];

class Dashboard extends Component<{}, State> {
  buttonRefs: { [key: string]: React.RefObject<HTMLButtonElement | null> } = {};
  
  constructor(props: {}) {
    super(props);
    
    // Create refs for all buttons
    cards.forEach(card => {
      card.options.forEach((_, optionIndex) => {
        this.buttonRefs[`${card.id}-${optionIndex}`] = createRef<HTMLButtonElement>();
      });
    });
    
    this.state = {
      flippedCards: {}, // Store flipped states
      expandedOption: { cardId: null, optionIndex: null },
      originPosition: null
    };
  }

  // Toggle flip state
  toggleFlip = (id: number) => {
    this.setState((prevState) => ({
      flippedCards: {
        ...prevState.flippedCards,
        [id]: !prevState.flippedCards[id],
      },
    }));
  };

  // Expand option to full view
  expandOption = (e: React.MouseEvent, cardId: number, optionIndex: number) => {
    e.stopPropagation(); // Prevent card from flipping back
    
    // Get the button's position
    const buttonRef = this.buttonRefs[`${cardId}-${optionIndex}`];
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      this.setState({
        expandedOption: { cardId, optionIndex },
        originPosition: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        }
      });
    } else {
      this.setState({
        expandedOption: { cardId, optionIndex },
        originPosition: null
      });
    }
  };

  // Close expanded view
  closeExpandedView = () => {
    this.setState({
      expandedOption: { cardId: null, optionIndex: null }
    });
  };

  // Change option within expanded view
  changeExpandedOption = (optionIndex: number) => {
    this.setState(prevState => ({
      expandedOption: { 
        ...prevState.expandedOption, 
        optionIndex 
      }
    }));
  };

  render() {
    const { flippedCards, expandedOption, originPosition } = this.state;
    
    return (
      <ThemeProvider theme={convrseTheme}>
        <AnimatePresence>
          {expandedOption.cardId !== null && expandedOption.optionIndex !== null ? (
            // Show expanded view when an option is selected
            <ExpandedView 
              cardId={expandedOption.cardId}
              optionIndex={expandedOption.optionIndex}
              cardTitle={cards.find(card => card.id === expandedOption.cardId)?.title || ""}
              options={cards.find(card => card.id === expandedOption.cardId)?.options || []}
              onClose={this.closeExpandedView}
              onChangeOption={this.changeExpandedOption}
              originPosition={originPosition}
            />
          ) : (
            // Show regular dashboard with cards
            <Container>
              <Title>Dashboard</Title>
              <h3>Welcome [Rep Name]</h3>
              <CardGrid>
                {cards.map((card) => (
                  <Card key={card.id} onClick={() => this.toggleFlip(card.id)}>
                    <CardInner flipped={!!flippedCards[card.id]}>
                      <CardFront>
                        <h3>{card.title}</h3>
                      </CardFront>
                      <CardBack>
                        <ul>
                          {card.options.map((option, index) => (
                            <li key={index}>
                              <OptionButton 
                                ref={this.buttonRefs[`${card.id}-${index}`]}
                                onClick={(e) => this.expandOption(e, card.id, index)}
                              >
                                {option}
                              </OptionButton>
                            </li>
                          ))}
                        </ul>
                      </CardBack>
                    </CardInner>
                  </Card>
                ))}
              </CardGrid>
            </Container>
          )}
        </AnimatePresence>
      </ThemeProvider>
    );
  }
}

// Keep your existing styled components
// ...


// Keep your existing styled components here
const Container = styled.div`
  text-align: center;
  font-family: Inter;
  padding: 2rem;
  background: ${props => props.theme.background};
  
  color: ${props => props.theme.text};
  height: 100vh;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 50px;
  font-family: Inter;
  margin-bottom: 20px;
  color: ${props => props.theme.title};
  font-weight: 600;
`;

const CardGrid = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;
  overflow: hidden;
`;

const Card = styled.div`
  margin-top: 25px;
  width: 400px;
  height: 500px;
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled.div<{ flipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0)")};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 12px;
`;

const CardFront = styled.div`
  position: absolute;
  font-family: Inter;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.cardFront};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  backface-visibility: hidden;
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.theme.cardText};
`;

const CardBack = styled(CardFront)`
  background: ${props => props.theme.cardBack};
  color: ${props => props.theme.cardBackText};
  transform: rotateY(180deg);
  flex-direction: column;
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
  }
`;

const OptionButton = styled.button`
  background: ${props => props.theme.buttonBg};
  color: ${props => props.theme.buttonText};
  border: none;
  margin: 5px 0;
  height: 50px;
  width: 200px;
  padding: 10px 14px;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-family: Inter;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.buttonHover};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadow};
  }
`;

export default Dashboard;
