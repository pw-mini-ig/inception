package de.tudarmstadt.ukp.inception.visualisation.components;

import org.apache.wicket.Application;
import org.apache.wicket.markup.head.HeaderItem;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.request.resource.JavaScriptResourceReference;

import java.util.ArrayList;
import java.util.List;

public class VisualisationScriptJavascriptReference
    extends JavaScriptResourceReference {
    private static final long serialVersionUID = 1L;

    private static final VisualisationScriptJavascriptReference INSTANCE = //
        new VisualisationScriptJavascriptReference();

    /**
     * Gets the instance of the resource reference
     *
     * @return the single instance of the resource reference
     */
    public static VisualisationScriptJavascriptReference get()
    {
        return INSTANCE;
    }

    @Override
    public List<HeaderItem> getDependencies()
    {
        List<HeaderItem> dependencies = new ArrayList<>(super.getDependencies());
        dependencies.add(JavaScriptHeaderItem.forReference(
            Application.get().getJavaScriptLibrarySettings().getJQueryReference()));

        return dependencies;
    }

    /**
     * Private constructor
     */
    private VisualisationScriptJavascriptReference()
    {
        super(VisualisationScriptJavascriptReference.class, "VisualisationScript.js");
    }
}
