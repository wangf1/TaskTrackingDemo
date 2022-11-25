rootProject.name = "tasktracking"

pluginManagement {
    plugins {
        val springBootVersion: String by settings
        val springDependencyManagementVersion: String by settings
        val siouanFrontendVersion: String by settings

        id("org.springframework.boot") version springBootVersion
	    id("io.spring.dependency-management") version springDependencyManagementVersion
        id("org.siouan.frontend-jdk11") version siouanFrontendVersion
    }
}

include(":frontend")
include(":backend")
