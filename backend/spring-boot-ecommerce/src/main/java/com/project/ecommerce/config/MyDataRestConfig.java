package com.project.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.project.ecommerce.entity.Country;
import com.project.ecommerce.entity.Order;
import com.project.ecommerce.entity.Product;
import com.project.ecommerce.entity.ProductCategory;
import com.project.ecommerce.entity.State;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	@Value("${allowed.origins}")
	private String[] theAllowedOrigins;
	
	private EntityManager entityManager;

	@Autowired
	public void myDataRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		HttpMethod[] theUnsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH };

		// Disable HTTP methods for Product: PUT, POST, DELETE
		disableHttpMethods(Product.class, config, theUnsupportedActions);

		// Disable HTTP methods for Product Category: PUT, POST, DELETE
		disableHttpMethods(ProductCategory.class, config, theUnsupportedActions);

		// Disable HTTP methods for Country: PUT, POST, DELETE
		disableHttpMethods(Country.class, config, theUnsupportedActions);

		// Disable HTTP methods for State: PUT, POST, DELETE
		disableHttpMethods(State.class, config, theUnsupportedActions);
		
		// Disable HTTP methods for Order: PUT, POST, DELETE
		disableHttpMethods(Order.class, config, theUnsupportedActions);

		// call internal helper method
		exposeIds(config);
		
		// configure the course mapping
		cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins); 
	}

	private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config,
			HttpMethod[] theUnsupportedActions) {
		config.getExposureConfiguration().forDomainType(theClass)
				.withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
				.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
	}

	private void exposeIds(RepositoryRestConfiguration config) {
		// expose entity ids

		// get a list of all entity classes from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

		// create an array list of those entity types
		List<Class> entityClasses = new ArrayList<>();

		// get the entity types for the entities
		for (EntityType tempEntityType : entities) {
			entityClasses.add(tempEntityType.getJavaType());
		}

		// expose the entity ids for the array of entity/domain types
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);

	}
}
