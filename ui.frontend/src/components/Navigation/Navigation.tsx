import React from 'react';
import { NavigationV1Model } from "@adobe/aem-core-components-react-base";
import { MapTo } from "@adobe/aem-react-editable-components";

const RESOURCE_TYPE = 'aem-react-spa/components/content/navigation/v1/navigation';

const NavigationConfig = {
  emptyLabel: 'Navigation',
  isEmpty: function (props: NavigationV1Model) {
    return !props || !props.items || props.items.length < 1;
  }
};

const Navigation = (props: NavigationV1Model) => {
  return (
    <div></div>
  );
}

MapTo(RESOURCE_TYPE)(Navigation, NavigationConfig);
