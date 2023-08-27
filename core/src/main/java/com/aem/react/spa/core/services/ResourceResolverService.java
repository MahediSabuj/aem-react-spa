package com.aem.react.spa.core.services;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@Component(service = ResourceResolverService.class,
  property = {
    Constants.SERVICE_DESCRIPTION + "=AEM React SPA ResourceResolver Provider for Service User"
})
public class ResourceResolverService {
    private static final Logger logger = LoggerFactory.getLogger(ResourceResolverService.class);

    @Reference
    ResourceResolverFactory resolverFactory;

    public ResourceResolver getResourceResolver() {
        Map<String, Object> params = new HashMap<>();
        params.put(resolverFactory.SUBSERVICE, "writeService");

        try {
            return resolverFactory.getServiceResourceResolver(params);
        } catch (LoginException e) {
            logger.error("error due to : {}", e.getMessage(), e);
        }

        return null;
    }
}
