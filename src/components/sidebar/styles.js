import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Bar = styled.div`
  background: rgba(255, 255, 255, 0.8);

  height: 90%;
  width: 25%;

  margin: 50px;
  border-radius: 5px;

  position: absolute;
  overflow: auto;
`;
