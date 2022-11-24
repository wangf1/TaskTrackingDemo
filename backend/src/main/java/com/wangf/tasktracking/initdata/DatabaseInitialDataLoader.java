package com.wangf.tasktracking.initdata;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.wangf.tasktracking.model.User;
import com.wangf.tasktracking.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DatabaseInitialDataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                null, null, AuthorityUtils.createAuthorityList("ROLE_ADMIN")));
        loadUsers();

        SecurityContextHolder.getContext().setAuthentication(null);
    }

    private void loadUsers() throws IOException {
        Iterable<CSVRecord> records = readCsvFile("/initialdata/Users.csv");
        java.util.List<User> allUsers = new ArrayList<>();
        for (CSVRecord row : records) {
            User user = new User();
            user.setName(row.get(0));
            user.setEmail(row.get(1));
            user.setPhone(row.get(2));
            user.setPassword(row.get(3));
            user.setRoles(row.get(4).split(","));
            allUsers.add(user);
        }

        userRepository.saveAll(allUsers);
    }

    private Iterable<CSVRecord> readCsvFile(String path) throws IOException {
        Reader reader = new InputStreamReader(getClass().getResourceAsStream(path));
        return CSVFormat.DEFAULT.parse(reader);
    }

}
