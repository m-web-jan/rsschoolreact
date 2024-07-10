import React, { Component, ErrorInfo } from 'react';
import styled from 'styled-components';

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

const ErrorMsg = styled.h2`
  max-width: 20rem;
  margin: 2rem;
  color: white;
`;

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    console.log(123);
    console.error('Error caught by ErrorBoundary:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMsg>Что-то пошло не так. Пожалуйста, перезагрузите страницу.</ErrorMsg>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
