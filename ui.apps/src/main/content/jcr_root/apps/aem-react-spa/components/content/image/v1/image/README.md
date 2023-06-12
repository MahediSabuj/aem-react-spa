Image (v1)
====
Image component written in HTL that renders an adaptive image.

## Features


### Use Object
The Image component uses the `com.adobe.cq.wcm.core.components.models.Image` Sling Model as its Use-object.

### Edit Dialog Properties
The following properties are written to JCR for this Image component and are expected to be available as `Resource` properties:

1. `./fileReference` property or `file` child node - will store either a reference to the image file, or the image file
2. `./alt` - defines the value of the HTML `alt` attribute
3. `./linkURL` - allows defining a URL to which the image will link to
4. ./id` - defines the component HTML ID attribute.
