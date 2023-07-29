import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderLink = styled(NavLink)`
  display: block;
  padding: 15px 20px;
  text-decoration: none;

  color: aliceblue;
  font-weight: 700;
  font-family: Sofia Sans, sans-serif;
  line-height: 1.5;
  transition: all 0.3s ease-in;

  &.active,
  :hover {
    background-color: rgb(185, 11, 46);
  }
`;
