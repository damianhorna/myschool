package pl.poznan.put.cs.myschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.poznan.put.cs.myschool.model.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
