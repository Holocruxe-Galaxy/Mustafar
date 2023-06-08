// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx']; }) => {
  // ** Hook

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <svg xmlns='http://www.w3.org/2000/svg' width='40' viewBox='0 0 103 110' fill='none'>
        <path
          fill='transparent'
          opacity='1.000000'
          stroke='none'
          d='
                M56.000000,111.000000
	                C37.333336,111.000000 19.166672,111.000000 1.000005,111.000000
	                C1.000003,74.333344 1.000003,37.666679 1.000002,1.000010
	                C32.499989,1.000000 64.000206,1.052139 95.499603,0.915274
	                C98.483711,0.902308 99.095909,1.516312 99.084404,4.500294
	                C98.952003,38.833111 98.952011,73.166809 99.084389,107.499626
	                C99.095886,110.483391 98.489746,111.136101 95.498642,111.088593
	                C82.501900,110.882156 69.500015,111.000000 56.000000,111.000000
                z'
        />
        <path
          fill='#59c1bd'
          opacity='1.000000'
          stroke='none'
          d='
                M69.611839,40.221756
	              C78.763496,36.218861 83.406868,39.141575 83.465858,48.683514
	              C83.548141,61.993408 83.513184,75.304375 83.460327,88.614609
	              C83.435089,94.971344 80.540115,98.438591 75.491890,98.417152
	              C70.420692,98.395630 67.553246,94.985748 67.444519,88.548843
	              C67.334946,82.061760 67.303398,75.569664 67.436981,69.083870
	              C67.496216,66.207840 66.778152,64.909180 63.555576,64.979195
	              C54.575260,65.174301 45.584690,65.183693 36.605083,64.972420
	              C33.404865,64.897125 32.659996,66.077034 32.738705,68.998528
	              C32.908924,75.316437 32.870934,81.643372 32.762260,87.963936
	              C32.708096,91.114212 32.493317,94.251266 29.678349,96.546471
	              C24.957190,100.395912 18.047724,98.124397 16.882013,92.172882
	              C16.533142,90.391731 16.412813,88.540344 16.409973,86.720787
	              C16.377775,66.089615 16.376404,45.458363 16.400066,24.827173
	              C16.404119,21.292263 16.631031,17.779747 20.120146,15.630458
	              C25.751734,12.161409 30.450172,14.646908 32.896973,22.661146
	              C34.575718,24.604338 34.206047,26.401926 33.295158,28.615164
	              C32.969204,30.072214 32.904854,31.142435 32.934250,32.606045
	              C34.604061,34.847843 33.803478,37.078140 34.005142,39.144321
	              C34.433670,43.534840 35.210392,47.686821 40.675209,49.254700
	              C41.766468,49.512901 42.514942,49.598114 43.622643,49.553017
	              C48.292675,47.568775 52.833206,48.520168 57.235100,48.607697
	              C61.675671,48.695995 65.133148,47.956665 66.574898,43.227085
	              C66.994034,41.852169 68.076454,41.087032 69.611839,40.221756
              z'
        />
        <path
          fill='#59c1bd'
          opacity='1.000000'
          stroke='none'
          d='
                M80.813179,17.171532
	                C84.000450,21.178593 83.900711,25.299534 80.782562,27.999819
	                C77.686188,30.681244 72.577354,30.593273 69.826447,27.811161
	                C67.203514,25.158476 66.927353,20.230146 69.233131,17.223156
	                C71.891464,13.756398 76.055077,13.433211 80.896210,16.640574
	                C79.660500,18.931303 77.514473,19.147194 75.344780,19.402620
	                C73.980537,19.563225 72.668228,20.056747 72.423286,21.643259
	                C72.193077,23.134361 73.339676,23.649759 74.497391,23.981335
	                C76.211365,24.472221 77.393593,23.768631 78.115044,22.195326
	                C78.862633,20.565037 78.933624,18.586700 80.813179,17.171532
                z'
        />
        <path
          fill='#59c1bd'
          opacity='1.000000'
          stroke='none'
          d='
              M81.027359,16.960899
	              C80.958344,18.573769 81.071899,20.266798 80.722305,21.858076
	              C80.275139,23.893478 80.036285,26.401554 77.329575,26.774494
	              C74.828476,27.119112 72.341934,26.544319 70.346725,24.937271
	              C69.119926,23.949146 68.799728,22.340879 69.401230,20.842911
	              C70.178993,18.906012 71.609215,17.446539 73.743851,17.191677
	              C75.866066,16.938299 78.029915,17.033691 80.624802,16.962818
	              C81.074089,16.949492 81.004120,16.995846 81.027359,16.960899
              z'
        />
      </svg>

      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  );
};

export default FallbackSpinner;
