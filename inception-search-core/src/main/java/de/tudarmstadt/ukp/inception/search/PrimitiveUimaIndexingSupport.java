/*
 * Copyright 2018
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
package de.tudarmstadt.ukp.inception.search;

import static org.apache.commons.lang3.StringUtils.isEmpty;

import org.apache.commons.collections4.MultiValuedMap;
import org.apache.commons.collections4.multimap.HashSetValuedHashMap;
import org.apache.uima.cas.CAS;
import org.apache.uima.cas.text.AnnotationFS;
import org.springframework.beans.factory.annotation.Autowired;

import de.tudarmstadt.ukp.clarin.webanno.api.annotation.feature.FeatureSupport;
import de.tudarmstadt.ukp.clarin.webanno.api.annotation.feature.FeatureSupportRegistry;
import de.tudarmstadt.ukp.clarin.webanno.model.AnnotationFeature;
import de.tudarmstadt.ukp.inception.search.config.SearchServiceAutoConfiguration;

/**
 * <p>
 * This class is exposed as a Spring Component via
 * {@link SearchServiceAutoConfiguration#primitiveUimaIndexingSupport}.
 * </p>
 */
public class PrimitiveUimaIndexingSupport
    implements FeatureIndexingSupport
{
    private String id;
    private FeatureSupportRegistry featureSupportRegistry;

    public PrimitiveUimaIndexingSupport(@Autowired FeatureSupportRegistry aFeatureSupportRegistry)
    {
        featureSupportRegistry = aFeatureSupportRegistry;
    }

    @Override
    public String getId()
    {
        return id;
    }

    @Override
    public void setBeanName(String aBeanName)
    {
        id = aBeanName;
    }

    @Override
    public boolean accepts(AnnotationFeature aFeature)
    {
        switch (aFeature.getMultiValueMode()) {
        case NONE:
            switch (aFeature.getType()) {
            case CAS.TYPE_NAME_INTEGER: // fallthrough
            case CAS.TYPE_NAME_FLOAT: // fallthrough
            case CAS.TYPE_NAME_BOOLEAN: // fallthrough
            case CAS.TYPE_NAME_STRING:
                return true;
            default:
                return false;
            }
        case ARRAY: // fallthrough
        default:
            return false;
        }
    }

    @Override
    public MultiValuedMap<String, String> indexFeatureValue(String aFieldPrefix,
            AnnotationFS aAnnotation, String aFeaturePrefix, AnnotationFeature aFeature)
    {
        FeatureSupport<?> featSup = featureSupportRegistry.getFeatureSupport(aFeature);
        String featureValue = featSup.renderFeatureValue(aFeature, aAnnotation);
        MultiValuedMap<String, String> values = new HashSetValuedHashMap<String, String>();
        if (isEmpty(featureValue)) {
            return values;
        }
        values.put(featureIndexName(aFieldPrefix, aFeaturePrefix, aFeature), featureValue);
        return values;
    }

    @Override
    public String featureIndexName(String aFieldPrefix, String aFeaturePrefix,
            AnnotationFeature aFeature)
    {
        return aFieldPrefix + aFeaturePrefix + ATTRIBUTE_SEP + aFeature.getUiName();
    }
}
