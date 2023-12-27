import { MapTo, Page } from '@adobe/aem-react-editable-components';
import { withRoute } from '../RouteHelper/RouteHelper';

require('./Page.css');

// This component is a variant of a Page component mapped to the
// "aem-react-spa/components/page" resource type. For now, the rendering is
// the same as the RootPage; this is more for illustration purposes
const AppPage = (props) => {
  return <Page {...props} className={props.className || ` page` }/>
}

export default MapTo('aem-react-spa/components/page')(
  withRoute(AppPage)
);
