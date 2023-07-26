import React from 'react';
import { MapTo } from "@adobe/aem-react-editable-components";

const RESOURCE_TYPE = 'aem-react-spa/components/content/text-image/v1/text-image';

const TextImageConfig = {
  emptyLabel: 'Text & Image',
  isEmpty: function () {
    return false;
  }
};

const TextImage = () => {
  return (
    <div className='cmp-text-image'>
      Text & Image Component
    </div>
  );
}

MapTo(RESOURCE_TYPE)(TextImage, TextImageConfig);
