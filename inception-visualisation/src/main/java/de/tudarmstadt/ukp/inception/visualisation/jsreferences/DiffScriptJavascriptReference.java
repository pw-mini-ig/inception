package de.tudarmstadt.ukp.inception.visualisation.jsreferences;

import org.apache.wicket.request.resource.JavaScriptResourceReference;

public class DiffScriptJavascriptReference
    extends JavaScriptResourceReference {
    private static final long serialVersionUID = 1L;

    private static final DiffScriptJavascriptReference INSTANCE = //
        new DiffScriptJavascriptReference();

    /**
     * Gets the instance of the resource reference
     *
     * @return the single instance of the resource reference
     */
    public static DiffScriptJavascriptReference get()
    {
        return INSTANCE;
    }

    /**
     * Private constructor
     */
    private DiffScriptJavascriptReference()
    {
        super(DiffScriptJavascriptReference.class, "diff.js");
    }
}
