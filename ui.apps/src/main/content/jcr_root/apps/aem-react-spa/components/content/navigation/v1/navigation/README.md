Navigation (v1)
====
Navigation component written in HTL that renders a website navigation tree.

## Features
* Defines a configurable navigation root, navigation root depth and structure depth to allow flexibility in building the navigation tree
* Automatically filters out pages that should be hidden from navigation
* Automatically handles redirect targets defined on pages

### Use Object
The Navigation component uses the `com.adobe.cq.wcm.core.components.models.Navigation` Sling model as its Use-object.

### Edit Dialog Properties
The following properties are written to JCR for the Navigation component and are expected to be available as `Resource` properties:

1. `./navigationRoot` - the root page from which to build the navigation. It can be a blueprint master, language master or regular page.
2. `./structureStart` - the start level of the navigation structure relative to the navigation root.
3. `./collectAllPages` - if `true`, collects all pages that are descendants of the `./navigationRoot`. Overrides `./structureDepth`.
4. `./structureDepth` - the depth of the navigation structure, relative to the navigation root.
5. `./accessibilityLabel` - defines an accessibility label for the navigation.
6. `./disableShadowing` - for redirecting pages PageA -> PageB. If `true` - PageA(original page) is shown. If `false` or not configured - PageB(target page).
7. `./id` - defines the component HTML ID attribute.
