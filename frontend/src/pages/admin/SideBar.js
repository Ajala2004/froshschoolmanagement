// import * as React from 'react';
// import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
// import { Link, useLocation } from 'react-router-dom';

// import HomeIcon from "@mui/icons-material/Home";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
// import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
// import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
// import ReportIcon from '@mui/icons-material/Report';
// import AssignmentIcon from '@mui/icons-material/Assignment';

// const SideBar = () => {
//     const location = useLocation();
//     return (
//         <>
//             <React.Fragment>
//                 <ListItemButton component={Link} to="/">
//                     <ListItemIcon>
//                         <HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Home" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/classes">
//                     <ListItemIcon>
//                         <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Classes" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/subjects">
//                     <ListItemIcon>
//                         <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Subjects" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/teachers">
//                     <ListItemIcon>
//                         <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Teachers" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/students">
//                     <ListItemIcon>
//                         <PersonOutlineIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Students" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/notices">
//                     <ListItemIcon>
//                         <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Notices" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/email">
//                     <ListItemIcon>
//                         <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/email") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="send mail" />
//                 </ListItemButton>
//                 <ListItemButton component={Link} to="/Admin/complains">
//                     <ListItemIcon>
//                         <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Complains" />
//                 </ListItemButton>
//             </React.Fragment>
//             <Divider sx={{ my: 1 }} />
//             <React.Fragment>
//                 <ListSubheader component="div" inset>
//                     User
//                 </ListSubheader>
//                 <ListItemButton component={Link} to="/Admin/profile">
//                     <ListItemIcon>
//                         <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Profile" />
//                 </ListItemButton>
                
//                 <ListItemButton component={Link} to="/logout">
//                     <ListItemIcon>
//                         <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
//                     </ListItemIcon>
//                     <ListItemText primary="Logout" />
//                 </ListItemButton>
//             </React.Fragment>
//         </>
//     )
// }

// export default SideBar
import * as React from 'react';
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

// ✅ Updated icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupIcon from '@mui/icons-material/Group';
import CampaignIcon from '@mui/icons-material/Campaign';
import EmailIcon from '@mui/icons-material/Email';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const SideBar = () => {
  const location = useLocation();

  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/classes">
          <ListItemIcon>
            <SchoolIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Classes" />
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/subjects">
          <ListItemIcon>
            <MenuBookIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Subjects" />
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/teachers">
          <ListItemIcon>
            <PeopleAltIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/students">
          <ListItemIcon>
            <GroupIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/notices">
          <ListItemIcon>
            <CampaignIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Announcements" />
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/email">
          <ListItemIcon>
            <EmailIcon color={location.pathname.startsWith("/Admin/email") ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Email" />
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/complains">
          <ListItemIcon>
            <ReportProblemOutlinedIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Complaints" />
        </ListItemButton>
      </React.Fragment>

      <Divider sx={{ my: 1 }} />

      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>

        <ListItemButton component={Link} to="/Admin/profile">
          <ListItemIcon>
            <PersonIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItemButton>

        <ListItemButton component={Link} to="/logout">
          <ListItemIcon>
            <LogoutIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default SideBar;

