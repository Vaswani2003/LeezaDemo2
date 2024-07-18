import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoimage.png';
import './global.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function Homepage() {
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace this with your actual authentication check

  const handleTakeTest = () => {
    if (isLoggedIn) {
      navigate('/testing');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <div className="front-page-hero-section">

        <div className='front-page-hero-navbar' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', marginLeft: '25px', marginRight: '25px' }} >

          <div className='logo-and-text' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={logo} alt='logo' className='logo' style={{ height: '70px', marginRight: '30px' }} />
            <Typography variant='h6' style={{ fontWeight: 'bold', }}> Leeza </Typography>
          </div>

          <div>
            <Button variant="outlined" onClick={ () => navigate('/login')} sx={{ borderColor: 'black', color: 'black', fontSize: '1rem', padding: '10px 20px' }}> Login </Button>
          </div>

        </div>

        <Container style={{ height: '80vh', marginTop: '90px' }}>

          <div className='front-page-headline' style={{ marginBottom: '30px' }}>
            <Typography variant='h1' style={{ fontSize: '80px' }}> Discover Hidden<br></br>Strengths </Typography>
          </div>

          <div className='front-page-subheadline' style={{ marginBottom: '30px' }}>
            <Typography variant='h4' style={{ fontSize: '30px' }}> Unlock your potential with our autism diagnostic services <br></br>Empower your journey forward</Typography>
          </div>

          <Button variant="outlined" onClick={handleTakeTest} sx={{ borderColor: 'black', color: 'black', fontSize: '1rem', padding: '10px 20px' }}> Take a Test </Button>
        </Container>

      </div>

      <div className="front-page-services-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px' }}>
        <Typography variant='h2' style={{ fontSize: '50px', marginBottom: '30px' }}> Our Services </Typography>

        <div className='front-page-services' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>

          <div className='Service' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '60px' }}>
            <VerifiedIcon style={{ fontSize: '100px', color: 'black' }} />
            <Typography variant='h4' style={{ fontSize: '30px' }}> Comprehensive Diagnostics <br></br> Assesments </Typography>
          </div>

          <div className='Service' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '60px' }}>
            <VerifiedIcon style={{ fontSize: '100px', color: 'black' }} />
            <Typography variant='h4' style={{ fontSize: '30px' }}> Personalized Therapy <br></br> plans </Typography>
          </div>

        </div>

        <div className='front-page-services' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>

          <div className='Service' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '60px' }}>
            <VerifiedIcon style={{ fontSize: '100px', color: 'black' }} />
            <Typography variant='h4' style={{ fontSize: '30px' }}> Family Support <br></br> Services </Typography>
          </div>

          <div className='service' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '60px' }}>
            <VerifiedIcon style={{ fontSize: '100px', color: 'black' }} />
            <Typography variant='h4' style={{ fontSize: '30px' }}> Educational Workshops </Typography>
          </div>

        </div>
      </div>
    </div>
  );
}
