plugins {
    id("org.siouan.frontend-jdk11")
}

frontend {
     nodeVersion.set("19.1.0")
     installScript.set("install")
     assembleScript.set("run build")
     cleanScript.set("run clean")
     checkScript.set("run check")
}

tasks.register<Copy>("copyFrontend") {
    dependsOn("assembleFrontend")
    from("$projectDir/build")
    into("../backend/build/resources/main/public/")
}
