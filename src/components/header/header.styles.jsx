import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  padding: 20px 25px;
  .logo {
    width: 30px;
    height: 30px;
    transition: transform 0.1s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
padding: 10px 15px;
cursor: pointer;
`;
