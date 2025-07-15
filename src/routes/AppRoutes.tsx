import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';

import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPassword from '../pages/auth/ResetPassword';

import BrowseCaregivers from '../pages/caregivers/BrowseCaregivers';
import CaregiverDetails from '../pages/caregivers/CaregiverDetails';
import CaregiverDashboard from '../pages/dashboard/CaregiverDashboard';
import ClientDashboard from '../pages/dashboard/ClientDashboard';

import ApplyJob from '../pages/jobs/ApplyJob';
import BrowseJobs from '../pages/jobs/BrowseJobs';
import JobDetails from '../pages/jobs/JobDetails';
import PostJob from '../pages/jobs/PostJob';

import Messages from '../pages/messages/Messages';
import Payments from '../pages/payments/Payments';
import EditProfile from '../pages/profile/EditProfile';
import ViewProfile from '../pages/profile/ViewProfile';
import LeaveReview from '../pages/reviews/LeaveReview';

import HomePage from '../pages/Home';

const AppRoutes = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/caregivers" element={<BrowseCaregivers />} />
        <Route path="/caregivers/:id" element={<CaregiverDetails />} />
        <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} />

        <Route path="/client-dashboard" element={<ClientDashboard />} />

        <Route path="/jobs" element={<BrowseJobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/post-job" element={<PostJob />} />
<Route path="/edit-job/:jobId" element={<PostJob />} />

        <Route path="/jobs/apply/:id" element={<ApplyJob />} />

        <Route path="/messages" element={<Messages />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/profile/:id" element={<ViewProfile />} />
        <Route path="/leave-review/:id" element={<LeaveReview />} />
      </Routes>
    </Layout>
  </Router>
);

export default AppRoutes;
