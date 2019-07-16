import styled from 'styled-components';

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
    margin-bottom: 25px;
  }
  img {
    width: 100px;
    border-radius: 50%;
  }

  h1 {
    margin-top: 15px;
    font-size: 24px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    line-height: 1.4;
    max-width: 400px;
    text-align: center;
    color: #666;
  }
`;
export const Loading = styled.h1`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background: #7159c1;
  color: white;
`;

export const IssuesList = styled.ul`
  list-style: none;
  margin: 30px;
  padding: 30px;
  border-top: 1px solid #666;

  li {
    display: flex;
    margin-top: 10px;
    border: 1px solid #eee;
    padding: 10px 15px;
  }
  img {
    border-radius: 50%;
    height: 36px;
    width: 36px;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;
    }

    a {
      text-decoration: none;
      color: #666;

      &:hover {
        color: #7159c1;
      }
    }

    span {
      background: #eee;
      color: #666;
      font-size: 12px;
      border-radius: 4px;
      font-weight: 600px;
      height: 20px;
      padding: 3px 4px;
      margin-left: 10px;
    }

    p {
      font-size: 12px;
      margin-top: 5px;
      color: #666;
    }
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const IssuesFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 400px;
  max-width: 400px;

  button {
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    text-transform: capitalize;
    font-weight: 500;

    background: none;
    border: none;
    border-bottom: 1px solid transparent;
    margin: 15px auto;
    padding: 10px 15px;

    &:hover {
      color: #7159c1;
      border-bottom: 1px solid #7159c1;
    }

    &:nth-child(${props => props.active + 1}) {
      color: green;
      border-color: green;
    }
  }
`;

export const PageNav = styled.div`
  display: flex;
  justify-content: center;

  button {
    margin-left: 10px;
    padding: 5px 10px;

    &:hover {
      color: #7159c1;
    }
  }
`;
