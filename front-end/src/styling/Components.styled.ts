import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 100vh;
  position: sticky;
`;

export const Button = styled.button`
  display: inline-block;
  padding: var(--btn-padding);
  font-weight: 500;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 300ms ease;
  font-size: 0.9rem;
`;

export const SingleContentCard = styled.div`
  /* border: 3px solid; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  margin: 5px;
  img {
    margin: 30px 30px 30px 30px;
    float: left;
  }
`;