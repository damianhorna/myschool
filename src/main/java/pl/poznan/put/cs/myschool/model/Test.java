package pl.poznan.put.cs.myschool.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
public class Test {
    @Id
    private String type;

    @OneToMany(mappedBy = "test")
    private List<Grade> grades;
}
