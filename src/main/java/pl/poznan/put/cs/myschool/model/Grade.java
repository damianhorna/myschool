package pl.poznan.put.cs.myschool.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", foreignKey = @ForeignKey(name = "fk_grade_student_id"))
    private Student student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "teacher_id", foreignKey = @ForeignKey(name = "fk_grade_teacher_id"))
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lesson_id", foreignKey = @ForeignKey(name = "fk_grade_lesson_id"))
    private Lesson lesson;

    @NotNull
    private int value;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "test_id", foreignKey = @ForeignKey(name = "fk_grade_test_id"))
    private Test test;

    @NotNull
    private String description;
}
