package de.tudarmstadt.ukp.inception.visualisation.cssreferences;

import org.apache.wicket.request.resource.CssResourceReference;

public class TreantCssReference
    extends CssResourceReference {
    private static final long serialVersionUID = 1L;

    private static final TreantCssReference INSTANCE = new TreantCssReference();

    /**
     * Gets the instance of the resource reference
     *
     * @return the single instance of the resource reference
     */
    public static TreantCssReference get() {
        return INSTANCE;
    }

    /**
     * Private constructor
     */
    private TreantCssReference() {
        super(TreantCssReference.class, "Treant.css");
    }
}
