package pl.poznan.put.cs.myschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.poznan.put.cs.myschool.model.Teacher;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
