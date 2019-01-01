package pl.poznan.put.cs.myschool.repository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Component
public class CustomLessonRepositoryImpl implements CustomLessonRepository {

    @PersistenceContext
    EntityManager entityManager;

    @RestResource(path = "absences", rel = "absences")
    @Override
    public List getAbsences(@Param("studentId")Long studentId) {
        Query query = entityManager.createNamedStoredProcedureQuery("getAbsences");
        query.setParameter("studentId", studentId);
        return query.getResultList();
    }
}
