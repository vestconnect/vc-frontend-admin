import styled from 'styled-components';
import { shade } from 'polished';

export const StyledTable = styled.table`
  width: 100%;
  
  border-collapse: separate; 
  border-spacing: 0 10px;
  
  thead {
    tr,
    th {
      width: 100%;
      height: 100%;
      border: none;
      background-color: transparent;
      align-items: center;
      color: #FFF;
      padding: 8px;
    }
  }

  tbody {
    tr {
      background: #003D00;
      height: 100px;
      transition: all 0.2s;

      &:hover {
        background: ${shade(0.3, '#003D00')};
      }

      @media(max-width: 414px) {
        height: 70px;
      }
    }

    tr, td {
      padding: 8px;
      border: none;

      td:first-child{
          border-radius: 5px 0 0 5px;
          -webkit-border-radius: 5px 0 0 5px;
          margin-bottom: 10px;
      }

      td:last-child{
          border-radius: 0 5px 5px 0;
          -webkit-border-radius: 0 5px 5px 0;
          margin-bottom: 10px;
      }

      div {
        display: flex;
        align-items: center;

        svg {
          margin-right: 10px;

          @media(max-width: 414px) {
            display: none;
          }
        }
      }
    }
  }
`;