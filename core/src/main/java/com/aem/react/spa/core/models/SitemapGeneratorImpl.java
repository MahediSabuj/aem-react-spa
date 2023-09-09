package com.aem.react.spa.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.sitemap.SitemapException;
import org.apache.sling.sitemap.builder.Sitemap;
import org.apache.sling.sitemap.spi.generator.ResourceTreeSitemapGenerator;
import org.apache.sling.sitemap.spi.generator.SitemapGenerator;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.propertytypes.ServiceRanking;

@Component(service = SitemapGenerator.class, configurationPolicy = ConfigurationPolicy.REQUIRE)
@ServiceRanking(20)
public class SitemapGeneratorImpl extends ResourceTreeSitemapGenerator {
    @Override
    protected void addResource(String name, Sitemap sitemap, Resource resource) throws SitemapException {

    }
}
