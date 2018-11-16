package pl.poznan.put.cs.myschool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.poznan.put.cs.myschool.model.Subject;
import pl.poznan.put.cs.myschool.repository.SubjectRepository;

import java.util.List;

@RestController
public class SubjectController {
    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectController(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @GetMapping("/subjects")
    public List<Subject> subjects(){
        return subjectRepository.findAll();
    }
}
