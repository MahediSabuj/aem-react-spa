import sanitizeHtml from 'sanitize-html';
import sanitizeWhiteList from '../sanitize-html.whitelist';

import React, { Component } from 'react';
import extractModelId from '../../utils/extract-model-id';

require('./Text.css');

class Text extends Component {
  get richTextContent() {
    return (
      <div
        id={extractModelId(this.props.cqPath)}
        data-rte-editelement
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(this.props.text, sanitizeWhiteList)
        }}
      />
    );
  }

  get textContent() {
    return <div>{this.props.text}</div>;
  }

  render() {
    return this.props.richText ? this.richTextContent : this.textContent;
  }
}

export default Text;
