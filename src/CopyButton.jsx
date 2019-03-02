import React from 'react';
import Button from '@material-ui/core/Button';


class CopyButton extends React.Component {
  state = {
    copied: false
  }

  copyToClipboard = (text) => {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    // textField.hidden = true;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);
  }

  handleCopy = () => {
    const { text } = this.props;
    this.copyToClipboard(text)
    this.setState({
      copied: true
    }, () => setTimeout(() => this.setState({ copied: false }), 3000))
  }

  render() {
    return (
      <Button variant="outlined" size="small" color="primary" onClick={this.handleCopy}>
        {this.state.copied ? "Copied" : "Copy"}
      </Button>
    )
  }
}

export default CopyButton;