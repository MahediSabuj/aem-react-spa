package com.aem.react.spa.core.components.internal;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.SlingModelFilter;
import com.aem.react.spa.core.components.models.ResourceContainer;
import com.day.cq.wcm.api.components.Component;
import com.day.cq.wcm.api.components.ComponentManager;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.factory.ModelFactory;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class ResourceContainerImpl implements ResourceContainer {
    private String[] exportedItemsOrder;
    protected List<Resource> childComponents;
    protected Map<String, ComponentExporter> itemModels;
    protected List<Resource> filteredChildComponents;

    @SlingObject
    protected Resource resource;

    @Self
    protected SlingHttpServletRequest request;

    @OSGiService
    protected ModelFactory modelFactory;

    @OSGiService
    protected SlingModelFilter slingModelFilter;

    private List<Resource> readChildren() {
        List<Resource> children = new LinkedList<>();
        if (resource != null) {
            ComponentManager componentManager =
                    request.getResourceResolver().adaptTo(ComponentManager.class);
            if (componentManager != null) {
                resource.getChildren().forEach(res -> {
                    Component component = componentManager.getComponentOfResource(res);
                    if (component != null) {
                        children.add(res);
                    }
                });
            }
        }

        return children;
    }

    protected List<Resource> getChildren() {
        if (childComponents == null) {
            childComponents = readChildren();
        }

        return childComponents;
    }

    protected List<Resource> getFilteredChildren() {
        if (filteredChildComponents == null) {
            filteredChildComponents = new LinkedList<>();
            slingModelFilter.filterChildResources(getChildren()).forEach(filteredChildComponents::add);
        }

        return filteredChildComponents;
    }

    protected Map<String, ComponentExporter> getItemModels(SlingHttpServletRequest request, Class<ComponentExporter> modelClass) {
        Map<String, ComponentExporter> models = new LinkedHashMap<>();
        getFilteredChildren().forEach(child -> {
            ComponentExporter model = modelFactory.getModelFromWrappedRequest(request, child, modelClass);
            if (model != null) {
                models.put(child.getName(), model);
            }
        });

        return models;
    }

    @Override
    public Map<String, ComponentExporter> getExportedItems() {
        if (itemModels == null) {
            itemModels = getItemModels(request, ComponentExporter.class);
        }

        return itemModels;
    }

    @Override
    public String[] getExportedItemsOrder() {
        if (exportedItemsOrder == null) {
            Map<String, ComponentExporter> models = getExportedItems();
            if (!models.isEmpty()) {
                exportedItemsOrder = models.keySet().toArray(ArrayUtils.EMPTY_STRING_ARRAY);
            } else {
                exportedItemsOrder = ArrayUtils.EMPTY_STRING_ARRAY;
            }
        }

        return Arrays.copyOf(exportedItemsOrder, exportedItemsOrder.length);
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
