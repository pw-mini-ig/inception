package pl.edu.pw.mini.ig.visualisation.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.pw.mini.ig.visualisation.components.VisualisationPageMenuItem;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Configuration
@ConditionalOnProperty(prefix = "visualisation", name = "enabled", havingValue = "true", matchIfMissing = true)
public class VisualisationServiceAutoConfiguration {
    private @PersistenceContext
    EntityManager entityManager;

    @ConditionalOnProperty(prefix = "visualisation.visualisation-page", //
        name = "enabled", havingValue = "true", matchIfMissing = true)
    @Bean
    public VisualisationPageMenuItem visualisationPageMenuItem()
    {
        return new VisualisationPageMenuItem();
    }
}

