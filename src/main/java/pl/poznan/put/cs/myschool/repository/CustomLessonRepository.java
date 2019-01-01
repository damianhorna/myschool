package pl.poznan.put.cs.myschool.repository;

import java.util.List;

public interface CustomLessonRepository {
    List getAbsences(Long studentId);
}
