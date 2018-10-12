package pl.poznan.put.cs.myschool.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Classroom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(unique=true)
    private int number;

    @NotNull
    private int numberOfSeats;

    @OneToOne(mappedBy = "classroom")
    private Lesson lesson;
}
