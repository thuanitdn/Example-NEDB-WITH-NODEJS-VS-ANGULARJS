Feature: Task

  Scenario: Test task
    Given An user
    When I create a new task
    Then the task with task "exampletask" is created
    When I get a list task
    Then the following task are listed