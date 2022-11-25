group = "com.wangf"
version = "0.0.1"

subprojects {
    group = rootProject.group
    version = rootProject.version

    repositories {
        mavenCentral()
    }
}

tasks.getByPath(":backend:bootJarMainClassName").dependsOn(":frontend:copyFrontend")
tasks.getByPath(":backend:bootRun").dependsOn(":frontend:copyFrontend")

defaultTasks(":backend:bootJar")
