import styled from 'styled-components';

export const Form = styled.form`
  width : ${props => props.width ? "370px" : "100%" };
  input {
    color: lightgray;
    background-color: transparent;
    border: 1px solid #555;
    border-radius: 5px;
    font-size: 15px;
    outline: none;
    padding: 15px 15px;
    width: 100%;
  }
`;

Form.ButtonAdd = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: white;
  border: none;
  padding: 0 5px;
  margin-left: 20px;
`;
