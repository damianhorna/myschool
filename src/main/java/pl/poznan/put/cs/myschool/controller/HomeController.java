package pl.poznan.put.cs.myschool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import pl.poznan.put.cs.myschool.model.Subject;
import pl.poznan.put.cs.myschool.model.Teacher;
import pl.poznan.put.cs.myschool.repository.SubjectRepository;
import pl.poznan.put.cs.myschool.repository.TeacherRepository;

@Controller
public class HomeController {

    private final SubjectRepository subjectRepository;

    private final TeacherRepository teacherRepository;

    @Autowired
    public HomeController(SubjectRepository subjectRepository, TeacherRepository teacherRepository) {
        this.subjectRepository = subjectRepository;
        this.teacherRepository = teacherRepository;
    }


    @GetMapping("/")
    public String goHome(Model model){
        return "home";
    }

    @GetMapping("/home")
    public String goHomeDirectly(Model model){
        return "home";
    }

    public void addMathTeacher(){
        Subject s = new Subject();
        s.setName("Mathematics");

        subjectRepository.save(s);
        Teacher t = new Teacher();
        t.setName("Jan");
        t.setSurname("Kowalski");
        t.setSubject(s);

        teacherRepository.save(t);
    }

}
