import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMenu } from "react-icons/hi";

// Styled Components
const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <StyledHeader>
      <ButtonIcon>
        <HiOutlineMenu />
      </ButtonIcon>
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
