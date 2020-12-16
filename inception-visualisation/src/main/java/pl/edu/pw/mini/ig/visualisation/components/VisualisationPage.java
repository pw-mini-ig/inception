package pl.edu.pw.mini.ig.visualisation.components;


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
}
