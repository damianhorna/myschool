package pl.poznan.put.cs.myschool.model;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

@Data
@Entity
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(mappedBy = "teacher")
    private List<Clazz> clazzes;

    @NotNull
    private String name;

    @NotNull
    private String surname;

    @NotNull
    private BigDecimal salary;

    @NotNull
    private Date dateOfEmployment;

    @JoinTable(name = "teaching", joinColumns = {@JoinColumn(name = "teacher_id", foreignKey = @ForeignKey(name = "fk_teaching_teacher_id"))},
            inverseJoinColumns = {@JoinColumn(name = "subject_id", foreignKey = @ForeignKey(name = "fk_teaching_subject_id"))})
    @ManyToMany
    private List<Subject> subjects;

    @OneToMany(mappedBy = "teacher")
    private List<Grade> grades;
}
