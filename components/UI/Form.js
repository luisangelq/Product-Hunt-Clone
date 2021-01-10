import styled from "@emotion/styled";

export const Form = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;

  fieldset {
    margin: 2rem 0;
    border: 1px solid #e1e1e1;
    font-size: 2rem;
    padding: 2rem;
  }
`;

export const Field = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }

  input,
  textarea {
    flex: 1;
    padding: 1rem;
  }
  textarea {
    height: 400px;
  }
`;

export const InputSubmit = styled.input`
  background-color: var(--orange);
  width: 100%;
  padding: 1.5rem;
  margin: 3rem 0;
  text-align: center;
  color: white;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  font-weight: 700;
  outline: 1px solid;
  outline-color: rgba(27, 33, 34, 0.4);
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);

  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 20px rgba(27, 33, 34, 0.5),
      0 0 20px rgba(27, 33, 34, 0.4);
    outline-color: rgba(27, 33, 34, 0);
    outline-offset: 10px;
    text-shadow: 1px 1px 6px #fff;
  }
`;

//Error styles
export const Error = styled.p`
  background-color: #DC2727;
  padding: 1rem;
  font-weight: 700;
  font-size: 1.4rem;
  color: white;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`;