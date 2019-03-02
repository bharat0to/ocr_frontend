import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const CircularLoading = ({ text, color, thickness=5 }) => (
    <Grid container direction="column" alignItems="center">
        <Grid item>
            <CircularProgress thickness={thickness} />
        </Grid>
        {text &&
        <Grid item>
            <Typography variant="h5">{text}</Typography>
        </Grid>}
    </Grid>
)

export default CircularLoading;