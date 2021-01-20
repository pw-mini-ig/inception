package de.tudarmstadt.ukp.inception.visualisation.jsreferences;

import org.apache.wicket.request.resource.JavaScriptResourceReference;

public class Diff2HtmlScriptJavascriptReference
    extends JavaScriptResourceReference {
    private static final long serialVersionUID = 1L;

    private static final Diff2HtmlScriptJavascriptReference INSTANCE = //
        new Diff2HtmlScriptJavascriptReference();

    /**
     * Gets the instance of the resource reference
     *
     * @return the single instance of the resource reference
     */
    public static Diff2HtmlScriptJavascriptReference get()
    {
        return INSTANCE;
    }

    /**
     * Private constructor
     */
    private Diff2HtmlScriptJavascriptReference()
    {
        super(Diff2HtmlScriptJavascriptReference.class, "diff2html.min.js");
    }
}
