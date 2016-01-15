Feature: Project

  Scenario: Test project
    Given An user
    When I create a new project
    Then the project with project "exampleproject" is created
    When I update a project
    Then the project with project "exampleprojectupdated" is updated
    When I get a list project
    Then the following project are listed