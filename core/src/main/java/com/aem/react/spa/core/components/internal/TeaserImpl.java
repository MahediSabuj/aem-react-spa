package com.aem.react.spa.core.components.internal;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.aem.react.spa.core.components.models.Teaser;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

@Model(
  adaptables = SlingHttpServletRequest.class,
  adapters = { Teaser.class, ComponentExporter.class },
  resourceType = TeaserImpl.RESOURCE_TYPE,
  defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(
  name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
  extensions = ExporterConstants.SLING_MODEL_EXTENSION
)
public class TeaserImpl extends ResourceContainerImpl implements Teaser {
    public static final String RESOURCE_TYPE = "aem-react-spa/components/content/teaser/v1/teaser";

    @Override
    public String getExportedType() {
        return TeaserImpl.RESOURCE_TYPE;
    }
}
