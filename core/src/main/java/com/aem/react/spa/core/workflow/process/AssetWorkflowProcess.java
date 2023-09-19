package com.aem.react.spa.core.workflow.process;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.metadata.MetaDataMap;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

@Component(
  service = WorkflowProcess.class,
  property = {
    "process.label=Asset Timeline Workflow Process"
  }
)
public class AssetWorkflowProcess implements WorkflowProcess {
  @Override
  public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {
    final String path = workItem.getWorkflowData().getPayload().toString();

    try {
      ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
      Resource assetResource = resourceResolver.getResource(path);

      if(assetResource != null) {
        Session jcrSession = resourceResolver.adaptTo(Session.class);
        Node assetNode = assetResource.adaptTo(Node.class);

        Node collectionNode;
        if (assetNode.hasNode("jcr:content/comments")) {
          collectionNode = assetNode.getNode ("jcr:content/comments");
        } else
        {
          collectionNode = assetNode.addNode("jcr:content/comments");
          collectionNode.setPrimaryType ("nt:unstructured");
          collectionNode.addMixin("mix:lastModified");
          collectionNode.setProperty ("sling:resourceType", "granite/comments/component/collection");
        }

        Node commentNode = collectionNode.addNode ("customComment");
        commentNode.setPrimaryType("nt:unstructured");
        commentNode.addMixin( "mix:lastModified");
        commentNode.setProperty("sling:resourceType", "granite/comments/components/comment");
        commentNode.setProperty("jcr:description", "Your Comment Here");

        jcrSession.save();
      }
    } catch(RepositoryException e) {
      e.printStackTrace ();
    }
  }
}
