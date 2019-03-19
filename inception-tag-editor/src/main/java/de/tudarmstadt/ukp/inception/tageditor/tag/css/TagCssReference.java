/*
 * Copyright 2019
 * Ubiquitous Knowledge Processing (UKP) Lab
 * Technische Universität Darmstadt
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package de.tudarmstadt.ukp.inception.tageditor.tag.css;

import org.apache.wicket.request.resource.CssResourceReference;

public class TagCssReference
    extends CssResourceReference
{
    private static final long serialVersionUID = -7685818103781559976L;
    
    private static final TagCssReference INSTANCE = new TagCssReference();

    /**
     * Gets the instance of the resource reference
     *
     * @return the single instance of the resource reference
     */
    public static TagCssReference get()
    {
        return INSTANCE;
    }

    /**
     * Private constructor
     */
    private TagCssReference()
    {
        super(TagCssReference.class, "tag.css");
    }
}