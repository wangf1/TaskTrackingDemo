group = "com.wangf"
version = "0.0.1"

subprojects {
    group = rootProject.group
    version = rootProject.version

    repositories {
        mavenCentral()
    }
}

tasks.getByPath(":backend:bootJarMainClassName").dependsOn(":frontendv2:copyFrontend")

defaultTasks(":backend:bootJar")
