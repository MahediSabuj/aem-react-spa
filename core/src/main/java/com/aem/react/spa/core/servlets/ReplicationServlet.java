package com.aem.react.spa.core.servlets;

import com.aem.react.spa.core.services.ResourceResolverService;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.google.gson.JsonObject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import javax.servlet.Servlet;
import java.io.IOException;

@Component(service = Servlet.class,
  property = {
    Constants.SERVICE_DESCRIPTION + "=Replication Servlet",
    ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET,
    ServletResolverConstants.SLING_SERVLET_PATHS + "=/bin/public/aem-react-spa/replication"
})
public class ReplicationServlet extends SlingAllMethodsServlet {
    private static final String REPLICATE_PATH = "replicatePath";

    private static final Logger logger = LoggerFactory.getLogger(ReplicationServlet.class);

    @Reference
    private Replicator replicator;

    @Reference
    private ResourceResolverService resourceResolverService;
    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response) throws IOException {
        boolean replicated = false;
        String replicatePath = request.getParameter(REPLICATE_PATH);

        ResourceResolver resourceResolver = resourceResolverService.getResourceResolver();

        if(resourceResolver != null) {
            Session session = resourceResolver.adaptTo(Session.class);

            if(session != null) {
                try {
                    replicator.replicate(session, ReplicationActionType.ACTIVATE, replicatePath);
                    replicated = true;
                } catch (ReplicationException e) {
                    logger.error("error due to : {}", e.getMessage(), e);
                }
            }

            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("Replicated", replicated);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().print(jsonObject);
        }
    }
}
