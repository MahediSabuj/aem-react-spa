import React from 'react';
import { NavigationV1Item, NavigationV1Model, withStandardBaseCssClass } from "@adobe/aem-core-components-react-base";
import { MapTo } from "@adobe/aem-react-editable-components";

import './Navigation.css';

const RESOURCE_TYPE = 'aem-react-spa/components/content/navigation/v1/navigation';

interface Link {
  isValid: boolean;
  url: string;
}

interface NavigationItem extends NavigationV1Item {
  link: Link;
}

interface NavigationModel extends NavigationV1Model {
  items: NavigationItem[];
}

const NavigationConfig = {
  emptyLabel: 'Navigation',
  isEmpty: function (props: NavigationV1Model) {
    return !props || !props.items || props.items.length < 1;
  }
};

const NavigationItem = (item: NavigationItem) => {
  const cssClass = `${item.baseCssClass}__item ${item.baseCssClass}__item--level-${item.level}`;
  const activeClass = item.active ? ` ${item.baseCssClass}__item--active` : '';

  return (
    <li className={`${cssClass}${activeClass}`}>
      <a className={`${item.baseCssClass}__item-link`} href={item.link.url} title={item.title}>
        {item.title}
      </a>
    </li>
  )
}

const NavigationGroup = (navigationModel: NavigationModel) => {
  const { items, baseCssClass } = navigationModel;
  const hasItems = !!items && items.length > 0;

  return (
    hasItems ? (
      <ul className={`${baseCssClass}__group`}>
        {items.map((item, index) => (
          <NavigationItem key={`${item.baseCssClass}__item-${index}`}
            {...item}
            baseCssClass={baseCssClass}/>
        ))}
      </ul>
    ) : null
  );
}

const Navigation = (props: NavigationModel) => {
  return (
    <nav className={props.baseCssClass}
      role='navigation'
      itemScope itemType="https://schema.org/SiteNavigationElement"
      aria-label={props.accessibilityLabel}>
      <NavigationGroup {...props}/>
    </nav>
  );
}

// @ts-ignore
MapTo(RESOURCE_TYPE)(withStandardBaseCssClass(Navigation, 'cmp-navigation'), NavigationConfig);
