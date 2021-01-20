package de.tudarmstadt.ukp.inception.visualisation.cssreferences;

import org.apache.wicket.request.resource.CssResourceReference;

public class Diff2HtmlCssReference
    extends CssResourceReference {
    private static final long serialVersionUID = 1L;

    private static final Diff2HtmlCssReference INSTANCE = new Diff2HtmlCssReference();

    /**
     * Gets the instance of the resource reference
     *
     * @return the single instance of the resource reference
     */
    public static Diff2HtmlCssReference get() {
        return INSTANCE;
    }

    /**
     * Private constructor
     */
    private Diff2HtmlCssReference() {
        super(Diff2HtmlCssReference.class, "diff2html.min.css");
    }
}
