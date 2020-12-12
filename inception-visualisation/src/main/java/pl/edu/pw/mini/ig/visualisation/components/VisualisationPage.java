package pl.edu.pw.mini.ig.visualisation.components;

import de.tudarmstadt.ukp.inception.recommendation.evaluation.RecommenderViewPanel;
import de.tudarmstadt.ukp.inception.recommendation.evaluation.SimulationLearningCurvePanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.wicketstuff.annotation.mount.MountPath;

import de.tudarmstadt.ukp.clarin.webanno.api.ProjectService;
import de.tudarmstadt.ukp.clarin.webanno.model.Project;
import de.tudarmstadt.ukp.clarin.webanno.ui.core.page.ApplicationPageBase;
import de.tudarmstadt.ukp.inception.recommendation.api.model.Recommender;
import de.tudarmstadt.ukp.inception.recommendation.project.RecommenderListPanel;

@MountPath("/visualisation.html")
public class VisualisationPage
    extends ApplicationPageBase
{
    private static final long serialVersionUID = 3042218455285633439L;
    private static final int MAX_RECOMMENDATIONS_DEFAULT = 20;

    private Project projectModel;
    private IModel<Recommender> selectedRecommenderModel;
    private @SpringBean ProjectService projectService;

    private static final String MID_EVALUATION_SIMULATION_CONTAINER = "evaluation-simulation-container";
    private static final String MID_RECOMMENDER_LIST = "recommenderList";
    private static final String MID_RECOMMENDER_VIEW = "recommenderView";

    public VisualisationPage(final PageParameters aPageParameters)
    {
        super();

        projectModel = projectService.getProject(aPageParameters.get("p").toLong());

        selectedRecommenderModel = Model.of();

        SimulationLearningCurvePanel evaluationSimulationPanel = new SimulationLearningCurvePanel(
            MID_EVALUATION_SIMULATION_CONTAINER, projectModel, selectedRecommenderModel);
        evaluationSimulationPanel.setOutputMarkupId(true);
        add(evaluationSimulationPanel);

        RecommenderViewPanel recommenderViewPanel = new RecommenderViewPanel(MID_RECOMMENDER_VIEW,
            selectedRecommenderModel);
        add(recommenderViewPanel);

        RecommenderListPanel recommenderListPanel = new RecommenderListPanel(MID_RECOMMENDER_LIST,
            Model.of(projectModel), selectedRecommenderModel, false);
        recommenderListPanel.setCreateAction(_target -> {
            Recommender recommender = new Recommender();
            recommender.setMaxRecommendations(MAX_RECOMMENDATIONS_DEFAULT);
            selectedRecommenderModel.setObject(recommender);
        });
        recommenderListPanel.setChangeAction(_target -> {
            _target.add(recommenderViewPanel);
            evaluationSimulationPanel.recommenderChanged();
        });
        add(recommenderListPanel);
    }
}
