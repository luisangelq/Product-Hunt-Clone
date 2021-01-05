import styled from "@emotion/styled";

const Button = styled.a`
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  padding: 0.8rem 2rem;
  margin-right: 1rem;
  background-color: ${(props) => (props.bgColor ? "#DA552F" : "white")};
  color: ${(props) => (props.bgColor ? "white" : "#000")};
  outline: 1px solid;
  outline-color: rgba(27, 33, 34, 0.4);
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 20px rgba(27, 33, 34, 0.5),
      0 0 20px rgba(27, 33, 34, 0.4);
    outline-color: rgba(27, 33, 34, 0);
    outline-offset: 10px;
    text-shadow: 1px 1px 6px #fff;
  }
`;

export default Button;
