import React from 'react';
import copy from 'clipboard-copy';
import Button from '@material-ui/core/Button';


class CopyButton extends React.Component {
  state = {
    copied: false
  }

  showCopied = () => {
    this.setState({
      copied: true
    }, () => setTimeout(() => this.setState({ copied: false }), 3000))
  }

  handleCopy = async () => {
    try {
      await copy(this.props.text);
    } finally {
      this.showCopied()
    }
  };

  render() {
    return (
      <Button variant="outlined" size="small" color="primary" onClick={this.handleCopy}>
        {this.state.copied ? "Copied" : "Copy"}
      </Button>
    )
  }
}

export default CopyButton;