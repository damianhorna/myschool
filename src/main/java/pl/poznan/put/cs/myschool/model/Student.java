package pl.poznan.put.cs.myschool.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="class_id", foreignKey=@ForeignKey(name = "fk_student_class_id"))
    private Clazz clazz;

    @NotNull
    private String name;

    @NotNull
    private String surname;

    @OneToOne(mappedBy = "student")
    private Grade grade;

    @OneToOne(mappedBy = "student")
    private Presence lesson;
}
