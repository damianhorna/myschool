package pl.poznan.put.cs.myschool.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
public class Clazz {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="teacher_id", foreignKey=@ForeignKey(name = "fk_clazz_teacher_id"))
    private Teacher teacher;

    @OneToMany(mappedBy = "clazz")
    private List<Student> students;

    @NotNull
    @Column(unique=true)
    private String name;
}
