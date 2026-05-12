import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Typography,
  Button,
  Space,
  Table,
  Tabs,
  Input,
  message,
  Tag,
  Row,
  Col,
  Card,
  ConfigProvider,
  Progress,
} from "antd";
import {
  PlayCircleOutlined,
  BulbOutlined,
  CodeOutlined,
  DatabaseFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import alasql from "alasql"; // INJECTED MOCK DATABASE ENGINE

import { COURSE_DATA, LessonLevel } from "./courseData";
import "./App.css";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// INITIALIZE MOCK DATABASE DATA
const initializeDatabase = () => {
  alasql(
    "CREATE TABLE IF NOT EXISTS employees (id INT, name STRING, role STRING, salary INT, department_id INT)",
  );
  alasql("DELETE FROM employees"); // Clear if hot-reloaded
  alasql(
    "INSERT INTO employees VALUES (1, 'Alice', 'Data Engineer', 85000, 101)",
  );
  alasql("INSERT INTO employees VALUES (2, 'Bob', 'Data Analyst', 65000, 102)");
  alasql(
    "INSERT INTO employees VALUES (3, 'Charlie', 'Scientist', 95000, 101)",
  );
  alasql("INSERT INTO employees VALUES (4, 'Diana', 'Manager', 105000, 103)");
  alasql("INSERT INTO employees VALUES (5, 'Eve', 'HR', 70000, NULL)");

  alasql(
    "CREATE TABLE IF NOT EXISTS departments (department_id INT, department_name STRING, office_location STRING)",
  );
  alasql("DELETE FROM departments");
  alasql("INSERT INTO departments VALUES (101, 'Engineering', 'New York')");
  alasql("INSERT INTO departments VALUES (102, 'Analytics', 'San Francisco')");
  alasql("INSERT INTO departments VALUES (103, 'Management', 'London')");
};

const App: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState<string>("lesson-1-1");
  const [query, setQuery] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // States to hold dynamic table data
  const [queryResults, setQueryResults] = useState<any[] | null>(null);
  const [dynamicColumns, setDynamicColumns] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("console");

  useEffect(() => {
    initializeDatabase();
  }, []);

  const currentChapter = COURSE_DATA.find((c) =>
    c.lessons.some((l) => l.id === activeLessonId),
  );
  const currentLesson = currentChapter?.lessons.find(
    (l) => l.id === activeLessonId,
  );

  const lessonIndex =
    currentChapter?.lessons.findIndex((l) => l.id === activeLessonId) ?? 0;
  const totalLessons = currentChapter?.lessons.length ?? 1;
  const progressPercent = Math.round(((lessonIndex + 1) / totalLessons) * 100);

  const menuItems = COURSE_DATA.map((chapter) => ({
    key: chapter.id,
    icon: chapter.icon,
    label: chapter.title,
    children: chapter.lessons.map((lesson) => ({
      key: lesson.id,
      icon: <CodeOutlined />,
      label: lesson.title,
    })),
  }));

  const handleRunQuery = async () => {
    if (!query.trim()) {
      message.warning("Please write a SQL query before running.");
      return;
    }

    setIsRunning(true);
    setActiveTab("console");

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      // 1. EXECUTE USER'S QUERY
      const userResults = alasql(query) as any[];

      // 2. EXECUTE EXPECTED QUERY FOR COMPARISON
      const expectedResults = alasql(
        currentLesson?.expectedQuery || "",
      ) as any[];

      // 3. GENERATE DYNAMIC TABLE COLUMNS BASED ON THE USER'S ACTUAL RESULT KEYS
      let columnsToDisplay: any[] = [];
      if (userResults.length > 0) {
        columnsToDisplay = Object.keys(userResults[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }));
      } else if (expectedResults.length > 0) {
        // Fallback column headers if their query returned 0 rows
        columnsToDisplay = Object.keys(expectedResults[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }));
      }

      setDynamicColumns(columnsToDisplay);

      // Map keys required by Ant Design Table
      setQueryResults(
        userResults.map((row: any, i: number) => ({ ...row, key: i })),
      );

      // 4. VERIFY IF THEY SOLVED THE LESSON
      // Normalize objects to JSON to check if the outputs perfectly match
      if (JSON.stringify(userResults) === JSON.stringify(expectedResults)) {
        message.success(
          "Awesome! Your query output perfectly matches the goal! 🎉",
        );
      } else {
        message.info(
          "Query executed! Check the output to see if it matches the expected goal.",
        );
      }
    } catch (error: any) {
      setQueryResults([]);
      setDynamicColumns([]);
      message.error(`SQL Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleMenuClick = (e: { key: string }) => {
    setActiveLessonId(e.key);
    setQuery("");
    setQueryResults(null);
  };

  const getLevelColor = (level?: LessonLevel) => {
    switch (level) {
      case "Beginner":
        return "success";
      case "Intermediate":
        return "warning";
      case "Advanced":
        return "error";
      default:
        return "processing";
    }
  };

  if (!currentLesson) return <div>Loading course...</div>;

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          colorPrimary: "#FF6B6B",
          colorSuccess: "#20C997",
          colorWarning: "#FFC107",
          colorInfo: "#48DBFB",
          borderRadius: 16,
          colorBgContainer: "#ffffff",
        },
        components: {
          Layout: { bodyBg: "#fffdf9" },
          Menu: {
            darkItemBg: "transparent",
            darkItemSelectedBg: "rgba(255, 255, 255, 0.25)",
            darkItemHoverBg: "rgba(255, 255, 255, 0.15)",
            darkItemColor: "rgba(255, 255, 255, 0.8)",
            darkItemSelectedColor: "#ffffff",
          },
          Card: { headerBg: "#ffffff" },
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 32px",
            background: "linear-gradient(135deg, #FF6F61 0%, #FF9A76 100%)",
            boxShadow: "0 4px 12px rgba(255, 111, 97, 0.2)",
            zIndex: 20,
            height: "72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginRight: "40px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.25)",
                padding: "8px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DatabaseFilled style={{ fontSize: "20px", color: "white" }} />
            </div>
            <Title
              level={4}
              style={{
                color: "white",
                margin: 0,
                fontWeight: 700,
                whiteSpace: "nowrap",
                letterSpacing: "-0.5px",
              }}
            >
              SQL Mastery
            </Title>
          </div>

          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[activeLessonId]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{
              flex: 1,
              minWidth: 0,
              borderBottom: "none",
              fontSize: "15px",
              fontWeight: 500,
            }}
          />
        </Header>

        <div
          style={{
            background: "#ffffff",
            padding: "20px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.03)",
            borderBottom: "1px solid #f1f5f9",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Title
              level={4}
              style={{ margin: 0, fontWeight: 700, color: "#1e293b" }}
            >
              {currentLesson.title}
            </Title>
            <Tag
              color={getLevelColor(currentLesson.level)}
              style={{
                borderRadius: "100px",
                padding: "4px 14px",
                fontWeight: 600,
                border: "none",
                fontSize: "13px",
              }}
            >
              {currentLesson.level}
            </Tag>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Text
              type="secondary"
              style={{ fontWeight: 600, color: "#64748b" }}
            >
              Lesson {lessonIndex + 1} of {totalLessons}
            </Text>
            <Progress
              percent={progressPercent}
              strokeColor="#FF6B6B"
              trailColor="#ffedd5"
              style={{ width: 140, margin: 0 }}
              showInfo={false}
              size="small"
            />
          </div>
        </div>

        <Content
          style={{
            padding: "32px",
            height: "calc(100vh - 72px - 77px)",
            overflow: "auto",
          }}
        >
          <Row gutter={32} style={{ height: "100%" }}>
            <Col span={24} md={10} lg={8} style={{ height: "100%" }}>
              <Card
                bordered={false}
                style={{
                  height: "100%",
                  overflowY: "auto",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.04)",
                }}
                bodyStyle={{ padding: "32px" }}
              >
                <Title
                  level={5}
                  style={{
                    color: "#FF6B6B",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                    fontSize: "18px",
                  }}
                >
                  <InfoCircleOutlined /> Context
                </Title>
                <Paragraph
                  style={{
                    fontSize: "15px",
                    color: "#475569",
                    lineHeight: "1.8",
                  }}
                >
                  {currentLesson.context}
                </Paragraph>

                <div
                  style={{
                    background: "#fff8f0",
                    border: "1px solid #ffe4c4",
                    padding: "24px",
                    borderRadius: "20px",
                    marginTop: "40px",
                  }}
                >
                  <Text strong style={{ fontSize: "16px", color: "#d97706" }}>
                    Your Tasks:
                  </Text>
                  <ul className="task-list">
                    {currentLesson.instructions.map((inst, idx) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Col>

            <Col
              span={24}
              md={14}
              lg={16}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                gap: "32px",
              }}
            >
              <Card
                bordered={false}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.04)",
                  overflow: "auto",
                }}
                headStyle={{
                  background: "#ffffff",
                  borderBottom: "1px solid #f1f5f9",
                  padding: "0 24px",
                }}
                title={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                    }}
                  >
                    <div className="mac-dots">
                      <div className="mac-dot red" />
                      <div className="mac-dot yellow" />
                      <div className="mac-dot green" />
                    </div>
                    <Text
                      type="secondary"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      query.sql
                    </Text>
                  </div>
                }
                extra={
                  <Space>
                    <Button
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      onClick={handleRunQuery}
                      loading={isRunning}
                      style={{
                        fontWeight: 600,
                        padding: "0 24px",
                        boxShadow: "0 4px 14px 0 rgba(255, 107, 107, 0.35)",
                      }}
                    >
                      Run Code
                    </Button>
                    <Button
                      icon={<BulbOutlined />}
                      onClick={() => {
                        setQuery(currentLesson?.expectedQuery || "");
                        message.info(
                          "Solution loaded! Try running it to see how it works.",
                        );
                      }}
                      style={{ fontWeight: 600, padding: "0 24px" }}
                    >
                      Show Solution
                    </Button>
                  </Space>
                }
                bodyStyle={{ padding: 0, flex: 1, background: "#292524" }}
              >
                <Input.TextArea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="-- Write your amazing SQL query here..."
                  style={{
                    height: "100%",
                    border: "none",
                    resize: "none",
                    fontFamily:
                      "'Fira Code', 'Courier New', Courier, monospace",
                    fontSize: "16px",
                    padding: "24px",
                    backgroundColor: "transparent",
                    color: "#f5f5f4",
                    lineHeight: "1.7",
                  }}
                  spellCheck={false}
                />
              </Card>

              <Card
                bordered={false}
                style={{
                  flex: 1,
                  overflow: "auto",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.04)",
                }}
                bodyStyle={{
                  padding: "0",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  style={{ padding: "0 24px", paddingTop: "12px" }}
                  items={[
                    {
                      key: "console",
                      label: "Console Output",
                      children: (
                        <div
                          style={{
                            padding: "16px 0",
                            height: "100%",
                            overflowY: "auto",
                          }}
                        >
                          {queryResults === null ? (
                            <div
                              style={{
                                textAlign: "center",
                                padding: "60px 40px",
                                color: "#cbd5e1",
                              }}
                            >
                              <DatabaseFilled
                                style={{
                                  fontSize: "36px",
                                  marginBottom: "16px",
                                  color: "#f1f5f9",
                                }}
                              />
                              <br />
                              <Text
                                style={{ color: "#94a3b8", fontSize: "15px" }}
                              >
                                Run a query to view results.
                              </Text>
                            </div>
                          ) : queryResults.length === 0 ? (
                            <Text type="secondary">
                              Query executed successfully. 0 rows returned.
                            </Text>
                          ) : (
                            <Table
                              dataSource={queryResults}
                              columns={dynamicColumns} // NOW INJECTING COLUMNS DYNAMICALLY
                              pagination={false}
                              size="middle"
                            />
                          )}
                        </div>
                      ),
                    },
                    {
                      key: "schema",
                      label: "Database Schema",
                      children: (
                        <div style={{ padding: "16px 0", overflowY: "auto" }}>
                          <Text
                            strong
                            style={{ color: "#475569", fontSize: "15px" }}
                          >
                            Available Tables:
                          </Text>
                          <div
                            style={{
                              marginTop: "16px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "12px",
                            }}
                          >
                            <div
                              style={{
                                background: "#f8fafc",
                                padding: "20px",
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              <Text strong style={{ color: "#334155" }}>
                                employees
                              </Text>
                              <Text
                                type="secondary"
                                style={{
                                  display: "block",
                                  marginTop: "6px",
                                  fontFamily: "monospace",
                                  fontSize: "14px",
                                }}
                              >
                                (id, name, role, salary, department_id)
                              </Text>
                            </div>
                            <div
                              style={{
                                background: "#f8fafc",
                                padding: "20px",
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              <Text strong style={{ color: "#334155" }}>
                                departments
                              </Text>
                              <Text
                                type="secondary"
                                style={{
                                  display: "block",
                                  marginTop: "6px",
                                  fontFamily: "monospace",
                                  fontSize: "14px",
                                }}
                              >
                                (department_id, department_name,
                                office_location)
                              </Text>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
