import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import CopyButton from './CopyButton';


const styles = theme => ({
  card: {
    padding: 12,
    borderRadius: 7,
    // maxWidth: 720
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  text: {
    width: 'calc(100% - 24px);',
    height: theme.spacing.unit * 40,
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 10,
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  imageContainer: {
    backgroundColor: '#eee'
  }
});


class ImageTextCard extends PureComponent {
  render() {
    const { imageSrc, text, classes } = this.props;

    return (
      <Card className={classes.card}>
        <Grid container direction="column" spacing={24} justify="center">
          <Grid item className={classes.imageContainer}>
            <img className={classes.image} src={imageSrc} alt="Uploaded file" />
          </Grid>
          <Grid item>
            {text?
            <textarea id="recognized-text" className={classes.text} defaultValue={text} />
            : <label>No text found in the Image</label> }
          </Grid>
        </Grid>

        {text &&
          <CardActions className={classes.cardActions}>
            <CopyButton text={text} />
          </CardActions>
        }
      </Card>
    )
  }
}

export default withStyles(styles)(ImageTextCard);