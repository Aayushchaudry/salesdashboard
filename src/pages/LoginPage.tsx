import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import styled, { ThemeProvider } from 'styled-components';
import { convrseTheme } from '../components/theme';

// Styled components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background: ${props => props.theme.background};
`;

const FormContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.formBackground};
  box-shadow: ${props => props.theme.shadow};
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
`;

const Form = styled.div`
  width: 400px;
  padding: 32px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.titleColor};
  text-align: center;
`;

const Label = styled.label`
  display: block;
  color: ${props => props.theme.labelColor};
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  border: 1px solid ${props => props.theme.inputBorder};
  border-radius: 8px;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.inputFocusBorder};
    box-shadow: 0 0 5px rgba(107, 91, 149, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 24px;
  background-color: ${props => props.theme.buttonBg};
  color: ${props => props.theme.buttonText};
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.buttonHover};
  }
`;

const IllustrationContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.text};
  padding: 40px;
`;

const IllustrationTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const IllustrationText = styled.p`
  font-size: 0.875rem;
  color: #e0e0e0;
  margin-top: 8px;
`;

const IllustrationImage = styled.img`
  margin-top: 24px;
  width: 80%;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login button clicked"); 
    if (email && password) {
      dispatch(login({ email, password }));
      
      // Check if login was successful
      const validEmail = 'test@example.com';
      const validPassword = 'password123';
      if (email === validEmail && password === validPassword) {
        navigate('/dashboard');
      }
    }
  };

  return (
    <ThemeProvider theme={convrseTheme}>
      <Container>
        <FormContainer>
          <Form>
            <Title>
              <span style={{ color: convrseTheme.accentColor }}>Convrse</span> Spaces
            </Title>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <Button onClick={handleLogin}>Login</Button>
          </Form>
        </FormContainer>

        <IllustrationContainer>
          <IllustrationTitle>
            It's not about what you make. <br /> It's about what you make
            possible.
          </IllustrationTitle>
          <IllustrationText>Welcome to Convrse Spaces!</IllustrationText>
          <IllustrationImage
            src="/assets/login-illustration.jpg"
            alt="Illustration"
          />
        </IllustrationContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
