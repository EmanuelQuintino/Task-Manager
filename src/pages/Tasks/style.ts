import styled from "styled-components";

export const Container = styled.main`
  margin-top: 1.2rem;

  .headPageTasks {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(${({ theme }) => theme.size.MAIN_WIDTH_MOBILE} + 5vw);
  }

  h2 {
    font-size: 2rem;
  }

  .paginationDesktop {
    display: none;
  }

  .tasksContainer {
    height: 70vh;
    overflow-y: auto;
    margin-top: 1.2rem;

    display: grid;
    place-content: start;
    gap: 1.2rem;

    .emptyMessageTasks {
      color: ${({ theme }) => theme.colors.LIGHT200}88;
      font-weight: 700;
      font-size: 1.2rem;
    }

    &::-webkit-scrollbar {
      width: 0.75rem;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.DARK200};
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.LIGHT200};
      border-radius: 0.8rem;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.LIGHT400};
    }
  }

  .paginationMobile {
    margin-top: 1.6rem;
  }

  @media (min-width: 768px) {
    .headPageTasks {
      width: calc(${({ theme }) => theme.size.MAIN_WIDTH_DESKTOP} + 5vw);
    }

    h2 {
      font-size: 2.8rem;
    }

    .paginationDesktop {
      display: block;
    }

    .tasksContainer {
      height: 60vh;

      .emptyMessageTasks {
        font-size: 1.4rem;
      }
    }

    .paginationMobile {
      display: none;
    }
  }
`;
