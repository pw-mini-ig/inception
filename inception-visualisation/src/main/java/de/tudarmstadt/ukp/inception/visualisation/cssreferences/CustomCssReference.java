package de.tudarmstadt.ukp.inception.visualisation.cssreferences;

import org.apache.wicket.request.resource.CssResourceReference;

public class CustomCssReference
    extends CssResourceReference {
    private static final long serialVersionUID = 1L;

    private static final CustomCssReference INSTANCE = new CustomCssReference();

    /**
     * Gets the instance of the resource reference
     *
     * @return the single instance of the resource reference
     */
    public static CustomCssReference get() {
        return INSTANCE;
    }

    /**
     * Private constructor
     */
    private CustomCssReference() {
        super(CustomCssReference.class, "CustomCss.css");
    }
}