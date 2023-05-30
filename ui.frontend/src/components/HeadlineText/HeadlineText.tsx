import React from 'react';
import { MapTo } from '@adobe/aem-react-editable-components';
import { TextV2Model } from '@adobe/aem-core-components-react-base';
import SanitizeHtml from 'sanitize-html';

import sanitizeWhiteList from '../sanitize-html.whitelist';
import extractModelId from '../../utils/extract-model-id';

import './HeadlineText.css';

const RESOURCE_TYPE = 'aem-react-spa/components/text';

const HeadlineTextConfig = {
  emptyLabel: 'Headline & Text',
  isEmpty: function (props: TextV2Model) {
    return !props || !props.text || props.text.trim().length < 1;
  }
};

const HeadlineText = (props: TextV2Model) => {
  const richTextContent = () => {
    const text = props.text || '';

    return (
      <div
        id={extractModelId(props.cqPath)}
        data-rte-editelement
        dangerouslySetInnerHTML={{
          __html: SanitizeHtml(text, sanitizeWhiteList)
        }}
      />
    );
  }

  const textContent = () => {
    return <div>{props.text}</div>;
  }

  return props.richText ? richTextContent() : textContent();
}

MapTo(RESOURCE_TYPE)(HeadlineText, HeadlineTextConfig);
