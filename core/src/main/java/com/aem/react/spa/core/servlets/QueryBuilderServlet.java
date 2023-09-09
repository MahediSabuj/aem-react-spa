package com.aem.react.spa.core.servlets;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;

import javax.jcr.Session;
import javax.servlet.Servlet;
import java.io.IOException;
import java.util.*;

@Component(service = Servlet.class,
  property = {
    Constants.SERVICE_DESCRIPTION + "=Query Builder Servlet",
    ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET,
    ServletResolverConstants.SLING_SERVLET_PATHS + "=/bin/public/aem-react-spa/query-builder"
})
public class QueryBuilderServlet extends SlingAllMethodsServlet {
    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response) throws IOException {
        String assetPath = request.getParameter("assetPath");

        Map<String, String> predicateMap = new HashMap<>();
        predicateMap.put("1_path", assetPath);
        predicateMap.put("2_type", "dam:Asset");
        predicateMap.put("3_property", "jcr:content/contentFragment");
        predicateMap.put("3_property.value", "true");
        predicateMap.put("4_orderby", "@jcr:content/jcr:lastModified");
        predicateMap.put("4_orderby.sort", "desc");

        // In case you want to search by metadata/cq:tags property
        // predicateMap.put("5_property", "jcr:content/metadata/cq:tags");
        // predicateMap.put("5_property.value", "aem-react-spa:us/articles/aem-cloud");

        Session session = request.getResourceResolver().adaptTo(Session.class);
        QueryBuilder queryBuilder = request.getResourceResolver().adaptTo(QueryBuilder.class);
        Query query = queryBuilder.createQuery(PredicateGroup.create(predicateMap), session);

        SearchResult result = query.getResult();

        JsonObject jsonObject = new JsonObject();
        if (result != null && result.getResources() != null) {
            Iterator<Resource> resultIterator = result.getResources();

            while (resultIterator.hasNext()){
                Resource resource = resultIterator.next();
                ValueMap valueMap = resource.getValueMap();

                String resourcePath = resource.getPath();
                String[] tags = valueMap.get("jcr:content/metadata/cq:tags", new String[0]);

                JsonArray jsonArray = new JsonArray();
                Arrays.stream(tags).forEach(jsonArray::add);
                jsonObject.add(resourcePath, jsonArray);
            }
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().print(jsonObject);
    }
}
