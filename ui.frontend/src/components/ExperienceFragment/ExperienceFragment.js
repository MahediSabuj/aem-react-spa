import { MapTo, withComponentMappingContext, Container } from '@adobe/aem-react-editable-components';

const ExperienceFragmentVariationConfig = {
  emptyLabel: 'Experience Fragment',
  isEmpty: function(props) {
    return !props || !props.configured;
  }
};

MapTo('aem-react-spa/components/experiencefragment')(
  withComponentMappingContext(Container),
  ExperienceFragmentVariationConfig
);
