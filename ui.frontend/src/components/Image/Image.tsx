import React from 'react';
import { ImageV2Model, withStandardBaseCssClass } from "@adobe/aem-core-components-react-base";
import { MapTo } from "@adobe/aem-react-editable-components";

import './Image.css';

const RESOURCE_TYPE = 'aem-react-spa/components/content/image/v1/image';

interface ImageModel extends ImageV2Model {
  srcset: string
}

const ImageConfig = {
  emptyLabel: 'Image',
  isEmpty: function (props: ImageModel) {
    return !props || !props.src || props.src.trim().length < 1;
  }
};

const Image = (props: ImageModel) => {
  const { isInEditor = false } = props;

  return (
    <div className={`${props.baseCssClass}${isInEditor ? ' cq-dd-image' : ''}`}
      itemScope itemType='https://schema.org/ImageObject'>
      <image src={props.src}
        className={props.baseCssClass + '__image'}
        srcset={props.srcset}
        itemprop='contentUrl'
        alt={props.alt}/>
    </div>
  );
}

MapTo(RESOURCE_TYPE)(
  withStandardBaseCssClass(Image, 'cmp-image'),
  ImageConfig
);
