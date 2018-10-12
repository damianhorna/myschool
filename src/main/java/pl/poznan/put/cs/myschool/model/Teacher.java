package pl.poznan.put.cs.myschool.model;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(mappedBy="teacher")
    private Clazz clazz;

    @NotNull
    private String name;

    @NotNull
    private String surname;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="subject_id",foreignKey=@ForeignKey(name = "fk_teacher_subject_id"))
    private Subject subject;

    @OneToOne(mappedBy = "teacher")
    private Grade grade;
}
