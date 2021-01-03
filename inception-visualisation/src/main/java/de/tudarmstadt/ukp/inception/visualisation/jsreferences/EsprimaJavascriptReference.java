package de.tudarmstadt.ukp.inception.visualisation.jsreferences;

import org.apache.wicket.request.resource.JavaScriptResourceReference;

public class EsprimaJavascriptReference extends JavaScriptResourceReference {
    private static final long serialVersionUID = 1L;

    private static final EsprimaJavascriptReference INSTANCE = //
        new EsprimaJavascriptReference();

    /**
     * Gets the instance of the resource reference
     *
     * @return the single instance of the resource reference
     */
    public static EsprimaJavascriptReference get()
    {
        return INSTANCE;
    }

    /**
     * Private constructor
     */
    private EsprimaJavascriptReference()
    {
        super(EsprimaJavascriptReference.class, "esprima.min.js");
    }
}
