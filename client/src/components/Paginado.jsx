import React from "react";
import styled from "styled-components";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
    const pageNumbers = [];

    const NavStyle= styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border: black 1px solid;
    margin: 20px;
    background-color: grey;
    `
    const StyledLi = styled.li`
    text-decoration: none;
    list-style: none;
    display: inline-flex;
    padding: 0;
    margin 20px;
    `
    
    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <NavStyle>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
              <StyledLi className='number' key={number} className= {StyledLi}>
              <button onClick={() => paginado(number)}>{number}</button>
            </StyledLi>
          ))}
      </ul>
    </NavStyle>
  );
}
