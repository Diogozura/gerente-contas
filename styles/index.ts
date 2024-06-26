import { createGlobalStyle } from "styled-components";
const colorLink = '#000000'
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  button {
    cursor: pointer;
  }
  a{
    text-decoration: none;
    color: ${colorLink};
  }
`;