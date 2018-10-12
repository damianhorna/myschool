package pl.poznan.put.cs.myschool.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", foreignKey = @ForeignKey(name = "fk_grade_student_id"))
    private Student student;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", foreignKey = @ForeignKey(name = "fk_grade_teacher_id"))
    private Teacher teacher;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", foreignKey = @ForeignKey(name = "fk_grade_lesson_id"))
    private Lesson lesson;

    @NotNull
    private int value;

    @NotNull
    private String description;
}
