// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  MainPage,
  CompanySearch,
  CourseSearch,
  DeveloperDescription,
  ErrorInquiry,
  JobSearch,
  Roadmap,
  Login,
  Signup,
} from './Page';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/companySearch" element={<CompanySearch />} />
          <Route path="/courseSearch" element={<CourseSearch />} />
          <Route
            path="/developerDescription"
            element={<DeveloperDescription />}
          />
          <Route path="/errorInquiry" element={<ErrorInquiry />} />
          <Route path="/jobSearch" element={<JobSearch />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
