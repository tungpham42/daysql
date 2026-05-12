import React from "react";
import {
  ReadOutlined,
  BarChartOutlined,
  LinkOutlined,
  RocketOutlined,
  SmileOutlined,
  FunctionOutlined,
} from "@ant-design/icons";

export type LessonLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  level: LessonLevel;
  context: React.ReactNode;
  instructions: string[];
  expectedQuery: string;
}

export interface Chapter {
  id: string;
  title: string;
  icon: React.ReactNode;
  lessons: Lesson[];
}

export const COURSE_DATA: Chapter[] = [
  {
    id: "chap-1",
    title: "1. SQL Basics",
    icon: <ReadOutlined />,
    lessons: [
      {
        id: "lesson-1-1",
        chapterId: "chap-1",
        title: "Selecting All Columns",
        level: "Beginner",
        context: (
          <>
            Welcome to your first SQL lesson!{" "}
            <SmileOutlined style={{ color: "#faad14" }} /> You've just been
            hired as a Data Analyst at TechCorp. Relational databases consist of
            tables, and the most basic way to interact with them is the SELECT
            statement. You have access to a table called `employees`. The
            `SELECT *` syntax retrieves every column.
          </>
        ),
        instructions: [
          "Write a query to select all columns from the `employees` table.",
          'Click "Run Code" to execute your query and view the result in the console.',
        ],
        expectedQuery: "SELECT * FROM employees",
      },
      {
        id: "lesson-1-2",
        chapterId: "chap-1",
        title: "Selecting Specific Columns",
        level: "Beginner",
        context:
          "Using `SELECT *` is great for exploring, but for large datasets, returning every column slows things down. You can request exact columns by separating their names with a comma.",
        instructions: [
          "Select only the `name` and `role` columns from the `employees` table.",
        ],
        expectedQuery: "SELECT name, role FROM employees",
      },
      {
        id: "lesson-1-3",
        chapterId: "chap-1",
        title: "Filtering with WHERE",
        level: "Beginner",
        context:
          "HR wants a list of high earners. The `WHERE` clause allows you to filter results based on specific mathematical or logical conditions (>, <, =, >=, <=, !=).",
        instructions: [
          "Select the `name` and `salary` columns from the `employees` table.",
          "Filter the results to only show employees where the `salary` is strictly greater than 80000.",
        ],
        expectedQuery:
          "SELECT name, salary FROM employees WHERE salary > 80000",
      },
      {
        id: "lesson-1-4",
        chapterId: "chap-1",
        title: "Multiple Conditions (AND / OR)",
        level: "Beginner",
        context:
          "You can combine multiple conditions using `AND` and `OR`. `AND` requires both conditions to be true, while `OR` requires at least one to be true.",
        instructions: [
          "Select all columns from `employees`.",
          "Filter for employees who are either a 'Data Engineer' OR earn more than 90000.",
        ],
        expectedQuery:
          "SELECT * FROM employees WHERE role = 'Data Engineer' OR salary > 90000",
      },
      {
        id: "lesson-1-5",
        chapterId: "chap-1",
        title: "The IN and BETWEEN Operators",
        level: "Beginner",
        context:
          "Instead of writing multiple OR statements, you can use `IN` to specify multiple values. `BETWEEN` selects values within a given range, inclusive of the boundaries.",
        instructions: [
          "Select the `name` and `salary` from `employees`.",
          "Use the `BETWEEN` operator to find salaries between 60000 and 90000.",
        ],
        expectedQuery:
          "SELECT name, salary FROM employees WHERE salary BETWEEN 60000 AND 90000",
      },
      {
        id: "lesson-1-6",
        chapterId: "chap-1",
        title: "Pattern Matching with LIKE",
        level: "Beginner",
        context:
          "The `LIKE` operator is used in a WHERE clause to search for a specified pattern in a column. The percent sign `%` represents zero, one, or multiple characters.",
        instructions: [
          "Select `name` and `role` from `employees`.",
          "Use `LIKE` to find all employees whose role contains the word 'Data'.",
        ],
        expectedQuery:
          "SELECT name, role FROM employees WHERE role LIKE '%Data%'",
      },
      {
        id: "lesson-1-7",
        chapterId: "chap-1",
        title: "Dealing with Missing Data (IS NULL)",
        level: "Beginner",
        context:
          "A field with a NULL value is a field with no value (it is not a zero or a space). You must use `IS NULL` or `IS NOT NULL` to test for it.",
        instructions: [
          "Select the `name` of all employees.",
          "Filter to find the employee who has not been assigned a department yet (where `department_id` IS NULL).",
        ],
        expectedQuery: "SELECT name FROM employees WHERE department_id IS NULL",
      },
      {
        id: "lesson-1-8",
        chapterId: "chap-1",
        title: "Sorting Results (ORDER BY)",
        level: "Beginner",
        context:
          "The `ORDER BY` keyword is used to sort the result-set in ascending (`ASC`) or descending (`DESC`) order. By default, it sorts records in ascending order.",
        instructions: [
          "Select `name` and `salary` from the `employees` table.",
          "Sort the results by `salary` in descending order (`DESC`) so the highest paid employee appears first.",
        ],
        expectedQuery:
          "SELECT name, salary FROM employees ORDER BY salary DESC",
      },
      {
        id: "lesson-1-9",
        chapterId: "chap-1",
        title: "Limiting Results (LIMIT)",
        level: "Beginner",
        context:
          "When working with millions of rows, returning everything can crash your client. The `LIMIT` clause restricts the number of records returned.",
        instructions: [
          "Select `name` and `salary` from the `employees` table.",
          "Order by `salary` descending to get the highest paid employees.",
          "Use `LIMIT 2` to only return the top 2 earners.",
        ],
        expectedQuery:
          "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 2",
      },
    ],
  },
  {
    id: "chap-2",
    title: "2. Aggregation & Grouping",
    icon: <BarChartOutlined />,
    lessons: [
      {
        id: "lesson-2-1",
        chapterId: "chap-2",
        title: "Counting Rows (COUNT)",
        level: "Intermediate",
        context:
          "Aggregate functions perform a calculation on a set of values. The `COUNT()` function returns the number of rows that match a specified criterion.",
        instructions: [
          "Count the total number of employees in the table.",
          "Alias the result as `total_employees` using the `AS` keyword.",
        ],
        expectedQuery: "SELECT COUNT(*) AS total_employees FROM employees",
      },
      {
        id: "lesson-2-2",
        chapterId: "chap-2",
        title: "SUM, MIN, and MAX",
        level: "Intermediate",
        context:
          "You can use multiple aggregate functions in the same SELECT statement to generate comprehensive reports.",
        instructions: [
          "Select the `SUM(salary)` as `total_payroll`.",
          "Select the `MIN(salary)` as `lowest_salary`.",
          "Select the `MAX(salary)` as `highest_salary`.",
          "Pull these metrics from the `employees` table.",
        ],
        expectedQuery:
          "SELECT SUM(salary) AS total_payroll, MIN(salary) AS lowest_salary, MAX(salary) AS highest_salary FROM employees",
      },
      {
        id: "lesson-2-3",
        chapterId: "chap-2",
        title: "Averages (AVG)",
        level: "Intermediate",
        context:
          "The `AVG()` function returns the average value of a numeric column. Null values are ignored.",
        instructions: [
          "Calculate the average salary of all employees.",
          "Alias the result as `average_salary`.",
        ],
        expectedQuery: "SELECT AVG(salary) AS average_salary FROM employees",
      },
      {
        id: "lesson-2-4",
        chapterId: "chap-2",
        title: "The GROUP BY Clause",
        level: "Intermediate",
        context:
          "The `GROUP BY` statement groups rows that have the same values into summary rows, like finding the average salary for each department.",
        instructions: [
          "Select the `department_id`.",
          "Calculate the average salary as `avg_salary`.",
          "Group the results by `department_id`.",
        ],
        expectedQuery:
          "SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id",
      },
      {
        id: "lesson-2-5",
        chapterId: "chap-2",
        title: "Filtering Groups with HAVING",
        level: "Intermediate",
        context:
          "The `WHERE` clause filters individual rows *before* aggregation. The `HAVING` clause filters groups *after* aggregation.",
        instructions: [
          "Select `department_id` and the `AVG(salary)` as `avg_salary`.",
          "Group by `department_id`.",
          "Use the `HAVING` clause to only show departments where the `avg_salary` is strictly greater than 70000.",
        ],
        expectedQuery:
          "SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id HAVING AVG(salary) > 70000",
      },
    ],
  },
  {
    id: "chap-3",
    title: "3. Joining Tables",
    icon: <LinkOutlined />,
    lessons: [
      {
        id: "lesson-3-1",
        chapterId: "chap-3",
        title: "INNER JOIN",
        level: "Intermediate",
        context:
          "An `INNER JOIN` selects records that have matching values in both tables. We now have a `departments` table linking `department_id` to `department_name`.",
        instructions: [
          "Select `employees.name` and `departments.department_name`.",
          "Perform an `INNER JOIN` between `employees` and `departments`.",
          "Join them on the `department_id` column present in both tables.",
        ],
        expectedQuery:
          "SELECT employees.name, departments.department_name FROM employees INNER JOIN departments ON employees.department_id = departments.department_id",
      },
      {
        id: "lesson-3-2",
        chapterId: "chap-3",
        title: "LEFT JOIN",
        level: "Intermediate",
        context:
          "A `LEFT JOIN` returns all records from the left table (`employees`), and the matched records from the right table (`departments`). If there is no match, the result is NULL.",
        instructions: [
          "Remember Eve? She has no department assigned.",
          "Select `employees.name` and `departments.department_name`.",
          "Perform a `LEFT JOIN` from `employees` to `departments` on `department_id` to ensure Eve is still included in the report.",
        ],
        expectedQuery:
          "SELECT employees.name, departments.department_name FROM employees LEFT JOIN departments ON employees.department_id = departments.department_id",
      },
      {
        id: "lesson-3-3",
        chapterId: "chap-3",
        title: "Self Joins",
        level: "Advanced",
        context:
          "A self join is a regular join, but the table is joined with itself. This is useful for finding relationships between rows in the same table, such as finding pairs of employees who work in the same department.",
        instructions: [
          "Select `A.name` as Employee1, `B.name` as Employee2, and their shared `department_id`.",
          "Join the `employees` table with itself (aliased as A and B).",
          "Match them where their `department_id` is equal, but add an AND condition where `A.id < B.id` to avoid mirroring duplicates.",
        ],
        expectedQuery:
          "SELECT A.name AS Employee1, B.name AS Employee2, A.department_id FROM employees A INNER JOIN employees B ON A.department_id = B.department_id AND A.id < B.id",
      },
    ],
  },
  {
    id: "chap-4",
    title: "4. Advanced Queries & Logic",
    icon: <RocketOutlined />,
    lessons: [
      {
        id: "lesson-4-1",
        chapterId: "chap-4",
        title: "Subqueries in WHERE",
        level: "Advanced",
        context:
          "A subquery is a query nested inside another query. They are often used in the `WHERE` clause to filter data dynamically based on the results of another query.",
        instructions: [
          "Select `name` and `salary` from `employees`.",
          "Filter the results where `salary` is strictly greater than the result of a subquery.",
          "The subquery should calculate the `AVG(salary)` from the `employees` table.",
        ],
        expectedQuery:
          "SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)",
      },
      {
        id: "lesson-4-2",
        chapterId: "chap-4",
        title: "Subqueries in FROM (Derived Tables)",
        level: "Advanced",
        context:
          "You can place a subquery in the `FROM` clause to act as a temporary table. This is incredibly powerful for aggregating data in multiple steps.",
        instructions: [
          "Write a subquery that selects `department_id` and `SUM(salary) AS total_salary` GROUPED BY `department_id`.",
          "Place this subquery in the FROM clause and alias it as `dept_salaries`.",
          "In the main outer query, select the `MAX(total_salary) AS highest_dept_cost` from `dept_salaries`.",
        ],
        expectedQuery:
          "SELECT MAX(total_salary) AS highest_dept_cost FROM (SELECT department_id, SUM(salary) AS total_salary FROM employees GROUP BY department_id) AS dept_salaries",
      },
      {
        id: "lesson-4-3",
        chapterId: "chap-4",
        title: "CASE Statements",
        level: "Advanced",
        context:
          "The `CASE` statement goes through conditions and returns a value when the first condition is met (like an IF-THEN-ELSE statement in programming).",
        instructions: [
          "Select `name`, `salary`, and create a new column using `CASE`.",
          "If salary > 90000, return 'High'. If salary > 70000, return 'Medium'. Else 'Low'.",
          "Alias this new `CASE` column as `salary_tier`.",
        ],
        expectedQuery:
          "SELECT name, salary, CASE WHEN salary > 90000 THEN 'High' WHEN salary > 70000 THEN 'Medium' ELSE 'Low' END AS salary_tier FROM employees",
      },
      {
        id: "lesson-4-4",
        chapterId: "chap-4",
        title: "CASE Statements with Aggregation",
        level: "Advanced",
        context:
          "You can place `CASE` statements inside aggregate functions to perform conditional counting. This is called pivoting.",
        instructions: [
          "Select `department_id`.",
          "Use `SUM(CASE WHEN salary > 80000 THEN 1 ELSE 0 END)` to count how many high earners are in each department. Alias it as `high_earners_count`.",
          "Group the result by `department_id`.",
        ],
        expectedQuery:
          "SELECT department_id, SUM(CASE WHEN salary > 80000 THEN 1 ELSE 0 END) AS high_earners_count FROM employees GROUP BY department_id",
      },
      {
        id: "lesson-4-5",
        chapterId: "chap-4",
        title: "CTEs (Common Table Expressions)",
        level: "Advanced",
        context:
          "A CTE uses the `WITH` clause to define a temporary, named result set. It makes complex queries involving subqueries much easier to read and maintain.",
        instructions: [
          "Use the `WITH` keyword to create a CTE named `HighEarners`.",
          "Inside the CTE, select all columns from `employees` where salary > 80000.",
          "In your main query beneath it, select `name` and `salary` from `HighEarners` ordered by `salary` descending.",
        ],
        expectedQuery:
          "WITH HighEarners AS (SELECT * FROM employees WHERE salary > 80000) SELECT name, salary FROM HighEarners ORDER BY salary DESC",
      },
    ],
  },
  {
    id: "chap-5",
    title: "5. Text & Math Functions",
    icon: <FunctionOutlined />,
    lessons: [
      {
        id: "lesson-5-1",
        chapterId: "chap-5",
        title: "Changing Text Case",
        level: "Beginner",
        context:
          "Data isn't always clean. Sometimes you need to standardize text format using string functions like `UPPER()` and `LOWER()`.",
        instructions: [
          "Select the `name` column, but wrap it in the `UPPER()` function. Alias it as `uppercase_name`.",
          "Select the `role` column, but wrap it in the `LOWER()` function. Alias it as `lowercase_role`.",
          "Select them from the `employees` table.",
        ],
        expectedQuery:
          "SELECT UPPER(name) AS uppercase_name, LOWER(role) AS lowercase_role FROM employees",
      },
      {
        id: "lesson-5-2",
        chapterId: "chap-5",
        title: "Measuring Text Length",
        level: "Beginner",
        context:
          "The `LENGTH()` function allows you to calculate the number of characters in a string. It is often used for data validation.",
        instructions: [
          "Select the `name` column.",
          "Select the `LENGTH(name)` and alias it as `name_length`.",
          "Order the results by `name_length` descending.",
        ],
        expectedQuery:
          "SELECT name, LENGTH(name) AS name_length FROM employees ORDER BY name_length DESC",
      },
      {
        id: "lesson-5-3",
        chapterId: "chap-5",
        title: "Mathematical Operations",
        level: "Beginner",
        context:
          "You can perform standard mathematical operations (+, -, *, /) directly within your SELECT statements to create calculated columns.",
        instructions: [
          "Select the `name` and `salary` columns.",
          "Create a new column that multiplies `salary` by 1.10 (to simulate a 10% raise).",
          "Alias the new calculated column as `projected_salary`.",
        ],
        expectedQuery:
          "SELECT name, salary, salary * 1.10 AS projected_salary FROM employees",
      },
    ],
  },
];
