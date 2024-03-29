package com.aem.react.spa.core.components.internal.models.v1;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.aem.react.spa.core.components.models.TextImage;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

@Model(
  adaptables = SlingHttpServletRequest.class,
  adapters = { TextImage.class, ComponentExporter.class },
  resourceType = TextImageImpl.RESOURCE_TYPE,
  defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(
  name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
  extensions = ExporterConstants.SLING_MODEL_EXTENSION
)
public class TextImageImpl extends ResourceContainerImpl implements TextImage {
    public static final String RESOURCE_TYPE = "aem-react-spa/components/content/text-image/v1/text-image";

    @Override
    public String getExportedType() {
        return TextImageImpl.RESOURCE_TYPE;
    }
}
