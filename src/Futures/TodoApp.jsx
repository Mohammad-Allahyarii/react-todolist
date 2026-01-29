import Header from "@/components/Header/Header";
import ThemeProvider from "@/context/ThemeContext";
import Background from "@/components/Background";
import MainSection from "@/components/MainSection/MainSection";
import TasksManagmentContext from "@/context/TasksManagmentContext";
import Footer from "@/components/Footer/Footer";

const TodoApp = () => {
  // generateTask();

  return (
    <ThemeProvider>
      <div className="container">
        <Background />
        <TasksManagmentContext>
          <Header />
          <MainSection />
          <Footer />
        </TasksManagmentContext>
      </div>
    </ThemeProvider>
  );
};

export default TodoApp;
