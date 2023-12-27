import React from 'react';
import { MapTo, EditableComponent } from '@adobe/aem-react-editable-components';
import SanitizeHtml from 'sanitize-html';

import sanitizeWhiteList from '../sanitize-html.whitelist';
import extractModelId from '../../utils/extract-model-id';

import './HeadlineText.css';

const RESOURCE_TYPE = 'aem-react-spa/components/content/headline-text/v1/headline-text';

const HeadlineTextConfig = {
  emptyLabel: 'Headline & Text',
  isEmpty: function (props) {
    return !props || !props.text || props.text.trim().length < 1;
  }
};

const HeadlineText = (props) => {
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

const EditableHeadlineText = (props) => {
  return (
      <EditableComponent config={HeadlineTextConfig} {...props}>
        <HeadlineText {...props} />
      </EditableComponent>
  );
};

MapTo(RESOURCE_TYPE)(EditableHeadlineText);
