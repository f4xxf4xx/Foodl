import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "theme";

const StyledLink = styled(Link)<{ theme: Theme }>`
  display: inline-block;
  padding: ${({ theme }) => theme.space.small} 0;
  color: ${({ theme }) => theme.colors.text};

  & svg {
    vertical-align: middle;
    width: auto;
    height: ${({ theme }) => theme.fontSizes.h2};
  }
`;

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = props => {
  return (
    <StyledLink to="/" className={props.className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="132.272" height="32.041" viewBox="0 0 132.272 32.041">
        <g id="Group_20" data-name="Group 20" transform="translate(-60.36 -473.361)">
          <path id="Path_81" data-name="Path 81" d="M5.056,0a1.165,1.165,0,0,1-.832-.336,1.2,1.2,0,0,1-.352-.912V-17.472a9.458,9.458,0,0,1,.768-3.936,5.916,5.916,0,0,1,2.272-2.64,6.79,6.79,0,0,1,3.68-.944,1.281,1.281,0,0,1,.9.32,1.036,1.036,0,0,1,.352.8,1.036,1.036,0,0,1-.352.8,1.281,1.281,0,0,1-.9.32,4.082,4.082,0,0,0-2.384.656A3.916,3.916,0,0,0,6.8-20.272,7.2,7.2,0,0,0,6.336-17.6V-1.248A1.232,1.232,0,0,1,6-.336,1.276,1.276,0,0,1,5.056,0ZM1.824-14.72a1.1,1.1,0,0,1-.816-.3,1.021,1.021,0,0,1-.3-.752,1.061,1.061,0,0,1,.3-.784,1.1,1.1,0,0,1,.816-.3h8.352a1.1,1.1,0,0,1,.816.3,1.061,1.061,0,0,1,.3.784,1.021,1.021,0,0,1-.3.752,1.1,1.1,0,0,1-.816.3ZM22.944.16A9.057,9.057,0,0,1,18.368-.992,8.366,8.366,0,0,1,15.2-4.16a9.057,9.057,0,0,1-1.152-4.576A9.122,9.122,0,0,1,15.2-13.344a8.366,8.366,0,0,1,3.168-3.168,9.057,9.057,0,0,1,4.576-1.152,8.97,8.97,0,0,1,4.56,1.152,8.4,8.4,0,0,1,3.152,3.168A9.361,9.361,0,0,1,31.84-8.736,8.96,8.96,0,0,1,30.672-4.16,8.519,8.519,0,0,1,27.5-.992,8.97,8.97,0,0,1,22.944.16Zm0-2.24a6.451,6.451,0,0,0,3.328-.864,6.144,6.144,0,0,0,2.3-2.368,6.954,6.954,0,0,0,.832-3.424,7.046,7.046,0,0,0-.832-3.44,6.114,6.114,0,0,0-2.3-2.384,6.451,6.451,0,0,0-3.328-.864,6.451,6.451,0,0,0-3.328.864,6.229,6.229,0,0,0-2.32,2.384,6.939,6.939,0,0,0-.848,3.44A6.85,6.85,0,0,0,17.3-5.312a6.261,6.261,0,0,0,2.32,2.368A6.451,6.451,0,0,0,22.944-2.08ZM45.632.16A9.057,9.057,0,0,1,41.056-.992,8.367,8.367,0,0,1,37.888-4.16a9.057,9.057,0,0,1-1.152-4.576,9.122,9.122,0,0,1,1.152-4.608,8.367,8.367,0,0,1,3.168-3.168,9.057,9.057,0,0,1,4.576-1.152,8.97,8.97,0,0,1,4.56,1.152,8.4,8.4,0,0,1,3.152,3.168,9.361,9.361,0,0,1,1.184,4.608A8.96,8.96,0,0,1,53.36-4.16,8.519,8.519,0,0,1,50.192-.992,8.97,8.97,0,0,1,45.632.16Zm0-2.24a6.451,6.451,0,0,0,3.328-.864,6.144,6.144,0,0,0,2.3-2.368A6.954,6.954,0,0,0,52.1-8.736a7.046,7.046,0,0,0-.832-3.44,6.114,6.114,0,0,0-2.3-2.384,6.451,6.451,0,0,0-3.328-.864,6.451,6.451,0,0,0-3.328.864,6.229,6.229,0,0,0-2.32,2.384,6.939,6.939,0,0,0-.848,3.44,6.85,6.85,0,0,0,.848,3.424A6.261,6.261,0,0,0,42.3-2.944,6.451,6.451,0,0,0,45.632-2.08ZM68.32.16a8.9,8.9,0,0,1-4.544-1.168,8.6,8.6,0,0,1-3.184-3.184,8.96,8.96,0,0,1-1.168-4.576,9.094,9.094,0,0,1,1.136-4.544A8.51,8.51,0,0,1,63.648-16.5a8.433,8.433,0,0,1,4.416-1.168,8.166,8.166,0,0,1,3.872.912,7.764,7.764,0,0,1,2.784,2.416v-9.408a1.2,1.2,0,0,1,.352-.912,1.245,1.245,0,0,1,.9-.336,1.245,1.245,0,0,1,.9.336,1.2,1.2,0,0,1,.352.912v15.1a9.233,9.233,0,0,1-1.232,4.5A8.554,8.554,0,0,1,72.816-.992,8.844,8.844,0,0,1,68.32.16Zm0-2.24a6.276,6.276,0,0,0,3.312-.88,6.42,6.42,0,0,0,2.3-2.384,6.85,6.85,0,0,0,.848-3.424,6.874,6.874,0,0,0-.848-3.408,6.265,6.265,0,0,0-2.3-2.384,6.365,6.365,0,0,0-3.312-.864,6.389,6.389,0,0,0-3.3.864,6.346,6.346,0,0,0-2.336,2.384,6.774,6.774,0,0,0-.864,3.408,6.749,6.749,0,0,0,.864,3.424A6.5,6.5,0,0,0,65.024-2.96,6.3,6.3,0,0,0,68.32-2.08ZM87.776,0a3.9,3.9,0,0,1-2.288-.7A4.626,4.626,0,0,1,83.92-2.656a6.972,6.972,0,0,1-.56-2.88v-18.24a1.19,1.19,0,0,1,.336-.88,1.19,1.19,0,0,1,.88-.336,1.19,1.19,0,0,1,.88.336,1.19,1.19,0,0,1,.336.88v18.24a4.054,4.054,0,0,0,.56,2.24,1.655,1.655,0,0,0,1.424.864h.8a.961.961,0,0,1,.768.336,1.3,1.3,0,0,1,.288.88,1.094,1.094,0,0,1-.4.88A1.562,1.562,0,0,1,88.192,0Z" transform="translate(103 503)" fill="currentColor"/>
          <path id="Path_80" data-name="Path 80" d="M22.612,1546a8.014,8.014,0,0,1-2.075-.274l-5.239-1.4-.484-8.94a4.618,4.618,0,0,0,3.01-4.568,53.867,53.867,0,0,0-.7-5.625c-.072-.455-.59-.663-1.042-.663-.482,0-1,.22-1.054.71v6.167c-.026.075-.193.108-.347.108s-.33-.034-.351-.108c-.066-1.187-.341-6.076-.35-6.193a.962.962,0,0,0-1.044-.682.968.968,0,0,0-1.047.682c0,.06-.082,1.469-.167,2.962-.075,1.327-.154,2.71-.183,3.231-.021.075-.2.108-.349.108s-.321-.033-.349-.108v-6.167c-.059-.492-.57-.712-1.05-.712-.451,0-.97.208-1.042.664l-.006.035a50.672,50.672,0,0,0-.7,5.59,4.615,4.615,0,0,0,3.01,4.568l-.417,7.69-2.744-.735a8,8,0,0,1-5.657-9.8l3.388-12.649a7.991,7.991,0,0,1,9.8-5.656l12.648,3.388a8.011,8.011,0,0,1,5.657,9.8l-3.389,12.648A8.009,8.009,0,0,1,22.612,1546Z" transform="translate(58.404 -1040.596)" fill="currentColor"/>
        </g>
      </svg>
    </StyledLink>
  );
}
