import { MapTo, withComponentMappingContext, AllowedComponentsContainer } from '@adobe/aem-react-editable-components';


const ContainerConfig = {
  emptyLabel: 'Container',
  isEmpty: function(props) {
    return !props || !props.cqItemsOrder || props.cqItemsOrder.length === 0;
  }
};

MapTo('aem-react-spa/components/container')(
  withComponentMappingContext(AllowedComponentsContainer),
  ContainerConfig
);
