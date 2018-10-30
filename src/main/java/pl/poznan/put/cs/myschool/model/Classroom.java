package pl.poznan.put.cs.myschool.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Classroom {

    @Id
    private long number;

    @NotNull
    private int numberOfSeats;

    @OneToOne(mappedBy = "classroom")
    private Lesson lesson;
}
