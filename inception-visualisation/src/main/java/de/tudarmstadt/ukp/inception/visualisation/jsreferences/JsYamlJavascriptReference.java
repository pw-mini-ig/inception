package de.tudarmstadt.ukp.inception.visualisation.jsreferences;

import de.tudarmstadt.ukp.inception.visualisation.cssreferences.TreantCssReference;
import org.apache.wicket.Application;
import org.apache.wicket.markup.head.CssHeaderItem;
import org.apache.wicket.markup.head.HeaderItem;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.request.resource.JavaScriptResourceReference;

import java.util.ArrayList;
import java.util.List;

public class JsYamlJavascriptReference extends JavaScriptResourceReference {
    private static final long serialVersionUID = 1L;

    private static final JsYamlJavascriptReference  INSTANCE = //
        new JsYamlJavascriptReference ();

    /**
     * Gets the instance of the resource reference
     *
     * @return the single instance of the resource reference
     */
    public static JsYamlJavascriptReference  get()
    {
        return INSTANCE;
    }

    @Override
    public List<HeaderItem> getDependencies()
    {
        List<HeaderItem> dependencies = new ArrayList<>(super.getDependencies());
        dependencies.add(JavaScriptHeaderItem.forReference(EsprimaJavascriptReference.get()));

        return dependencies;
    }

    /**
     * Private constructor
     */
    private JsYamlJavascriptReference ()
    {
        super(JsYamlJavascriptReference .class, "js-yaml.min.js");
    }
}
