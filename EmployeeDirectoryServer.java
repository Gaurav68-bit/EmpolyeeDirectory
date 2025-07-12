

import com.sun.net.httpserver.*;
import freemarker.template.*;
import java.io.*;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.util.*;

public class EmployeeDirectoryServer {

    public static void main(String[] args) throws Exception {
        // FreeMarker config
        Configuration cfg = new Configuration(Configuration.VERSION_2_3_32);
        cfg.setDirectoryForTemplateLoading(new File("templates"));
        cfg.setDefaultEncoding("UTF-8");

        // HTTP server config
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // Serve static files (CSS, JS, images)
        server.createContext("/static", exchange -> {
            String filePath = "static" + exchange.getRequestURI().getPath().replace("/static", "");
            File file = new File(filePath);
            if (!file.exists()) {
                exchange.sendResponseHeaders(404, -1);
                return;
            }
            byte[] content = Files.readAllBytes(file.toPath());
            exchange.getResponseHeaders().add("Content-Type", guessMimeType(file.getName()));
            exchange.sendResponseHeaders(200, content.length);
            exchange.getResponseBody().write(content);
            exchange.close();
        });

        // Serve dashboard page
        server.createContext("/dashboard", exchange -> {
            try {
                Template template = cfg.getTemplate("dashboard.ftl");

                // 👇 Static employee data list
                List<Map<String, String>> employeeList = new ArrayList<>();

                Map<String, String> emp1 = new HashMap<>();
                emp1.put("id", "E001");
                emp1.put("firstName", "Gaurav");
                emp1.put("lastName", "Sarma");
                emp1.put("email", "gaurav@example.com");
                emp1.put("department", "HR");
                emp1.put("role", "Manager");
                employeeList.add(emp1);

                Map<String, String> emp2 = new HashMap<>();
                emp2.put("id", "E002");
                emp2.put("firstName", "Bhuman");
                emp2.put("lastName", "Das");
                emp2.put("email", "bhuman@example.com");
                emp2.put("department", "IT");
                emp2.put("role", "Developer");
                employeeList.add(emp2);

                Map<String, String> emp3 = new HashMap<>();
                emp3.put("id", "E003");
                emp3.put("firstName", "Aman");
                emp3.put("lastName", "sarma");
                emp3.put("email", "aman@example.com");
                emp3.put("department", "Finance");
                emp3.put("role", "Analyst");
                employeeList.add(emp3);

                // Data model for FreeMarker
                Map<String, Object> dataModel = new HashMap<>();
                dataModel.put("employees", employeeList);

                // Process template
                StringWriter writer = new StringWriter();
                template.process(dataModel, writer);

                byte[] response = writer.toString().getBytes("UTF-8");
                exchange.getResponseHeaders().add("Content-Type", "text/html");
                exchange.sendResponseHeaders(200, response.length);
                exchange.getResponseBody().write(response);
                exchange.close();

            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        server.start();
        System.out.println("✅ Server running at http://localhost:8080/dashboard");
    }

    // Mime type helper
    private static String guessMimeType(String fileName) {
        if (fileName.endsWith(".css")) return "text/css";
        if (fileName.endsWith(".js")) return "application/javascript";
        if (fileName.endsWith(".png")) return "image/png";
        if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) return "image/jpeg";
        if (fileName.endsWith(".html")) return "text/html";
        return "text/plain";
    }
}

