package de.tudarmstadt.ukp.inception.visualisation.jsreferences;

import org.apache.wicket.request.resource.JavaScriptResourceReference;

public class TreantJavascriptReference
    extends JavaScriptResourceReference {
    private static final long serialVersionUID = 1L;

    private static final TreantJavascriptReference INSTANCE = //
        new TreantJavascriptReference();

    /**
     * Gets the instance of the resource reference
     *
     * @return the single instance of the resource reference
     */
    public static TreantJavascriptReference get()
    {
        return INSTANCE;
    }

    /**
     * Private constructor
     */
    private TreantJavascriptReference()
    {
        super(TreantJavascriptReference.class, "Treant.js");
    }
}
