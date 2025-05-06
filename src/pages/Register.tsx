import * as React from 'react';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { RegisterContainer, Card } from '../components/shared';
import { registerSchema } from '../validations/authSchema';
import { RegisterFormValues } from '../types/authTypes';
import { supabase } from '../lib/supabase';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

export default function Register() {
  const [loading, setLoading] = React.useState(false); 


    const navigate = useNavigate();
    const dispatch = useDispatch();
  

  const initialValues: RegisterFormValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };


    const handleSubmit = async (values: RegisterFormValues) => {
      setLoading(true); 
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
  
      if (error) {
        toast.error(error.message || "Something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
          setLoading(false);
          return;
      }
  
      if (data?.user) {
        const userData = {
          id: data.user.id,
          email: data?.user.email ?? ''
        };
        dispatch(loginUser(userData));
        toast.success('Registration successful!!...', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
        navigate('/sprints'); 
      }
      
    setLoading(false);
    };

  return (
    <>
      <CssBaseline enableColorScheme />
      <RegisterContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Register
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                  }}
                >
                  <FormControl>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <TextField
                      id="name"         
                      name="name"         
                      placeholder="John"
                      autoComplete="given-name"
                      fullWidth
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <TextField
                      id="surname"         
                      name="surname"      
                      placeholder="Doe"
                      autoComplete="family-name"
                      fullWidth
                      value={values.surname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.surname && Boolean(errors.surname)}
                      helperText={touched.surname && errors.surname}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••"
                      autoComplete="new-password"
                      fullWidth
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </FormControl>
                  <Button 
                    type="submit" 
                    fullWidth 
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                    {loading ? 'Registering...' : 'Register'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Divider>or</Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Card>
      </RegisterContainer>
    </>
  );
}
