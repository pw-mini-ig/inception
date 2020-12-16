package de.tudarmstadt.ukp.inception.visualisation.jsreferences;

import org.apache.wicket.request.resource.JavaScriptResourceReference;

public class RaphaelJavascriptReference
    extends JavaScriptResourceReference {
    private static final long serialVersionUID = 1L;

    private static final RaphaelJavascriptReference INSTANCE = //
        new RaphaelJavascriptReference();

    /**
     * Gets the instance of the resource reference
     *
     * @return the single instance of the resource reference
     */
    public static RaphaelJavascriptReference get()
    {
        return INSTANCE;
    }

    /**
     * Private constructor
     */
    private RaphaelJavascriptReference()
    {
        super(RaphaelJavascriptReference.class, "raphael.js");
    }
}
