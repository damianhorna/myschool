package pl.poznan.put.cs.myschool.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Presence {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @OneToOne
    @JoinColumn(name = "lesson_id", foreignKey = @ForeignKey(name = "fk_presence_lesson_id"))
    private Lesson lesson;

    @NotNull
    @OneToOne
    @JoinColumn(name = "student_id", foreignKey = @ForeignKey(name = "fk_presence_student_id"))
    private Student student;

    @NotNull
    private boolean present;
}
