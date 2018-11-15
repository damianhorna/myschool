package pl.poznan.put.cs.myschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.poznan.put.cs.myschool.model.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
