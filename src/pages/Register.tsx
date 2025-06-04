import React, { useState } from 'react';
import {
  Box, Button, Container, Paper, Stepper, Step, StepLabel, Typography, TextField, Grid, Radio, RadioGroup, FormControlLabel, MenuItem, Checkbox, FormGroup, Divider, Select, InputLabel, FormControl, IconButton, Snackbar, Alert, Autocomplete
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Partners from '../components/Partners';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface RegisterProps {
  onComplete?: () => void;
}

const steps = ['Personal Details', 'Your Favourites', 'Email Preferences'];

const clubs = [
  'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton',
  'Chelsea', 'Crystal Palace', 'Everton', 'Fulham', 'Ipswich',
  'Leicester', 'Liverpool', 'Man City', 'Man Utd', 'Newcastle',
  'Nott\'m Forest', 'Southampton', 'Spurs', 'West Ham', 'Wolves',
  'General PL Fan'
];

// const partners = [
//   'Barclays', 'EA SPORTS', 'Football Manager', 'Guinness', 'Hublot',
//   'Nike', 'Oracle', 'Panini', 'Rezzil', 'Sorare'
// ];

// Định nghĩa màu đặc trưng cho từng club
const clubColors = {
  'Arsenal': '#EF0107',
  'Aston Villa': '#95BFE5',
  'Bournemouth': '#DA291C',
  'Brentford': '#E30613',
  'Brighton': '#0057B8',
  'Chelsea': '#034694',
  'Crystal Palace': '#1B458F',
  'Everton': '#003399',
  'Fulham': '#000000',
  'Ipswich': '#0057B8',
  'Leicester': '#003090',
  'Liverpool': '#C8102E',
  'Man City': '#6CABDD',
  'Man Utd': '#DA291C',
  'Newcastle': '#241F20',
  "Nott'm Forest": '#E53233',
  'Southampton': '#D71920',
  'Spurs': '#132257',
  'West Ham': '#7A263A',
  'Wolves': '#FDB913',
  'General PL Fan': '#37003c',
};

// Danh sách quốc gia đầy đủ, đã sắp xếp A-Z
const countryList = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
  'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
  'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
  'Oman',
  'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen',
  'Zambia', 'Zimbabwe',
  'Other'
];

const Register = ({ onComplete }: RegisterProps) => {
  const [activeStep, setActiveStep] = useState(0);
  // Step 1
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [country, setCountry] = useState('');
  const [mobile, setMobile] = useState('');
  // Step 2
  const [favouriteClub, setFavouriteClub] = useState('');
  // Step 3
  const [clubEmail, setClubEmail] = useState(false);
  const [plEmails, setPlEmails] = useState({ general: false, fantasy: false });
  const [partnerEmails, setPartnerEmails] = useState<{ [key: string]: boolean }>({});
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtherClubs, setShowOtherClubs] = useState(false);
  const [otherClubs, setOtherClubs] = useState<string[]>([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();

  // Validate password
  const passwordValid = {
    length: password.length >= 8,
    upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  // Validate date of birth
  const validateDOB = () => {
    const day = parseInt(dob.day);
    const month = parseInt(dob.month);
    const year = parseInt(dob.year);
    const currentYear = new Date().getFullYear();

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return false;
    }

    if (year < 1900 || year > currentYear) {
      setError('Năm sinh không hợp lệ!');
      return false;
    }

    if (month < 1 || month > 12) {
      setError('Tháng không hợp lệ!');
      return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      setError(`Tháng ${month} chỉ có ${daysInMonth} ngày!`);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    // Validate từng bước
    if (activeStep === 0) {
      if (!firstName || !lastName || !email || !password || !gender || !dob.day || !dob.month || !dob.year || !country) {
        setError('Vui lòng điền đầy đủ thông tin!');
        return;
      }
      if (!validateDOB()) {
        return;
      }
      if (!Object.values(passwordValid).every(Boolean)) {
        setError('Mật khẩu chưa đủ mạnh!');
        return;
      }
    }
    if (activeStep === 1 && !favouriteClub) {
      setError('Vui lòng chọn CLB yêu thích!');
      return;
    }
    setError('');
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep === 2) {
      if (!agree) {
        setError('Bạn phải đồng ý với điều khoản !');
        return;
      }
      setError('');
      setOpenSuccess(true);
      setTimeout(() => {
        onComplete?.();
      }, 1500);
      return;
    }
    // Xử lý đăng ký ở đây
    setError('');
    onComplete?.();
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white', py: 8 }}>
      <Snackbar 
        open={openSuccess} 
        autoHideDuration={1500} 
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ 
          position: 'fixed',
          top: '50% !important',
          left: '50% !important',
          transform: 'translate(-50%, -50%) !important',
          width: 'auto',
          minWidth: '300px'
        }}
      >
        <Alert 
          onClose={handleCloseSuccess} 
          severity="success" 
          sx={{ 
            width: '100%',
            fontSize: '1.1rem',
            py: 2,
            '& .MuiAlert-icon': {
              fontSize: '2rem'
            }
          }}
        >
          Đăng ký thành công!
        </Alert>
      </Snackbar>
      <Container maxWidth="md">
        {/* <Typography variant="h2" fontWeight={900} color="#fff" sx={{ mb: 4, background: 'linear-gradient(90deg, #37003c 0%, #ff0060 100%)', px: 4, py: 7, borderRadius: 2, minHeight: 120, display: 'flex', alignItems: 'center' }}>
          Your Account
        </Typography> */}
        <Paper elevation={0} sx={{ p: 0, borderRadius: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleRegister}>
            {activeStep === 0 && (
              <Box>
                <Typography variant="h5" fontWeight={700} mb={2}>Your Personal Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="First Name" fullWidth value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Last Name" fullWidth value={lastName} onChange={e => setLastName(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Email Address" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography fontWeight={700} sx={{ mb: 1, color: '#222' }}>New Password</Typography>
                    <Box sx={{ position: 'relative', mb: 0 }}>
                      <TextField
                        placeholder="New Password"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="new-password"
                        sx={{ bgcolor: '#f5f5f5' }}
                        InputProps={{ style: { fontSize: 18, height: 48 } }}
                      />
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{ position: 'absolute', right: 8, top: 8, minWidth: 0, color: '#222', fontWeight: 700 }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Box>
                    <Box sx={{ mt: 1, fontSize: 14 }}>
                      <Box color={passwordValid.length ? 'green' : 'error.main'}>• At least 8 characters</Box>
                      <Box color={passwordValid.upperLower ? 'green' : 'error.main'}>• A mix of upper-case and lower-case characters</Box>
                      <Box color={passwordValid.number ? 'green' : 'error.main'}>• At least one number</Box>
                      <Box color={passwordValid.special ? 'green' : 'error.main'}>• At least one special character</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography fontWeight={700} sx={{ mb: 1 }}>Gender</Typography>
                    <RadioGroup row value={gender} onChange={e => setGender(e.target.value)}>
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="unspecified" control={<Radio />} label="Unspecified" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="Day" fullWidth value={dob.day} onChange={e => setDob({ ...dob, day: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="Month" fullWidth value={dob.month} onChange={e => setDob({ ...dob, month: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="Year" fullWidth value={dob.year} onChange={e => setDob({ ...dob, year: e.target.value })} />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Autocomplete
                        value={country}
                        onChange={(event, newValue) => {
                          setCountry(newValue || '');
                        }}
                        options={countryList}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country/Region of Residence"
                            required
                          />
                        )}
                        filterOptions={(options, state) => {
                          const inputValue = state.inputValue.toLowerCase();
                          return options.filter(option =>
                            option.toLowerCase().includes(inputValue)
                          );
                        }}
                        isOptionEqualToValue={(option, value) => option === value}
                        noOptionsText="Không tìm thấy quốc gia"
                        clearText="Xóa"
                        openText="Mở"
                        closeText="Đóng"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Mobile Number (Optional)" fullWidth value={mobile} onChange={e => setMobile(e.target.value)} />
                  </Grid>
                </Grid>
              </Box>
            )}
            {activeStep === 1 && (
              <Box>
                <Typography variant="h5" fontWeight={700} mb={2}>Your Favourites</Typography>
                <Typography mb={2}>We will prepare web and mobile content according to your preferences</Typography>
                {/* Bảng 5x5 club */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
                  <Box component="table" sx={{ borderCollapse: 'separate', borderSpacing: 24 }}>
                    <tbody>
                      {(() => {
                        // Chia club thành 5 hàng, mỗi hàng 5 club
                        const clubRows = [];
                        for (let i = 0; i < clubs.length; i += 5) {
                          clubRows.push(clubs.slice(i, i + 5));
                        }
                        return clubRows.map((row, rowIdx) => (
                          <tr key={rowIdx}>
                            {row.map((club, colIdx) => {
                              let imgName = club
                                .toLowerCase()
                                .replace(/ /g, '-')
                                .replace(/\./g, '')
                                .replace(/'/g, '')
                                .replace('nottm', 'nottingham-forest')
                                // .replace('man utd', 'manchester-united')
                                // .replace('man city', 'manchester-city')
                                .replace('spurs', 'tottenham')
                                // .replace('general pl fan', 'plfan');
                              let imgSrc = `/images/clubs/${imgName}.png`;
                              if (club === 'Man Utd') imgSrc = '/images/clubs/manchester-united.png';
                              if (club === 'Man City') imgSrc = '/images/clubs/manchester-city.png';
                              if (club === 'General PL Fan') imgSrc = 'data:image/png;base64,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';
                              if (club === "Nott'm Forest") imgSrc = '/images/clubs/nottingham-forest.png';
                              return (
                                <td key={club} style={{ textAlign: 'center', padding: 8 }}>
                                  <Box
                                    onClick={() => setFavouriteClub(club)}
                                    sx={{
                                      border: favouriteClub === club ? `3px solid ${clubColors[club as keyof typeof clubColors] || '#37003c'}` : '2px solid #eee',
                                      borderRadius: 2,
                                      p: 2,
                                      mb: 1,
                                      cursor: 'pointer',
                                      background: favouriteClub === club ? '#f3e6fa' : '#fff',
                                      transition: 'all 0.2s',
                                      width: 90,
                                      height: 90,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      boxShadow: favouriteClub === club ? `0 0 8px ${clubColors[club as keyof typeof clubColors] || '#ff0060'}` : 'none',
                                      '&:hover': {
                                        border: `3px solid ${clubColors[club as keyof typeof clubColors] || '#ff0060'}`,
                                      },
                                    }}
                                  >
                                    <img src={imgSrc} alt={club} style={{ width: 56, height: 56, objectFit: 'contain' }} />
                                  </Box>
                                  <Typography fontWeight={favouriteClub === club ? 700 : 500} color={favouriteClub === club ? '#ff0060' : '#222'} fontSize={15} align="center">
                                    {club}
                                  </Typography>
                                </td>
                              );
                            })}
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </Box>
                </Box>
                <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
                  <Typography fontWeight={700} fontSize={20} mb={2}>Do you want to keep an eye on any other clubs?</Typography>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: '#006666', color: '#fff', fontWeight: 700, px: 4, py: 1.2, borderRadius: 2, mb: 2, '&:hover': { bgcolor: '#004444' } }}
                    onClick={() => setShowOtherClubs(v => !v)}
                  >
                    Select other clubs
                  </Button>
                  {showOtherClubs && (
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                      <Box>
                        <Grid container spacing={2} columns={3}>
                          {clubs.filter(club => club !== favouriteClub && club !== 'General PL Fan').map((club) => (
                            <Grid item xs={1} key={club}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  mb: -2,
                                  px: 1.5,
                                  py: 1.5,
                                  borderRadius: 2,
                                  minWidth: 260,
                                  transition: 'background 0.2s',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    background: '#f3f3f3',
                                    '.MuiCheckbox-root .MuiSvgIcon-root': {
                                      color: '#00b341',
                                    },
                                  },
                                }}
                                onClick={() => setOtherClubs(prev => prev.includes(club) ? prev.filter(c => c !== club) : [...prev, club])}
                              >
                                <Checkbox
                                  checked={otherClubs.includes(club)}
                                  onChange={(_, checked) => {
                                    setOtherClubs(prev => checked ? [...prev, club] : prev.filter(c => c !== club));
                                  }}
                                  icon={<CheckBoxOutlineBlankIcon sx={{ fontSize: 40, transition: 'color 0.2s' }} />}
                                  checkedIcon={<CheckBoxIcon sx={{ color: '#00b341', fontSize: 40, transition: 'color 0.2s' }} />}
                                  sx={{ p: 0, mr: 2 }}
                                />
                                <Typography fontWeight={600} fontSize={18}>{club}</Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                  <Button variant="contained" sx={{ bgcolor: '#37003c', color: '#fff', fontWeight: 700, minWidth: 120, '&:hover': { bgcolor: '#ff0060' } }} onClick={handleNext}>
                    Next
                  </Button>
                  <Button variant="outlined" sx={{ minWidth: 120 }} onClick={handleBack}>
                    Back to Personal Details
                  </Button>
                </Box>
              </Box>
            )}
            {activeStep === 2 && (
              <Box>
                <Typography variant="h5" fontWeight={700} mb={2}>Email Preferences</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography fontWeight={700}>Club Email Communications</Typography>
                <FormControlLabel
                  control={<Checkbox checked={clubEmail} onChange={e => setClubEmail(e.target.checked)} />}
                  label={`Receive communications direct from ${favouriteClub}`}
                  disabled={!favouriteClub}
                />
                <Divider sx={{ my: 2 }} />
                <Typography fontWeight={700}>Premier League Email Communications</Typography>
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox checked={plEmails.general} onChange={e => setPlEmails({ ...plEmails, general: e.target.checked })} />}
                    label="General communication"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={plEmails.fantasy} onChange={e => setPlEmails({ ...plEmails, fantasy: e.target.checked })} />}
                    label="Fantasy"
                  />
                </FormGroup>
                <Divider sx={{ my: 2 }} />
                <FormControlLabel
                  control={<Checkbox checked={agree} onChange={e => setAgree(e.target.checked)} />}
                  label={<span>I have read and agree to the <span style={{ color: '#ff0060', fontWeight: 700 }}>Terms & Conditions</span></span>}
                />
              </Box>
            )}
            {error && <Typography color="error" mt={2}>{error}</Typography>}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              {activeStep > 0 && (
                <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />}>Back</Button>
              )}
              {activeStep < 2 ? (
                <Button variant="contained" sx={{ bgcolor: '#37003c', color: '#fff', fontWeight: 700, '&:hover': { bgcolor: '#ff0060' } }} onClick={handleNext} endIcon={<ArrowForwardIcon />}>
                  Next
                </Button>
              ) : (
                <Button type="submit" variant="contained" sx={{ bgcolor: '#37003c', color: '#fff', fontWeight: 700, '&:hover': { bgcolor: '#ff0060' } }}>
                  Complete Registration
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Container>
      <Box sx={{ mt: 0 }}>
        {/* <Partners /> */}
      </Box>
    </Box>
  );
};

export default Register; 