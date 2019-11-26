import styled, { css } from "styled-components";
import { IoIosAdd, IoIosCheckmark } from "react-icons/io";

export const Container = styled.div`
  padding: ${props => 2 * props.theme.unit + "px"};
`;

export const Icon = css`
  font-size: 3rem;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.transparent3};
  }
  transition: color 0.5s;
`;

export const AddIcon = styled(IoIosAdd)`
  ${Icon}
`;

export const TickIcon = styled(IoIosCheckmark)`
  ${Icon}
`;
