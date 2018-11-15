package pl.poznan.put.cs.myschool.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.List;

@Data
@Entity
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", foreignKey = @ForeignKey(name = "fk_lesson_subject_id"))
    private Subject subject;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", foreignKey = @ForeignKey(name = "fk_lesson_teacher_id"))
    private Teacher teacher;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "classroom_id", foreignKey = @ForeignKey(name = "fk_lesson_classroom_id"))
    private Classroom classroom;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", foreignKey = @ForeignKey(name = "fk_lesson_class_id"))
    private Clazz clazz;

    @NotNull
    private Date date;

    @NotNull
    private String topic;

    @OneToMany(mappedBy = "lesson")
    private List<Grade> grades;


    @JoinTable(name = "presence", joinColumns = {@JoinColumn(name = "lesson_id", foreignKey = @ForeignKey(name = "fk_presence_lesson_id"))},
            inverseJoinColumns = {@JoinColumn(name = "student_id", foreignKey = @ForeignKey(name = "fk_presence_student_id"))})
    @ManyToMany
    private List<Student> presentStudents;
}