import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import { z } from 'zod';

// Styled components for your form
const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-bottom: 20px;
`;

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(to right, #3a7c89, #1eae98);
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface StepCircleProps {
  active: boolean;
}

const StepCircle = styled.div<StepCircleProps>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.active ? props.theme.buttonBg : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

interface StepLabelProps {
  active: boolean;
}

const StepLabel = styled.div<StepLabelProps>`
  font-size: 14px;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  font-family: Inter;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  background: ${props => props.theme.buttonBg};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-family: Inter;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  
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
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.buttonBg};
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 5px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const CheckboxLabel = styled.label`
  color: white;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Radio = styled.input`
  margin-right: 10px;
`;

const RadioLabel = styled.label`
  color: white;
`;

interface FormData {
  // Basic Info
  firstName: string;
  lastName: string;
  companyName: string;
  
  // Contact Details
  email: string;
  phone: string;
  address?: string;
  city?: string;
  
  // Business Info
  industry: string;
  companySize: string;
  annualRevenue?: string;
  
  // Preferences
  emailUpdates?: boolean;
  smsUpdates?: boolean;
  preferredContact: string;
  notes?: string;
}

// Step components using useFormContext to access the parent form
const BasicInfoStep = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  
  return (
    <div>
      <h3>Basic Information</h3>
      <FormGroup>
        <Label>First Name*</Label>
        <Input 
          {...register("firstName")}
          placeholder="Enter first name" 
        />
        {errors.firstName && <ErrorMessage>{errors.firstName.message?.toString()}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label>Last Name*</Label>
        <Input 
          {...register("lastName")}
          placeholder="Enter last name" 
        />
        {errors.lastName && <ErrorMessage>{errors.lastName.message?.toString()}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label>Company Name*</Label>
        <Input 
          {...register("companyName")}
          placeholder="Enter company name" 
        />
        {errors.companyName && <ErrorMessage>{errors.companyName.message?.toString()}</ErrorMessage>}
      </FormGroup>
    </div>
  );
};

const ContactDetailsStep = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  
  return (
    <div>
      <h3>Contact Details</h3>
      <FormGroup>
        <Label>Email Address*</Label>
        <Input 
          {...register("email")}
          placeholder="Enter email address" 
          type="email"
        />
        {errors.email && <ErrorMessage>{errors.email.message?.toString()}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label>Phone Number*</Label>
        <Input 
          {...register("phone")}
          placeholder="Enter phone number" 
          type="tel"
        />
        {errors.phone && <ErrorMessage>{errors.phone.message?.toString()}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label>Address</Label>
        <Input 
          {...register("address")}
          placeholder="Enter address" 
        />
      </FormGroup>
      
      <FormGroup>
        <Label>City</Label>
        <Input 
          {...register("city")}
          placeholder="Enter city" 
        />
      </FormGroup>
    </div>
  );
};

const BusinessInfoStep = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  
  return (
    <div>
      <h3>Business Information</h3>
      <FormGroup>
        <Label>Industry*</Label>
        <Select 
          {...register("industry")}
        >
          <option value="">Select industry</option>
          <option value="technology">Technology</option>
          <option value="healthcare">Healthcare</option>
          <option value="finance">Finance</option>
          <option value="retail">Retail</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="other">Other</option>
        </Select>
        {errors.industry && <ErrorMessage>{errors.industry.message?.toString()}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label>Company Size*</Label>
        <Select 
          {...register("companySize")}
        >
          <option value="">Select company size</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="501+">501+ employees</option>
        </Select>
        {errors.companySize && <ErrorMessage>{errors.companySize.message?.toString()}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label>Annual Revenue</Label>
        <Select {...register("annualRevenue")}>
          <option value="">Select annual revenue</option>
          <option value="<1M">Less than $1 million</option>
          <option value="1M-10M">$1 million - $10 million</option>
          <option value="10M-50M">$10 million - $50 million</option>
          <option value="50M-100M">$50 million - $100 million</option>
          <option value="100M+">$100 million+</option>
        </Select>
      </FormGroup>
    </div>
  );
};

const PreferencesStep = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  
  return (
    <div>
      <h3>Preferences</h3>
      <FormGroup>
        <Label>Communication Preferences</Label>
        <CheckboxContainer>
          <Checkbox 
            type="checkbox" 
            id="emailUpdates" 
            {...register("emailUpdates")} 
          />
          <CheckboxLabel htmlFor="emailUpdates">Receive email updates</CheckboxLabel>
        </CheckboxContainer>
        
        <CheckboxContainer>
          <Checkbox 
            type="checkbox" 
            id="smsUpdates" 
            {...register("smsUpdates")} 
          />
          <CheckboxLabel htmlFor="smsUpdates">Receive SMS updates</CheckboxLabel>
        </CheckboxContainer>
      </FormGroup>
      
      <FormGroup>
        <Label>Preferred Contact Method*</Label>
        <RadioContainer>
          <Radio 
            type="radio" 
            id="contactEmail" 
            value="email" 
            {...register("preferredContact")} 
          />
          <RadioLabel htmlFor="contactEmail">Email</RadioLabel>
        </RadioContainer>
        
        <RadioContainer>
          <Radio 
            type="radio" 
            id="contactPhone" 
            value="phone" 
            {...register("preferredContact")} 
          />
          <RadioLabel htmlFor="contactPhone">Phone</RadioLabel>
        </RadioContainer>
        {errors.preferredContact && <ErrorMessage>{errors.preferredContact.message?.toString()}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label>Additional Notes</Label>
        <Textarea 
          {...register("notes")}
          placeholder="Any additional information you'd like to share" 
          rows={4}
        />
      </FormGroup>
    </div>
  );
};

// Multi-step form component
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'contact', label: 'Contact Details' },
    { id: 'business', label: 'Business Info' },
    { id: 'preferences', label: 'Preferences' }
  ];
  
  const formSchema = z.object({
    // Basic Info
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    companyName: z.string().min(1, "Company name is required"),
    
    // Contact Details
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    address: z.string().optional(),
    city: z.string().optional(),
    
    // Business Info
    industry: z.string().min(1, "Industry is required"),
    companySize: z.string().min(1, "Company size is required"),
    annualRevenue: z.string().optional(),
    
    // Preferences
    emailUpdates: z.boolean().optional(),
    smsUpdates: z.boolean().optional(),
    preferredContact: z.string().min(1, "Preferred contact method is required"),
    notes: z.string().optional()
  });
  
  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      industry: '',
      companySize: '',
      preferredContact: ''
    }
  });
  
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const nextStep = () => {
    const fieldsToValidate = currentStep === 0 
      ? ['firstName', 'lastName', 'companyName']
      : currentStep === 1 
        ? ['email', 'phone'] 
        : currentStep === 2 
          ? ['industry', 'companySize']
          : ['preferredContact'];
    
    methods.trigger(fieldsToValidate as any).then(isValid => {
      if (isValid) {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      }
    });
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Handle form submission, e.g., send data to API
    alert('Customer added successfully!');
  };
  
  return (
    <FormProvider {...methods}>
      <ProgressContainer>
        <ProgressBar progress={progress} />
      </ProgressContainer>
      
      <StepIndicator>
        {steps.map((step, index) => (
          <Step key={step.id}>
            <StepCircle active={index <= currentStep}>{index + 1}</StepCircle>
            <StepLabel active={index <= currentStep}>{step.label}</StepLabel>
          </Step>
        ))}
      </StepIndicator>
      
      <FormContainer>
        {currentStep === 0 && <BasicInfoStep />}
        {currentStep === 1 && <ContactDetailsStep />}
        {currentStep === 2 && <BusinessInfoStep />}
        {currentStep === 3 && <PreferencesStep />}
        
        <ButtonContainer>
          <Button 
            onClick={prevStep} 
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={methods.handleSubmit(onSubmit)}>Submit</Button>
          )}
        </ButtonContainer>
      </FormContainer>
    </FormProvider>
  );
};

export default MultiStepForm;
