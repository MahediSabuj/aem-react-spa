Headline &amp; Text (v1)
====
Text component written in HTL that provides a section of rich text.

## Features
* In-place Editing
* Rich Text Editor

### Use Object
The **Headline &amp; Text** component uses the `com.adobe.cq.wcm.core.components.models.Text` Sling model as its Use-object. 

### Edit Dialog Properties
The current implementation reads the following resource properties:

1. `./text` - the actual text to be rendered
2. `./textIsRich` - flag determining if the rendered text is rich or not, useful for applying the correct HTL display context
3. `./id` - defines the component HTML ID attribute.

### Rich Text Options
Rich Text Editor has the following options:
* Bold
* Italic
* List
* Indent
* Link, Unlink
* Heading
* Quote
* Preformatted Text
