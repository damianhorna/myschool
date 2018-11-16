package pl.poznan.put.cs.myschool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.poznan.put.cs.myschool.model.Subject;
import pl.poznan.put.cs.myschool.model.Teacher;
import pl.poznan.put.cs.myschool.repository.SubjectRepository;
import pl.poznan.put.cs.myschool.repository.TeacherRepository;

@RestController
public class HomeController {

    private final SubjectRepository subjectRepository;

    private final TeacherRepository teacherRepository;

    @Autowired
    public HomeController(SubjectRepository subjectRepository, TeacherRepository teacherRepository) {
        this.subjectRepository = subjectRepository;
        this.teacherRepository = teacherRepository;
    }


    @GetMapping("/")
    public String home(){
        return "home";
    }
}
