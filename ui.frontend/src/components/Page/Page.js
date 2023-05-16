import { MapTo, Page, withComponentMappingContext } from '@adobe/aem-react-editable-components';
import { withRoute } from '../RouteHelper/RouteHelper';

require('./Page.css');

class AppPage extends Page {
  get containerProps() {
    let attrs = super.containerProps;
    attrs.className =
      (attrs.className || '') + ' page ' + (this.props.cssClassNames || '');
    return attrs;
  }
}

export default MapTo('aem-react-spa/components/page')(
  withComponentMappingContext(withRoute(AppPage))
);
