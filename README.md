# Task Tracking Demo

This project is for demo Spring boot with ReactJs

## How to start the app

### Approach 1: For frontend development, start API server and UI server

1. Run following command in project root directory, to start backend server
    ```
    ./gradlew clean bootRun --args='--spring.profiles.active=dev'
    ```
2. Run following command in frontend directory:
    ```
    npm start
    ```
3. Browsing http://localhost:3000 for UI
4. Browsing http://localhost:8080 or http://localhost:8080/profile for APIs

### Approach 2: For backend only development

1. Run command
    ```
    ./gradlew clean bootRun
    ```
2. Browsing http://localhost:8080 or http://localhost:8080/profile to view available APIs

   > Note: username/password is: admin/admin

### Approach 3: Start full Spring boot app including UI

1. Run command
    ```
    ./gradlew :frontend:copyFrontend bootRun
    ```
2. Browsing http://localhost:8080 to view UI
3. Open http://localhost:8080/profile to view available APIs
   > Note: login required, username/password is the same as previous approach.

### Approach 4: Start Spring fat jar

1. Run command to build the jar
    ```
    ./gradlew bootJar
    ```
2. Run command to execute the jar
   ```
   java -jar backend/build/libs/task_tracking_demo_executable-0.0.1.jar
   ```
   > Note: login required, username/password is the same.

### Missing parts / todos:

- UT
- CI/CD
- Use MySQL or PostgreSQL rather than H2
- Should not hardcode username/password
- i18n
- Error Handling
- Try to use template project such as free MUI templates which looks fancy
- Validation, especially for email and password
- Use multiple selection component for user roles
- .....
