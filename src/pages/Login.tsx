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
import ForgotPassword from '../components/ForgotPassword';
import { Card, SignInContainer } from '../components/shared';
import { loginSchema } from '../validations/authSchema';
import { LoginFormValues } from '../types/authTypes';
import { supabase } from '../lib/supabase'; 
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false); 

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleClose = () => setOpen(false);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true); 
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    setLoading(false); 

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
      return;
    }

    if (data?.user) {
      const user = {
        id: data.user.id,
        email: data.user.email ?? ''
      };
      dispatch(loginUser(user));
      toast.success('Login successful!!...', {
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
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 1,
                  }}
                >
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
                      autoComplete="current-password"
                      fullWidth
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </FormControl>

                  <ForgotPassword open={open} handleClose={handleClose} />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading} 
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
                  >
                    {loading ? 'Signing In...' : 'Sign in'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Divider>or</Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link to="/register">Register</Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
