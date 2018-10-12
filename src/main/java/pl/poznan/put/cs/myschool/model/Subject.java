package pl.poznan.put.cs.myschool.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(unique=true)
    private String name;

    @OneToOne(mappedBy = "subject")
    private Teacher teacher;
}
