package pl.poznan.put.cs.myschool.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.List;

@Data
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="class_id", foreignKey=@ForeignKey(name = "fk_student_class_id"))
    private Clazz clazz;

    @NotNull
    private String name;

    @ManyToMany(mappedBy = "presentStudents")
    private List<Lesson> lessons;

    @NotNull
    private String surname;

    @NotNull
    private Date dateOfBirth;

    @OneToMany(mappedBy = "student")
    private List<Grade> grades;
}
