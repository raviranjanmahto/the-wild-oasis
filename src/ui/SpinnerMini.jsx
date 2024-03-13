import styled, { keyframes } from "styled-components";
import { BiLoaderCircle } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSpinnerMini = styled(BiLoaderCircle)`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
`;

const Text = styled.span`
  margin-left: 0.4rem;
`;

const SpinnerMini = ({ text }) => {
  return (
    <Container>
      <StyledSpinnerMini />
      <Text>{text}</Text>
    </Container>
  );
};

export default SpinnerMini;
