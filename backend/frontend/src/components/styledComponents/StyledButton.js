import Styled from "styled-components";

const StyledButton = Styled.button`

color : white;
width :100px;
height :20px;
 background-color: ${(props) => props.color};
border: none;
outline: none;
border-radius: 10px ;
cursor :pointer

`;

export { StyledButton };
