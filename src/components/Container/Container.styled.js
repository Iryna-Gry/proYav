import styled from 'styled-components';

export const Container = styled.div`
  padding-left: 20px;
  font-family: Sofia Sans, sans-serif;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  @media screen and (max-width: 767px) {
    max-width: 450px;
  }
  @media screen and (min-width: 768px) {
    width: 768px;
  }
  @media screen and (min-width: 1200px) {
    width: 1200px;
  }
`;
