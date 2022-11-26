plugins {
    id("org.siouan.frontend-jdk11")
}

apply(plugin = "org.siouan.frontend-jdk11")

frontend {
     nodeVersion.set("19.1.0")
     installScript.set("install")
     assembleScript.set("run build")
}

tasks.register<Copy>("copyFrontend") {
    dependsOn("assembleFrontend")
    from("$projectDir/dist")
    into("../backend/build/resources/main/public/")
}
