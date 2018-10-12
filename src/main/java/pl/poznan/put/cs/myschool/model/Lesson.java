package pl.poznan.put.cs.myschool.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Data
@Entity
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", foreignKey = @ForeignKey(name = "fk_lesson_subject_id"))
    private Subject subject;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", foreignKey = @ForeignKey(name = "fk_lesson_teacher_id"))
    private Teacher teacher;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "classroom_id", foreignKey = @ForeignKey(name = "fk_lesson_classroom_id"))
    private Classroom classroom;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", foreignKey = @ForeignKey(name = "fk_lesson_class_id"))
    private Clazz clazz;

    @NotNull
    private Date date;

    @OneToOne(mappedBy = "lesson")
    private Grade grade;


    @OneToOne(mappedBy = "lesson")
    private Presence presence;
}