package de.tudarmstadt.ukp.inception.visualisation.components;

import de.tudarmstadt.ukp.inception.visualisation.jsreferences.VisualisationScriptJavascriptReference;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.wicketstuff.annotation.mount.MountPath;
import de.tudarmstadt.ukp.clarin.webanno.ui.core.page.ApplicationPageBase;


@MountPath("/visualisation.html")
public class VisualisationPage
    extends ApplicationPageBase
{
    public VisualisationPage(final PageParameters aPageParameters)
    {
        super();
    }

    @Override
    public void renderHead(IHeaderResponse aResponse)
    {
        super.renderHead(aResponse);

        aResponse.render(
            JavaScriptHeaderItem.forReference(VisualisationScriptJavascriptReference.get()));
    }
}
