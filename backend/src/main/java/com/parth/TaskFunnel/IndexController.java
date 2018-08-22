package main.java.com.parth.TaskFunnel;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;


/*** Created by parshah on 17-Sep-16.*/

@Controller
public class IndexController {

    File dir = new File("save-dir");
    File subdir = new File("save-dir/tasks");

    static String taskTree = "";

    private String getAllTasks() {
        List<String> allTasks = new ArrayList<>(20);
        if (!dir.exists()) {
            dir.mkdir();//TODO make an exception?
        }
        if (!subdir.exists()) {
            subdir.mkdir();//TODO make an exception?
        }
        File[] taskList = subdir.listFiles();
        for (int i = 0; i < taskList.length; i++) {
            System.out.println(taskList[i]);
            String task = "{\"empty\":\"empty\"}";
            try {
                task = Files.readAllLines(Paths.get("save-dir/tasks/" + taskList[i].getName())).get(0).toString();
            } catch (java.io.IOException f) {
                System.out.println(f);//TODO
            }
            allTasks.add(task);
        }
        System.out.println(allTasks);
        return allTasks.toString();
    }

    @RequestMapping(value = "/allTasks", method = RequestMethod.GET, produces = "plain/text")
    public ResponseEntity<String> temp() {
        String msg = getAllTasks();
        return new ResponseEntity<String>(msg, HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String indexController() {

        return "/index";
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST, consumes = "application/json", produces = "plain/text")
    public ResponseEntity<String> saveTask(@RequestBody String taskJson) {
        int startIndex = taskJson.indexOf("\"id\":\"") + 6;
        int endIndex = taskJson.indexOf("\"", startIndex);
        String taskId = taskJson.substring(startIndex, endIndex);
        /*System.out.print(startIndex + "\t");
        System.out.print(endIndex + "\t");
        System.out.println(taskId);*/
        String msg = "";
        if (!dir.exists()) dir.mkdir();
        if (!subdir.exists()) subdir.mkdir();
        File jsonFile = new File("save-dir/tasks/" + taskId + ".json");
        if (!jsonFile.exists()) {
            try {
                jsonFile.createNewFile();
            } catch (java.io.IOException e) {
                System.out.println(e);
                msg = e.toString();
            }
        }
        try {
            FileWriter fw = new FileWriter(jsonFile.getAbsoluteFile());
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(taskJson);
            bw.close();
            msg = "saved :)";
        } catch (java.io.IOException e) {
            System.out.println(e);
            msg = e.toString();
        }


        return new ResponseEntity<String>(msg, HttpStatus.ACCEPTED);
    }
}
