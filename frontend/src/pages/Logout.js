// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { authLogout } from '../redux/userRelated/userSlice';
// import styled from 'styled-components';

// const Logout = () => {
//     const currentUser = useSelector(state => state.user.currentUser);

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleLogout = () => {
//         dispatch(authLogout());
//         navigate('/');
//     };

//     const handleCancel = () => {
//         navigate(-1);
//     };

//     return (
//         <LogoutContainer>
//             <h1>{currentUser.name}</h1>
//             <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
//             <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
//             <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
//         </LogoutContainer>
//     );
// };

// export default Logout;

// const LogoutContainer = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 10px;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
//   background-color: #85769f66;
//   color: black;
// `;

// const LogoutMessage = styled.p`
//   margin-bottom: 20px;
//   font-size: 16px;
//   text-align: center;
// `;

// const LogoutButton = styled.button`
//   padding: 10px 20px;
//   margin-top: 10px;
//   border-radius: 5px;
//   font-size: 16px;
//   color: #fff;
//   cursor: pointer;

//   &:hover {
//     color: #fff;
//     background-color: #333;
//   }
// `;

// const LogoutButtonLogout = styled(LogoutButton)`
//   background-color: #ea0606;
// `;

// const LogoutButtonCancel = styled(LogoutButton)`
//   background-color: rgb(99, 60, 99);
// `;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Overlay>
      <LogoutCard>
        <Avatar>{currentUser?.name?.charAt(0)}</Avatar>
        <h2>{currentUser?.name}</h2>
        <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
        <ButtonGroup>
          <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </ButtonGroup>
      </LogoutCard>
    </Overlay>
  );
};

export default Logout;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoutCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  width: 350px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease-in-out;

  h2 {
    margin-top: 10px;
    font-size: 1.4rem;
    color: #333;
  }

  @keyframes fadeIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const Avatar = styled.div`
  background: #6c63ff;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px auto;
`;

const LogoutMessage = styled.p`
  margin: 15px 0;
  font-size: 1rem;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 10px 0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const LogoutButton = styled(BaseButton)`
  background-color: #e63946;
  color: white;

  &:hover {
    background-color: #d62828;
  }
`;

const CancelButton = styled(BaseButton)`
  background-color: #adb5bd;
  color: white;

  &:hover {
    background-color: #6c757d;
  }
`;
