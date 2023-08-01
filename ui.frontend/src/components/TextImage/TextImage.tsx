import React from 'react';
import { Container, ContainerProperties, ContainerState, MapTo } from "@adobe/aem-react-editable-components";

const RESOURCE_TYPE = 'aem-react-spa/components/content/text-image/v1/text-image';

const TextImageConfig = {
  emptyLabel: 'Text & Image',
  isEmpty: function (props: ContainerProperties) {
    return !props || !props.cqItemsOrder || props.cqItemsOrder.length < 1;
  }
};

class TextImage extends Container<ContainerProperties, ContainerState> {
  render() {
    return (
        <div className='cmp-text-image'>
          <div className='cmp-text-image__text'>
            {this.childComponents[0]}
          </div>
          <div className='cmp-text-image__image'>
            {this.childComponents[1]}
          </div>
        </div>
    );
  }
}

// @ts-ignore
MapTo(RESOURCE_TYPE)(TextImage, TextImageConfig);
