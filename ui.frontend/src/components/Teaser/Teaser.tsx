import React from 'react';
import { MapTo, Container, ContainerProperties, ContainerState } from '@adobe/aem-react-editable-components';

const RESOURCE_TYPE = 'aem-react-spa/components/content/teaser/v1/teaser';

const TeaserConfig = {
  emptyLabel: 'Teaser',
  isEmpty: function (props: ContainerProperties) {
    console.log('Empty', props);
    return !props || !props.cqItemsOrder || !props.cqItemsOrder.length < 1;
  }
};

class Teaser extends Container<ContainerProperties, ContainerState> {
  render() {
    console.log('items', this.props.cqItems);

    return (
      <div className='cmp-teaser'>
        Hello Teaser
      </div>
    );
  }
}

export default MapTo(RESOURCE_TYPE)(Teaser, TeaserConfig);