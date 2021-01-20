package de.tudarmstadt.ukp.inception.visualisation.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import de.tudarmstadt.ukp.inception.visualisation.components.VisualisationPageMenuItem;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Configuration
public class VisualisationServiceAutoConfiguration {
    private @PersistenceContext
    EntityManager entityManager;

    @Bean
    public VisualisationPageMenuItem visualisationPageMenuItem()
    {
        return new VisualisationPageMenuItem();
    }
}

