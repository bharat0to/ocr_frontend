import React from 'react';
import classNames from 'classnames'
import UploadIcon from '@material-ui/icons/CloudUpload';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
import ImageTextCard from './ImageTextCard';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  dropzone: {
    cursor: 'pointer',
    padding: theme.spacing.unit * 3,
    borderColor: theme.palette.primary.main,
    borderStyle: 'dashed',
    borderWidth: 3,
    borderRadius: 10,
  },
  activeDropzone: {
    backgroundColor: theme.palette.primary[100]
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: 60
  }
})

const URL = 'http://localhost:5000/scan'

const initialState = {
  status: 'NEW',
  image: null,
  text: "",
  filename: ""
}

class DropBox extends React.Component {
  statusTypes = ['NEW', 'READING', 'UPLOADING', 'SUCCESS', 'FAILED', 'REJECTED']
  state = initialState

  onDrop = (acceptedFiles, rejectedFiles) => {
    let file = acceptedFiles[0]
    if(!file){
      file = rejectedFiles[0]
      if(file){
        this.setState({ status: 'REJECTED', filename: file.name})
      }
      return
    };
    this.setState({ status: 'READING', filename: file.name })
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = (e) => this.setState(({status}) => (
      { image: reader.result, status: status === 'READING'? 'UPLOADING' : status }))

    let data = new FormData();
    data.append('image', file);

    axios.post(URL, data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    }).then((response) => {
      const text = response.data.text;
      this.setState({ text, status: 'SUCCESS' })
    }).catch((error) => {
      this.setState({ status: 'FAILED' })
    });
  }

  handleNew = () => this.setState(initialState)

  render() {
    const { classes } = this.props;
    const { status, filename, image, text } = this.state

    const TryNew = (
      <Button variant='outlined' color="primary" onClick={this.handleNew}>Try New</Button>
    )

    switch(status){
      case 'READING':
      case 'UPLOADING':
        return (
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <CircularProgress thickness={5} />
            </Grid>
            <Grid item>
              <Typography variant="h4">{`${status === 'READING'? 'Read' : 'Scann'}ing the image `}<strong>{filename}</strong></Typography>
            </Grid>
          </Grid>
        )
      case 'SUCCESS':
        return (
          <Grid container direction="column" spacing={24} alignItems="center">
            <Grid item>
              {TryNew}
            </Grid>
            <Grid item>
              <ImageTextCard imageSrc={image} text={text} />
            </Grid>
            <Grid item>
              {TryNew}
            </Grid>
          </Grid>
        )
      case 'FAILED':
      case 'REJECTED':
        return (
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h5" gutterBottom>
                {status === 'FAILED'? "Failed to scan the image " : "File type is not supported "}<strong>{filename}</strong>
              </Typography>
            </Grid>
            <Grid item>
              {TryNew}
            </Grid>
          </Grid>
        )
      default:
        return (
          <Dropzone
            onDrop={this.onDrop}
            accept="image/*"
            multiple={false}
          >
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <Grid container direction="column" alignItems="center"
                  {...getRootProps()}
                  className={classNames(classes.dropzone, { [classes.activeDropzone]: isDragActive })}
                >
                  <input {...getInputProps()} />
                  <Grid item>
                    <UploadIcon className={classes.icon} />
                  </Grid>
                  {!isMobile &&
                    <Grid item>
                      <Typography variant="h5" color="textSecondary">
                        DRAG & DROP
                      </Typography>
                    </Grid>
                  }
                  <Grid item>
                    <Typography variant="h6">
                      Click to select an image file
                    </Typography>
                  </Grid>
                </Grid>
              )
            }}
          </Dropzone>
        )
    }
  }
}

export default withStyles(styles)(DropBox);