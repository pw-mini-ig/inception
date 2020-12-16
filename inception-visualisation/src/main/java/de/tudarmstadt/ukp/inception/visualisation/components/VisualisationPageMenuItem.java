package de.tudarmstadt.ukp.inception.visualisation.components;

import de.tudarmstadt.ukp.clarin.webanno.api.ProjectService;
import de.tudarmstadt.ukp.clarin.webanno.security.UserDao;
import de.tudarmstadt.ukp.clarin.webanno.ui.core.menu.MenuItem;;
import org.apache.wicket.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import de.tudarmstadt.ukp.inception.visualisation.config.VisualisationServiceAutoConfiguration;

/**
 * <p>
 * This class is exposed as a Spring Component via
 * {@link VisualisationServiceAutoConfiguration#visualisationPageMenuItem()}.
 * </p>
 */
@Order(370)
public class VisualisationPageMenuItem
    implements MenuItem {

    private @Autowired UserDao userRepo;
    private @Autowired ProjectService projectService;

    @Override
    public String getPath() {
        return "/visualisation";
    }

    @Override
    public String getIcon() {
        return "images/statistics.png";
    }

    @Override
    public String getLabel() {
        return "Visualisation";
    }

    /**
     * Only project admins and annotators can see this page
     */
    @Override
    public boolean applies() {
        return true;
    }

    @Override
    public Class<? extends Page> getPageClass() {
        return VisualisationPage.class;
    }

    @Override
    public boolean isDirectAccessAllowed() {
        return true;
    }
}
