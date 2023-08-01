import React from 'react';
import { MapTo, Container, ContainerProperties, ContainerState } from '@adobe/aem-react-editable-components';

const RESOURCE_TYPE = 'aem-react-spa/components/content/teaser/v1/teaser';

const TeaserConfig = {
  emptyLabel: 'Teaser',
  isEmpty: function (props: ContainerProperties) {
    console.log('Empty', props);
    return !props || !props.cqItemsOrder || props.cqItemsOrder.length < 1;
  }
};

class Teaser extends Container<ContainerProperties, ContainerState> {
  render() {
    return (
      <div className='cmp-teaser'>
        <div className='cmp-teaser__text'>
          {this.childComponents[0]}
        </div>
        <div className='cmp-teaser__action'>
          {this.childComponents[1]}
        </div>
        <div className='cmp-teaser__image'>
          {this.childComponents[2]}
        </div>
      </div>
    );
  }
}

// @ts-ignore
export default MapTo(RESOURCE_TYPE)(Teaser, TeaserConfig);
