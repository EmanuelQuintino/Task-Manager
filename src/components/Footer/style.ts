import styled from "styled-components";

export const Container = styled.footer`
  width: 100%;
  height: 6rem;
  background: ${({ theme }) => theme.colors.PRIMARY700}22;
  box-shadow: 0 0 4px 4px #0002;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
  }
`;
